import { LoaderCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useGetAllGenders } from '../../api/generated/genders/genders';
import { PATHS } from '../../constants/paths';
import { QUERY_KEYS } from '../../constants/querys';
import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

export type genderItems = {
  id: string;
  name: string;
}[];

const RegisterForm = () => {
  const {
    data: genders,
    isLoading: isGendersLoading,
    isError,
  } = useGetAllGenders({
    query: {
      queryKey: [QUERY_KEYS.GENDERS],
      select: (response: any) => response?.data as genderItems | undefined,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="genderId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Género</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={isError}
              >
                <FormControl className="hover:border-primary/50 border border-muted-foreground">
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona tu género" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {isGendersLoading ? (
                    <SelectItem value="">
                      <LoaderCircle className="animate-spin w-4 h-4 mx-auto" />
                    </SelectItem>
                  ) : (
                    genders?.map((gender) => (
                      <SelectItem key={gender.id} value={gender.id}>
                        {gender.name}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombres</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Ej: María"
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
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Apellidos</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Ej: García López"
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
                  className="hover:border-primary/50 focus:ring-primary/20  border border-muted-foreground"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                {' '}
                Usa al menos 6 caracteres, incluyendo números y símbolos
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col gap-6 md:flex-row justify-between items-center">
          <Button
            className="font-semibold flex items-center gap-2"
            type="submit"
            disabled={isLoading}
          >
            {isLoading && <LoaderCircle className="animate-spin w-4 h-4" />}
            {isLoading ? 'Creando tu cuenta...' : 'Únete a la comunidad'}
          </Button>
          <p className="text-center text-sm text-muted-foreground font-semibold">
            ¿Ya tienes una cuenta?{' '}
            <Link
              to={PATHS.Login}
              className="text-primary hover:underline font-semibold"
            >
              Inicia sesión aquí
            </Link>
          </p>
        </div>
      </form>
    </Form>
  );
};

export default RegisterForm;
