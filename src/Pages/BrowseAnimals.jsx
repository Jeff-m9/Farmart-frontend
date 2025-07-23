import { useState, useEffect } from "react";
import { Link } from "react-router-dom";


function CategoryList({ onSelectCategory, selectedCategory }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((err) => console.error("Failed to load categories", err));
  }, []);

  return (
    <div className=" flex space-x-6 mb-8 justify-center">
      {categories.map(({ name, icon }) => (
        <button
          key={name}
          onClick={() => onSelectCategory(name)}
          className={`flex flex-col items-center space-y-1 p-3 rounded shadow transition Ksh{
            selectedCategory === name
              ? "bg-green-400 text-white"
              : "bg-green-100 text-green-700 hover:bg-green-200"
          }`}
          aria-pressed={selectedCategory === name}
        >
          <div className="text-5xl">{icon}</div>
          <div className="font-semibold">{name}</div>
        </button>
      ))}
      <button
        onClick={() => onSelectCategory(null)}
        className="px-4 py-2 rounded shadow bg-gray-300 hover:bg-gray-400 text-gray-800"
      >
        Clear Filter
      </button>
    </div>
  );
}

function BrowseAnimals() {
  const [filter, setFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState(null);
  const [cart, setCart] = useState([]);
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/animals")
      .then((res) => res.json())
      .then((data) => {
        setAnimals(data);
      })
      .catch((err) => console.error("Failed to load animals", err));
  }, []);

  const filteredAnimals = animals.filter((animal) => {
    const searchStr = filter.toLowerCase();
    const matchesSearch =
      animal.name.toLowerCase().includes(searchStr) ||
      animal.breed.toLowerCase().includes(searchStr) ||
      animal.description.toLowerCase().includes(searchStr);

    const matchesCategory =
      !categoryFilter || categoryFilter === "All Animals"
        ? true
        : animal.name.toLowerCase() === categoryFilter.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  function addToCart(animal) {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === animal.id);
      if (existing) {
        // Increase quantity
        return prevCart.map((item) =>
          item.id === animal.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...animal, quantity: 1 }];
    });
  }

  function removeFromCart(animal) {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === animal.id);
      if (!existing) return prevCart;

      if (existing.quantity === 1) {
        // Remove item completely
        return prevCart.filter((item) => item.id !== animal.id);
      } else {
        // Decrease quantity
        return prevCart.map((item) =>
          item.id === animal.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
    });
  }

  return (
    <div className="max-w-5xl mx-auto mt-12 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Browse Animals</h1>
      <Link to="/animals/add">
        <button className="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800 font-bold">
          <h1>Post Animal</h1>
        </button>
      </Link>

      <CategoryList
        onSelectCategory={setCategoryFilter}
        selectedCategory={categoryFilter}
      />

      <input
        type="text"
        placeholder="Filter by name, breed, or description"
        className="mb-6 p-3 border border-gray-300 rounded w-full"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        aria-label="Filter animals"
      />

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul className="space-y-3">
            {cart.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center bg-green-50 p-3 rounded shadow"
              >
                <span>
                  {item.name} x {item.quantity}
                </span>
                <span className="font-semibold">
                  Ksh{item.price * item.quantity}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredAnimals.length === 0 ? (
          <p>No animals found.</p>
        ) : (
          filteredAnimals.map((animal) => (
            <li
              key={animal.id}
              className="bg-white rounded shadow p-6 flex space-x-6"
              aria-label={`Animal: Ksh{animal.name}`}
            >
              <img
                src={animal.image}
                alt={animal.name}
                className="w-48 h-32 object-cover rounded"
              />
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <Link
                    to={`/animals/Ksh{animal.id}`}
                    className="text-xl font-semibold text-green-700 hover:underline"
                  >
                    {animal.name}
                  </Link>
                  <p>
                    <strong>Breed:</strong> {animal.breed}
                  </p>
                  <p>
                    <strong>Age:</strong> {animal.age}
                  </p>
                  <p className="mb-3">{animal.description}</p>
                  <p className="font-bold text-lg text-green-800">
                    Ksh{animal.price}
                  </p>
                </div>

                <div className="flex space-x-4 mt-4">
                  <button
                    onClick={() => addToCart(animal)}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                    aria-label={`Add Ksh{animal.name} to cart`}
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => removeFromCart(animal)}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                    aria-label={`Remove Ksh{animal.name} from cart`}
                  >
                    Remove from Cart
                  </button>
                </div>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default BrowseAnimals;
