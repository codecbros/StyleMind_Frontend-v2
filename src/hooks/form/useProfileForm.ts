import { zodResolver } from '@hookform/resolvers/zod';
import { isEqual } from '@ver0/deep-equal';
import type { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { QUERY_KEYS } from '../../constants/querys';
import { removeCookie } from '../../lib/auth-cookies';
import { ErrorToast, SuccessToast } from '../../lib/toast';

type authProps = {
  isEditing: boolean;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
};

export function useProfileForm({ setIsEditing, isEditing }: authProps) {
  const navigate = useNavigate();
  const defaultValues = {};

  const form = useForm<any>({
    resolver: zodResolver({} as any),
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

    try {
      //TODO: hacer el refect para actualizar el perfil
      const response = '';
      setIsEditing(!isEditing);
      SuccessToast({
        title: 'Perfil actualizado',
        description: response,
      });
    } catch (error) {
      ErrorToast({
        title:
          error instanceof Error ? error.message : 'Error al iniciar sesión',
      });
    }
  }

  async function handleDeleteAccount() {
    try {
      // TODO: Implement account deletion logic here
      removeCookie(QUERY_KEYS.AUTH);
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

  return { form, onSubmit, handleDeleteAccount, profile: {} };
}
