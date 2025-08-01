import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";
import { toast } from "react-toastify";
import { BASE_URL } from "../utils";
import Navbar from "../components/navbar";


function BrowseAnimals() {
  const [animals, setAnimals] = useState([]);
  const [filter, setFilter] = useState("");
  const { cart, addToCart, removeFromCart } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchParam = params.get("name") || "";
    setFilter(searchParam);
  }, [location.search]);

  useEffect(() => {
    fetch(`${BASE_URL}/animals`)
      .then((res) => {
        if (!res.ok) toast.error("Backend fetch failed");
        return res.json();
      })
      .then((data) => {
        setAnimals(data);
      })
      .catch((err) => {
        setAnimals();
      });
  }, []);

  const token = localStorage.getItem("token");

  const filteredAnimals = animals.filter((animal) =>
    (animal.name + animal.breed + animal.description)
      .toLowerCase()
      .includes(filter.toLowerCase())
  );

  const getQuantity = (id) => {
    const item = cart.find((item) => item.id === id);
    return item ? item.quantity || 1 : 0;
  };

  return (
    <>
      {/* Header */}


      <div className="min-h-screen px-4 py-8 flex flex-col  items-centre gap-8 bg-[#f1f8e9] font-sans  ">
        <h1 className="text-3xl   font-bold mb-6 text-center">Browse Animals</h1>

        <input
          type="text"
          placeholder="Search by name, breed, or description"
          className="w-full sm:w-2/3 md:w-1/2 border border-gray-300 rounded px-4 py-2 "
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />

        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full ">
          {filteredAnimals.length === 0 ? (
            <p>No animals found.</p>
          ) : (
            filteredAnimals.map((animal) => (
              <li
                key={animal.id}
                className="bg-white rounded shadow p-4 flex flex-col sm:flex-row justify-between items-center gap-4"
                style={{
                  background:
                    "linear-gradient(to bottom, #D9E2D1 60%, #91FD80 93%, #91FD80 100%)",
                }}
              >
                <img
                  src={animal.image}
                  alt={animal.name}
                  className=" w-full sm:w-48 h-32 object object-cover rounded"
                />
                <div className="flex flex-col gap-4 justify-between flex-1 ">
                  <div className="flex flex-col gap-4">
                    <Link
                      to={`/animals/${animal.id}`}
                      className="text-xl font-semibold text-green-700 hover:underline"
                    >
                      {animal.name}
                    </Link>
                    <p>
                      <strong>Breed:</strong> {animal.breed}
                    </p>
                    <p className="font-bold text-green-800">
                      Ksh {animal.price}
                    </p>
                  </div>
                  <div className="flex  flex-wrap gap-2 mt-4 items-center justify-start">
                    <button
                      onClick={() => {
                        if (token) {
                          addToCart(animal);
                        } else {
                          toast.info("Please login to proceed")
                          navigate("/login");
                        }
                      }}
                      className=" bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm sm:text-base"
                    >
                      Add to Cart
                    </button>
                    {getQuantity(animal.id) > 0 && (
                      <>
                        <span className="text-gray-600 text-xs sm:text-sm">
                          In Cart: {getQuantity(animal.id)}
                        </span>
                        <button
                          onClick={() => removeFromCart(animal.id)}
                          className="text-red-600 text-xs sm:text-sm underline "
                        >
                          Remove All
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>

        {cart.length > 0 && (
          <Link
            to="/cart"
            className="fixed bottom-6 right-6 bg-green-600 text-white rounded-full px-6 py-3 shadow-lg hover:bg-green-700 z-50"
          >
            View Cart (
            {cart.reduce((sum, item) => sum + (item.quantity || 1), 0)})
          </Link>
        )}
      </div>
    </>
  );
}

export default BrowseAnimals;
