import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import BuyerDashboard from "./pages/BuyerDashboard";
import CartPage from "./pages/CartPage";
import PaymentPage from "./pages/PaymentPage";
import AnimalDetails from "./pages/AnimalDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/dashboard" element={<BuyerDashboard />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/animal/:id" element={<AnimalDetails />} />
    </Routes>
  );
}

export default App;
