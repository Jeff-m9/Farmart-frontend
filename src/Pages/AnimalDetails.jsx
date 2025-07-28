import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";
import { jwtDecode } from "jwt-decode";

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

function AnimalDetails() {
  const { id } = useParams();
  const [animal, setAnimal] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState(null);
  const navigate = useNavigate()

  const { addToCart, removeFromCart, isInCart } = useCart();

  useEffect(() => {
    fetch(`http://localhost:5000/animals/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch animal");
        return res.json();
      })
      .then((data) => {
        setAnimal(data);
        setLoading(false);
      })
      .catch(() => {
        const fallback = fallbackAnimals.find((a) => a.id === parseInt(id));
        if (fallback) {
          setAnimal(fallback);
          setError("⚠️ Showing local fallback data");
        } else {
          setError("❌ Animal not found");
        }
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setCurrentUserId(parseInt(decoded.sub));
      } catch (err) {
        console.error("Invalid token", err);
      }
    }
  }, []);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (!animal) {
    return <div className="text-center mt-10 text-red-600">{error}</div>;
  }

  return (
    <div className="max-w-xl mx-auto mt-12 p-6 bg-white rounded-lg shadow-md">
      {error && (
        <div className="text-yellow-600 text-sm mb-4 text-center">{error}</div>
      )}
      <img
        src={animal.image}
        alt={animal.name}
        className="w-full h-64 object-cover mb-4 rounded"
      />
      <h2 className="text-3xl font-bold text-green-800 mb-2">{animal.name}</h2>
      <p className="text-gray-700 mb-2">
        <strong>Breed:</strong> {animal.breed}
      </p>
      <p className="text-gray-700 mb-2">
        <strong>Age:</strong> {animal.age}
      </p>
      <p className="text-gray-700 mb-2">
        <strong>Description:</strong> {animal.description}
      </p>
      <p className="text-xl font-bold text-green-700 mb-4">
        Price: Ksh {animal.price}
      </p>

      <div className="flex gap-4">
        {!isInCart(animal.id) ? (
          <button
            onClick={() => addToCart(animal)}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Add to Cart
          </button>
        ) : (
          <button
            onClick={() => removeFromCart(animal.id)}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Remove from Cart
          </button>
        )}
        {animal.user_id === currentUserId && (
          <button
            onClick={() => navigate(`/animals/edit/${animal.id}`)}
            className="text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
          >
            Edit animal
          </button>
        )}
      </div>
    </div>
  );
}

export default AnimalDetails;
