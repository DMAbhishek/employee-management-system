// frontend/src/components/common/RoleRoute.jsx
// ─────────────────────────────────────────────────────────────
// Role-based route guard.
// If the user's role is not in allowedRoles[], redirects to /dashboard.
// ─────────────────────────────────────────────────────────────
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function RoleRoute({ allowedRoles }) {
  const { currentUser } = useAuth();
  const hasAccess = allowedRoles.includes(currentUser?.role);
  return hasAccess ? <Outlet /> : <Navigate to="/dashboard" replace />;
}

export default RoleRoute;

