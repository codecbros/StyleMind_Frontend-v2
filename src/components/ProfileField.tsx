import { format, parseISO } from 'date-fns';

type ProfileFieldProps = {
  label: string;
  value?: string | number | null | undefined;
};

export function ProfileField({ label, value }: ProfileFieldProps) {
  const formattedValue =
    label === 'Fecha de Nacimiento' && value
      ? format(parseISO(value as string), 'dd/MM/yyyy')
      : value;

  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
        {label}
      </span>
      {label === 'Tono de piel' ? (
        value ? (
          <div className="flex items-center gap-3">
            <span
              className="w-10 h-10 rounded-full border-2 border-border shadow-sm"
              aria-label={`Color de piel: ${value}`}
              style={{ backgroundColor: value as string }}
            ></span>
          </div>
        ) : (
          <p className="text-base text-muted-foreground/60">No especificado</p>
        )
      ) : (
        <p className="text-base text-foreground leading-relaxed">
          {formattedValue || 'No especificado'}
        </p>
      )}
    </div>
  );
}
