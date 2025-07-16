function PaymentPage() {
  const handlePayment = () => {
    alert("Payment processing...");
  };

  return (
    <div className="min-h-screen bg-[#f1f8e9] flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-green-800 mb-4 text-center">
          Payment
        </h1>
        <p className="text-gray-700 mb-6 text-center">
          Enter your payment details to complete the purchase.
        </p>

        {/* Mocked payment fields */}
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Card Number
            </label>
            <input
              type="text"
              placeholder="1234 5678 9012 3456"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expiry Date
              </label>
              <input
                type="text"
                placeholder="MM/YY"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                CVV
              </label>
              <input
                type="text"
                placeholder="123"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
          </div>

          <button
            type="button"
            onClick={handlePayment}
            className="w-full bg-green-700 text-white py-2 rounded-md hover:bg-green-800 transition"
          >
            Pay Now
          </button>
        </form>
      </div>
    </div>
  );
}

export default PaymentPage;
