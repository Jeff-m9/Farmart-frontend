import { useEffect, useState } from "react";
import AnimalCard from "../components/AnimalCard";

const BuyerDashboard = () => {
  const [allAnimals, setAllAnimals] = useState([]);
  const [filteredAnimals, setFilteredAnimals] = useState([]);
  const [category, setCategory] = useState("all");
  const [categories, setCategories] = useState([]);

  // Fetch categories first so we can label animals later
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://localhost:5000/categories");
        const data = await res.json();
        setCategories(data);
        console.log("✅ Categories fetched:", data);
      } catch (err) {
        console.error("❌ Failed to load categories", err);
      }
    };
    fetchCategories();
  }, []);

  // Fetch animals
  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const res = await fetch("http://localhost:5000/animals");
        const data = await res.json();

        // Add categoryName to each animal using category_id
        const animalsWithCategory = data.map((animal) => {
          const categoryObj = categories.find((cat) => cat.id === animal.category_id);
          return {
            ...animal,
            categoryName: categoryObj ? categoryObj.name : "Unknown",
          };
        });

        setAllAnimals(animalsWithCategory);
        setFilteredAnimals(animalsWithCategory);
        console.log("✅ Animals fetched and labeled:", animalsWithCategory);
      } catch (err) {
        console.error("❌ Failed to fetch animals", err);
      }
    };

    // Only fetch animals once categories are loaded
    if (categories.length > 0) {
      fetchAnimals();
    }
  }, [categories]);

  // Apply filtering
  useEffect(() => {
    if (category === "all") {
      setFilteredAnimals(allAnimals);
      console.log("🔍 Showing all animals");
    } else {
      const filtered = allAnimals.filter(
        (animal) => animal.categoryName?.toLowerCase() === category.toLowerCase()
      );
      setFilteredAnimals(filtered);
      console.log(`🔍 Filtered animals by category "${category}":`, filtered);
    }
  }, [category, allAnimals]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Browse Animals</h1>

      {/* Category Dropdown */}
      <div className="mb-4">
        <label className="mr-2 font-semibold">Filter by Category:</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-gray-300 rounded p-2"
        >
          <option value="all">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
      

      {/* Animal Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredAnimals.length > 0 ? (
          filteredAnimals.map((animal) => (
            <AnimalCard key={animal.id} animal={animal} />
          ))
        ) : (
          <p>No animals found.</p>
        )}
      </div>
    </div>
  );
};

export default BuyerDashboard;
