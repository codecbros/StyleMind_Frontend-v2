import Cookies from 'js-cookie';

interface CookieOptions {
  expires?: number;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
}

const DEFAULT_OPTIONS: CookieOptions = {
  expires: 7,
  secure: import.meta.env.PROD,
  sameSite: 'strict',
};

const COOKIE_NAME = 'auth-token';

export const setAuthToken = (token: string, options?: CookieOptions) => {
  const cookieOptions = { ...DEFAULT_OPTIONS, ...options };
  Cookies.set(COOKIE_NAME, token, cookieOptions);
};

export const getAuthToken = (): string | undefined => {
  return Cookies.get(COOKIE_NAME);
};

export const removeAuthToken = () => {
  Cookies.remove(COOKIE_NAME);
};
