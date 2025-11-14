import { z } from 'zod';

export const wardrobeItemSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'El nombre debe tener al menos 3 caracteres' })
    .max(100, { message: 'El nombre no puede exceder 100 caracteres' })
    .nonempty({ message: 'El nombre es obligatorio' }),
  description: z
    .string()
    .max(1000, { message: 'La descripción no puede exceder 1000 caracteres' }),
  season: z.string().min(1, { message: 'La temporada es obligatoria' }),
  primaryColor: z
    .string()
    .min(1, { message: 'El color principal es obligatorio' }),
  secondaryColor: z.string().optional(),
  style: z.string().min(1, { message: 'El estilo es obligatorio' }),
  material: z.string().optional(),
  size: z.string().min(1, { message: 'La talla es obligatoria' }),
  categoriesId: z
    .array(z.string(), { message: 'Las categorías son obligatorias' })
    .min(1, { message: 'Debe haber al menos una categoría' }),
});
