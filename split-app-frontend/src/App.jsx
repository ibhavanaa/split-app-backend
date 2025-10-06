import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import Dashboard from "./pages/Dashboard";
import GroupDetail from "./pages/GroupDetail";
import AddGroup from "./pages/AddGroup";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthContext } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const { user, token } = useContext(AuthContext);

  return (
    <Routes>
      {/* ✅ Default route - redirect based on auth status */}
      <Route 
        path="/" 
        element={token ? <Navigate to="/dashboard" replace /> : <Navigate to="/register" replace />} 
      />

      {/* 🌐 Public routes - redirect to dashboard if already logged in */}
      <Route
        path="/register"
        element={!token ? <Register /> : <Navigate to="/dashboard" replace />}
      />
      <Route
        path="/login"
        element={!token ? <Login /> : <Navigate to="/dashboard" replace />}
      />

      {/* 🔐 Protected routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/add-group"
        element={
          <ProtectedRoute>
            <AddGroup />
          </ProtectedRoute>
        }
      />
      <Route
        path="/groups/:id"
        element={
          <ProtectedRoute>
            <GroupDetail />
          </ProtectedRoute>
        }
      />

      {/* 🛑 404 fallback */}
      <Route path="*" element={<h2 className="text-center mt-10">Page Not Found</h2>} />
    </Routes>
  );
}

export default App;