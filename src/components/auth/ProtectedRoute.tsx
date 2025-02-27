import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Loader } from 'lucide-react';

interface ProtectedRouteProps {
  redirectPath?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  redirectPath = '/login'
}) => {
  const { currentUser, isLoading, isConfigured } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="w-8 h-8 text-indigo-600 animate-spin" />
      </div>
    );
  }

  // If Firebase is not configured, allow access to protected routes in demo mode
  if (!isConfigured) {
    return <Outlet />;
  }

  if (!currentUser) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;