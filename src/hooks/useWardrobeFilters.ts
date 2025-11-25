import { useState } from 'react';
import { useGetMyCategories } from '../api/generated/categories/categories';
import { COOKIE_KEYS } from '../constants/cookies';
import { QUERY_KEYS } from '../constants/querys';
import { getCookie } from '../lib/auth-cookies';
import type { Category } from '../types/category';

export const useWardrobeFilters = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryId, setCategoryId] = useState<string | undefined>(undefined);

  const token = getCookie(COOKIE_KEYS.AUTH_TOKEN);

  const {
    data: categories,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
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
    categories: categories || [],
    isCategoriesLoading,
    isCategoriesError,
    resetFilters,
    hasActiveFilters,
  };
};
