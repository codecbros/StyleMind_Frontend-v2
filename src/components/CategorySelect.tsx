import RSelect from 'react-select';
import { useGetMyCategories } from '../api/generated/categories/categories';
import { COOKIE_KEYS } from '../constants/cookies';
import { QUERY_KEYS } from '../constants/querys';
import { getCookie } from '../lib/auth-cookies';
import type { Category } from '../types/category';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';

type CategorySelectProps = {
  name: string;
  form: any;
  label?: string;
  placeholder?: string;
  onChange?: (categoryId: string | null) => void;
  required?: boolean;
};

const CategorySelect = ({
  form,
  name,
  label = 'Categoría',
  placeholder = 'Selecciona una categoría',
  onChange,
  required = false,
}: CategorySelectProps) => {
  const token = getCookie(COOKIE_KEYS.AUTH_TOKEN);
  const {
    data: categories,
    isError,
    isLoading,
  } = useGetMyCategories(
    {},
    {
      query: {
        queryKey: [QUERY_KEYS.MY_CATEGORIES],
        enabled: !!token,
        select: (response: any) => (response?.data as Category[]) || [],
      },
    }
  );

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        const handleChange = (option: any) => {
          const value = option ? option.value : null;
          field.onChange(value);
          if (onChange) {
            onChange(value);
          }
        };

        const selectedValue = field.value
          ? {
              value: field.value,
              label:
                categories?.find((category) => category.id === field.value)
                  ?.name || '',
            }
          : null;

        return (
          <FormItem>
            {label && (
              <FormLabel className="text-xs font-semibold uppercase tracking-wider">
                {label}
                {required && <span className="text-destructive ml-1">*</span>}
              </FormLabel>
            )}
            <FormControl>
              <RSelect
                isDisabled={isError}
                isLoading={isLoading}
                className="react-select"
                classNamePrefix="react-select"
                isClearable
                options={categories?.map((category) => ({
                  value: category.id,
                  label: category.name,
                }))}
                onChange={handleChange}
                value={selectedValue}
                placeholder={placeholder}
                noOptionsMessage={() => 'No hay categorías disponibles'}
                loadingMessage={() => 'Cargando...'}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default CategorySelect;
