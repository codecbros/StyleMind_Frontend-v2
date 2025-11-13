import { LoaderCircle } from 'lucide-react';
import type { Dispatch, SetStateAction } from 'react';
import { useGetMyProfile } from '../api/generated/users/users';
import { COOKIE_KEYS } from '../constants/cookies';
import { QUERY_KEYS } from '../constants/querys';
import { getCookie } from '../lib/auth-cookies';
import type { UserProfile } from './form/ProfileForm';
import { ProfileField } from './ProfileField';
import { Button } from './ui/button';

type authProps = {
  isEditing: boolean;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
};

export default function ProfileViewDetails({
  setIsEditing,
  isEditing,
}: authProps) {
  const token = getCookie(COOKIE_KEYS.AUTH_TOKEN);
  const {
    data,
    isLoading: isProfileLoading,
    isError,
  } = useGetMyProfile({
    query: {
      queryKey: [QUERY_KEYS.USER_PROFILE],
      enabled: !!token,
    },
  }) as {
    data: UserProfile | undefined;
    isLoading: boolean;
    isError: boolean;
  };

  if (isProfileLoading) {
    return <LoaderCircle className="animate-spin mx-auto" />;
  }

  if (data instanceof Error || isError) {
    return <div>Error al cargar el perfil</div>;
  }

  const profile = data?.data as UserProfile;

  return (
    <div className="flex flex-col gap-3">
      <section className="space-y-4">
        <h4 className="text-lg font-semibold">Información Básica</h4>
        <div className="grid grid-cols-2 gap-4">
          <ProfileField label="Nombres" value={profile?.firstName} />
          <ProfileField label="Apellidos" value={profile?.lastName} />
          <ProfileField label="Genero" value={profile?.gender?.name} />
          <ProfileField label="Correo" value={profile?.email} />
        </div>
      </section>
      <section className="space-y-4">
        <h4 className="text-lg font-semibold">Información Personal</h4>
        <div className="grid grid-cols-2 gap-4">
          <ProfileField label="Peso (lb)" value={profile?.weight} />
          <ProfileField label="Altura (cm)" value={profile?.height} />
          <ProfileField
            label="Fecha de Nacimiento"
            value={profile?.birthDate ? profile.birthDate.split('T')[0] : ''}
          />
        </div>
      </section>
      <section className="space-y-4">
        <h4 className="text-lg font-semibold">Características Físicas</h4>
        <div className="grid grid-cols-2 gap-4">
          <ProfileField label="Tono de piel" value={profile?.skinColor} />
          <ProfileField label="Color de cabello" value={profile?.hairColor} />
        </div>
        <div className="grid grid-cols-1 gap-4">
          <div className="flex flex-col gap-2.5">
            <p className="text-sm text-primary/80">Descripción del cuerpo</p>
            <textarea
              readOnly
              className="text-sm text-primary/60 p-2 whitespace-pre-line border rounded min-h-12"
              value={profile?.bodyDescription || 'No especificado'}
            />
          </div>
        </div>
      </section>
      <section className="space-y-2">
        <h4 className="text-lg font-semibold">Descripción del perfil </h4>
        <div className="grid grid-cols-1">
          <textarea
            readOnly
            className="text-sm text-primary/60 p-2 whitespace-pre-line border rounded min-h-12"
            value={profile?.profileDescription || 'No especificado'}
          />
        </div>
      </section>
      <div className="flex items-center justify-end">
        <Button
          className="font-semibold"
          type="button"
          onClick={() => setIsEditing(!isEditing)}
        >
          Editar
        </Button>
      </div>
    </div>
  );
}
