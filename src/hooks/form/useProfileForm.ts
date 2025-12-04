import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { isEqual } from '@ver0/deep-equal';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import type { UpdateUserDto } from '../../api/generated/schemas';
import { useUpdateUser } from '../../api/generated/users/users';

import { COOKIE_KEYS } from '../../constants/cookies';
import { QUERY_KEYS } from '../../constants/querys';
import { removeCookie } from '../../lib/auth-cookies';
import { ErrorToast, SuccessToast, WarningToast } from '../../lib/toast';
import type { profileProps } from '../../pages/Profile';
import { updateProfileSchema } from '../../schemas/userSchema';

export function useProfileForm({
  setIsEditing,
  isEditing,
  profile,
}: profileProps) {
  const { mutate, isPending } = useUpdateUser();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  type UpdateUserValues = Omit<
    UpdateUserDto,
    'birthDate' | 'weight' | 'height'
  > & {
    birthDate: string | null | undefined;
    weight: number | null | undefined;
    height: number | null | undefined;
  };

  const defaultValues: UpdateUserValues = {
    firstName: profile?.firstName || '',
    lastName: profile?.lastName || '',
    genderId: profile?.gender?.id || '',
    skinColor: profile?.skinColor || undefined,
    weight: profile?.weight ?? undefined,
    height: profile?.height ?? undefined,
    bodyDescription: profile?.bodyDescription || undefined,
    profileDescription: profile?.profileDescription || undefined,
    birthDate: profile?.birthDate ?? undefined,
    hairColor: profile?.hairColor || undefined,
    profilePicture: profile?.profilePicture || undefined,
  };

  const form = useForm<UpdateUserValues>({
    resolver: zodResolver(updateProfileSchema) as any,
    defaultValues,
  });

  async function onSubmit(data: UpdateUserValues) {
    if (isEqual(data, defaultValues)) {
      WarningToast({
        title: 'Sin cambios',
        description: 'No hay cambios para guardar',
      });
      setIsEditing(false);
      return;
    }

    mutate(
      { data: data as unknown as UpdateUserDto },
      {
        onSuccess: async () => {
          setIsEditing(!isEditing);
          SuccessToast({
            title: 'Perfil actualizado correctamente',
          });
          await queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.USER_PROFILE],
          });
        },
        onError: (error) => {
          ErrorToast({
            title:
              error instanceof Error
                ? error.message
                : 'Error al actualizar perfil',
          });
        },
      }
    );
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
    isLoading: isPending,
  };
}
