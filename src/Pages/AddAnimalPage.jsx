import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AddAnimalPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    breed: "",
    age: "",
    description: "",
    image: "",
    price: "",
    category: "",
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://localhost:5000/categories");
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("access_token");

    try {
      const res = await fetch("http://localhost:5000/animals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Animal posted successfully!");
        navigate("/dashboard");
      } else {
        alert(data.message || "Failed to post animal");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Server error");
    }
  };

  return (
    <div className="min-h-screen bg-[#f1f8e9] flex items-center justify-center px-4 py-12">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-[#eaf5d5] p-8 rounded-2xl shadow-lg"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-green-800">
          Post New Animal
        </h2>

        {["name", "breed", "age", "description", "image", "price"].map((field) => (
          <input
            key={field}
            name={field}
            placeholder={field.toUpperCase()}
            value={form[field]}
            onChange={handleChange}
            required
            className="block w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
          />
        ))}

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          required
          className="block w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-2 rounded-3xl transition shadow"
        >
          Post Animal
        </button>
      </form>
    </div>
  );
}

export default AddAnimalPage;
