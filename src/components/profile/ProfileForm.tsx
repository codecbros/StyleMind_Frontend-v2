import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { CalendarIcon, LoaderCircle } from 'lucide-react';
import {
  formatDateToISO,
  parseDateIgnoringTimezone,
} from '../../helpers/dateUtils';
import { useProfileForm } from '../../hooks/form/useProfileForm';
import { cn } from '../../lib/utils';
import type { profileProps } from '../../pages/Profile';
import { SkinTonePicker } from '../SkinTonePicker';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import { Button } from '../ui/button';
import { Calendar } from '../ui/calendar';
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
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Textarea } from '../ui/textarea';

export default function ProfileForm({
  setIsEditing,
  isEditing,
  profile,
}: profileProps) {
  const { form, onSubmit, isLoading } = useProfileForm({
    setIsEditing,
    isEditing,
    profile,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-semibold uppercase tracking-wide text-foreground">
              Datos Personales
            </h3>
            <div className="h-0.5 flex-1 bg-linear-to-r from-foreground/20 via-foreground/10 to-transparent" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-semibold uppercase tracking-wider">
                    Nombres *
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="py-5"
                      type="text"
                      placeholder="Ej: María"
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
                  <FormLabel className="text-xs font-semibold uppercase tracking-wider">
                    Apellidos *
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="py-5"
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
            control={form.control}
            name="genderId"
            render={() => (
              <FormItem>
                <FormLabel className="text-xs font-semibold uppercase tracking-wider">
                  Género
                </FormLabel>
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
        </section>

        <Accordion type="single" collapsible className="w-full mb-4">
          <AccordionItem value="item-1" className="border-border/40">
            <AccordionTrigger className="text-base font-semibold uppercase tracking-wide hover:text-foreground/80">
              Medidas y Edad
            </AccordionTrigger>
            <AccordionContent className="pt-6 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="weight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-semibold uppercase tracking-wider">
                        Peso (lb)
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="py-5"
                          type="number"
                          step="1"
                          placeholder="150"
                          min="0"
                          value={field.value ?? ''}
                          onChange={(e) => {
                            const val = e.target.value;
                            field.onChange(val === '' ? null : Number(val));
                          }}
                          onBlur={field.onBlur}
                          name={field.name}
                          ref={field.ref}
                        />
                      </FormControl>
                      <FormDescription className="text-xs">
                        En libras.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="height"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-semibold uppercase tracking-wider">
                        Altura (cm)
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="py-5"
                          type="number"
                          step="1"
                          placeholder="175"
                          min="0"
                          value={field.value ?? ''}
                          onChange={(e) => {
                            const val = e.target.value;
                            field.onChange(val === '' ? null : Number(val));
                          }}
                          onBlur={field.onBlur}
                          name={field.name}
                          ref={field.ref}
                        />
                      </FormControl>
                      <FormDescription className="text-xs">
                        En centímetros.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="birthDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Fecha de Nacimiento</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              'w-full sm:w-60 pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value ? (
                              format(
                                parseDateIgnoringTimezone(field.value),
                                'PPP',
                                { locale: es }
                              )
                            ) : (
                              <span>Selecciona una fecha</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          captionLayout="dropdown"
                          selected={
                            field.value
                              ? parseDateIgnoringTimezone(field.value)
                              : undefined
                          }
                          onSelect={(date) =>
                            field.onChange(date ? formatDateToISO(date) : null)
                          }
                          disabled={(date) =>
                            date > new Date() || date < new Date('1900-01-01')
                          }
                          autoFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-2" className="border-border/40">
            <AccordionTrigger className="text-base font-semibold uppercase tracking-wide hover:text-foreground/80">
              Apariencia Física
            </AccordionTrigger>
            <AccordionContent className="pt-6 space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <FormField
                  control={form.control as any}
                  name="skinColor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-semibold uppercase tracking-wider">
                        Tono de Piel
                      </FormLabel>
                      <FormControl>
                        <SkinTonePicker
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormDescription className="text-xs">
                        Ayuda a sugerir colores que te favorezcan.
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
                      <FormLabel className="text-xs font-semibold uppercase tracking-wider">
                        Color de Cabello
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="py-5"
                          type="text"
                          placeholder="Ej: Castaño oscuro, Rubio cenizo"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="text-xs">
                        Para armonizar tus outfits con tu paleta natural.
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
                    <FormLabel className="text-xs font-semibold uppercase tracking-wider">
                      Tipo de Cuerpo
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe tu silueta y proporciones (ej: pera, reloj de arena, atlético, rectangular)"
                        className="resize-none min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-xs">
                      Esto nos permite sugerir prendas que realcen tu figura.
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
              <FormLabel className="text-base font-semibold uppercase tracking-wide">
                Tu Estilo Personal
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Cuéntanos sobre tu estilo, preferencias de moda, ocasiones para vestir, colores favoritos, o cualquier detalle que nos ayude a conocerte mejor"
                  className="resize-none min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-xs">
                Mientras más detalles compartas, mejores combinaciones podremos
                crear para ti.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {isEditing ? (
          <div className="flex flex-col gap-4 md:flex-row justify-between items-center pt-6 border-t border-border/40">
            <Button
              className="font-semibold w-full md:w-max cursor-pointer uppercase tracking-wide text-sm px-8"
              type="button"
              variant="outline"
              onClick={() => setIsEditing(!isEditing)}
            >
              Cancelar
            </Button>
            <Button
              className="font-semibold w-full md:w-max order-1 cursor-pointer uppercase tracking-wide text-sm px-8"
              type="submit"
              disabled={isLoading}
            >
              {isLoading && <LoaderCircle className="animate-spin w-4 h-4" />}
              {isLoading ? 'Actualizando...' : 'Guardar Cambios'}
            </Button>
          </div>
        ) : null}
      </form>
    </Form>
  );
}
