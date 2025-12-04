import { z } from 'zod';

// Validadores reutilizables
const nameValidator = z
  .string()
  .min(2, 'Debe tener al menos 2 caracteres.')
  .max(50, 'No puede tener más de 50 caracteres.')
  .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'Solo puede contener letras y espacios.');

const emailValidator = z.email('Por favor, introduce un email válido.');

const passwordValidator = z
  .string()
  .min(
    8,
    'Debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas, números y símbolos especiales.'
  )
  .regex(/[a-z]/, 'Debe incluir al menos una letra minúscula.')
  .regex(/[A-Z]/, 'Debe incluir al menos una letra mayúscula.')
  .regex(/\d/, 'Debe incluir al menos un número.')
  .regex(
    /[!@#$%^&*(),.?":{}|<>_\-]/,
    'Debe incluir al menos un símbolo especial.'
  );

const genderIdValidator = z.string().min(1, 'Por favor, selecciona un género');

// Schemas base
const baseUserSchema = z.object({
  firstName: nameValidator,
  lastName: nameValidator,
  email: emailValidator,
  genderId: genderIdValidator,
});

const loginSchema = z.object({
  email: emailValidator,
  password: passwordValidator,
});

const registerSchema = baseUserSchema.extend({
  password: passwordValidator,
});

const weightHeightValidator = z
  .number()
  .nonnegative('El valor no puede ser negativo.')
  .max(800, 'El valor es demasiado alto.')
  .optional()
  .nullable();

const physicalTraitsSchema = z.object({
  skinColor: z.string().optional(),
  weight: weightHeightValidator,
  height: weightHeightValidator,
  hairColor: z
    .string()
    .max(50, 'El color de cabello debe tener un máximo de 50 caracteres.')
    .optional(),
  bodyDescription: z
    .string()
    .max(
      350,
      'La descripción del cuerpo debe tener un máximo de 350 caracteres.'
    )
    .optional(),
});

const profileSchema = baseUserSchema
  .extend({
    ...physicalTraitsSchema.shape,
    profileDescription: z
      .string()
      .max(
        500,
        'La descripción del perfil debe tener un máximo de 500 caracteres.'
      )
      .optional(),
    birthDate: z.string().optional().nullable(),
  })
  .omit({ email: true });

const updateProfileSchema = z.object({
  // Obligatorios
  firstName: nameValidator,
  lastName: nameValidator,
  genderId: genderIdValidator,

  // Opcionales
  skinColor: z.string().optional(),
  weight: weightHeightValidator,
  height: weightHeightValidator,
  hairColor: z
    .string()
    .max(50, 'El color de cabello debe tener un máximo de 50 caracteres.')
    .optional(),
  bodyDescription: z
    .string()
    .max(
      350,
      'La descripción del cuerpo debe tener un máximo de 350 caracteres.'
    )
    .optional(),
  profileDescription: z
    .string()
    .max(
      500,
      'La descripción del perfil debe tener un máximo de 500 caracteres.'
    )
    .optional(),
  birthDate: z.string().optional().nullable(),
  profilePicture: z.string().optional(),
});

export {
  baseUserSchema,
  loginSchema,
  physicalTraitsSchema,
  profileSchema,
  registerSchema,
  updateProfileSchema,
};
