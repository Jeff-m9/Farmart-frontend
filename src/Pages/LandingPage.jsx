import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div>
      <h1>Welcome to Animal Marketplace</h1>
      <p>Find your perfect pet or animal here!</p>
      <Link to="/dashboard">Go to Dashboard</Link>
      <br />
      <Link to="/login">Log In</Link>
      <br />
      <Link to="/signup">Sign Up</Link>
      <br />
      <Link to="/cart">Your Cart</Link>
    </div>
  );
}

export default LandingPage;
