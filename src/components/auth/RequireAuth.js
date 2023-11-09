import { useLocation, Navigate, Outlet } from "react-router-dom";
import UseAuth from "./UseAuth";
import Dashboard from "../Dashboard/Dashboard";

const RequireAuth = () => {
    const { auth } = UseAuth();
    const location = useLocation();
    const token = localStorage.getItem("Token")
    return (
        token
            ? <><Outlet /> </>
            :
            <>
                <Navigate to="../" state={{ from: location }} replace />
                {/* <Dashboard /> */}
            </>
    );
}

export default RequireAuth;