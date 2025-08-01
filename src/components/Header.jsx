import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <header className="bg-green-700/90 text-white w-full  px-4 shadow-md sticky top-0 z-50 backdrop-blur-sm">

<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center"> 
      <div className=" text-4xl font-extrabold tracking-wider py-2 mb-2 sm:mb-0 ">FarMart</div>
      <div className="flex flex-wrap items-center gap-4 ">
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

        {user?.role === "user" && (
          <Link
            to="/browse"
            className="hover:underline hover:text-green-300 transition"
          >
            Browse Animals
          </Link>
        )}

        <Link to="/cart" aria-label="View shopping cart">
          Cart
        </Link>
        <Link to="/profile">Profile</Link>
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
      </div>
    </header>
  );
}

export default Header;
