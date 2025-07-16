import { Link } from "react-router-dom";
function CartPage() {
  return (
    <div className="min-h-screen bg-[#f1f8e9] flex flex-col items-center justify-start py-16 px-4">
      <h1 className="text-3xl font-extrabold text-green-800 mb-4">Your Cart</h1>
      <p className="text-gray-700 mb-6 text-center">
        Your selected animals will appear here.
      </p>

      <ul className="bg-white shadow-md rounded-lg w-full max-w-md divide-y divide-gray-200 mb-6">
        <li className="p-4 flex justify-between text-lg">
          <span>Golden Retriever</span>
          <span className="font-semibold text-green-700">$800</span>
        </li>
        <li className="p-4 flex justify-between text-lg">
          <span>Persian Cat</span>
          <span className="font-semibold text-green-700">$600</span>
        </li>
      </ul>

      {/* <button className="bg-green-700 text-white px-6 py-3 rounded-lg shadow hover:bg-green-600 transition">
        Proceed to Payment
      </button> */}
      <Link
        to="/payment"
        className="bg-green-700 text-white px-6 py-3 rounded-lg shadow hover:bg-green-600 transition"
      >
        Proceed to Payment
      </Link>
    </div>
  );
}

export default CartPage;
