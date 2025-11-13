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
    <div className="flex flex-col gap-1.5">
      <span className="text-base text-primary/80">{label}</span>
      {label === 'Tono de piel' ? (
        value ? (
          <span
            className="w-8 h-8 rounded-full"
            aria-label={`Color de piel: ${value}`}
            style={{ backgroundColor: value as string }}
          ></span>
        ) : (
          <p className="text-sm text-primary/60">No Especificado</p>
        )
      ) : (
        <p className="text-sm text-primary/60 text-wrap">
          {formattedValue || 'No Especificado'}
        </p>
      )}
    </div>
  );
}
