import type { profileProps } from '../../pages/Profile';
import { ProfileField } from '../ProfileField';
import { Button } from '../ui/button';

export default function ProfileViewDetails({
  setIsEditing,
  isEditing,
  profile,
}: profileProps) {
  return (
    <div className="flex flex-col gap-8 py-2">
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <h3 className="text-base md:text-lg font-semibold uppercase tracking-wide text-foreground whitespace-nowrap">
            Datos Básicos
          </h3>
          <div className="h-0.5 flex-1 bg-linear-to-r from-foreground/20 via-foreground/10 to-transparent" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 md:gap-x-8 gap-y-4 md:gap-y-5">
          <ProfileField label="Nombres" value={profile?.firstName} />
          <ProfileField label="Apellidos" value={profile?.lastName} />
          <ProfileField label="Género" value={profile?.gender?.name} />
          <ProfileField label="Correo" value={profile?.email} />
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <h3 className="text-base md:text-lg font-semibold uppercase tracking-wide text-foreground whitespace-nowrap">
            Medidas y Edad
          </h3>
          <div className="h-0.5 flex-1 bg-linear-to-r from-foreground/20 via-foreground/10 to-transparent" />
        </div>
        <div className="grid grid-cols-2 gap-x-6 md:gap-x-8 gap-y-4 md:gap-y-5">
          <ProfileField label="Peso (lb)" value={`${profile?.weight} Libras`} />
          <ProfileField
            label="Altura (cm)"
            value={`${profile?.height} Centimetros`}
          />
          <ProfileField
            label="Fecha de Nacimiento"
            value={profile?.birthDate ? profile.birthDate.split('T')[0] : ''}
          />
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <h3 className="text-base md:text-lg font-semibold uppercase tracking-wide text-foreground whitespace-nowrap">
            Apariencia Física
          </h3>
          <div className="h-0.5 flex-1 bg-linear-to-r from-foreground/20 via-foreground/10 to-transparent" />
        </div>
        <div className="grid grid-cols-2 gap-x-6 md:gap-x-8 gap-y-4 md:gap-y-5">
          <ProfileField label="Tono de Piel" value={profile?.skinColor} />
          <ProfileField label="Color de Cabello" value={profile?.hairColor} />
        </div>
        <div className="mt-3">
          <div className="flex flex-col gap-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Tipo de Cuerpo
            </p>
            <div className="bg-muted/30 rounded-lg p-4 border border-border/40">
              <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">
                {profile?.bodyDescription || 'No especificado'}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <h3 className="text-base md:text-lg font-semibold uppercase tracking-wide text-foreground whitespace-nowrap">
            Estilo Personal
          </h3>
          <div className="h-0.5 flex-1 bg-linear-to-r from-foreground/20 via-foreground/10 to-transparent" />
        </div>
        <div className="bg-muted/30 rounded-lg p-4 border border-border/40">
          <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">
            {profile?.profileDescription || 'No especificado'}
          </p>
        </div>
      </section>

      <div className="flex items-center justify-stretch sm:justify-end pt-4 border-t border-border/40">
        <Button
          className="font-semibold cursor-pointer px-6 md:px-8 uppercase tracking-wide text-xs md:text-sm w-full sm:w-auto"
          type="button"
          onClick={() => setIsEditing(!isEditing)}
        >
          Editar Perfil
        </Button>
      </div>
    </div>
  );
}
