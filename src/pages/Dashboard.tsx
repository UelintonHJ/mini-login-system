import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
    const { logout } = useAuth();

    function handleLogout() {
        logout();
    }

    return (
        <div className="h-full flex items-center justify-center bg-zinc-900 text-white">
            <div className="space-y-4 text-center">
                <h1 className="text-2xl font-bold">
                    Área protegida
                </h1>

                <button
                    onClick={handleLogout}
                    className="bg-red-500 px-4 py-2 rounded"
                >
                    Sair
                </button>
            </div>
        </div>
    )
}