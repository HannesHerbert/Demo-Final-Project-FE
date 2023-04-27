import useAuthStore from "../store/useAuthStore.js";
import { Navigate, Outlet, useLocation } from "react-router-dom";


function AdminRoute() {

    const user = useAuthStore(state => state.user);
    const isAuthenticated = useAuthStore(state => state.isAuthenticated())
    const location = useLocation();

    console.log(user.role);
    console.log(user.role === "admin" ? "You are admin" : "You are not an admin");

    return (
        user.role === "admin" ? <Outlet /> : <Navigate to='/news' replace state={{from: location}} />
    )
}


export default AdminRoute;