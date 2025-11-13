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
    if (val === '' || val === undefined || val === null) return undefined;
    const num = Number(val);
    return typeof num === 'number' && !isNaN(num) ? num : undefined;
  }, z.number().int().positive().optional()) as z.ZodType<
    number | undefined,
    any,
    any
  >,
  height: z.preprocess((val) => {
    if (val === '' || val === undefined || val === null) return undefined;
    const num = Number(val);
    return typeof num === 'number' && !isNaN(num) ? num : undefined;
  }, z.number().int().positive().optional()) as z.ZodType<
    number | undefined,
    any,
    any
  >,
  hairColor: z
    .string()
    .max(50, {
      message: 'El color de cabello debe tener un máximo de 20 caracteres.',
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

const updateProfileSchema = profileSchema.extend({
  genderId: z.undefined().optional(),
});

export {
  baseUserSchema,
  loginSchema,
  physicalTraitsSchema,
  profileSchema,
  registerSchema,
  updateProfileSchema,
};
