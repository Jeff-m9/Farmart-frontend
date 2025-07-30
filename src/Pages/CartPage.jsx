import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "./CartContext";

function CartPage() {
  const {
    cart,
    removeFromCart,
    clearCart,
  } = useCart();

  const [total, setTotal] = useState(0);

  useEffect(() => {
    const totalAmount = cart.reduce(
      (sum, item) => sum + item.price * (item.quantity || 1),
      0
    );
    setTotal(totalAmount);
  }, [cart]);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f1f8e9]">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Your cart is empty
          </h2>
          <Link
            to="/browse"
            className="text-green-700 underline hover:text-green-900"
          >
            Browse animals
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f1f8e9] flex flex-col items-center justify-start py-16 px-4">
      <h1 className="text-3xl font-extrabold text-green-800 mb-6">Your Cart</h1>

      <ul className="bg-white shadow-md rounded-lg w-full max-w-2xl divide-y divide-gray-200 mb-6">
        {cart.map((item) => (
          <li key={item.id} className="p-4 flex justify-between items-center">
            <div>
              <p className="font-semibold text-lg">{item.name}</p>
              <p className="text-sm text-gray-500">{item.breed}</p>
            </div>
            <div className="text-right">
              <p className="text-green-700 font-bold">
                Ksh {item.price * (item.quantity || 1)}
              </p>
              <p className="text-sm text-gray-500">Qty: {item.quantity || 1}</p>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-600 text-sm hover:underline mt-1"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="text-xl font-bold mb-4 text-green-800">
        Total: Ksh {total}
      </div>

      <div className="flex gap-4">
        <button
          onClick={clearCart}
          className="bg-red-600 text-white px-6 py-2 rounded shadow hover:bg-red-700"
        >
          Clear Cart
        </button>
        <Link
          to="/payment"
          className="bg-green-700 text-white px-6 py-2 rounded shadow hover:bg-green-800"
        >
          Proceed to Payment
        </Link>
      </div>
    </div>
  );
}

export default CartPage;
