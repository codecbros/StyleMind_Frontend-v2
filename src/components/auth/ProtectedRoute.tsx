import { LoaderCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { COOKIE_KEYS } from '../../constants/cookies';
import { PATHS } from '../../constants/paths';
import { getCookie } from '../../lib/auth-cookies';

const ProtectedRoute = () => {
  const [isInitializing, setIsInitializing] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    //TODO:Token verification (you can add real validation here)
    const token = getCookie(COOKIE_KEYS.AUTH_TOKEN);
    setIsAuthenticated(!!token);
    setIsInitializing(false);
  }, []);

  if (isInitializing) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoaderCircle className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={PATHS.Login} state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
