import { z } from 'zod';

export const wardrobeItemSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'El nombre es obligatorio' })
    .min(3, { message: 'El nombre debe tener al menos 3 caracteres' })
    .max(100, {
      message: 'El nombre es demasiado largo (máximo 100 caracteres)',
    })
    .trim(),

  description: z
    .string()
    .min(1, { message: 'La descripción es obligatoria' })
    .min(20, { message: 'La descripción debe tener al menos 20 caracteres' })
    .max(1000, {
      message: 'La descripción es demasiado larga (máximo 1000 caracteres)',
    })
    .trim(),

  season: z.string().min(1, { message: 'Selecciona una temporada' }),

  primaryColor: z
    .string()
    .min(1, { message: 'Ingresa el color principal' })
    .max(50, { message: 'El color es demasiado largo' })
    .trim(),

  secondaryColor: z
    .string()
    .max(50, { message: 'El color secundario es demasiado largo' })
    .optional()
    .or(z.literal('')),

  style: z
    .string()
    .min(1, { message: 'Ingresa el estilo de la prenda' })
    .max(50, { message: 'El estilo es demasiado largo' })
    .trim(),

  material: z
    .string()
    .max(100, { message: 'El material es demasiado largo' })
    .optional()
    .or(z.literal('')),

  size: z.string().min(1, { message: 'Selecciona una talla' }),

  categoriesId: z
    .array(z.string())
    .min(1, { message: 'Selecciona al menos una categoría' })
    .max(3, { message: 'Máximo 3 categorías por prenda' }),
});

export const wardrobeItemWithImagesSchema = wardrobeItemSchema.extend({
  images: z
    .array(z.any())
    .min(1, { message: 'Debes agregar al menos una imagen' })
    .max(4, { message: 'Máximo 4 imágenes por prenda' }),
});
