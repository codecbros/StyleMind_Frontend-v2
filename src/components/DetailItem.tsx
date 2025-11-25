interface DetailItemProps {
  label: string;
  value?: string | null;
}

export function DetailItem({ label, value }: DetailItemProps) {
  return (
    <div>
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
        {label}
      </p>
      <p className="mt-1.5 text-sm text-foreground">{value || '—'}</p>
    </div>
  );
}
