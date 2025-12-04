export const parseDateIgnoringTimezone = (isoString: string): Date => {
  const [dateOnly] = isoString.split('T');
  const [year, month, day] = dateOnly.split('-').map(Number);
  return new Date(year, month - 1, day);
};

export const formatDateToISO = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}T00:00:00.000Z`;
};
