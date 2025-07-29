import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate()
  return (
      <header className="bg-green-700/90 text-white flex justify-between items-center px-12 py-4 shadow-md sticky top-0 z-50 backdrop-blur-sm">
        <div className="text-5xl font-extrabold tracking-wider py-2">
          FarMart
        </div>
        <div className="flex items-center gap-4 mr-10">
          <Link
            to="/"
            className="hover:underline hover:text-green-300 transition"
          >
            Home
          </Link>

          <Link to="/cart" aria-label="View shopping cart">
            <img
              src="/src/images/shopping_cart_24dp_1F1F1F_FILL1_wght400_GRAD200_opsz24.svg"
              alt="Cart"
              title="Cart"
            />
          </Link>
          <Link to="/profile">
            <img
              src="/src/images/user_attributes_24dp_1F1F1F_FILL1_wght500_GRAD0_opsz48.svg"
              alt="Profile"
              title="Profile"
              className="h-8"
            />
          </Link>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/");
            }}
            title="Logout"
          >
            <img
              src="/src/images/logout_24dp_1F1F1F_FILL1_wght500_GRAD200_opsz40.svg"
              alt="Logout"
            />
          </button>
        </div>
      </header>
  );
}

export default Header;
