import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

// A component that redirects to login if user is not authenticated
const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { user, loading, isAdmin } = useAuth();

  // If auth is still loading, show nothing
  if (loading) {
    return <div>Carregando...</div>;
  }

  // If user is not logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // If admin access is required but user is not admin, redirect
  if (requireAdmin && !isAdmin) {
    return <Navigate to="/music-management" />;
  }

  // Otherwise, show the children
  return children;
};

export default ProtectedRoute;
