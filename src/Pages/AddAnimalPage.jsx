import React, { useState } from "react";
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
    category_id: "",
  });

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
        navigate("/dashboard"); // or wherever
      } else {
        alert(data.message || "Failed to post animal");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Server error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto p-6 bg-white rounded shadow mt-8"
    >
      <h2 className="text-2xl font-bold mb-4">Post New Animal</h2>
      {[
        "name",
        "breed",
        "age",
        "description",
        "image",
        "price",
        "category_id",
      ].map((field) => (
        <input
          key={field}
          name={field}
          placeholder={field.replace("_", " ").toUpperCase()}
          value={form[field]}
          onChange={handleChange}
          required
          className="block w-full mb-4 p-2 border border-gray-300 rounded"
        />
      ))}
      <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
        Post Animal
      </button>
    </form>
  );
}

export default AddAnimalPage;
