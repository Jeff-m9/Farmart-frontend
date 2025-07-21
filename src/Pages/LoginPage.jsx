import { useState } from "react";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Logging in with email: ${email}`);
  };




  return (
    <div className="min-h-screen  flex items-center justify-center px-4">
      <div className="bg-app-gradient   p-8 h-96 rounded-3xl shadow-black shadow-2xl w-full max-w-md">
        <h1 className="text-2xl font-bold text-black-800 mb-2 text-center">
          Welcome to Farmart
        </h1>
        <h2 className="flex justify-center text-2xl font-bold text-black-500">LOG IN</h2>
        <p className="text-center mt-2 mb-2">Dont have an account? <a className=" text-white underline" href="/signup">Sign Up</a></p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500  shadow-xl text-white py-2 rounded-3xl hover:bg-green-800 transition"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
