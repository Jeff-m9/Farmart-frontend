import { Link, useNavigate } from "react-router-dom";
import { ImageCarousel } from "./Image-carousel";
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils";

function BuyerDashboard() {
  const [animals, setAnimals] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();


  const onSelectCategory = (category) => {
    setSelectedCategory(category);
  };

  // Filtering logic
  const filteredAnimals = animals.filter((animal) => {
    const matchesCategory = selectedCategory
      ? animal.category_id === selectedCategory.id
      : true;

    const matchesSearch = searchTerm
      ? animal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        animal.breed.toLowerCase().includes(searchTerm.toLowerCase())
      : true;

    return matchesCategory && matchesSearch;
  });

  // Fetch animals
  useEffect(() => {
    fetch(`${BASE_URL}/animals`)
      .then((res) => res.json())
      .then((data) => {
        setAnimals(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load animals", err);
        setLoading(false);
      });
  }, []);

  // Fetch categories
  useEffect(() => {
    fetch(`${BASE_URL}/categories`)
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((err) => console.error("Failed to load categories", err));
  }, []);

  return (
    <div className="min-h-screen bg-[#f1f8e9] font-sans flex flex-col">
      <main className="flex-grow">
        {/* Carousel */}
        <div className="bg-[#f1f8e9] w-full font-sans flex flex-col">
          <ImageCarousel />
        </div>

        {/* Categories + Search */}
        <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:items-center px-6 space-y-4 sm:space-y-0 sm:space-x-4 mt-3">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border border-gray-300 rounded-2xl bg-white text-black w-full sm:w-[200px]"
          />
          <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:items-center sm:space-x-4">
            <select
              onChange={(e) => {
                const selectedId = parseInt(e.target.value);
                const selected = categories.find(
                  (cat) => cat.id === selectedId
                );
                onSelectCategory(selected || null);
              }}
              value={selectedCategory?.id || ""}
              className="p-3 rounded bg-green-100 text-green-700 shadow focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              <option value="">Filter Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Animal Cards */}
        <div className="p-6">
          <h1 className="text-3xl text-center font-bold pb-2">
            Available animals
          </h1>
          {loading ? (
            <p className="text-center text-lg text-gray-600">
              Loading animals...
            </p>
          ) : (
            <>
              {filteredAnimals.length === 0 ? (
                <p className="text-center text-gray-600">
                  No animals available
                </p>
              ) : (
                <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
                  {filteredAnimals.map((animal) => (
                    <div
                      key={animal.id}
                      className="p-4 rounded-lg shadow-md text-gray-800 hover:shadow-lg transition-transform transform hover:scale-105 w-100"
                      style={{
                        background:
                          "linear-gradient(to bottom, #D9E2D1 60%, #91FD80 93%, #91FD80 100%)",
                      }}
                    >
                      <img
                        src={animal.image}
                        alt={animal.name}
                        className="w-full h-64 object-cover rounded"
                      />
                      <Link
                        to={`/animals/${animal.id}`}
                        className="text-xl font-semibold hover:underline"
                      >
                        {animal.name}
                      </Link>
                      <p>
                        <strong>Breed:</strong> {animal.breed}
                      </p>
                      <p className="font-bold text-lg">Ksh {animal.price}</p>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </main>

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
        &copy; 2025 FarMart App. All rights reserved.
      </footer>
    </div>
  );
}

export default BuyerDashboard;
