import { LoaderCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { COOKIE_KEYS } from '../../constants/cookies';
import { PATHS } from '../../constants/paths';
import { getCookie } from '../../lib/auth-cookies';

const ProtectedRoute = () => {
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  const token = getCookie(COOKIE_KEYS.AUTH_TOKEN);

  useEffect(() => {
    // Simula verificación del token (puedes agregar validación real aquí)
    const checkAuth = async () => {
      if (token) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setIsChecking(false);
    };

    checkAuth();
  }, [token]);

  if (isChecking) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoaderCircle className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirige al login y guarda la ubicación actual para volver después
    return <Navigate to={PATHS.Login} state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
