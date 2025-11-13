import { LoaderCircle } from 'lucide-react';
import type { Dispatch, SetStateAction } from 'react';
import type { UpdateUserDto } from '../../api/generated/schemas';
import { useGetMyProfile } from '../../api/generated/users/users';
import { COOKIE_KEYS } from '../../constants/cookies';
import { QUERY_KEYS } from '../../constants/querys';
import { useProfileForm } from '../../hooks/form/useProfileForm';
import { getCookie } from '../../lib/auth-cookies';
import { SkinTonePicker } from '../SkinTonePicker';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog';
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
import { Skeleton } from '../ui/skeleton';
import { Textarea } from '../ui/textarea';

// Tipo extendido para el perfil que incluye el objeto gender completo
type UserProfile = Omit<UpdateUserDto, 'genderId'> & {
  id?: string;
  email?: string;
  gender?: {
    id: string;
    name: string;
  };
};

type authProps = {
  isEditing: boolean;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
};

export default function ProfileForm({ setIsEditing, isEditing }: authProps) {
  const { form, onSubmit, handleDeleteAccount, isLoading } = useProfileForm({
    setIsEditing,
    isEditing,
  });

  const token = getCookie(COOKIE_KEYS.AUTH_TOKEN);
  const {
    data: profile,
    isLoading: isProfileLoading,
    isError,
  } = useGetMyProfile({
    query: {
      queryKey: [QUERY_KEYS.USER_PROFILE],
      enabled: !!token,
    },
  }) as {
    data: UserProfile | undefined;
    isLoading: boolean;
    isError: boolean;
  };

  if (isProfileLoading) {
    return <Skeleton />;
  }

  if (isError || !profile) {
    return <div>Error al cargar el perfil</div>;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormLabel>Informacion Personal</FormLabel>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombres *</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Ej: María" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control as any}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Apellidos *</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Ej: García López"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control as any}
          name="genderId"
          render={() => (
            <FormItem>
              <FormLabel>Género</FormLabel>
              <Select disabled defaultValue={'current'}>
                <FormControl className="hover:border-primary/50 border border-muted-foreground">
                  <SelectTrigger>
                    <SelectValue>{profile?.gender?.name}</SelectValue>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="current">
                    {profile?.gender?.name}
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Información Personal (Opcional) */}
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Información Personal (Opcional)</AccordionTrigger>
            <AccordionContent>
              <FormField
                control={form.control as any}
                name="birthDate"
                render={({ field }) => (
                  <FormItem className="mb-6">
                    <FormLabel>Fecha de nacimiento</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        max={new Date().toISOString().split('T')[0]}
                        value={field.value ? field.value.split('T')[0] : ''}
                        onChange={(e) => {
                          const date = new Date(e.target.value);
                          field.onChange(date.toISOString());
                        }}
                      />
                    </FormControl>
                    <FormDescription>
                      Tu fecha de nacimiento se usa para calcular tu edad.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-6">
                <FormField
                  control={form.control as any}
                  name="weight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Peso (lb)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.1"
                          placeholder="70.5"
                          min="0"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>Tu peso en Libras.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control as any}
                  name="height"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Altura (cm)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="1"
                          placeholder="175"
                          min="0"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Tu altura en centímetros.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Características Físicas (Opcional) */}
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-2">
            <AccordionTrigger>
              Características Físicas (Opcional)
            </AccordionTrigger>
            <AccordionContent className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <FormField
                  control={form.control as any}
                  name="skinColor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tono de piel</FormLabel>
                      <FormControl>
                        <SkinTonePicker
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormDescription>
                        Selecciona el tono de piel que mejor te describa.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control as any}
                  name="hairColor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Color de cabello</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Ej: Castaño oscuro, Rubio cenizo, etc."
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Describe tu color de cabello actual.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control as any}
                name="bodyDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descripción del cuerpo</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe tu tipo de cuerpo, características distintivas, etc."
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Proporciona una breve descripción de tu cuerpo (máximo 350
                      caracteres).
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <FormField
          control={form.control as any}
          name="profileDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">
                Descripción del perfil (Opcional)
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe tu personalidad, intereses, hobbies, etc."
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Proporciona una breve descripción de ti mismo (máximo 500
                caracteres).
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {isEditing ? (
          <div className="flex flex-col gap-4 md:flex-row justify-between items-center mt-5">
            <AlertDialog>
              <AlertDialogTrigger
                asChild
                className="w-full md:w-max order-3 md:order-1"
              >
                <Button variant="destructive">Eliminar Cuenta</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    ¿Estás completamente seguro?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Esta acción eliminará tu cuenta de forma permanente y no
                    podrás recuperarla. Todos tus datos asociados se perderán.
                    Por favor, confirma si deseas continuar.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteAccount}>
                    Eliminar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Button
              className="font-semibold w-full md:w-max order-2"
              type="button"
              variant="outline"
              onClick={() => setIsEditing(!isEditing)}
            >
              Cancelar
            </Button>
            <Button
              className="font-semibold w-full md:w-max order-1 md:order-3"
              type="submit"
              disabled={isLoading}
            >
              {isLoading && <LoaderCircle className="animate-spin w-4 h-4" />}
              {isLoading ? 'Actualizando Datos...' : 'Guardar'}
            </Button>
          </div>
        ) : null}
      </form>
    </Form>
  );
}
