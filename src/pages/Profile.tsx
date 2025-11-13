import { Card } from '@/components/ui/card';
import { useState } from 'react';
import CenteredContainer from '../components/CenteredContainer';
import ProfileForm from '../components/form/ProfileForm';

export default function Profile() {
  const [isEditing, setIsEditing] = useState(true);

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

          {isEditing ? (
            <ProfileForm isEditing={isEditing} setIsEditing={setIsEditing} />
          ) : (
            <></>
          )}
        </Card>
      </CenteredContainer>
    </>
  );
}
