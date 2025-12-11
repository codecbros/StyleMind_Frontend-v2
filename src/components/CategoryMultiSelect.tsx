import type { ControllerRenderProps } from 'react-hook-form';
import RSelect from 'react-select';
import { useGetMyCategories } from '../api/generated/categories/categories';
import { COOKIE_KEYS } from '../constants/cookies';
import { QUERY_KEYS } from '../constants/querys';
import { getCookie } from '../lib/auth-cookies';
import type { Category } from '../types/category';

type CategoryMultiSelectProps = {
  field: ControllerRenderProps<any, any>;
  maxSelections?: number;
  placeholder?: string;
  onChange?: (categoryIds: string[]) => void;
  inputId?: string;
};

const CategoryMultiSelect = ({
  field,
  maxSelections = 7,
  placeholder = 'Selecciona una o varias categorías',
  onChange,
  inputId,
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
      label: categories?.find((category) => category.id === value)?.name || '',
    })) || [];

  return (
    <RSelect
      inputId={inputId}
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
  );
};

export default CategoryMultiSelect;
