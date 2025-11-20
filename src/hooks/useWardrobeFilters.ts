import { useState } from 'react';

export const useWardrobeFilters = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryId, setCategoryId] = useState<string | undefined>(undefined);

  const resetFilters = () => {
    setSearchQuery('');
    setCategoryId(undefined);
  };

  const hasActiveFilters = searchQuery !== '' || categoryId !== undefined;

  return {
    searchQuery,
    setSearchQuery,
    categoryId,
    setCategoryId,
    resetFilters,
    hasActiveFilters,
  };
};
