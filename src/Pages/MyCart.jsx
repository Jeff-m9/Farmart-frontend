import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MyCart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const fetchCart = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 401) {
        navigate("/login");
        return;
      }

      const data = await res.json();
      if (res.ok) {
        setCartItems(data);
      } else {
        alert(data.message || "Failed to load cart");
      }
    } catch (err) {
      console.error(err);
      alert("Error fetching cart");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateQuantity = async (animal_id, quantity) => {
    if (quantity < 1) return removeItem(animal_id);

    const res = await fetch(`http://127.0.0.1:5000/cart/${animal_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ animal_id, quantity }),
    });
    if (res.status === 401) {
      navigate("/login");
      return;
    }

    if (res.ok) {
      fetchCart();
    } else {
      alert("Failed to update quantity");
    }
  };

  const removeItem = async (animal_id) => {
    const res = await fetch(`http://127.0.0.1:5000/cart/${animal_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ animal_id }),
    });
    if (res.status === 401) {
      navigate("/login");
      return;
    }

    if (res.ok) {
      fetchCart();
    } else {
      alert("Failed to remove item");
    }
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.total_amount,
    0
  );

  if (!token) {
    return (
      <div className="p-6 text-center">
        <p className="text-xl">Please log in to view your cart.</p>
        <button
          onClick={() => navigate("/login")}
          className="mt-4 px-4 py-2 bg-green-700 text-white rounded"
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-12 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">🛒 My Cart</h1>

      {loading ? (
        <p>Loading...</p>
      ) : cartItems.length === 0 ? (
        <p className="text-center">Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-6">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center bg-gray-100 p-4 rounded shadow"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item.animal.image}
                    alt={item.animal.name}
                    className="w-20 h-16 object-cover rounded"
                  />
                  <div>
                    <h2 className="text-xl font-semibold">
                      {item.animal.name}
                    </h2>
                    <p>Price: Ksh{item.animal.price}</p>
                    <p>Total: Ksh{item.total_amount}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() =>
                      updateQuantity(item.animal.id, item.quantity - 1)
                    }
                    className="px-2 py-1 bg-red-600 text-white rounded"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() =>
                      updateQuantity(item.animal.id, item.quantity + 1)
                    }
                    className="px-2 py-1 bg-green-600 text-white rounded"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeItem(item.animal.id)}
                    className="ml-4 px-3 py-1 bg-gray-700 text-white rounded"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-8 text-right text-2xl font-bold text-green-800">
            Total: Ksh{totalPrice}
          </div>
        </>
      )}
    </div>
  );
}

export default MyCart;
