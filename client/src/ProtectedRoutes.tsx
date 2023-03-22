import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { userContext } from "./UserContext";


const ProtectedRoute = () => {
    const location = useLocation()
    return <Navigate to="/account" replace state={{ from: location}} />
}

export default ProtectedRoute