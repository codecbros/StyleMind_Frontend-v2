import { Card } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';
import { useState, type Dispatch, type SetStateAction } from 'react';
import type { UpdateUserDto } from '../api/generated/schemas';
import { useGetMyProfile } from '../api/generated/users/users';
import CenteredContainer from '../components/CenteredContainer';
import ProfileForm from '../components/profile/ProfileForm';
import ProfileViewDetails from '../components/profile/ProfileViewDetails';
import { ProfileSkeleton } from '../components/skeletons/ProfileSkeleton';
import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert';
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
    return (
      <>
        <h1 className="text-center text-2xl md:text-3xl lg:text-4xl uppercase font-extrabold tracking-wide px-4">
          Perfil
        </h1>
        <CenteredContainer>
          <Card className="w-full p-6 sm:px-6 md:px-8 lg:px-10  md:py-8">
            <Alert variant="destructive" className="border-2">
              <AlertCircle className="h-5 w-5" />
              <AlertTitle className="text-lg font-semibold uppercase tracking-wide">
                Error al Cargar tu Perfil
              </AlertTitle>
              <AlertDescription className="mt-2 space-y-3">
                <p className="text-sm leading-relaxed">
                  No pudimos cargar tu información. Por favor, verifica tu
                  conexión e intenta nuevamente.
                </p>
              </AlertDescription>
            </Alert>
          </Card>
        </CenteredContainer>
      </>
    );
  }

  return (
    <>
      <h1 className="text-center text-2xl md:text-3xl lg:text-4xl uppercase font-extrabold tracking-wide px-4 mb-2">
        Perfil
      </h1>
      <CenteredContainer>
        <Card className="w-full px-4 sm:px-6 md:px-8 lg:px-10 py-6 md:py-8">
          <div className="mb-6 md:mb-8">
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
