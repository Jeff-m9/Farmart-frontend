import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "./CartContext";
import Navbar from "../components/navbar";

const fallbackAnimals = [
  {
    id: 1,
    name: "Golden Retriever",
    breed: "Dog",
    age: "3 years",
    description: "Friendly and intelligent dog breed.",
    image:
      "https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=600&q=60",
    price: 18000,
  },
  {
    id: 2,
    name: "Holstein Cow",
    breed: "Cow",
    age: "2 years",
    description: "High milk-producing dairy cow.",
    image: "https://live.staticflickr.com/3857/15347464861_334a12c221_b.jpg",
    price: 25000,
  },
  {
    id: 3,
    name: "Suffolk Sheep",
    breed: "Sheep",
    age: "1 year",
    description: "Popular meat sheep breed.",
    image: "https://www.livestockkenya.com/images/hampshire-down.jpg",
    price: 2400,
  },
  {
    id: 4,
    name: "Dorper Sheep",
    breed: "Sheep",
    age: "2 years",
    description: "Hardy breed with good meat quality.",
    image: "https://farminginkenya.co.ke/wp-content/uploads/2024/10/BRAVO.webp",
    price: 3500,
  },
];

function BrowseAnimals() {
  const [animals, setAnimals] = useState([]);
  const [filter, setFilter] = useState("");

  const { cart, addToCart, removeFromCart } = useCart();

  useEffect(() => {
    fetch("http://localhost:5000/animals")
      .then((res) => {
        if (!res.ok) throw new Error("Backend fetch failed");
        return res.json();
      })
      .then((data) => {
        const combined = [...data, ...fallbackAnimals];
        const uniqueAnimals = Array.from(
          new Map(combined.map((a) => [a.id, a])).values()
        );
        setAnimals(uniqueAnimals);
      })
      .catch(() => {
        setAnimals(fallbackAnimals);
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
      <Navbar/>
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
                    <span className="text-gray-600 text-sm">
                      In Cart: {getQuantity(animal.id)}
                    </span>
                  )}
                  {getQuantity(animal.id) > 0 && (
                    <button
                      onClick={() => removeFromCart(animal.id)}
                      className="text-red-600 text-sm underline"
                    >
                      Remove All
                    </button>
                  )}
                </div>
              </div>
            </li>
          ))
        )}
      </ul>

      {/* 🛒 Floating Cart Button */}
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
