import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import type { CreateUserDto } from '../../api/generated/schemas';
import { useLoginCustom } from '../../hooks/useLoginCustom';
import { ErrorToast, SuccessToast } from '../../lib/toast';
import { loginSchema } from '../../schemas/authSchema';
import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';

type LoginFormValues = Pick<CreateUserDto, 'email' | 'password'>;

export default function LoginForm() {
  const { mutate, isPending } = useLoginCustom();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(data: LoginFormValues) {
    mutate(data, {
      onSuccess: () => {
        SuccessToast({ title: 'Inicio de sesión exitoso' });
        form.reset();
      },
      onError: () => {
        ErrorToast({ title: 'Correo o contraseña incorrectos' });
      },
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo Electronico</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="tu@email.com"
                  className="hover:border-primary/50 focus:ring-primary/20  border border-muted-foreground"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="••••••••"
                  className="hover:border-primary/50 focus:ring-primary/20  border border-muted-foreground"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col gap-6 md:flex-row justify-between items-center">
          <Button
            className="font-semibold flex items-center gap-2"
            type="submit"
            disabled={isPending}
          >
            {isPending && <LoaderCircle className="animate-spin w-4 h-4" />}
            {isPending ? 'Iniciando sesión...' : 'Ingresar a mi cuenta'}
          </Button>
          <p className="text-sm text-muted-foreground font-semibold">
            ¿No tienes una cuenta?{' '}
            <Link to="" className="text-primary hover:underline font-semibold">
              Regístrate aquí
            </Link>
          </p>
        </div>
      </form>
    </Form>
  );
}
