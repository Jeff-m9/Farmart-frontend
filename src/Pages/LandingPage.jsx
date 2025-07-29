import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function LandingPage() {
  const [visible, setVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { pathname } = useLocation();
  const [dashboardPath, setDashboardPath] = useState("/dashboard");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      setIsLoggedIn(true);

      try {
        const user = JSON.parse(userData);
        const role = user.role;

        if (role === "farmer") {
          setDashboardPath("/farmer-dashboard");
        } else {
          setDashboardPath("/dashboard");
        }
      } catch (err) {
        console.error("Failed to parse user data:", err);
      }
    }
  }, [pathname]);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#f1f8e9] font-sans flex flex-col">
      {/* Header */}
      <header className="bg-green-700/90 text-white flex justify-between items-center px-12 py-6 shadow-md sticky top-0 z-50 backdrop-blur-sm">
        <div className="text-3xl font-extrabold tracking-wider py-2">
          Farmart
        </div>
        <nav className="flex space-x-12 text-lg">
          {isLoggedIn ? (
            <Link to={dashboardPath}>
              <button>Dashboard</button>
            </Link>
          ) : (
            <>
              <Link
                to="/about"
                className="hover:underline hover:text-green-300 transition px-2 py-1"
              >
                About
              </Link>
              <Link
                to="/login"
                className="hover:underline hover:text-green-300 transition px-2 py-1"
              >
                LogIn
              </Link>
              <Link
                to="/choose-role"
                className="hover:underline hover:text-green-300 transition px-2 py-1"
              >
                SignUp
              </Link>
            </>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section
        className={`flex flex-col items-center text-center px-12 py-24 bg-gradient-to-b from-[#f9fbe7] to-[#e7f0d7] rounded-b-3xl shadow-inner transition-opacity duration-700 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        <h2
          className="text-4xl md:text-6xl font-bold mb-8 leading-relaxed max-w-4xl tracking-tight"
          style={{ lineHeight: 1.3 }}
        >
          Connecting Farmers and Buyers with Quality Livestock
        </h2>
        <p className="text-gray-700 mb-12 max-w-2xl text-xl leading-relaxed">
          Discover the best animals directly from trusted farmers near you
        </p>
        <div className="space-x-8">
          {[
            ["/learn-more", "Learn More"],
            ["/browse", "Browse Animals"],
            ["/cart", "My Cart"],
          ].map(([path, label]) => (
            <Link
              key={label}
              to={path}
              className="inline-block bg-green-700 text-white font-semibold px-8 py-4 rounded-lg shadow-lg hover:bg-green-800 transition"
            >
              {label}
            </Link>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section
        className={`grid md:grid-cols-3 gap-12 px-14 py-24 bg-white text-center shadow-md mx-auto rounded-lg max-w-7xl mt-[-5rem] relative z-20 transition-transform duration-700 ${
          visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        {[
          ["🔍", "Browse animals", "Listed by farmers"],
          ["🛒", "Add to cart", "And place orders"],
          ["✅", "Secure payment", "& delivery"],
        ].map(([icon, title, desc]) => (
          <div key={title} className="flex flex-col items-center px-6">
            <div className="text-7xl mb-6">{icon}</div>
            <h3 className="font-bold mb-4 text-2xl">{title}</h3>
            <p className="text-gray-600 text-lg">{desc}</p>
          </div>
        ))}
      </section>

      {/* Why Choose Us */}
      <section
        className={`grid md:grid-cols-4 gap-12 px-14 py-24 bg-[#f1f8e9] text-center mx-auto rounded-lg shadow-inner max-w-7xl mt-20 transition-opacity duration-700 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        {[
          ["🤝", "Trusted Farmers"],
          ["🔒", "Secure Payments"],
          ["⭐", "Quality Assurance"],
          ["💳", "Easy Checkout"],
        ].map(([icon, title]) => (
          <div key={title} className="flex flex-col items-center px-6">
            <div className="text-7xl mb-6">{icon}</div>
            <h4 className="font-bold text-2xl">{title}</h4>
          </div>
        ))}
      </section>

      {/* /* Testimonials */}
      <section
        className={`bg-green-700/95 text-white px-14 py-24 mt-20 rounded-xl shadow-lg mx-auto max-w-7xl transition-opacity duration-700 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="grid md:grid-cols-2 gap-12">
          {[
            [
              "👨🏾",
              "Great platform for finding healthy livestock! The variety is impressive, and the farmers are trustworthy. I found exactly what I needed quickly and the checkout process was seamless. Highly recommended for anyone looking to buy quality animals.",
              "Mark S.",
              "Buyer",
            ],
            [
              "👩🏻",
              "The process was smooth and hassle-free. I appreciated how easy it was to list my animals and connect with buyers. The support team is responsive and the payment system is secure. This platform has really helped me grow my farming business.",
              "Sarah T.",
              "Farmer",
            ],
          ].map(([emoji, quote, name, role]) => (
            <div
              key={name}
              className="flex items-start space-x-8 bg-green-800 rounded-lg p-8 shadow-inner"
            >
              <div className="text-9xl flex items-center">{emoji}</div>
              <div className="flex flex-col justify-center">
                <p className="italic mb-6 text-lg leading-relaxed max-w-xl">
                  {quote}
                </p>
                <p className="font-bold text-xl">
                  {name}{" "}
                  <span className="font-normal text-green-300">— {role}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-700 text-white text-center py-10 mt-24 border-t border-green-600">
        <p className="text-base px-6">
          &copy; {new Date().getFullYear()} Farmart. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default LandingPage;
