function PaymentPage() {
  const handlePayment = () => {
    alert("Payment processing...");
  };

  return (
    <div>
      <h1>Payment</h1>
      <p>Enter your payment details to complete the purchase.</p>
      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
}

export default PaymentPage;
