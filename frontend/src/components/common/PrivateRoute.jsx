// frontend/src/components/common/PrivateRoute.jsx
// ─────────────────────────────────────────────────────────────
// Route guard – redirects to /login if the user is not logged in.
// Wraps child routes using React Router v6 <Outlet />.
// ─────────────────────────────────────────────────────────────
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function PrivateRoute() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

export default PrivateRoute;

