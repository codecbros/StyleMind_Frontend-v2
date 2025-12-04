export const parseDateIgnoringTimezone = (isoString: string): Date => {
  const [dateOnly] = isoString.split('T');
  const [year, month, day] = dateOnly.split('-').map(Number);
  return new Date(year, month - 1, day);
};

export const formatDateToISO = (date: Date): string => {
  return date.toISOString().split('T')[0] + 'T00:00:00.000Z';
};
