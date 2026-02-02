import { useState, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { AuthStatus } from "../constants/authStatus";
import { AuthReason } from "../constants/authReasons";
import { useAuthRedirect } from "../hooks/useAuthRedirect";

export default function Login() {
    const { login, status, error, reason, toastMessage, resetAuthFlow, clearReason } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const hasError = status === AuthStatus.ERROR;
    const passwordRef = useRef<HTMLInputElement>(null);

    useAuthRedirect();

    function handleSubmit(e: React.SyntheticEvent) {
        e.preventDefault();
        clearReason();
        login(email, password);
    }

    return (
        <div className="h-full flex items-center justify-center bg-zinc-900">
            <div className="w-full max-w-sm">
                {reason && status === AuthStatus.IDLE && !error && (
                    <div className="mb-4 text-center bg-indigo-500/10 border border border-indigo-500/30 text-indigo-300 text-sm p-3 rounded animated-context-in">
                        {reason === AuthReason.NOT_AUTHENTICATED && "Faça login para continuar."}
                        {reason === AuthReason.SESSION_EXPIRED && "Sua sessão expirou. Faça login novamente."}
                        {reason === AuthReason.LOGOUT && "Você saiu da sua conta."}
                    </div>
                )}

                {toastMessage && (
                    <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow">
                        {toastMessage}
                    </div>
                )}

                <form
                    onSubmit={handleSubmit}
                    className={`
                    bg-zinc-800 p-6 rounded-xl w-full max-w-sm space-y-4 transition
                    ${hasError ? "animate-shake" : ""}
                `}
                >
                    <h1 className="text-white text-xl font-semibold text-center">
                        Login
                    </h1>

                    <input
                        className="w-full p-2 rounded bg-zinc-700 text-white"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);

                            if (status === AuthStatus.ERROR) {
                                resetAuthFlow();
                            }
                        }}
                    />

                    <input
                        ref={passwordRef}
                        type="password"
                        className="w-full p-2 rounded bg-zinc-700 text-white"
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        
                            if (status === AuthStatus.ERROR) {
                                resetAuthFlow();
                            }
                        }}
                    />

                    {error && (
                        <p className="text-center bg-red-500/10 border border-red-500/30 text-red-400 text-sm p-2 rounded">
                            {error}
                        </p>
                    )}

                    <button
                        disabled={status === AuthStatus.LOADING}
                        className="w-full bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 text-white py-2 rounded"
                    >
                        {status === AuthStatus.LOADING ? "Entrando..." : "Entrar"}
                    </button>
                </form>
            </div>
        </div>
    );
}