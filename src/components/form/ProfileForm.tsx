import { LoaderCircle } from 'lucide-react';
import type { Dispatch, SetStateAction } from 'react';
import type { UpdateUserDto } from '../../api/generated/schemas';
import { useGetMyProfile } from '../../api/generated/users/users';
import { COOKIE_KEYS } from '../../constants/cookies';
import { QUERY_KEYS } from '../../constants/querys';
import { getCookie } from '../../lib/auth-cookies';
import AcctionFormProfile from './Form';

export type authProps = {
  isEditing: boolean;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
};

// Tipo extendido para el perfil que incluye el objeto gender completo
type UserProfile = Omit<UpdateUserDto, 'genderId'> & {
  id?: string;
  email?: string;
  gender?: {
    id: string;
    name: string;
  };
};

export default function ProfileForm({ setIsEditing, isEditing }: authProps) {
  const token = getCookie(COOKIE_KEYS.AUTH_TOKEN);

  const {
    data: profile,
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

  if (profile instanceof Error || isError) {
    return <div>Error al cargar el perfil</div>;
  }

  return (
    <AcctionFormProfile
      isEditing={isEditing}
      setIsEditing={setIsEditing}
      profile={profile?.data}
    />
  );
}
