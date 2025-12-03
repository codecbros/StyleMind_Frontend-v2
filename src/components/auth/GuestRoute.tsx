import { Navigate, Outlet } from 'react-router-dom';
import { COOKIE_KEYS } from '../../constants/cookies';
import { PATHS } from '../../constants/paths';
import { getCookie } from '../../lib/auth-cookies';

const GuestRoute = () => {
  const token = getCookie(COOKIE_KEYS.AUTH_TOKEN);

  // Si ya está autenticado, redirige al dashboard
  if (token) {
    return <Navigate to={PATHS.Profile} replace />;
  }

  return <Outlet />;
};

export default GuestRoute;
