import { Routes, Route } from "react-router-dom";

import LandingPage from "./Pages/LandingPage";
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";
import BuyerDashboard from "./Pages/BuyerDashboard";
import CartPage from "./Pages/CartPage";
import PaymentPage from "./Pages/PaymentPage";
import AnimalDetails from "./Pages/AnimalDetails";
import AboutUs from "./Pages/AboutUs";
import BrowseAnimals from "./Pages/BrowseAnimals";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/dashboard" element={<BuyerDashboard />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/browse" element={<BrowseAnimals />} />
      <Route path="/animal/:id" element={<AnimalDetails />} />
    </Routes>
  );
}

export default App;


