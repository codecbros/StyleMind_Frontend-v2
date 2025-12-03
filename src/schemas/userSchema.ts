import { z } from 'zod';

// Validadores reutilizables
const nameValidator = z
  .string()
  .min(2, 'Debe tener al menos 2 caracteres.')
  .max(30, 'No puede tener más de 30 caracteres.')
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

// Validador numérico reutilizable (NO MODIFICAR - funciona correctamente)
const numericOptionalValidator = z.preprocess((val) => {
  if (val === '' || val === null || val === undefined) return undefined;
  const num = Number(val);
  return isNaN(num) ? undefined : num;
}, z.number().int().nonnegative().optional()) as z.ZodType<number | undefined>;

const numericNullableValidator = z.preprocess((val) => {
  if (val === '' || val === null || val === undefined) return undefined;
  const num = Number(val);
  return isNaN(num) ? undefined : num;
}, z.number().int().nonnegative().nullable().optional()) as z.ZodType<
  number | null | undefined
>;

const physicalTraitsSchema = z.object({
  skinColor: z.string().optional(),
  weight: numericOptionalValidator,
  height: numericOptionalValidator,
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
    birthDate: z
      .string()
      .regex(
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/,
        'La fecha debe tener el formato ISO 8601.'
      )
      .optional(),
  })
  .omit({ email: true });

const updateProfileSchema = z.object({
  // Obligatorios
  firstName: nameValidator,
  lastName: nameValidator,
  genderId: genderIdValidator,

  // Opcionales
  skinColor: z.string().optional(),
  weight: numericNullableValidator,
  height: numericNullableValidator,
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
  birthDate: z
    .string()
    .regex(
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/,
      'La fecha no valida.'
    )
    .optional(),
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
