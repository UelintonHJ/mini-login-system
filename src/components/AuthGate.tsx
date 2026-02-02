import { useAuth } from "../context/AuthContext";
import { AuthStatus } from "../constants/authStatus";

export function AuthGate ({ children }: { children: React.ReactNode }) {
    const { status } = useAuth();

    if (status === AuthStatus.INITIALIZING) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-zinc-900 text-white">
                Inicializando aplicação...
            </div>
        );
    }

    return <>{children}</>;
}