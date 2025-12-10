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

type CategoryMultiSelectProps = {
  name: string;
  form: any;
  label?: string;
  showLabel?: boolean;
  maxSelections?: number;
  placeholder?: string;
  onChange?: (categoryIds: string[]) => void;
  required?: boolean;
};

const CategoryMultiSelect = ({
  form,
  name,
  label = 'Categorías',
  showLabel = true,
  maxSelections = 7,
  placeholder = 'Selecciona una o varias categorías',
  onChange,
  required = false,
}: CategoryMultiSelectProps) => {
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
        const selectedCount = field.value?.length || 0;

        const handleChange = (selectedOptions: any) => {
          const options = selectedOptions as any[];
          const categoryIds = options.map((option) => option.value);

          if (categoryIds.length <= maxSelections) {
            field.onChange(categoryIds);
            if (onChange) {
              onChange(categoryIds);
            }
          }
        };

        const selectedValues =
          field.value?.map((value: string) => ({
            value,
            label:
              categories?.find((category) => category.id === value)?.name || '',
          })) || [];

        return (
          <FormItem>
            {showLabel && (
              <FormLabel className="text-xs font-semibold uppercase tracking-wider">
                {label}
                {required && <span className="text-destructive ml-1">*</span>}
                {selectedCount > 0 && (
                  <span className="ml-2 text-xs font-normal text-muted-foreground">
                    ({selectedCount}/{maxSelections})
                  </span>
                )}
              </FormLabel>
            )}
            <FormControl>
              <RSelect
                isDisabled={isError}
                isLoading={isLoading}
                className="react-select"
                classNamePrefix="react-select"
                isClearable
                isMulti
                options={categories?.map((category) => ({
                  value: category.id,
                  label: category.name,
                }))}
                onChange={handleChange}
                value={selectedValues}
                placeholder={placeholder}
                isOptionDisabled={() => selectedCount >= maxSelections}
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

export default CategoryMultiSelect;
