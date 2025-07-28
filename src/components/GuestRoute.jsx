import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../context/useAuth";

function GuestRoute() {
  const { user } = useAuth();
  return !user ? <Outlet /> : <Navigate to="/dashboard" />;
}

export default GuestRoute;
