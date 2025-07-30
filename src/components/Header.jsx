import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <header className="bg-green-700/90 text-white flex justify-between items-center px-10 shadow-md sticky top-0 z-50 backdrop-blur-sm">
      <div className="text-5xl font-extrabold tracking-wider py-2">FarMart</div>
      <div className="flex items-center gap-4 mr-10">
        <Link to="/">Home</Link>
        {user?.role === "admin" && (
          <Link
            to="/adminspage"
            className="hover:underline hover:text-green-300 transition"
          >
            Dashboard
          </Link>
        )}

        {user?.role === "farmer" && (
          <Link
            to="/farmer-dashboard"
            className="hover:underline hover:text-green-300 transition"
          >
            Dashboard
          </Link>
        )}

        {user?.role === "user" && (
          <Link
            to="/dashboard"
            className="hover:underline hover:text-green-300 transition"
          >
            Dashboard
          </Link>
        )}

        <Link to="/cart" aria-label="View shopping cart">
          Cart
        </Link>
        <Link to="/profile">
          Profile
        </Link>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/");
          }}
          title="Logout"
        >
          Logout
        </button>
      </div>
    </header>
  );
}

export default Header;
