import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { BASE_URL } from "../utils";

export const AdminsPage = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const decoded = token ? jwtDecode(token) : null;
  const loggedInUserId = decoded?.user_id;

  // Fetching All Users
  const fetchUsers = async () => {
    try {
      const res = await fetch(`${BASE_URL}/users`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        toast.error(errorData.message || "Failed to fetch users");
        // Exit early
        return;
      }

      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error.message);
      toast.error("Something went wrong while fetching users");
    } finally {
      setLoading(false);
    }
  };
  // Delete user (except self)
  const handleDeleteUser = async (id) => {
    if (id === loggedInUserId) {
      toast.warning("You cannot delete your own account");
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/users/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        toast.error("Can not delete user");
        return;
      }

      toast.success("User deleted");
      fetchUsers(); // Refresh list
    } catch (error) {
      console.error("Error deleting user:", error.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  // Categories
  const fetchCategories = async () => {
    try {
      const res = await fetch(`${BASE_URL}/categories`);
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        toast.error(errorData.message || "Error adding category");
        return;
      }

      const result = await res.json();
      toast.success("Category added successfully");
      setCategories((prev) => [...prev, result.category]);
      setName("");
    } catch (err) {
      toast.error("Error adding category");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div>
      <div>
        <header className="bg-green-700/90 text-white flex justify-between items-center px-12 py-4 shadow-md sticky top-0 z-50 backdrop-blur-sm">
          <div className="text-5xl font-extrabold tracking-wider py-2">
            FarMart Admin DashBoard
          </div>
          <div className="flex items-center gap-4 mr-10">
            <Link
              to="/"
              className="hover:underline hover:text-green-300 transition"
            >
              Home
            </Link>
            <Link
              to="/browse"
              className="hover:underline hover:text-green-300 transition"
            >
              Browse Animals
            </Link>
            <Link to="/animals/add">
              <p className="text-black font-bold">Add Animal</p>
            </Link>
            <Link to="/cart" aria-label="View shopping cart">
              Cart
            </Link>
            <Link to="/profile">Profile</Link>
          </div>
        </header>
      </div>
      <div className="grid grid-cols-2">
        <div className="p-6 rounded-b-xl shadow-md bg-amber-200">
          <h2 className="text-2xl font-bold mb-4"> All Users</h2>

          {loading ? (
            <p>Loading users...</p>
          ) : users.length === 0 ? (
            <p>No users found.</p>
          ) : (
            <table className="w-full border border-gray-300 rounded-md overflow-hidden">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="p-3">Number</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Role</th>
                  <th className="p-3">Delete</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user.id} className="border-t hover:bg-gray-50">
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3">
                      {user.first_name} {user.last_name}
                    </td>
                    <td className="p-3">{user.email}</td>
                    <td className="p-3 capitalize">{user.role}</td>
                    <td className="border px-4 py-2">
                      {user.id !== loggedInUserId && (
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded"
                        >
                          Delete
                        </button>
                      )}
                      {user.id === loggedInUserId && (
                        <span className="text-sm text-gray-500">You</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div>
          {/* Add Categories */}
          <div className="p-6    h-full bg-green-200 rounded-b-xl shadow-md">
            <h2 className="text-2xl font-bold mb-4">Add Animal Category</h2>

            <form onSubmit={handleAddCategory} className="mb-6 flex gap-3">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Livestock, Poultry"
                className="border border-gray-300 rounded px-4 py-2 flex-1"
                required
              />
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Add
              </button>
            </form>

            <h3 className="text-xl font-semibold mb-2">Available Categories</h3>
            {loading ? (
              <p>Loading...</p>
            ) : categories.length === 0 ? (
              <p>No categories found.</p>
            ) : (
              <ul className="list-disc pl-5 space-y-1">
                {categories.map((cat) => (
                  <li key={cat.id}>{cat.name}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
      <div>{/* All other operations */}</div>
      <div>
        {" "}
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
    </div>
  );
};
