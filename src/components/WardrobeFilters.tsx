import { Search, X } from 'lucide-react';
import { useMemo } from 'react';
import RSelect from 'react-select';
import type { useWardrobeFilters } from '../hooks/useWardrobeFilters';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface WardrobeFiltersProps {
  filters: ReturnType<typeof useWardrobeFilters>;
  hasItems?: boolean;
}

export function WardrobeFilters({ filters }: WardrobeFiltersProps) {
  const {
    searchQuery,
    setSearchQuery,
    categoryId,
    setCategoryId,
    categories,
    isCategoriesLoading,
    resetFilters,
    hasActiveFilters,
  } = filters;

  const categoryOptions = useMemo(
    () => categories?.map((cat) => ({ value: cat.id, label: cat.name })) || [],
    [categories]
  );

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
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
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
          onChange={(option) => setCategoryId(option?.value)}
          placeholder="Filtrar por categoría"
        />
      </div>

      {hasActiveFilters && (
        <Button variant="outline" onClick={resetFilters} className="shrink-0">
          <X className="mr-2 size-4" />
          Limpiar
        </Button>
      )}
    </div>
  );
}
