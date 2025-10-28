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
        const token = localStorage.getItem('token');
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
            localStorage.removeItem('token');
            console.error('Usuario no autenticado');
            // window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

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

export default customInstance;