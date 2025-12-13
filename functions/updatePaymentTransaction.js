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
