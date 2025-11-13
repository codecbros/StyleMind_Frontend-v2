import { z } from 'zod';

const baseUserSchema = z.object({
  firstName: z
    .string()
    .min(2, {
      message: 'El nombre debe tener al menos 2 caracteres.',
    })
    .max(50, {
      message: 'El nombre no puede tener más de 50 caracteres.',
    })
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, {
      message: 'El nombre solo puede contener letras y espacios.',
    }),
  lastName: z
    .string()
    .min(2, {
      message: 'El apellido debe tener al menos 2 caracteres.',
    })
    .max(50, {
      message: 'El apellido no puede tener más de 50 caracteres.',
    })
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, {
      message: 'El apellido solo puede contener letras y espacios.',
    }),
  email: z.string().email({
    message: 'Por favor, introduce un email válido.',
  }),
  genderId: z
    .string({ message: 'El género es requerido' })
    .min(1, 'Por favor, selecciona un género'),
});

const loginSchema = z.object({
  email: z.string().email({
    message: 'Por favor, introduce un email válido.',
  }),
  password: z
    .string()
    .min(6, {
      message:
        'La contraseña debe tener al menos 6 caracteres, 1 minúscula, 1 mayúscula, 1 número y 1 símbolo.',
    })
    .regex(/[a-z]/, {
      message: 'La contraseña debe incluir al menos una letra minúscula.',
    })
    .regex(/[A-Z]/, {
      message: 'La contraseña debe incluir al menos una letra mayúscula.',
    })
    .regex(/\d/, {
      message: 'La contraseña debe incluir al menos un número.',
    })
    .regex(/[!@#$%^&*(),.?":{}|<>_\-]/, {
      message: 'La contraseña debe incluir al menos un símbolo especial. ',
    }),
});

const registerSchema = baseUserSchema.extend({
  password: z
    .string()
    .min(6, {
      message:
        'La contraseña debe tener al menos 6 caracteres, 1 minúscula, 1 mayúscula, 1 número y 1 símbolo.',
    })
    .regex(/[a-z]/, {
      message: 'La contraseña debe incluir al menos una letra minúscula.',
    })
    .regex(/[A-Z]/, {
      message: 'La contraseña debe incluir al menos una letra mayúscula.',
    })
    .regex(/\d/, {
      message: 'La contraseña debe incluir al menos un número.',
    })
    .regex(/[!@#$%^&*(),.?":{}|<>_\-]/, {
      message: 'La contraseña debe incluir al menos un símbolo especial.',
    }),
});

const physicalTraitsSchema = z.object({
  skinColor: z.string().optional(),

  weight: z.preprocess((val) => {
    if (val === '' || val === null || val === undefined) return undefined;
    const num = Number(val);
    return isNaN(num) ? undefined : num;
  }, z.number().int().nonnegative().optional()) as z.ZodType<
    number | undefined
  >,

  height: z.preprocess((val) => {
    if (val === '' || val === null || val === undefined) return undefined;
    const num = Number(val);
    return isNaN(num) ? undefined : num;
  }, z.number().int().nonnegative().optional()) as z.ZodType<
    number | undefined
  >,

  hairColor: z
    .string()
    .max(50, {
      message: 'El color de cabello debe tener un máximo de 50 caracteres.',
    })
    .optional(),

  bodyDescription: z
    .string()
    .max(350, {
      message:
        'La descripción del cuerpo debe tener un máximo de 350 caracteres.',
    })
    .optional(),
});

const profileSchema = baseUserSchema
  .extend({
    ...physicalTraitsSchema.shape,
    profileDescription: z
      .string()
      .max(500, {
        message:
          'La descripción del perfil debe tener un máximo de 500 caracteres.',
      })
      .optional(),
    birthDate: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, {
        message:
          'La fecha debe tener el formato ISO 8601: YYYY-MM-DDTHH:mm:ss.sssZ.',
      })
      .optional(),
  })
  .omit({ email: true });

const updateProfileSchema = z.object({
  // Obligatorios (sin optional)
  firstName: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres.')
    .max(50, 'El nombre no puede tener más de 50 caracteres.')
    .regex(
      /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
      'El nombre solo puede contener letras y espacios.'
    ),

  lastName: z
    .string()
    .min(2, 'El apellido debe tener al menos 2 caracteres.')
    .max(50, 'El apellido no puede tener más de 50 caracteres.')
    .regex(
      /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
      'El apellido solo puede contener letras y espacios.'
    ),

  genderId: z.string().min(1, 'El género es requerido'), // ✅ Obligatorio

  // Opcionales
  skinColor: z.string().optional(),

  weight: z.preprocess((val) => {
    if (val === '' || val === null || val === undefined) return undefined;
    const num = Number(val);
    return isNaN(num) ? undefined : num;
  }, z.number().int().nonnegative().optional()) as z.ZodType<
    number | undefined
  >,

  height: z.preprocess((val) => {
    if (val === '' || val === null || val === undefined) return undefined;
    const num = Number(val);
    return isNaN(num) ? undefined : num;
  }, z.number().int().nonnegative().optional()) as z.ZodType<
    number | undefined
  >,

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
      'La fecha debe tener el formato ISO 8601.'
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
