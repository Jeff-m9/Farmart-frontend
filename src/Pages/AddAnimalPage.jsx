import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AddAnimalPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    breed: "",
    age: null,
    description: "",
    image: "",
    price: null,
    category_id: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = ["age", "price", "category_id"].includes(name)
      ? Number(value)
      : value;

    setForm({ ...form, [name]: newValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const payload = { ...form };

    try {
      const res = await fetch("http://localhost:5000/animals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Animal added successfully!");
        navigate("/farmer-dashboard");
      } else {
        toast.error("Animal addition failed");
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const fieldLabels = {
    name: "Animal Name",
    breed: "Breed",
    age: "Age in years",
    description: "Description",
    image: "Image URL",
    price: "Price (Ksh)",
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

        {Object.keys(fieldLabels).map((field) => (
          <div key={field} className="mb-4">
            <label
              htmlFor={field}
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              {fieldLabels[field]}
            </label>
            <input
              id={field}
              name={field}
              type={field === "age" || field === "price" ? "number" : "text"}
              placeholder={fieldLabels[field]}
              value={form[field]}
              onChange={handleChange}
              required
              className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>
        ))}

        <div className="mb-6">
          <label
            htmlFor="category_id"
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            Category
          </label>
          <select
            id="category_id"
            name="category_id"
            value={form.category_id}
            onChange={handleChange}
            required
            className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
          >
            <option value="">Select Category</option>
            <option value="1">Cow</option>
            <option value="2">Sheep</option>
            <option value="3">Goat</option>
            <option value="4">Horse</option>
          </select>
        </div>

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
