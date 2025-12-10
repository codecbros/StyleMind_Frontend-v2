import { Loader2, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { CreateCombinationDto } from '../../api/generated/schemas';
import CategoryMultiSelect from '../CategoryMultiSelect';
import CategorySelect from '../CategorySelect';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Form, FormField } from '../ui/form';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';

const isSubmitting = false; // Placeholder for submission state

const QuickOutfitForm = () => {
  const [baseCategoryId, setBaseCategoryId] = useState<string | null>(null);

  const defaultValues: CreateCombinationDto = {
    categories: [],
    clothingItemsBase: [],
    description: '',
    occasions: [],
    page: 1,
    take: 10,
  };
  const form = useForm({ defaultValues });

  const onSubmit = (formData: CreateCombinationDto) => {
    console.log('Form Data:', formData);
  };

  return (
    <Card className="p-4 sm:p-6 md:p-8">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 sm:space-y-8"
        >
          <div className="space-y-2 sm:space-y-3">
            <Label className="text-base sm:text-lg font-semibold">
              1. Selecciona la Categoría Base
            </Label>
            <p className="text-sm sm:text-base text-muted-foreground mt-1 sm:mt-1.5">
              Elige el tipo de prenda principal que quieres usar en tu outfit
            </p>
            <div className="md:w-1/2 lg:w-1/3">
              <CategorySelect
                form={form}
                name="baseCategory"
                label=""
                placeholder="Selecciona una categoría"
                onChange={(categoryId) => setBaseCategoryId(categoryId)}
              />
            </div>
          </div>

          {baseCategoryId && (
            <div className="space-y-2 sm:space-y-3">
              <div>
                <Label className="text-base sm:text-lg font-semibold">
                  2. Selecciona tus Prendas Base
                  <span className="ml-2 text-sm sm:text-base font-normal text-muted-foreground">
                    (0/5)
                  </span>
                </Label>
                <p className="text-sm sm:text-base text-muted-foreground mt-1 sm:mt-1.5">
                  Elige hasta 5 {'camisas'} que quieres considerar para tu
                  outfit
                </p>
              </div>
            </div>
          )}

          <div className="space-y-2 sm:space-y-3">
            <Label className="text-base sm:text-lg font-semibold">
              3. Categorías Complementarias
            </Label>
            <p className="text-sm sm:text-base text-muted-foreground mt-1 sm:mt-1.5 ">
              Selecciona qué otras prendas quieres que la IA combine con tu base
            </p>
            <CategoryMultiSelect
              form={form}
              name="categories"
              showLabel={false}
              maxSelections={6}
              placeholder="Ej: Pantalones, Zapatos, Accesorios..."
            />
          </div>

          <div className="space-y-2 sm:space-y-3">
            <div>
              <Label className="text-base sm:text-lg font-semibold">
                4. Ocasión del Outfit
              </Label>
              <p className="text-sm sm:text-base text-muted-foreground mt-1 sm:mt-1.5">
                ¿Para qué evento o situación necesitas este outfit?
              </p>
            </div>
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <div className="space-y-2 sm:space-y-3">
                <div>
                  <Label
                    htmlFor="description"
                    className="text-base sm:text-lg font-semibold"
                  >
                    5. Detalles Adicionales (Opcional)
                  </Label>
                  <p className="text-sm sm:text-base text-muted-foreground mt-1 sm:mt-1.5">
                    Describe tu estilo preferido, el clima, colores deseados o
                    cualquier preferencia especial
                  </p>
                </div>
                <Textarea
                  id="description"
                  placeholder="Ejemplo: Quiero algo elegante pero cómodo para una cena. El clima estará fresco, así que prefiero mangas largas. Me gustan los colores neutros y estilo minimalista."
                  rows={5}
                  maxLength={500}
                  className="resize-none text-sm sm:text-base"
                  {...field}
                />
              </div>
            )}
          />

          <div className="pt-4 sm:pt-6">
            <Button
              type="submit"
              size="lg"
              className="w-full sm:w-auto text-sm sm:text-base"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-1 size-4 sm:size-5 animate-spin" />
                  Generando tu outfit...
                </>
              ) : (
                <>
                  <Sparkles className="mr-1 size-4 sm:size-5" />
                  Generar Outfit Rápido
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  );
};

export default QuickOutfitForm;
