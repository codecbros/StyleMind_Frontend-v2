const DASHBOARD_PREFIX = '/dashboard';

export const PATHS = {
  Home: '/',
  Login: '/login',
  Register: '/register',

  // Dashboard paths
  Profile: `${DASHBOARD_PREFIX}/perfil`,
  NewClothing: `${DASHBOARD_PREFIX}/armario/nueva-prenda`,
} as const;
