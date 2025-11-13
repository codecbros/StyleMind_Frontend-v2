import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { isEqual } from '@ver0/deep-equal';
import type { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useUpdateUser } from '../../api/generated/users/users';
import { COOKIE_KEYS } from '../../constants/cookies';
import { QUERY_KEYS } from '../../constants/querys';
import { removeCookie } from '../../lib/auth-cookies';
import { ErrorToast, SuccessToast } from '../../lib/toast';
import { updateProfileSchema } from '../../schemas/userSchema';

type authProps = {
  isEditing: boolean;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
};

export function useProfileForm({ setIsEditing, isEditing }: authProps) {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useUpdateUser();
  const navigate = useNavigate();
  const defaultValues = {};

  const form = useForm<any>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues,
  });

  async function onSubmit(data: any) {
    if (isEqual(data, defaultValues)) {
      SuccessToast({
        title: '¡Cambios Guardados',
        description: 'usuario actualizado correctamente',
      });
      setIsEditing(false);
      return;
    }

    mutate(data, {
      onSuccess: (response) => {
        setIsEditing(!isEditing);
        SuccessToast({
          title: 'Perfil actualizado correctamente',
        });
        queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER_PROFILE] });
      },
      onError: (error) => {
        ErrorToast({
          title:
            error instanceof Error ? error.message : 'Error al iniciar sesión',
        });
      },
    });
  }

  async function handleDeleteAccount() {
    try {
      // TODO: Implement account deletion logic here
      removeCookie(COOKIE_KEYS.AUTH_TOKEN);
      SuccessToast({
        title: 'Tu cuenta ha sido eliminada.',
      });
      navigate('/');
    } catch (error) {
      ErrorToast({
        title:
          error instanceof Error
            ? error.message
            : 'No se pudo eliminar la cuenta.',
      });
    }
  }

  return {
    form,
    onSubmit,
    handleDeleteAccount,
    profile: {},
    isLoading: isPending,
  };
}
