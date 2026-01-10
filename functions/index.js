/**
 * Cloud Functions for Cashfree Payment Gateway Integration
 * Handles payment order creation, webhook verification, and payment status checks
 */

// Load environment variables from .env file
require('dotenv').config();

const {onCall, HttpsError} = require("firebase-functions/v2/https");
const {onRequest} = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
const axios = require("axios");
const crypto = require("crypto");

// Initialize Firebase Admin
admin.initializeApp();
const db = admin.firestore();

// Get Cashfree configuration from environment variables
const getCashfreeConfig = () => {
  const config = {
    appId: process.env.CASHFREE_APP_ID,
    secretKey: process.env.CASHFREE_SECRET_KEY,
    mode: process.env.CASHFREE_MODE || "sandbox",
    apiUrl: (process.env.CASHFREE_MODE === "production") 
      ? "https://api.cashfree.com/pg" 
      : "https://sandbox.cashfree.com/pg",
  };
  
  // Log for debugging (remove in production)
  console.log("Cashfree config loaded:", { 
    appId: config.appId ? "✓" : "✗", 
    secretKey: config.secretKey ? "✓" : "✗", 
    mode: config.mode 
  });
  
  return config;
};

/**
 * Callable Function: Create Payment Order
 * Called from frontend to initiate payment
 */
exports.createPaymentOrder = onCall(async (request) => {
  try {
    // In v2, data is in request.data
    const data = request.data;
    
    // Debug: Log received data (don't stringify, just log the object)
    console.log("Received data from frontend:", data);
    
    // Validate input
    const { amount, customerName, customerEmail, customerPhone, registrationType, registrationId, collectionName } = data;
    
    console.log("Extracted fields:", { amount, customerName, customerEmail, customerPhone, registrationType, registrationId, collectionName });
    
    if (!amount || !customerName || !customerEmail || !customerPhone) {
      console.error("Validation failed - missing fields");
      throw new HttpsError(
        "invalid-argument",
        "Missing required fields: amount, customerName, customerEmail, customerPhone"
      );
    }

    // Validate amount (must be positive number)
    if (typeof amount !== "number" || amount <= 0) {
      throw new HttpsError(
        "invalid-argument",
        "Amount must be a positive number"
      );
    }

    // CRITICAL: Validate amount matches registration type (prevent tampering)
    const VALID_AMOUNTS = {
      "registration": 1531,
      "re-registration": 1531,
      "update-certificate": 1531,
      "print-certificate": 1531,
    };

    const expectedAmount = VALID_AMOUNTS[registrationType] || 1531;
    
    if (amount !== expectedAmount) {
      console.error(`Amount validation failed: expected ${expectedAmount} for ${registrationType}, got ${amount}`);
      throw new HttpsError(
        "invalid-argument",
        `Invalid amount for ${registrationType}. Expected ₹${expectedAmount}, received ₹${amount}`
      );
    }

    console.log(`Amount validated: ₹${amount} for ${registrationType}`);

    const config = getCashfreeConfig();
    
    // Generate unique order ID
    const orderId = `ORDER_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    
    // Prepare Cashfree order request
    const orderRequest = {
      order_id: orderId,
      order_amount: amount,
      order_currency: "INR",
      customer_details: {
        customer_id: `CUST_${Date.now()}`,
        customer_name: customerName,
        customer_email: customerEmail,
        customer_phone: customerPhone,
      },
      order_meta: {
        return_url: `${data.returnUrl || "https://your-domain.com"}/payment-success?order_id={order_id}`,
        notify_url: `https://${process.env.GCLOUD_PROJECT}.cloudfunctions.net/verifyPaymentWebhook`,
      },
      order_note: `Udyam ${registrationType || "Registration"} Payment`,
    };

    console.log("Calling Cashfree API with order:", orderId);

    // Call Cashfree API to create order
    const response = await axios.post(
      `${config.apiUrl}/orders`,
      orderRequest,
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-version": "2023-08-01",
          "x-client-id": config.appId,
          "x-client-secret": config.secretKey,
        },
      }
    );

    console.log("Cashfree API response status:", response.status);

    // Store payment transaction in Firestore (only store response.data, not the whole response object)
    await db.collection("payment-transactions").doc(orderId).set({
      orderId: orderId,
      amount: amount,
      status: "PENDING",
      customerName: customerName,
      customerEmail: customerEmail,
      customerPhone: customerPhone,
      registrationType: registrationType || "registration",
      registrationId: registrationId || null,
      collectionName: collectionName || "registrations",
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      cashfreeResponse: response.data, // Only store the data, not the entire response object
    });

    // Return payment session details to frontend
    return {
      success: true,
      orderId: orderId,
      paymentSessionId: response.data.payment_session_id,
      orderAmount: amount,
    };

  } catch (error) {
    console.error("Error creating payment order:", error);
    
    if (error.response) {
      // Cashfree API error
      throw new HttpsError(
        "internal",
        `Cashfree API Error: ${error.response.data.message || error.message}`
      );
    }
    
    throw new HttpsError(
      "internal",
      `Failed to create payment order: ${error.message}`
    );
  }
});

/**
 * Verify Cashfree webhook signature
 * @param {string} rawBody - Raw request body as string
 * @param {string} signature - Signature from webhook header
 * @param {string} timestamp - Timestamp from webhook header
 * @returns {boolean} True if signature is valid
 */
const verifyWebhookSignature = (rawBody, signature, timestamp) => {
  try {
    const config = getCashfreeConfig();
    
    if (!signature || !timestamp) {
      console.error('Missing signature or timestamp in webhook headers');
      return false;
    }
    
    // Cashfree signature format: timestamp + rawBody
    const signatureString = timestamp + rawBody;
    
    // Compute HMAC-SHA256 signature
    const computedSignature = crypto
      .createHmac('sha256', config.secretKey)
      .update(signatureString)
      .digest('base64');
    
    // Compare signatures (timing-safe comparison)
    const isValid = crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(computedSignature)
    );
    
    if (!isValid) {
      console.error('Webhook signature mismatch');
      console.error('Expected:', computedSignature);
      console.error('Received:', signature);
    }
    
    return isValid;
  } catch (error) {
    console.error('Error verifying webhook signature:', error);
    return false;
  }
};

/**
 * HTTP Function: Verify Payment Webhook
 * Receives webhook notifications from Cashfree
 */
exports.verifyPaymentWebhook = onRequest(async (req, res) => {
  try {
    // Only accept POST requests
    if (req.method !== 'POST') {
      res.status(405).send('Method Not Allowed');
      return;
    }

    // Get webhook data
    const webhookData = req.body;
    
    // Get raw body for signature verification (reconstruct from parsed body)
    const rawBody = JSON.stringify(webhookData);
    
    // Get signature and timestamp from headers
    const signature = req.headers['x-webhook-signature'];
    const timestamp = req.headers['x-webhook-timestamp'];
    
    // SECURITY: Verify webhook signature
    if (!verifyWebhookSignature(rawBody, signature, timestamp)) {
      console.error('Invalid webhook signature - possible attack attempt');
      res.status(401).send('Unauthorized - Invalid signature');
      return;
    }
    
    console.log('✅ Webhook signature verified successfully');

    console.log("Webhook received:", webhookData);

    const { order_id, payment_status, payment_amount, payment_method, transaction_id } = webhookData.data || webhookData;

    if (!order_id) {
      res.status(400).send("Missing order_id");
      return;
    }

    // Update payment transaction in Firestore
    const transactionRef = db.collection("payment-transactions").doc(order_id);
    const transactionDoc = await transactionRef.get();

    if (!transactionDoc.exists) {
      console.error("Transaction not found:", order_id);
      res.status(404).send("Transaction not found");
      return;
    }

    const updateData = {
      status: payment_status,
      paymentMethod: payment_method,
      transactionId: transaction_id,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      webhookData: webhookData,
    };

    if (payment_status === "SUCCESS") {
      updateData.paymentDate = admin.firestore.FieldValue.serverTimestamp();
    }

    await transactionRef.update(updateData);

    // WEBHOOK AS PRIMARY SOURCE: Update registration document with payment status
    if (payment_status === "SUCCESS") {
      const transaction = transactionDoc.data();
      
      // Check if transaction is linked to a registration
      if (transaction.registrationId && transaction.collectionName) {
        try {
          const registrationRef = db.collection(transaction.collectionName).doc(transaction.registrationId);
          const registrationDoc = await registrationRef.get();

          if (registrationDoc.exists) {
            // Update registration with payment details
            await registrationRef.update({
              paymentStatus: "Paid",
              paymentId: order_id,
              transactionId: transaction_id,
              paymentAmount: payment_amount,
              paymentMethod: payment_method,
              paymentDate: admin.firestore.FieldValue.serverTimestamp(),
              webhookConfirmed: true, // Flag to indicate webhook confirmation
              updatedAt: admin.firestore.FieldValue.serverTimestamp(),
            });

            console.log(`Registration ${transaction.registrationId} updated with payment status via webhook`);
          } else {
            console.warn(`Registration ${transaction.registrationId} not found`);
          }
        } catch (updateError) {
          console.error(`Failed to update registration ${transaction.registrationId}:`, updateError);
          // Don't fail the webhook if registration update fails
        }
      } else {
        console.warn(`Payment transaction ${order_id} not linked to any registration`);
      }
    }

    res.status(200).send("Webhook processed successfully");

  } catch (error) {
    console.error("Error processing webhook:", error);
    res.status(500).send("Internal Server Error");
  }
});

/**
 * Callable Function: Get Payment Status
 * Called from admin dashboard to verify payment status
 */
exports.getPaymentStatus = onCall(async (request) => {
  try {
    const { orderId } = request.data;

    if (!orderId) {
      throw new HttpsError(
        "invalid-argument",
        "Missing required field: orderId"
      );
    }

    const config = getCashfreeConfig();

    // Call Cashfree API to get order status
    const response = await axios.get(
      `${config.apiUrl}/orders/${orderId}`,
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-version": "2023-08-01",
          "x-client-id": config.appId,
          "x-client-secret": config.secretKey,
        },
      }
    );

    // Update local transaction record
    const transactionRef = db.collection("payment-transactions").doc(orderId);
    await transactionRef.update({
      status: response.data.order_status,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      lastChecked: admin.firestore.FieldValue.serverTimestamp(),
    });

    // Securely update the registration document if payment is successful
    if (response.data.order_status === "PAID" || response.data.order_status === "SUCCESS") {
      const transactionDoc = await transactionRef.get();
      const transaction = transactionDoc.data();

      if (transaction && transaction.registrationId && transaction.collectionName) {
        try {
           const registrationRef = db.collection(transaction.collectionName).doc(transaction.registrationId);
           await registrationRef.update({
             paymentStatus: "Paid",
             paymentId: orderId,
             transactionId: response.data.payment_session_id || "", // Use session id or find transaction id if available in details
             paymentAmount: response.data.order_amount,
             paymentDate: admin.firestore.FieldValue.serverTimestamp(),
             updatedAt: admin.firestore.FieldValue.serverTimestamp(),
           });
           console.log(`Registration ${transaction.registrationId} securely updated to Paid via getPaymentStatus`);
        } catch (updateError) {
           console.error("Failed to update registration status:", updateError);
        }
      }
    }

    return {
      success: true,
      orderId: orderId,
      status: response.data.order_status,
      amount: response.data.order_amount,
      paymentDetails: response.data,
    };

  } catch (error) {
    console.error("Error getting payment status:", error);
    
    if (error.response) {
      throw new HttpsError(
        "internal",
        `Cashfree API Error: ${error.response.data.message || error.message}`
      );
    }
    
    throw new HttpsError(
      "internal",
      `Failed to get payment status: ${error.message}`
    );
  }
});
/**
 * Callable Function: Update Payment Transaction
 * Links payment transaction to registration document
 */
exports.updatePaymentTransaction = onCall({
  cors: true, // Enable CORS for browser calls
}, async (request) => {
  try {
    const { orderId, registrationId, collectionName } = request.data;

    if (!orderId || !registrationId) {
      throw new HttpsError(
        "invalid-argument",
        "Missing required fields: orderId, registrationId"
      );
    }

    // Update payment transaction with registration details
    const transactionRef = db.collection("payment-transactions").doc(orderId);
    const transactionDoc = await transactionRef.get();

    if (!transactionDoc.exists) {
      throw new HttpsError(
        "not-found",
        `Payment transaction not found: ${orderId}`
      );
    }

    await transactionRef.update({
      registrationId: registrationId,
      collectionName: collectionName || "registrations",
      linkedAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    console.log(`Payment transaction ${orderId} linked to registration ${registrationId}`);

    return {
      success: true,
      message: "Payment transaction linked successfully",
    };

  } catch (error) {
    console.error("Error updating payment transaction:", error);
    
    throw new HttpsError(
      "internal",
      `Failed to update payment transaction: ${error.message}`
    );
  }
});
