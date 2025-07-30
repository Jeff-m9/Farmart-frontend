import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "./CartContext";
import { toast } from "react-toastify";


function BrowseAnimals() {
  const [animals, setAnimals] = useState([]);
  const [filter, setFilter] = useState("");
  const { cart, addToCart, removeFromCart } = useCart();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchParam = params.get("name") || "";
    setFilter(searchParam);
  }, [location.search]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/animals")
      .then((res) => {
        if (!res.ok) toast.error("Backend fetch failed");
        return res.json();
      })
      .then((data) => {
        setAnimals(data);
        console.log("✅ Animals fetched:", data);
      })
      .catch((err) => {
        setAnimals();
      });
  }, []);

  const filteredAnimals = animals.filter((animal) =>
    (animal.name + animal.breed + animal.description)
      .toLowerCase()
      .includes(filter.toLowerCase())
  );

  const getQuantity = (id) => {
    const item = cart.find((item) => item.id === id);
    return item ? item.quantity || 1 : 0;
  };

  return (
    <div className="max-w-6xl mx-auto mt-12 p-6 relative">
      <h1 className="text-3xl font-bold mb-6 text-center">Browse Animals</h1>

      <input
        type="text"
        placeholder="Search by name, breed, or description"
        className="mb-6 p-3 border border-gray-300 rounded w-full"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />

      <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredAnimals.length === 0 ? (
          <p>No animals found.</p>
        ) : (
          filteredAnimals.map((animal) => (
            <li
              key={animal.id}
              className="bg-white rounded shadow p-6 flex space-x-6"
            >
              <img
                src={animal.image}
                alt={animal.name}
                className="w-48 h-32 object-cover rounded"
              />
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <Link
                    to={`/animals/${animal.id}`}
                    className="text-xl font-semibold text-green-700 hover:underline"
                  >
                    {animal.name}
                  </Link>
                  <p>
                    <strong>Breed:</strong> {animal.breed}
                  </p>
                  <p className="font-bold text-green-800">Ksh {animal.price}</p>
                </div>
                <div className="flex gap-4 mt-4 items-center">
                  <button
                    onClick={() => addToCart(animal)}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    Add to Cart
                  </button>
                  {getQuantity(animal.id) > 0 && (
                    <>
                      <span className="text-gray-600 text-sm">
                        In Cart: {getQuantity(animal.id)}
                      </span>
                      <button
                        onClick={() => removeFromCart(animal.id)}
                        className="text-red-600 text-sm underline"
                      >
                        Remove All
                      </button>
                    </>
                  )}
                </div>
              </div>
            </li>
          ))
        )}
      </ul>

      {cart.length > 0 && (
        <Link
          to="/cart"
          className="fixed bottom-6 right-6 bg-green-600 text-white rounded-full px-6 py-3 shadow-lg hover:bg-green-700 z-50"
        >
          View Cart ({cart.reduce((sum, item) => sum + (item.quantity || 1), 0)}
          )
        </Link>
      )}
    </div>
  );
}

export default BrowseAnimals;
