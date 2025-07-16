import React from "react";

function PaymentPage() {
  const handlePayment = () => {
    alert("Payment processing...");
  };

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "50px auto",
        padding: 20,
        border: "1px solid #ccc",
        borderRadius: 8,
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
      }}
    >
      <h1 style={{ color: "#2c7a7b", marginBottom: 10 }}>Payment</h1>
      <p style={{ color: "#555", marginBottom: 20 }}>
        Enter your payment details to complete the purchase.
      </p>
      <button
        onClick={handlePayment}
        style={{
          backgroundColor: "#2c7a7b",
          color: "white",
          border: "none",
          padding: "10px 20px",
          borderRadius: 4,
          cursor: "pointer",
          fontSize: 16,
        }}
      >
        Pay Now
      </button>
    </div>
  );
}

export default PaymentPage;
