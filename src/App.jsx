import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";

// Pages
import LandingPage from "./Pages/LandingPage";
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";
import ChooseRolePage from "./Pages/ChooseRolePage";
import BuyerDashboard from "./Pages/BuyerDashboard";
import Profile from "./Pages/Profile";
import EditProfile from "./Pages/EditProfilePage";
import FarmerDashboard from "./Pages/FarmerDashboard";
import CartPage from "./Pages/CartPage";
import PaymentPage from "./Pages/PaymentPage";
import AboutUs from "./Pages/AboutUs";
import BrowseAnimals from "./Pages/BrowseAnimals";
import AddAnimalPage from "./Pages/AddAnimalPage";
import EditAnimalPage from "./Pages/EditAnimalPage";
import AnimalDetails from "./Pages/AnimalDetails";

// Route Guards
import ProtectedRoute from "./components/ProtectedRoute";
import GuestRoute from "./components/GuestRoute";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Guest-only routes */}
        <Route element={<GuestRoute />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/choose-role" element={<ChooseRolePage />} />
        </Route>

        {/* Protected-only routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<BuyerDashboard />} />
          <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
      <Route path="/profile" element={<Profile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/animals/add" element={<AddAnimalPage />} />
          <Route path="/animals/edit/:id" element={<EditAnimalPage />} />
        </Route>

        {/* Public */}
        <Route path="/about" element={<AboutUs />} />
        <Route path="/browse" element={<BrowseAnimals />} />
        <Route path="/animals/:id" element={<AnimalDetails />} />
      </Routes>
    </>
  );
}

export default App;
