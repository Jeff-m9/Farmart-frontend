import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";
import { jwtDecode } from "jwt-decode";
import { BASE_URL } from "../utils";

function AnimalDetails() {
  const { id } = useParams();
  const [animal, setAnimal] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState(null);
  const navigate = useNavigate()

  const { addToCart, removeFromCart, isInCart } = useCart();

  useEffect(() => {
    fetch(`${BASE_URL}/animals/${id}`)
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
    <div className="min-h-screen bg-[#f1f8e9] font-sans flex flex-col">
      <div
        className="max-w-xl mx-auto mt-12 p-6 w-160  bg-[#f1f8e9] rounded-lg shadow-md"
        style={{
          background:
            "linear-gradient(to bottom, #D9E2D1 60%, #91FD80 93%, #91FD80 100%)",
        }}
      >
        <div>
          {error && (
            <div className="text-yellow-600 text-sm mb-4 text-center">
              {error}
            </div>
          )}
          <img
            src={animal.image}
            alt={animal.name}
            className="w-full object-cover mb-4 rounded"
          />
          <h2 className="text-3xl font-bold text-green-800 mb-2">
            {animal.name}
          </h2>
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
        </div>

        <div className="flex gap-4">
          {!isInCart(animal.id) ? (
            <button
              onClick={() => addToCart(animal)}
              className="px-4 py-2 bg-green-900 text-white rounded hover:bg-green-600 hover:cursor-pointer"
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
              className="text-white bg-green-900 px-4 py-2 rounded hover:bg-green-600 hover:cursor-pointer"
            >
              Edit animal
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default AnimalDetails;
