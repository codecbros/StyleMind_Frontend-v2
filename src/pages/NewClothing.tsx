import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import RSelect from 'react-select';
import { useGetMyCategories } from '../api/generated/categories/categories';
import type { CreateClothesDto } from '../api/generated/schemas';
import {
  useAddClothes,
  useUploadClothesImages,
} from '../api/generated/wardrobe/wardrobe';
import CenteredContainer from '../components/CenteredContainer';
import type { FilesType } from '../components/ImageUpload';
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
import { COOKIE_KEYS } from '../constants/cookies';
import { QUERY_KEYS } from '../constants/querys';
import { getCookie } from '../lib/auth-cookies';
import { ErrorToast, SuccessToast } from '../lib/toast';
import { wardrobeItemSchema } from '../schemas/newClothingSchema';

const NewClothing = () => {
  const [fileObjects, setFileObjects] = useState<FilesType[]>([]); // Para la UI con previews
  const [originalFiles, setOriginalFiles] = useState<File[]>([]); // Para enviar al backend
  const [isImagesUploading, setIsImagesUploading] = useState(false);

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

  const token = getCookie(COOKIE_KEYS.AUTH_TOKEN);
  const { mutate: addClothes, isPending } = useAddClothes();
  const { mutate: uploadImage, isPending: isUploadingImages } =
    useUploadClothesImages();

  const onSubmit = async (formData: any) => {
    addClothes(
      { data: formData },
      {
        onSuccess: (response) => {
          SuccessToast({
            title: `La prenda ${formData.name} ha sido guardada exitosamente`,
          });

          const { id } = response.data;

          // Subir imágenes si existen
          if (originalFiles.length > 0 && id) {
            setIsImagesUploading(true);

            uploadImage(
              {
                itemId: id,
                data: { files: originalFiles },
              },
              {
                onSuccess: () => {
                  SuccessToast({
                    title: '¡Imágenes subidas!',
                    description: 'Las imágenes se han subido correctamente.',
                  });
                  setIsImagesUploading(false);

                  setFileObjects([]);
                  setOriginalFiles([]);
                },
                onError: () => {
                  ErrorToast({
                    title: 'Error al subir las imágenes',
                  });
                  setIsImagesUploading(false);
                },
              }
            );
          } else {
            setFileObjects([]);
            setOriginalFiles([]);
          }

          form.reset();
        },
        onError: (error) => {
          ErrorToast({
            title:
              `${error?.response?.data?.message}, intenta cambiando el nombre a la prenda o de categoria` ||
              'Error al guardar la prenda. Por favor, revisa los datos ingresados',
          });
        },
      }
    );
  };

  const { data, isError, isLoading } = useGetMyCategories(
    {},
    {
      query: {
        queryKey: [QUERY_KEYS.MY_CATEGORIES],
        enabled: !!token,
      },
    }
  );

  const categories = data?.data || [];

  return (
    <>
      <h1 className="text-center text-2xl lg:text-3xl uppercase font-extrabold">
        Nueva Prenda
      </h1>
      <CenteredContainer>
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
                fileObjects={fileObjects}
                originalFiles={originalFiles}
                setFileObjects={setFileObjects}
                setOriginalFiles={setOriginalFiles}
                isImagesUploading={isImagesUploading}
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
                        Categorías
                      </FormLabel>
                      <FormControl>
                        {field && (
                          <RSelect
                            isDisabled={isError}
                            isLoading={isLoading}
                            className="react-select"
                            isMulti
                            options={categories.map((category) => ({
                              value: category.id,
                              label: category.name,
                            }))}
                            onChange={(selectedOptions) => {
                              field.onChange(
                                selectedOptions.map((option) => option.value)
                              );
                            }}
                            value={field.value.map((value) => ({
                              value,
                              label:
                                categories.find(
                                  (category) => category.id === value
                                )?.name || '',
                            }))}
                            placeholder="Selecciona una o varias categorías"
                          />
                        )}
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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
                        defaultValue={field.value}
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
                        defaultValue={field.value}
                      >
                        <FormControl className="py-5">
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="¿Cuándo la usas más?" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {CLOTHING_CONSTANTS.seasons.map((season) => (
                            <SelectItem key={season.value} value={season.value}>
                              {season.label}
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
                        <Input
                          className="py-5"
                          placeholder="Ej: Negro, Azul marino, Beige"
                          {...field}
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
                        <Input
                          className="py-5"
                          placeholder="Ej: Rayas blancas, Detalles dorados"
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
                    <FormDescription>
                      Describe características especiales, estado, combinaciones
                      sugeridas o cualquier detalle relevante (máximo 1000
                      caracteres).
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                className="font-semibold w-full md:w-max order-1 md:order-3"
                type="submit"
                disabled={isPending || isUploadingImages}
              >
                {(isPending || isUploadingImages) && (
                  <LoaderCircle className="animate-spin w-4 h-4 mr-1" />
                )}
                {isPending || isUploadingImages ? 'Guardando...' : 'Guardar'}
              </Button>
            </form>
          </Form>
        </Card>
      </CenteredContainer>
    </>
  );
};

export default NewClothing;
