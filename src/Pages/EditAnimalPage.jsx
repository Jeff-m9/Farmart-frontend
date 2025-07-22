import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditAnimalPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);

  useEffect(() => {
    const fetchAnimal = async () => {
      const res = await fetch(`http://localhost:5000/animals/${id}`);
      const data = await res.json();
      if (res.ok) {
        setForm(data);
      } else {
        alert("Failed to fetch animal data.");
      }
    };

    fetchAnimal();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("access_token");

    const res = await fetch(`http://localhost:5000/animals/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (res.ok) {
      alert("Animal updated!");
      navigate("/dashboard"); // or wherever you go
    } else {
      alert(data.message || "Failed to update animal");
    }
  };

  if (!form) return <p>Loading...</p>;

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto p-6 bg-white rounded shadow mt-8"
    >
      <h2 className="text-2xl font-bold mb-4">Edit Animal</h2>
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
      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Update Animal
      </button>
    </form>
  );
}

export default EditAnimalPage;
