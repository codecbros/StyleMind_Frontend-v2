import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { LoaderCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import type { CreateClothesDto } from '../api/generated/schemas';
import {
  useAddClothes,
  useUploadClothesImages,
} from '../api/generated/wardrobe/wardrobe';
import CategoryMultiSelect from '../components/CategoryMultiSelect';
import CenteredContainer from '../components/CenteredContainer';
import { ColorPicker } from '../components/ColorPicker';
import ImageUploader from '../components/ImageUpload';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../components/ui/form';
import { Input } from '../components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { Textarea } from '../components/ui/textarea';
import { CLOTHING_CONSTANTS } from '../constants/clothing';
import { QUERY_KEYS } from '../constants/querys';
import { SEASON_OPTIONS } from '../helpers/season-helper';
import { useImageUploader } from '../hooks/useImageUpload';
import { ErrorToast, SuccessToast, WarningToast } from '../lib/toast';
import { wardrobeItemSchema } from '../schemas/newClothingSchema';

const NewClothing = () => {
  const { mutate: addClothes, isPending } = useAddClothes();
  const { mutate: uploadImage, isPending: isUploadingImages } =
    useUploadClothesImages();
  const { images, addImages, removeImage, getFiles, clearImages } =
    useImageUploader();
  const queryClient = useQueryClient();

  const defaultValues: CreateClothesDto = {
    name: '',
    description: '',
    season: '',
    primaryColor: '',
    secondaryColor: '',
    style: '',
    material: '',
    size: '',
    categoriesId: [] as string[],
  };

  const form = useForm({
    resolver: zodResolver(wardrobeItemSchema),
    defaultValues,
  });

  const onSubmit = async (formData: any) => {
    const files = getFiles();

    if (files.length <= 0) {
      WarningToast({
        title: 'Imagen requerida',
        description: 'Debes agregar al menos una foto de la prenda',
      });
      return;
    }

    addClothes(
      { data: formData },
      {
        onSuccess: (response: any) => {
          SuccessToast({
            title: `La prenda ${formData.name} ha sido guardada exitosamente`,
          });

          const { id } = response.data;

          // Subir imágenes si existen
          if (files.length > 0 && id) {
            uploadImage(
              {
                itemId: id,
                data: { files },
              },
              {
                onSuccess: () => {
                  queryClient.invalidateQueries({
                    queryKey: [QUERY_KEYS.WARDROBE],
                  });
                  SuccessToast({
                    title: '¡Imágenes subidas!',
                    description: 'Las imágenes se han subido correctamente.',
                  });
                  clearImages();
                },
                onError: () => {
                  ErrorToast({
                    title: 'Error al subir las imágenes',
                  });
                },
              }
            );
          } else {
            clearImages();
          }

          form.reset();
        },
        onError: (error: any) => {
          ErrorToast({
            title: error?.response?.data?.message
              ? `${error.response.data.message}. Intenta cambiando el nombre de la prenda o la categoría`
              : 'Error al guardar la prenda. Por favor, revisa los datos ingresados',
          });
        },
      }
    );
  };

  return (
    <>
      <h1 className="text-center text-2xl lg:text-3xl uppercase font-extrabold">
        Nueva Prenda
      </h1>
      <CenteredContainer className="px-5">
        <Card className="w-full px-4 sm:px-6 md:px-8 lg:px-10 py-6 md:py-8">
          <h4 className="mb-3 text-lg font-semibold">
            Cuanta más información proporciones, mejores serán las combinaciones
          </h4>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-10"
            >
              <ImageUploader
                images={images}
                onAddImages={addImages}
                onRemoveImage={removeImage}
                isUploading={isUploadingImages}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-semibold uppercase tracking-wider">
                        Nombre de la prenda
                      </FormLabel>
                      <FormControl>
                        {field && (
                          <Input
                            className="py-5"
                            placeholder="Ej: Camisa Oxford azul, Jeans slim fit negro"
                            maxLength={100}
                            {...field}
                          />
                        )}
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="categoriesId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-semibold uppercase tracking-wider">
                        Categorias
                      </FormLabel>
                      <FormControl>
                        <CategoryMultiSelect
                          field={field}
                          maxSelections={3}
                          placeholder="Selecciona hasta 3 categorías"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid sm:grid-cols-2 md:col-span-2 gap-6 ">
                  <FormField
                    control={form.control}
                    name="size"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-semibold uppercase tracking-wider">
                          Talla
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl className="py-5">
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Selecciona tu talla" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {CLOTHING_CONSTANTS.sizes.map((size) => (
                              <SelectItem key={size.value} value={size.value}>
                                {size.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="season"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-semibold uppercase tracking-wider">
                          Temporada
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl className="py-5">
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="¿Cuándo la usas más?" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {SEASON_OPTIONS.map((season) => (
                              <SelectItem
                                key={season.value}
                                value={season.value}
                              >
                                {season.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="material"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-semibold uppercase tracking-wider">
                        Material
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="py-5"
                          placeholder="Ej: 100% algodón, Mezclilla, Cuero genuino"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="style"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-semibold uppercase tracking-wider">
                        Estilo
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="py-5"
                          placeholder="Ej: Casual elegante, Deportivo, Bohemio"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="primaryColor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-semibold uppercase tracking-wider">
                        Color principal
                      </FormLabel>
                      <FormControl>
                        <ColorPicker
                          value={field.value}
                          onValueChange={field.onChange}
                          allowEmpty={false}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="secondaryColor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-semibold uppercase tracking-wider">
                        Color secundario (opcional)
                      </FormLabel>
                      <FormControl>
                        <ColorPicker
                          value={field.value}
                          onValueChange={field.onChange}
                          allowEmpty={true}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="-mt-4">
                    <FormLabel className="text-xs font-semibold uppercase tracking-wider">
                      Descripción de la prenda
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        className="resize-none min-h-[100px]"
                        placeholder="Ej: Blusa de seda con mangas largas, perfecta para ocasiones formales. Tiene detalles de encaje en el cuello..."
                        maxLength={1000}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                    <FormDescription>
                      Describe características especiales, estado, combinaciones
                      sugeridas o cualquier detalle relevante (máximo 1000
                      caracteres).
                    </FormDescription>
                  </FormItem>
                )}
              />

              <Button
                className="font-semibold w-full md:w-max ml-auto cursor-pointer"
                type="submit"
                aria-label="Guardar prenda"
                disabled={isPending || isUploadingImages}
              >
                {(isPending || isUploadingImages) && (
                  <LoaderCircle className="animate-spin w-4 h-4 mr-1" />
                )}
                {isPending || isUploadingImages
                  ? 'Guardando...'
                  : 'Guardar prenda'}
              </Button>
            </form>
          </Form>
        </Card>
      </CenteredContainer>
    </>
  );
};

export default NewClothing;
