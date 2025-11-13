import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { isEqual } from '@ver0/deep-equal';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import type { UpdateUserDto } from '../../api/generated/schemas';
import { useUpdateUser } from '../../api/generated/users/users';
import type { ProfileFormValues } from '../../components/form/Form';
import { COOKIE_KEYS } from '../../constants/cookies';
import { QUERY_KEYS } from '../../constants/querys';
import { removeCookie } from '../../lib/auth-cookies';
import { ErrorToast, SuccessToast } from '../../lib/toast';
import { updateProfileSchema } from '../../schemas/userSchema';

// Tipo extendido para el perfil que incluye el objeto gender completo
type UserProfile = Omit<UpdateUserDto, 'genderId'> & {
  id?: string;
  email?: string;
  gender?: {
    id: string;
    name: string;
  };
};

export function useProfileForm({
  setIsEditing,
  isEditing,
  profile,
}: ProfileFormValues) {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useUpdateUser();
  const navigate = useNavigate();

  const defaultValues: UpdateUserDto = {
    firstName: profile?.firstName || '',
    lastName: profile?.lastName || '',
    skinColor: profile?.skinColor || undefined,
    weight: profile?.weight ?? undefined,
    height: profile?.height ?? undefined,
    bodyDescription: profile?.bodyDescription || undefined,
    profileDescription: profile?.profileDescription || undefined,
    birthDate: profile?.birthDate || undefined,
    genderId: profile?.gender?.id || '',
    hairColor: profile?.hairColor || undefined,
  };

  const form = useForm<UpdateUserDto>({
    resolver: zodResolver(updateProfileSchema) as any,
    defaultValues,
  });

  async function onSubmit(data: UpdateUserDto) {
    if (isEqual(data, defaultValues)) {
      SuccessToast({
        title: '¡Sin cambios',
        description: 'No hay cambios para guardar',
      });
      setIsEditing(false);
      return;
    }

    mutate(
      { data },
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
