import { getAuthToken, removeAuthToken } from '@/lib/auth-cookies';
import Axios, { AxiosError, type AxiosRequestConfig } from 'axios';

type CancelablePromise<T> = Promise<T> & {
  cancel: () => void;
};

export const AXIOS_INSTANCE = Axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

AXIOS_INSTANCE.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

AXIOS_INSTANCE.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      removeAuthToken();
      console.error('Usuario no autenticado');
    }
    return Promise.reject(error);
  }
);

// Instancia normal para todos los endpoints
export const customInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig
): CancelablePromise<T> => {
  const abortController = new AbortController();

  const promise = AXIOS_INSTANCE({
    ...config,
    ...options,
    signal: abortController.signal,
  }).then(({ data }) => data) as CancelablePromise<T>;

  promise.cancel = () => {
    abortController.abort();
  };

  return promise;
};

// Instancia específica para login que acepta data con email/password y los convierte a headers
export const customInstanceWithBodyAsHeaders = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig & { data?: { email: string; password: string } }
): CancelablePromise<T> => {
  const abortController = new AbortController();

  // Tomar email y password de options.data si existen
  const credentials = options?.data;

  const promise = AXIOS_INSTANCE({
    ...config,
    ...options,
    headers: {
      ...config.headers,
      ...options?.headers,
      ...(credentials && {
        email: credentials.email,
        password: credentials.password,
      }),
    },
    data: undefined, // No enviar data en el body
    signal: abortController.signal,
  }).then(({ data }) => data) as CancelablePromise<T>;

  promise.cancel = () => {
    abortController.abort();
  };

  return promise;
};

export default customInstance;
