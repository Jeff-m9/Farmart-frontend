import { Routes, Route } from "react-router-dom";

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
import Header from "./components/Header";
import { AdminsPage } from "./Pages/adminspage";
import { ContactUs } from "./Pages/contactUs";

// Layout wrapper
function AppLayout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/choose-role" element={<ChooseRolePage />} />
  

      {/* Routes with header */}
      <Route path="/adminspage" element={<AdminsPage />} />

      <Route
        path="/dashboard"
        element={
          <AppLayout>
            <BuyerDashboard />
          </AppLayout>
        }
      />

      <Route
        path="/farmer-dashboard"
        element={
          <AppLayout>
            <FarmerDashboard />
          </AppLayout>
        }
      />


<Route
path="/browse"
element={
  <AppLayout>
    <BrowseAnimals />
  </AppLayout>
}
      />

      <Route
        path="/profile"
        element={
          <AppLayout>
            <Profile />
          </AppLayout>
        }
      />
      <Route
        path="/edit-profile"
        element={
          <AppLayout>
            <EditProfile />
          </AppLayout>
        }
      />
      <Route
        path="/cart"
        element={
          <AppLayout>
            <CartPage />
          </AppLayout>
        }
      />
      <Route
        path="/payment"
        element={
          <AppLayout>
            <PaymentPage />
          </AppLayout>
        }
      />
      <Route
        path="/animals/add"
        element={
          <AppLayout>
            <AddAnimalPage />
          </AppLayout>
        }
      />
      <Route
        path="/animals/edit/:id"
        element={
          <AppLayout>
            <EditAnimalPage />
          </AppLayout>
        }
      />
      <Route
        path="/about"
        element={
          <AppLayout>
            <AboutUs />
          </AppLayout>
        }
      />
      <Route
        path="/animals/:id"
        element={
          <AppLayout>
            <AnimalDetails />
          </AppLayout>
        }
      />
      <Route path="/contact" element={<ContactUs />} />
    </Routes>
  );
}

export default App;
