import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { AuthStatus } from "../constants/authStatus";

export function useAuthRedirect() {
    const { status, setAuthReason } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (status === AuthStatus.AUTHENTICATED) {
            navigate("/dashboard", { replace: true });
        }
    }, [status, navigate]);

    useEffect(() => {
        const routeReason = location.state?.reason;

        if (routeReason) {
            setAuthReason(routeReason);

            navigate(location.pathname, { replace: true, state: null });
        }
    }, [location.state, location.pathname, navigate, setAuthReason]);
}