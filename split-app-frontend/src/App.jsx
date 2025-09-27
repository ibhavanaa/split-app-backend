import { Routes, Route, Navigate, Link } from "react-router-dom";
import "./App.css";

// Import pages
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Groups from "./pages/Group.jsx";
import GroupDetail from "./pages/GroupDetail.jsx";

// Import context + ProtectedRoute
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="App">
      {/* Top navigation */}
      <nav className="p-4 bg-gray-100 flex justify-between">
        <div className="flex gap-4">
          {!user ? (
            <>
              <Link to="/register" className="text-blue-600">
                Register
              </Link>
              <Link to="/login" className="text-blue-600">
                Login
              </Link>
            </>
          ) : (
            <>
              <Link to="/groups" className="text-blue-600">
                Groups
              </Link>
              <button
                onClick={logout}
                className="text-red-600 font-semibold ml-4"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </nav>

      {/* Routes */}
      <Routes>
        {/* Default route → Register */}
        <Route path="/" element={<Navigate to="/register" />} />

        {/* Public routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Protected routes */}
        <Route
          path="/groups"
          element={
            <ProtectedRoute>
              <Groups />
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

        {/* Fallback */}
        <Route path="*" element={<h2>Page Not Found</h2>} />
      </Routes>
    </div>
  );
}

export default App;
