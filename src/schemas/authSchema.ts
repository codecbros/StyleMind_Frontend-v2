import { z } from 'zod';

const loginSchema = z.object({
  email: z.email({
    message: 'Por favor, introduce un email válido.',
  }),
  password: z
    .string()
    .min(8, {
      message:
        'La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas, números y símbolos especiales.',
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

export { loginSchema };
