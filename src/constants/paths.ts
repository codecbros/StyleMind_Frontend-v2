const DASHBOARD_PREFIX = '/dashboard';

export const PATHS = {
  Home: '/',
  Login: '/login',
  Register: '/register',

  // Dashboard paths
  Profile: `${DASHBOARD_PREFIX}/perfil`,
  Wardrobe: `${DASHBOARD_PREFIX}/armario`,
  NewClothing: `${DASHBOARD_PREFIX}/armario/nueva-prenda`,
  Outfits: `${DASHBOARD_PREFIX}/outfits`,
} as const;

export const GITHUB_REPO_URL = 'https://github.com/codecbros';
