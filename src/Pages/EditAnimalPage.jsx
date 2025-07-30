import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function EditAnimalPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnimal = async () => {
      try {
        const res = await fetch(`http://localhost:5000/animals/${id}`);
        const data = await res.json();
        if (res.ok) {
          setForm(data);
        } else {
          alert("Failed to fetch animal data.");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        alert("Something went wrong while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchAnimal();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const parsedValue =
      ["age", "price", "category_id"].includes(name) && value !== ""
        ? Number(value)
        : value;

    setForm({ ...form, [name]: parsedValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
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
        toast.success("Animal updated successfully!");
        navigate("/farmer-dashboard");
      } else {
        toast.error("Failed to update animal");
      }
    } catch (err) {
      console.error("Update error:", err);
      toast.error("Something went wrong. Please try again.");
    }
  };

  if (loading) return <p className="text-center mt-8">Loading...</p>;
  if (!form) return <p className="text-center mt-8">Animal not found.</p>;

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto p-6 bg-[#eaf5d5] rounded shadow mt-8"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Edit Animal</h2>

      {[
        "name",
        "breed",
        "age",
        "description",
        "image",
        "price",
        "category_id",
      ].map((field) => (
        <div key={field} className="mb-4">
          <label
            htmlFor={field}
            className="block font-medium mb-1 capitalize text-gray-700"
          >
            {field.replace("_", " ")}
          </label>
          <input
            id={field}
            name={field}
            type={
              ["age", "price", "category_id"].includes(field)
                ? "number"
                : "text"
            }
            placeholder={field.replace("_", " ").toUpperCase()}
            value={form[field]}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      ))}

      <div className="flex justify-between">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Update Animal
        </button>
        <button
          type="button"
          onClick={() => navigate("/farmer-dashboard")}
          className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default EditAnimalPage;
