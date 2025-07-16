import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="min-h-screen bg-[#f1f8e9] font-sans">
      {/* Header */}
      <header className="bg-green-700 text-white flex justify-between items-center px-8 py-4">
        <div className="text-3xl font-extrabold">Farmart</div>
        <nav className="space-x-6 text-lg">
          <Link to="/about" className="hover:underline">
            About
          </Link>
          <Link to="/login" className="hover:underline">
            LogIn
          </Link>
          <Link to="/signup" className="hover:underline">
            SignUp
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center text-center px-4 py-12 bg-[#f9fbe7]">
        <h2 className="text-2xl md:text-4xl font-bold mb-2">
          Connecting Farmers and Buyers with Quality Livestock
        </h2>
        <p className="text-gray-700 mb-4 max-w-xl">
          Discover the best animals directly from trusted farmers near you
        </p>
        <div className="space-x-4">
          <Link
            to="/learn-more"
            className="text-green-700 font-semibold hover:underline"
          >
            Learn More
          </Link>
          <Link
            to="/browse"
            className="text-green-700 font-semibold hover:underline"
          >
            Browse Animals
          </Link>
          <Link
            to="/cart"
            className="text-green-700 font-semibold hover:underline"
          >
            My Cart
          </Link>
        </div>
      </section>

      {/* How It Works */}
      <section className="grid md:grid-cols-3 gap-6 px-6 py-10 bg-white text-center">
        <div>
          <div className="text-3xl mb-2">🔍</div>
          <h3 className="font-bold mb-1">Browse animals</h3>
          <p className="text-gray-600">listed by farmers</p>
        </div>
        <div>
          <div className="text-3xl mb-2">🛒</div>
          <h3 className="font-bold mb-1">Add to cart</h3>
          <p className="text-gray-600">and place orders</p>
        </div>
        <div>
          <div className="text-3xl mb-2">✅</div>
          <h3 className="font-bold mb-1">Secure payment</h3>
          <p className="text-gray-600">& delivery</p>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="grid md:grid-cols-4 gap-6 px-6 py-10 bg-[#f1f8e9] text-center">
        <div>
          <div className="text-3xl mb-2">🤝</div>
          <h4 className="font-bold">Trusted Farmers</h4>
        </div>
        <div>
          <div className="text-3xl mb-2">🔒</div>
          <h4 className="font-bold">Secure Payments</h4>
        </div>
        <div>
          <div className="text-3xl mb-2">⭐</div>
          <h4 className="font-bold">Quality Assurance</h4>
        </div>
        <div>
          <div className="text-3xl mb-2">💳</div>
          <h4 className="font-bold">Easy Checkout</h4>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-green-800 text-white px-6 py-10">
        <div className="grid md:grid-cols-2 gap-8 text-center">
          <div>
            <div className="text-5xl">👨🏾</div>
            <p className="italic mt-2">
              “Great platform for finding healthy livestock! Highly
              recommended.”
            </p>
            <p className="mt-2 font-bold">
              Mark S. <span className="font-normal">— Buyer</span>
            </p>
          </div>
          <div>
            <div className="text-5xl">👩🏻</div>
            <p className="italic mt-2">
              “The process was smooth and hassle-free. Excellent service.”
            </p>
            <p className="mt-2 font-bold">
              Sarah T. <span className="font-normal">— Farmer</span>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
