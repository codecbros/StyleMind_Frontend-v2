import { Card } from '@/components/ui/card';
import { LoaderCircle } from 'lucide-react';
import { useState, type Dispatch, type SetStateAction } from 'react';
import type { UpdateUserDto } from '../api/generated/schemas';
import { useGetMyProfile } from '../api/generated/users/users';
import CenteredContainer from '../components/CenteredContainer';
import ProfileForm from '../components/profile/ProfileForm';
import ProfileViewDetails from '../components/profile/ProfileViewDetails';
import { COOKIE_KEYS } from '../constants/cookies';
import { QUERY_KEYS } from '../constants/querys';
import { getCookie } from '../lib/auth-cookies';

export type UserProfile = Omit<UpdateUserDto, 'genderId'> & {
  id?: string;
  email?: string;
  gender?: {
    id: string;
    name: string;
  };
};

export type profileProps = {
  isEditing: boolean;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  profile?: UserProfile | undefined;
};

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);

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

  const profile = data?.data as UserProfile;

  if (data instanceof Error || isError) {
    return <div>Error al cargar el perfil</div>;
  }

  return (
    <>
      <h1 className="text-center text-2xl lg:text-3xl uppercase font-extrabold">
        perfil
      </h1>
      <CenteredContainer>
        <Card>
          <h4 className="mb-3 text-lg font-semibold">
            Completa tu perfil: Cuanta más información proporciones, mejores
            serán las combinaciones
          </h4>

          {isProfileLoading && !profile ? (
            <LoaderCircle className="animate-spin mx-auto" />
          ) : profile && !isProfileLoading && isEditing ? (
            <ProfileForm
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              profile={profile}
            />
          ) : (
            <ProfileViewDetails
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              profile={profile}
            />
          )}
        </Card>
      </CenteredContainer>
    </>
  );
}
