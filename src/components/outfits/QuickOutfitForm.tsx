import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useGenerateCombinations } from '../../api/generated/combinations/combinations';
import type { CreateCombinationDto } from '../../api/generated/schemas';
import { useGetMyWardrobe } from '../../api/generated/wardrobe/wardrobe';
import { ErrorToast, SuccessToast } from '../../lib/toast';
import { quickOutfitSchema } from '../../schemas/quickOutfitSchema';
import type { ClothingItem, QuickOutfitFormValues } from '../../types/clothing';
import { GeneratedOutfitData } from '../../types/QuickOutfit';
import CategoryMultiSelect from '../CategoryMultiSelect';
import CategorySelect from '../CategorySelect';
import ClothingSelector from '../ClothingSelector';
import { ClothingSelectorSkeleton } from '../skeletons/ClothingSelectorSkeleton';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
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
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import GeneratedOutfitModal from './GeneratedOutfitModal';

const QuickOutfitForm = () => {
  const [baseCategoryId, setBaseCategoryId] = useState<string | null>(null);
  const [generatedOutfit, setGeneratedOutfit] =
    useState<GeneratedOutfitData | null>(null);
  const [showModal, setShowModal] = useState(false);
  const { mutate, isPending } = useGenerateCombinations();

  const defaultValues: QuickOutfitFormValues = {
    categories: [],
    clothingItemsBase: [],
    description: '',
    occasions: '',
  };

  const form = useForm<QuickOutfitFormValues>({
    resolver: zodResolver(quickOutfitSchema),
    defaultValues,
  });

  const { data: clothingItems, isLoading } = useGetMyWardrobe(
    { categoryId: baseCategoryId || undefined, limit: 10000 },
    {
      query: {
        enabled: !!baseCategoryId,
        queryKey: ['QuickOutfitForm', baseCategoryId],
        select: (response: any) => (response?.data as ClothingItem[]) || [],
      },
    }
  );

  const onSubmit = (formData: QuickOutfitFormValues) => {
    const data: CreateCombinationDto = {
      ...formData,
      occasions: formData.occasions ? [formData.occasions] : [],
      description: formData.description ?? '',
    };

    mutate(
      { data },
      {
        onSuccess: (response: any) => {
          const outfitData: GeneratedOutfitData = {
            explanation: response?.data?.explanation || '',
            items: response?.data?.items || [],
            message:
              response?.data?.message || 'Combinación generada correctamente',
          };
          setGeneratedOutfit(outfitData);
          setShowModal(true);
        },
        onError: (error: any) => {
          ErrorToast({
            title: 'Error al generar el outfit',
            description:
              error?.response?.data?.message || 'Ocurrió un error inesperado',
          });
        },
      }
    );
  };

  const handleSaveOutfit = () => {
    // TODO: Implement save outfit logic
    SuccessToast({
      title: 'Outfit guardado con éxito',
    });
    setShowModal(false);
    form.reset();
    setBaseCategoryId(null);
    setGeneratedOutfit(null);
  };

  const handleGenerateAnother = () => {
    setShowModal(false);
    setGeneratedOutfit(null);
  };

  const handleModalClose = (open: boolean) => {
    setShowModal(open);
    if (!open) {
      setBaseCategoryId(null);
      setGeneratedOutfit(null);
    }
  };

  return (
    <>
      <Card className="p-4 sm:p-6 md:p-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 sm:space-y-8"
          >
            <div className="space-y-2 sm:space-y-3">
              <div>
                <Label
                  htmlFor="baseCategory-select"
                  className="text-base sm:text-lg font-semibold"
                >
                  1. Selecciona la Categoría Base
                </Label>
                <p className="text-sm sm:text-base text-muted-foreground mt-1 sm:mt-1.5">
                  Elige el tipo de prenda principal que quieres usar en tu
                  outfit
                </p>
              </div>
              <div className="md:w-1/2 lg:w-1/3">
                <CategorySelect
                  field={{
                    value: baseCategoryId,
                    onChange: setBaseCategoryId,
                    onBlur: () => {},
                    name: 'baseCategory',
                    ref: () => {},
                  }}
                  inputId="baseCategory-select"
                  placeholder="Selecciona una categoría"
                  className="z-20"
                />
              </div>
            </div>

            <FormField
              control={form.control}
              name="clothingItemsBase"
              render={({ field }) => (
                <FormItem
                  className={`space-y-2 sm:space-y-3 transition-opacity ${
                    !baseCategoryId ? 'opacity-50 pointer-events-none' : ''
                  }`}
                >
                  <div>
                    <FormLabel className="text-base sm:text-lg font-semibold">
                      2. Selecciona tus Prendas Base
                      <span className="ml-2 text-sm sm:text-base font-normal text-muted-foreground">
                        ({field.value?.length || 0}/5)
                      </span>
                    </FormLabel>
                    <FormDescription className="text-sm sm:text-base text-muted-foreground mt-1 sm:mt-1.5">
                      {!baseCategoryId
                        ? 'Primero selecciona una categoría base en el paso 1'
                        : `Elige hasta 5 prendas que quieres considerar para tu outfit`}
                    </FormDescription>
                  </div>
                  <FormControl>
                    {isLoading && baseCategoryId ? (
                      <ClothingSelectorSkeleton />
                    ) : baseCategoryId && !isLoading ? (
                      <ClothingSelector
                        clothingItems={clothingItems}
                        field={field}
                        maxSelection={5}
                      />
                    ) : (
                      <div className="border-2 border-dashed rounded-lg p-8 sm:p-12 text-center">
                        <p className="text-sm sm:text-base text-muted-foreground">
                          Selecciona primero una categoría para ver tus prendas
                          disponibles
                        </p>
                      </div>
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categories"
              render={({ field }) => (
                <FormItem className="space-y-2 sm:space-y-3">
                  <div>
                    <FormLabel
                      htmlFor="categories-outfit"
                      className="text-base sm:text-lg font-semibold"
                    >
                      3. Categorías Complementarias
                    </FormLabel>
                    <FormDescription className="text-sm sm:text-base text-muted-foreground mt-1 sm:mt-1.5">
                      Selecciona qué otras prendas quieres que la IA combine con
                      tu base
                    </FormDescription>
                  </div>
                  <FormControl>
                    <CategoryMultiSelect
                      inputId="categories-outfit"
                      field={field}
                      maxSelections={6}
                      placeholder="Ej: Pantalones, Zapatos, Accesorios..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="occasions"
              render={({ field }) => (
                <FormItem className="space-y-2 sm:space-y-3">
                  <div>
                    <FormLabel className="text-base sm:text-lg font-semibold">
                      4. Ocasión del Outfit
                    </FormLabel>
                    <FormDescription className="text-sm sm:text-base text-muted-foreground mt-1 sm:mt-1.5">
                      Describe brevemente para qué ocasión es este outfit. Este
                      será el nombre con el que se guardará
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Input
                      className="py-5"
                      type="text"
                      maxLength={100}
                      placeholder='Ej: "Para una fiesta en la noche", "Reunión de trabajo formal", "Cita casual de café"...'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="space-y-2 sm:space-y-3">
                  <div>
                    <FormLabel className="text-base sm:text-lg font-semibold">
                      5. Detalles Adicionales (Opcional)
                    </FormLabel>
                    <FormDescription className="text-sm sm:text-base text-muted-foreground mt-1 sm:mt-1.5">
                      Describe tu estilo preferido, el clima, colores deseados o
                      cualquier preferencia especial
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Textarea
                      placeholder="Ejemplo: Quiero algo elegante pero cómodo para una cena. El clima estará fresco, así que prefiero mangas largas. Me gustan los colores neutros y estilo minimalista."
                      maxLength={500}
                      className="resize-none text-sm sm:text-base min-h-22"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="pt-4 sm:pt-6">
              <Button
                type="submit"
                size="lg"
                className="w-full sm:w-auto text-sm sm:text-base"
                disabled={isPending}
              >
                {isPending ? (
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

      <GeneratedOutfitModal
        open={showModal}
        onOpenChange={handleModalClose}
        outfitData={generatedOutfit}
        onSave={handleSaveOutfit}
        onGenerateAnother={handleGenerateAnother}
      />
    </>
  );
};

export default QuickOutfitForm;
