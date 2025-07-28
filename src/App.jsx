import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";

import LandingPage from "./Pages/LandingPage";
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";
import BuyerDashboard from "./Pages/BuyerDashboard";
import CartPage from "./Pages/CartPage";
import PaymentPage from "./Pages/PaymentPage";
import AnimalDetails from "./Pages/AnimalDetails";
import AboutUs from "./Pages/AboutUs";
import BrowseAnimals from "./Pages/BrowseAnimals";
import AddAnimalPage from "./Pages/AddAnimalPage";
import EditAnimalPage from "./Pages/EditAnimalPage";
import Profile from "./Pages/Profile";
import ChooseRolePage from "./Pages/ChooseRolePage";
import EditProfile from "./Pages/EditProfilePage";

//auth context
import { useAuth } from "./context/AuthContext";

//Guest route nad logged in route
import ProtectedRoute from "./components/ProtectedRoute";
import GuestRoute from "./components/GuestRoute";

function App() {
  const { user } = useAuth();

  return (
    <>
      <Navbar />
      <Routes>
        //guest route
        {!user && <Route path="/" element={<LandingPage />} />}
        
        
        //logged in user route
        {user && <Route path="/" element={<BuyerDashboard />} />}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/choose-role" element={<ChooseRolePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/choose-role" element={<ChooseRolePage />} />


        //to be accessed after login
        <Route path="/dashboard" element={<BuyerDashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/animals/add" element={<AddAnimalPage />} />
        <Route path="/animals/edit/:id" element={<EditAnimalPage />} />
        <Route path="/browse" element={<BrowseAnimals />} />
        <Route path="/animals/:id" element={<AnimalDetails />} />
        {/* <Route path="/cart" element={<MyCart />} />  */}
      </Routes>
    </>
  );
}

export default App;
