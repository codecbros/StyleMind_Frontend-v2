export const SEASONS = {
  spring: 'Primavera',
  summer: 'Verano',
  fall: 'Otoño',
  winter: 'Invierno',
  spring_summer: 'Primavera-Verano',
  fall_winter: 'Otoño-Invierno',
  all_season: 'Todo el Año',
} as const;

export type SeasonKey = keyof typeof SEASONS;
