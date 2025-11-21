import { Search, X } from 'lucide-react';
import RSelect from 'react-select';
import { useGetMyCategories } from '../api/generated/categories/categories';
import { COOKIE_KEYS } from '../constants/cookies';
import { QUERY_KEYS } from '../constants/querys';
import { getCookie } from '../lib/auth-cookies';
import type { Category } from '../types/category';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface WardrobeFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  categoryId?: string;
  onCategoryChange: (value?: string) => void;
  onReset: () => void;
  hasActiveFilters: boolean;
}

export function WardrobeFilters({
  search,
  onSearchChange,
  categoryId,
  onCategoryChange,
  onReset,
  hasActiveFilters,
}: WardrobeFiltersProps) {
  const token = getCookie(COOKIE_KEYS.AUTH_TOKEN);

  const { data: categories, isLoading: isCategoriesLoading } =
    useGetMyCategories(
      {},
      {
        query: {
          queryKey: [QUERY_KEYS.MY_CATEGORIES],
          enabled: !!token,
          select: (response: any) => (response?.data as Category[]) || [],
        },
      }
    );

  const categoryOptions =
    categories?.map((cat) => ({
      value: cat.id,
      label: cat.name,
    })) || [];

  const selectedCategory = categoryId
    ? categoryOptions.find((opt) => opt.value === categoryId)
    : null;

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Buscar por nombre..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 py-5"
        />
      </div>

      <div className="flex-1">
        <RSelect
          isClearable
          isLoading={isCategoriesLoading}
          className="react-select"
          classNamePrefix="react-select"
          options={categoryOptions}
          value={selectedCategory}
          onChange={(option) => onCategoryChange(option?.value)}
          placeholder="Filtrar por categoría"
        />
      </div>

      {hasActiveFilters && (
        <Button variant="outline" onClick={onReset} className="shrink-0">
          <X className="mr-2 size-4" />
          Limpiar
        </Button>
      )}
    </div>
  );
}
