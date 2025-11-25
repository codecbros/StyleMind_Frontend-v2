import { SEASONS, type SeasonKey } from '../constants/seasons';

/**
 * Genera las opciones para el select de temporadas
 */
export const SEASON_OPTIONS = Object.entries(SEASONS).map(([value, label]) => ({
  value,
  label,
}));

/**
 * Obtiene el label en español de una temporada
 * @param seasonValue - El valor de la temporada en inglés
 * @returns El nombre de la temporada en español
 */
export const getSeasonLabel = (seasonValue: string | undefined): string => {
  return SEASONS[seasonValue as SeasonKey] || seasonValue || '';
};

export const isValidSeason = (season: string): season is SeasonKey => {
  return season in SEASONS;
};
