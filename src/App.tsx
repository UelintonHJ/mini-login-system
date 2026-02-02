import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute"
import { AuthProvider } from "./context/AuthContext";
import { AuthGate } from "./components/AuthGate";

export default function App() {
  return (
    <AuthProvider>
      <AuthGate>
        <BrowserRouter>
          <Routes>
            <Route path='/login' element={<Login />} />

            <Route
              path='/dashboard'
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ ProtectedRoute>
              }
            />

            <Route path='*' element={<Navigate to="/login" />} />
          </Routes>
        </BrowserRouter>
      </AuthGate>

    </AuthProvider>

  );
}
