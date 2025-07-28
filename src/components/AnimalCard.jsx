// src/components/AnimalCard.jsx
import React from "react";

const AnimalCard = ({ animal }) => {
  return (
    <div className="max-w-sm rounded-2xl overflow-hidden shadow-lg border border-gray-200 bg-white">
      {/* Animal Image */}
      <img
        className="w-full h-48 object-cover"
        src={animal.image || "https://via.placeholder.com/300x200"}
        alt={animal.name}
      />

      {/* Animal Details */}
      <div className="px-4 py-3">
        <h2 className="font-semibold text-lg text-gray-800">{animal.name}</h2>
        <p className="text-gray-600 capitalize">{animal.breed}</p>
        <p className="text-sm text-gray-500">Age: {animal.age}</p>
        <p className="mt-2 font-bold text-green-700">Ksh {animal.price}</p>
      </div>
    </div>
  );
};

export default AnimalCard;
