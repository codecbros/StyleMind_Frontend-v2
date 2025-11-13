import type { Dispatch, SetStateAction } from 'react';
import { ProfileField } from './ProfileField';

type authProps = {
  isEditing: boolean;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
};

export default function ProfileViewDetails({
  setIsEditing,
  isEditing,
}: authProps) {
  return (
    <div className="flex flex-col gap-3">
      <section className="space-y-4">
        <h4 className="text-lg font-semibold">Información Básica</h4>
        <div className="grid grid-cols-2 gap-4">
          <ProfileField label="Nombres" value={user?.firstName} />
          <ProfileField label="Apellidos" value={user?.lastName} />
          <ProfileField label="Genero" value={user?.gender.name} />
          <ProfileField label="Correo" value={user?.email} />
        </div>
      </section>
      <section className="space-y-4">
        <h4 className="text-lg font-semibold">información Personal</h4>
        <div className="grid grid-cols-2 gap-4">
          <ProfileField label="Peso (lb)" value={user?.weight} />
          <ProfileField label="Altura (cm)" value={user?.height} />
          <ProfileField
            label="Fecha de Nacimiento"
            value={user?.birthDate ? user.birthDate.split('T')[0] : ''}
          />
        </div>
      </section>
      <section className="space-y-4">
        <h4 className="text-lg font-semibold">Catacreristicas Fisicas</h4>
        <div className="grid grid-cols-2 gap-4">
          <ProfileField label="Tono de piel" value={user?.skinColor} />
          <ProfileField label="Color de cabello" value={user?.hairColor} />
        </div>
        <div className="grid grid-cols-1 gap-4">
          <div className="flex flex-col gap-2.5">
            <p className="text-sm text-primary/80">Descripción del cuerpo</p>
            <textarea
              disabled
              className="text-sm text-primary/60 p-2"
              value={user?.bodyDescription || 'No especificado'}
            />
          </div>
        </div>
      </section>
      <section className="space-y-2">
        <h4 className="text-lg font-semibold">Descripción del perfil </h4>
        <div className="grid grid-cols-1">
          <textarea
            disabled
            className="text-sm text-primary/60 p-2"
            value={user?.profileDescription || 'No especificado'}
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
