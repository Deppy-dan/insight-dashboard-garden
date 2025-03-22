
import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
  requireAdmin?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireAdmin = false
}) => {
  const { user, loading, isAdmin } = useAuth();

  if (loading) {
    // Poderia mostrar um spinner aqui
    return <div className="min-h-screen flex items-center justify-center">Carregando...</div>;
  }

  if (!user) {
    // Redireciona para a página de login se não estiver autenticado
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && !isAdmin) {
    // Redireciona para a página principal se não for admin
    return <Navigate to="/music-management" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
