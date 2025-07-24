import { Link } from "react-router-dom";
import { ImageCarousel } from "./Image-carousel";
import { useEffect, useState } from "react";

function BuyerDashboard() {
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/animals")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setAnimals(data);
      })
      .catch((err) => console.error("Failed to load animals", err));
  }, []);

  return (
    <div className="min-h-screen bg-[#f1f8e9] font-sans flex flex-col">
      {/* Header */}
      <header className="bg-green-700/90 text-white flex justify-between items-center px-12 py-6 shadow-md sticky top-0 z-50 backdrop-blur-sm">
        <div className="text-3xl font-extrabold tracking-wider py-2">
          FarMart
        </div>
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="hover:underline hover:text-green-300 transition"
          >
            Home
          </Link>
          <input
            type="text"
            placeholder="Search..."
            className="p-1 border border-gray-300 rounded-2xl bg-white text-black"
          />
          <Link
            to="/browse"
            className="hover:underline hover:text-green-300 transition"
          >
            Browse Animals
          </Link>
        </div>
        <div>
          <Link to="/cart">
            <img
              src="/src/images/shopping_cart_24dp_1F1F1F_FILL1_wght400_GRAD200_opsz24.svg"
              alt="Cart"
            />
          </Link>
        </div>
      </header>

      {/* Carousel */}
      <div className="h-28 bg-[#f1f8e9] font-sans flex flex-col">
        <ImageCarousel />
      </div>

      {/* Animal Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
        {animals.map((animal) => (
          <div
            key={animal.id}
            className="p-4 rounded-lg shadow-md text-gray-800"
            style={{
              background:
                "linear-gradient(to bottom, #D9E2D1 60%, #91FD80 93%, #91FD80 100%)",
            }}
          >
            <img src={animal.image} alt={animal.name} />
            <Link
              to={`/animals/${animal.id}`}
              className="text-xl font-semibold hover:underline"
            >
              {animal.name}
            </Link>
            <p>
              <strong>Breed:</strong> {animal.breed}
            </p>
            <p className="font-bold text-lg">
              Ksh {animal.price}
            </p>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="bg-green-700 text-white py-6 mt-8 text-center">
        <div className="space-x-4">
          <Link to="/about" className="hover:underline">
            About Us
          </Link>
          <Link to="/contact" className="hover:underline">
            Contact Us
          </Link>
        </div>
      </footer>
    </div>
  );
}

export default BuyerDashboard;
