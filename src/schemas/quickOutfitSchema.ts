import { z } from 'zod';

export const quickOutfitSchema = z.object({
  clothingItemsBase: z
    .array(z.string())
    .min(1, 'Debes seleccionar al menos 1 prenda base')
    .max(5, 'Puedes seleccionar hasta 5 prendas base'),
  categories: z
    .array(z.string())
    .min(1, 'Debes seleccionar al menos 1 categoría complementaria')
    .max(6, 'Puedes seleccionar hasta 6 categorías'),
  occasions: z
    .string()
    .min(1, 'La ocasión del outfit es requerida')
    .max(100, 'La ocasión debe tener un máximo de 100 caracteres'),
  description: z
    .string()
    .max(500, 'La descripción debe tener un máximo de 500 caracteres')
    .optional()
    .or(z.literal('')),
  take: z.number().optional(),
  page: z.number().optional(),
});
