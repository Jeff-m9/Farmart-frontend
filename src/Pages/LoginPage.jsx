import { useState } from "react";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Logging in with email: ${email}`);
  };

  return (
    <div className="min-h-screen bg-[#f1f8e9] flex items-center justify-center px-4">
      <div className="bg-[#f4f9eb] p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-green-800 mb-1">
          Welcome to Farmart
        </h1>
        <h2 className="text-xl font-semibold text-center text-gray-600 mb-4">
          Log In
        </h2>
        <p className="text-center text-sm text-gray-500 mb-6">
          Don’t have an account?{" "}
          <a
            className="text-green-700 hover:underline font-medium"
            href="/signup"
          >
            Sign Up
          </a>
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-2 rounded-3xl transition shadow"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
