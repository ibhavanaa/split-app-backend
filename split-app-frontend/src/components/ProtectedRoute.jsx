import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, token } = useContext(AuthContext);

  // 🔒 Double-check: block access if either token OR user is missing
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
