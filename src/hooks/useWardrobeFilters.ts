import { useState } from 'react';

export const useWardrobeFilters = () => {
  const [search, setSearch] = useState('');
  const [categoryId, setCategoryId] = useState<string | undefined>(undefined);

  const resetFilters = () => {
    setSearch('');
    setCategoryId(undefined);
  };

  const hasActiveFilters = search !== '' || categoryId !== undefined;

  return {
    search,
    setSearch,
    categoryId,
    setCategoryId,
    resetFilters,
    hasActiveFilters,
  };
};
