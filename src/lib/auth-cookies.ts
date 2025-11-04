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

export const setCookie = (
  name: string,
  value: string,
  options?: CookieOptions
) => {
  const cookieOptions = { ...DEFAULT_OPTIONS, ...options };
  Cookies.set(name, value, cookieOptions);
};

export const getCookie = (name: string): string | undefined => {
  return Cookies.get(name);
};

export const removeCookie = (name: string) => {
  Cookies.remove(name);
};
