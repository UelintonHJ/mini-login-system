import { createContext, useContext, useState, useEffect, useRef } from "react";
import { AuthStatus } from "../constants/authStatus";
import type { AuthStatus as AuthStatusType } from "../constants/authStatus";
import { AUTH_STORAGE_KEY } from "../constants/authStorage";
import { AuthReason } from "../constants/authReasons";

interface AuthContextData {
    status: AuthStatus;
    error: string | null;
    reason: AuthReason | null;
    toastMessage: string | null;
    login: (email: string, password: string) => void;
    logout: () => void;
    resetAuthFlow: () => void;
    clearReason: () => void;
    setAuthReason: (reason: AuthReason) => void;
}

const AuthContext = createContext<AuthContextData | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [status, setStatus] = useState<AuthStatusType>(AuthStatus.INITIALIZING);
    const [error, setError] = useState<string | null>(null);
    const [reason, setReason] = useState<AuthReason | null>(null);
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    const SESSION_DURATION = 5 * 60 * 1000;
    const sessionTimeout = useRef<number | null>(null);

    useEffect(() => {
        const checkSession = async () => {
            await new Promise((res) => setTimeout(res, 800));

            const stored = localStorage.getItem(AUTH_STORAGE_KEY);

            if (stored === AuthStatus.AUTHENTICATED) {
                setStatus(AuthStatus.AUTHENTICATED);
                setReason(null);
                setToastMessage("Sessão restaurada!");
            } else {
                setStatus(AuthStatus.IDLE);
            }
        };

        checkSession();
    }, []);

    useEffect(() => {
        if (toastMessage) {
            const timer = setTimeout(() => setToastMessage(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [toastMessage]);

    useEffect(() => {
        if (status === AuthStatus.AUTHENTICATED) {
            if (sessionTimeout.current) clearTimeout(sessionTimeout.current);

            sessionTimeout.current = window.setTimeout(() => {
                setStatus(AuthStatus.IDLE);
                setReason(AuthReason.SESSION_EXPIRED);
                localStorage.removeItem(AUTH_STORAGE_KEY);
            }, SESSION_DURATION)
        }

        return () => {
            if (sessionTimeout.current) clearTimeout(sessionTimeout.current);
        };
    }, [status]);

    function login(email: string, password: string) {
        setStatus(AuthStatus.LOADING);
        setError(null);

        setTimeout(() => {
            const isValid =
                email === "user@test.com" && password === "123456";

            if (isValid) {
                setStatus(AuthStatus.AUTHENTICATED);
                setReason(null);
                localStorage.setItem(AUTH_STORAGE_KEY, AuthStatus.AUTHENTICATED);
            } else {
                setStatus(AuthStatus.ERROR);
                setError("E-mail ou senha inválidos. Tente novamente.");
            }
        }, 1500);
    }

    function logout() {
        if (sessionTimeout.current) clearTimeout(sessionTimeout.current);

        setStatus(AuthStatus.IDLE);
        setAuthReason(AuthReason.LOGOUT);
        localStorage.removeItem(AUTH_STORAGE_KEY);
    }

    function resetAuthFlow() {
        setError(null);
        setStatus(AuthStatus.IDLE);
    }

    function clearReason() {
        setReason(null);
    }

    function setAuthReason(reason: AuthReason) {
        setReason(reason);
    }

    return (
        <AuthContext.Provider value={{ status, error, reason, toastMessage, login, logout, resetAuthFlow, clearReason, setAuthReason, }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth deve ser usado dentro de AuthProvider");
    }

    return context;
}