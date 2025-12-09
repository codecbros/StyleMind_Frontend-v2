import { useInfiniteQuery } from '@tanstack/react-query';
import { getMyWardrobe } from '../api/generated/wardrobe/wardrobe';
import { COOKIE_KEYS } from '../constants/cookies';
import { QUERY_KEYS } from '../constants/querys';
import { getCookie } from '../lib/auth-cookies';
import type { WardrobeItem } from '../types/clothing';

// Hook personalizado para infinite scroll
export const useInfiniteWardrobe = ({
  search,
  categoryId,
  limit = 20,
}: {
  search?: string;
  categoryId?: string;
  limit?: number;
}) => {
  const token = getCookie(COOKIE_KEYS.AUTH_TOKEN);

  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.WARDROBE, search, categoryId],
    queryFn: ({ pageParam = 1 }) =>
      getMyWardrobe({
        page: pageParam,
        limit,
        search: search || undefined,
        categoryId: categoryId || undefined,
        status: true,
      }),
    getNextPageParam: (lastPage: any) => {
      return lastPage?.hasMore ? lastPage?.nextPage : undefined;
    },
    initialPageParam: 1,
    enabled: !!token,
    select: (data: any) => {
      const items = data.pages.flatMap(
        (page: any) => page?.data || []
      ) as WardrobeItem[];
      return {
        items,
        totalPages: data.pages[0]?.totalPages || 0,
        total: data.pages[0]?.total || 0,
      };
    },
  });
};
