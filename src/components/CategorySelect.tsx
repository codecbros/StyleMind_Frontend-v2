import type { ControllerRenderProps } from 'react-hook-form';
import RSelect from 'react-select';
import { useGetMyCategories } from '../api/generated/categories/categories';
import { COOKIE_KEYS } from '../constants/cookies';
import { QUERY_KEYS } from '../constants/querys';
import { getCookie } from '../lib/auth-cookies';
import type { Category } from '../types/category';

type CategoryFieldValues = {
  [key: string]: string | null;
};

type CategorySelectProps = {
  field: ControllerRenderProps<CategoryFieldValues, any>;
  placeholder?: string;
  onChange?: (categoryId: string | null) => void;
  inputId?: string;
  className?: string;
};

const CategorySelect = ({
  field,
  placeholder = 'Selecciona una categoría',
  onChange,
  inputId,
  className,
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

  const handleChange = (option: { value: string } | null) => {
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
          categories?.find((category) => category.id === field.value)?.name ||
          '',
      }
    : null;

  return (
    <RSelect
      inputId={inputId}
      isDisabled={isError}
      isLoading={isLoading}
      className={`react-select ${className || ''}`}
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
  );
};

export default CategorySelect;
