import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { AuthStatus } from "../constants/authStatus";
import { AuthReason } from "../constants/authReasons";

interface ProtectedRouteProps {
    children: ReactNode;
}

export default function ProtectedRoute({
    children
}: ProtectedRouteProps) {
    const { status, reason } = useAuth();

    if (status !== AuthStatus.AUTHENTICATED) {
        return (
            <Navigate 
                to="/login"
                replace
                state={{ reason: reason ?? AuthReason.NOT_AUTHENTICATED }}
            />
        );
    }

    return <>{children}</>;
}