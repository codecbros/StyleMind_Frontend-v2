import { Plus } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetMyWardrobe } from '../api/generated/wardrobe/wardrobe';
import { ClothingCard } from '../components/ClothingCard';
import { ClothingDetailsDialog } from '../components/ClothingDetailsDialog';
import { ErrorFallback } from '../components/ErrorFallback';
import { ClothingGridSkeleton } from '../components/skeletons/WardrobeSkeleton';
import { buttonVariants } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Skeleton } from '../components/ui/skeleton';
import { WardrobeFilters } from '../components/WardrobeFilters';
import { COOKIE_KEYS } from '../constants/cookies';
import { PATHS } from '../constants/paths';
import { QUERY_KEYS } from '../constants/querys';
import { useDebounce } from '../hooks/useDebounce';
import { useWardrobeFilters } from '../hooks/useWardrobeFilters';
import { getCookie } from '../lib/auth-cookies';
import { cn } from '../lib/utils';
import type { WardrobeItem } from '../types/clothing';

const Wardrobe = () => {
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const filters = useWardrobeFilters();
  const { searchQuery, categoryId, hasActiveFilters } = filters;

  const token = getCookie(COOKIE_KEYS.AUTH_TOKEN);
  const debouncedSearch = useDebounce(searchQuery, 500);

  const {
    data: wardrobeItems,
    isError,
    isLoading,
  } = useGetMyWardrobe(
    {
      limit: 20,
      search: debouncedSearch || undefined,
      categoryId: categoryId || undefined,
      status: true,
    },
    {
      query: {
        queryKey: [QUERY_KEYS.WARDROBE, debouncedSearch, categoryId],
        enabled: !!token,
        select: (response: any) => response?.data as WardrobeItem[] | undefined,
      },
    }
  );

  if (isError || wardrobeItems instanceof Error) {
    return <ErrorFallback />;
  }

  return (
    <div className="sm:px-3">
      <div className="container mx-auto min-h-screen bg-background px-5 md:px-8 xl:px-10 rounded-md">
        {/* Header */}
        <div className="border-b bg-card">
          <div className="container mx-auto py-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  Mi Guardaropa
                </h1>
                {isLoading ? (
                  <Skeleton className="h-4 w-32 mt-3" />
                ) : (
                  <p className="text-muted-foreground mt-1">
                    {wardrobeItems?.length}{' '}
                    {wardrobeItems?.length === 1 ? 'prenda' : 'prendas'}
                  </p>
                )}
              </div>
              {/* Desktop button - hidden on mobile */}
              <Link
                to={PATHS.NewClothing}
                className={cn(
                  buttonVariants({ variant: 'default', size: 'lg' }),
                  'hidden md:flex cursor-pointer'
                )}
              >
                <Plus className="mr-1 size-4" />
                Agregar Prenda
              </Link>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="space-y-4 my-8">
          <div className="flex items-center gap-3">
            <h3 className="text-base md:text-lg font-semibold uppercase tracking-wide text-foreground whitespace-nowrap">
              Filtros
            </h3>
          </div>
          <WardrobeFilters filters={filters} />
        </div>

        {/* Clothing Grid */}
        <div className="container mx-auto pb-12">
          {isLoading ? (
            <ClothingGridSkeleton />
          ) : wardrobeItems?.length === 0 ? (
            <Card className="mt-5">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <p className="text-muted-foreground text-center">
                  {hasActiveFilters
                    ? 'No se encontraron prendas con los filtros aplicados'
                    : 'No tienes prendas en tu guardaropa aún'}
                </p>
                {!hasActiveFilters && (
                  <Link
                    to={PATHS.NewClothing}
                    className={cn(
                      buttonVariants({ variant: 'outline', size: 'default' }),
                      'mt-4'
                    )}
                  >
                    <Plus className="mr-2 size-4" />
                    Agregar primera prenda
                  </Link>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-auto-fill gap-6">
              {wardrobeItems?.map((item) => (
                <ClothingCard
                  key={item.id}
                  item={item}
                  onSelect={() => {
                    setSelectedItemId(item.id);
                    setAddDialogOpen(true);
                  }}
                />
              ))}
            </div>
          )}
        </div>

        <Link
          to={PATHS.NewClothing}
          aria-label="Agregar prenda"
          className={cn(
            buttonVariants({ size: 'lg' }),
            'fixed bottom-6 right-6 z-50 size-9 rounded-full p-0 shadow-lg md:hidden cursor-pointer'
          )}
        >
          <Plus className="size-4" />
        </Link>
      </div>
      <ClothingDetailsDialog
        itemId={selectedItemId}
        open={addDialogOpen}
        onOpenChange={setAddDialogOpen}
      />
    </div>
  );
};

export default Wardrobe;
