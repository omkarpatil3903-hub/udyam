import { load } from "@cashfreepayments/cashfree-js";
import { getFunctions, httpsCallable } from "firebase/functions";
import app from "../firebase";

// Initialize Firebase Functions
const functions = getFunctions(app);

// Get Cashfree configuration from environment
const CASHFREE_APP_ID = import.meta.env.VITE_CASHFREE_APP_ID;
const CASHFREE_MODE = import.meta.env.VITE_CASHFREE_MODE || "sandbox";

/**
 * Initialize Cashfree SDK
 * @returns {Promise<Object>} Cashfree instance
 */
export const initializeCashfree = async () => {
  try {
    const cashfree = await load({
      mode: CASHFREE_MODE, // "sandbox" or "production"
    });
    return cashfree;
  } catch (error) {
    console.error("Error initializing Cashfree:", error);
    throw new Error("Failed to initialize payment gateway");
  }
};

/**
 * Create a payment order via Cloud Function
 * @param {Object} orderData - Order details
 * @returns {Promise<Object>} Payment session details
 */
export const createPaymentOrder = async (orderData) => {
  try {
    const createOrder = httpsCallable(functions, "createPaymentOrder");
    const result = await createOrder(orderData);
    
    if (!result.data.success) {
      throw new Error("Failed to create payment order");
    }
    
    return result.data;
  } catch (error) {
    console.error("Error creating payment order:", error.message);
    throw error;
  }
};

/**
 * Initiate Cashfree payment checkout
 * @param {Object} paymentData - Payment details
 * @param {Function} onSuccess - Success callback
 * @param {Function} onFailure - Failure callback
 */
export const initiateCashfreePayment = async (paymentData, onSuccess, onFailure) => {
  try {
    // Step 1: Create payment order via Cloud Function
    const orderResponse = await createPaymentOrder({
      amount: paymentData.amount,
      customerName: paymentData.customerName,
      customerEmail: paymentData.customerEmail,
      customerPhone: paymentData.customerPhone,
      registrationType: paymentData.registrationType,
      returnUrl: window.location.origin, // Not used in modal mode, but required by API
    });

    // Step 2: Initialize Cashfree SDK
    const cashfree = await initializeCashfree();

    // Step 3: Create checkout options for MODAL mode
    const checkoutOptions = {
      paymentSessionId: orderResponse.paymentSessionId,
      redirectTarget: "_modal", // Open in modal instead of new page
    };

    // Step 4: Open Cashfree checkout in modal
    cashfree.checkout(checkoutOptions).then((result) => {
      
      if (result.error) {
        // Payment failed or was cancelled
        if (onFailure) {
          onFailure({
            message: result.error.message || "Payment failed",
            code: result.error.code,
          });
        }
      } else if (result.paymentDetails) {
        // Payment successful
        if (onSuccess) {
          onSuccess({
            orderId: orderResponse.orderId,
            paymentDetails: result.paymentDetails,
          });
        }
      } else {
        // Payment was closed/cancelled without completion
        if (onFailure) {
          onFailure({
            message: "Payment cancelled",
            code: "USER_CANCELLED",
          });
        }
      }
    }).catch((error) => {
      if (onFailure) {
        onFailure({
          message: error.message || "Payment checkout failed",
          code: "CHECKOUT_ERROR",
        });
      }
    });

  } catch (error) {
    console.error("Error initiating payment:", error);
    if (onFailure) {
      onFailure(error);
    }
    throw error;
  }
};

/**
 * Verify payment status via Cloud Function
 * @param {string} orderId - Order ID to verify
 * @returns {Promise<Object>} Payment status
 */
export const verifyPaymentStatus = async (orderId) => {
  try {
    const getStatus = httpsCallable(functions, "getPaymentStatus");
    const result = await getStatus({ orderId });
    
    return result.data;
  } catch (error) {
    console.error("Error verifying payment status:", error);
    throw error;
  }
};

/**
 * Update payment transaction with registration details
 * @param {string} orderId - Order ID to update
 * @param {Object} data - Data to update (registrationId, collectionName)
 * @returns {Promise<Object>} Update result
 */
export const updatePaymentTransaction = async (orderId, data) => {
  try {
    const updateTransaction = httpsCallable(functions, "updatePaymentTransaction");
    const result = await updateTransaction({ orderId, ...data });
    
    return result.data;
  } catch (error) {
    console.error("Error updating payment transaction:", error);
    throw error;
  }
};

/**
 * Get payment amount based on registration type
 * @param {string} registrationType - Type of registration
 * @returns {number} Amount in INR
 */
export const getPaymentAmount = (registrationType) => {
  // You can configure these amounts
  const amounts = {
    "registration": 1,
    "re-registration": 1,
    "update-certificate": 1,
    "print-certificate": 1,
  };
  
  return amounts[registrationType] || 1;
};
