import { AXIOS_INSTANCE } from '@/config/axios-instance';
import {
  useMutation,
  type UseMutationOptions,
  type UseMutationResult,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  data: {
    token: string;
  };
  message: string;
}

async function loginRequest(
  credentials: LoginCredentials
): Promise<LoginResponse> {
  try {
    const response = await AXIOS_INSTANCE.post<LoginResponse>(
      '/api/auth/login',
      {},
      {
        headers: {
          email: credentials.email,
          password: credentials.password,
        },
      }
    );

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.message || 'Error al iniciar sesión'
      );
    }
    throw error;
  }
}

export const useLoginCustom = <TError = Error, TContext = unknown>(
  options?: UseMutationOptions<
    LoginResponse,
    TError,
    LoginCredentials,
    TContext
  >
): UseMutationResult<LoginResponse, TError, LoginCredentials, TContext> => {
  return useMutation({
    mutationKey: ['login'],
    mutationFn: loginRequest,
    ...options,
  });
};

export type { LoginCredentials, LoginResponse };
