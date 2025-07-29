import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { ImageCarousel } from "./Image-carousel";

function FarmerDashboard() {
  const [animals, setAnimals] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Role check and redirect
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const user = jwtDecode(token);

      if (!user?.role || user.role !== "farmer") {
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Invalid token", err);
      navigate("/login");
    }
  }, [navigate]);

  // Fetch animals
  useEffect(() => {
    fetch("http://localhost:5000/animals")
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
    fetch("http://localhost:5000/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((err) => console.error("Failed to load categories", err));
  }, []);

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

  const onSelectCategory = (category) => {
    setSelectedCategory(category);
  };

  if (loading) return <p className="text-center mt-8">Loading animals...</p>;

  return (
    <div className="min-h-screen bg-[#f1f8e9] font-sans flex flex-col">
      {/* Header */}
      <header className="bg-green-700/90 text-white flex justify-between items-center px-12 py-4 shadow-md sticky top-0 z-50 backdrop-blur-sm">
        <div className="text-5xl font-extrabold tracking-wider py-2">
          FarMart
        </div>
        <div className="flex items-center gap-4 mr-10">
          <Link
            to="/"
            className="hover:underline hover:text-green-300 transition"
          >
            Home
          </Link>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-1 border border-gray-300 rounded-2xl bg-white text-black"
          />
          <Link to="/animals/add">
            <p className="text-black font-bold">Add Animal</p>
          </Link>
          <Link to="/cart" aria-label="View shopping cart">
            <img
              src="/src/images/shopping_cart_24dp_1F1F1F_FILL1_wght400_GRAD200_opsz24.svg"
              alt="Cart"
              title="Cart"
            />
          </Link>
          <Link to="/profile">
            <img
              src="/src/images/user_attributes_24dp_1F1F1F_FILL1_wght500_GRAD0_opsz48.svg"
              alt="Profile"
              title="Profile"
              className="h-8"
            />
          </Link>
        </div>
      </header>

      <main className="flex-grow">
        {/* Carousel */}
        <div className="h-28 bg-[#f1f8e9] font-sans flex flex-col">
          <ImageCarousel />
        </div>

        {/* Categories */}
        <div className=" flex space-x-6 mb-4 mt-4 justify-center">
          {categories
            .map((category) => (
              <button
                key={category.id || category.name} // fallback if no id
                onClick={() => onSelectCategory(category)}
                className={`flex flex-col items-center space-y-1 p-3 rounded shadow transition ${
                  selectedCategory?.name === category.name
                    ? "bg-green-400 text-white"
                    : "bg-green-100 text-green-700 hover:bg-green-200"
                }`}
                aria-pressed={selectedCategory?.name === category.name}
              >
                <div className="text-5xl">{category.icon}</div>
                <div className="font-semibold">{category.name}</div>
              </button>
            ))}
          <button
            onClick={() => onSelectCategory(null)}
            className="px-4 py-2 rounded shadow bg-gray-300 hover:bg-gray-400 text-gray-800"
          >
            Clear Filter
          </button>
        </div>

        {/* Animal Cards */}
        <div className="p-6">
          {loading ? (
            <p className="text-center text-lg text-gray-600">
              Loading animals...
            </p>
          ) : (
            <>
              {filteredAnimals.length === 0 ? (
                <p className="text-center text-gray-600">
                  No animals found in this category.
                </p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                  {filteredAnimals.map((animal) => (
                    <div
                      key={animal.id}
                      className="p-4 rounded-lg shadow-md text-gray-800 hover:shadow-lg transition-transform transform hover:scale-105 w-96"
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
      <footer className="bg-green-700 text-white py-6 text-center">
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

export default FarmerDashboard;
