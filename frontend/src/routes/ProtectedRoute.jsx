import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Wraps a route to require authentication and optionally specific roles.
 * Redirects unauthenticated users to /login, unauthorized roles to /dashboard.
 */
const ProtectedRoute = ({ children, roles }) => {
  const { isAuthenticated, user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-forest-500 border-t-transparent rounded-full animate-spin" />
          <p className="font-body text-stone-500 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;
