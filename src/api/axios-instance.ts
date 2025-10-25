import Axios, { AxiosError, type AxiosRequestConfig } from 'axios';


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
        // Manejo de errores globales
        if (error.response?.status === 401) {
            // Token expirado o no válido
            localStorage.removeItem('token');
            // En lugar de redireccionar, solo marcamos como no autenticado 
            //cambiar esto para cuando esten las otras paginas
            console.error('Usuario no autenticado');
            // window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export const customInstance = <T>(
    config: AxiosRequestConfig,
    options?: AxiosRequestConfig
): Promise<T> => {
    const source = Axios.CancelToken.source();

    const promise = AXIOS_INSTANCE({
        ...config,
        ...options,
        cancelToken: source.token,
    }).then(({ data }) => data);

    // @ts-ignore
    promise.cancel = () => {
        source.cancel('Query was cancelled');
    };

    return promise;
};

export default customInstance;