import type { Dispatch, SetStateAction } from 'react';
import type { UserProfile } from '../../pages/Profile';
import AcctionFormProfile from './Form';

type profileFormProps = {
  isEditing: boolean;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  profile?: UserProfile | undefined;
};

export default function ProfileForm({
  setIsEditing,
  isEditing,
  profile,
}: profileFormProps) {
  return (
    <AcctionFormProfile
      isEditing={isEditing}
      setIsEditing={setIsEditing}
      profile={profile}
    />
  );
}
