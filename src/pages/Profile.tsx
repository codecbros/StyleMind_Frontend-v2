import { Card } from '@/components/ui/card';
import { useState, type Dispatch, type SetStateAction } from 'react';
import type { UpdateUserDto } from '../api/generated/schemas';
import { useGetMyProfile } from '../api/generated/users/users';
import CenteredContainer from '../components/CenteredContainer';
import { ErrorFallback } from '../components/ErrorFallback';
import ProfileForm from '../components/profile/ProfileForm';
import ProfileViewDetails from '../components/profile/ProfileViewDetails';
import { ProfileSkeleton } from '../components/skeletons/ProfileSkeleton';
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
  refetch?: () => void;
};

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const token = getCookie(COOKIE_KEYS.AUTH_TOKEN);

  const {
    data: profile,
    isLoading: isProfileLoading,
    isError,
  } = useGetMyProfile({
    query: {
      queryKey: [QUERY_KEYS.USER_PROFILE],
      enabled: !!token,
      select: (response: any) => response?.data as UserProfile | undefined,
    },
  }) as {
    data: UserProfile | undefined;
    isLoading: boolean;
    isError: boolean;
  };

  if (profile instanceof Error || isError) {
    return (
      <>
        <h1 className="text-center text-2xl md:text-3xl lg:text-4xl uppercase font-extrabold tracking-wide px-4">
          Perfil
        </h1>
        <ErrorFallback
          title="No se pudo cargar el perfil"
          description="Hubo un problema al cargar tu perfil. Por favor, intenta nuevamente más tarde."
        />
      </>
    );
  }

  return (
    <>
      <h1 className="text-center text-2xl md:text-3xl lg:text-4xl uppercase font-extrabold tracking-wide px-4 mb-2">
        Perfil
      </h1>
      <CenteredContainer className="px-5">
        <Card className="w-full px-4 sm:px-6 md:px-8 lg:px-10 py-6 md:py-8">
          <div className="md:mb-4">
            <h4 className="text-base md:text-lg font-semibold leading-relaxed">
              Completa tu perfil: Cuanta más información proporciones, mejores
              serán las combinaciones
            </h4>
          </div>

          {isProfileLoading && !profile ? (
            <ProfileSkeleton />
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
