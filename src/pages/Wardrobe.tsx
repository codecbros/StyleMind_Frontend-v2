import { Plus } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetMyWardrobe } from '../api/generated/wardrobe/wardrobe';
import { ClothingCard } from '../components/ClothingCard';
import { ErrorFallback } from '../components/ErrorFallback';
import { WardrobeSkeleton } from '../components/skeletons/WardrobeSkeleton';
import { buttonVariants } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { COOKIE_KEYS } from '../constants/cookies';
import { PATHS } from '../constants/paths';
import { QUERY_KEYS } from '../constants/querys';
import { getCookie } from '../lib/auth-cookies';
import { cn } from '../lib/utils';

const Wardrobe = () => {
  const token = getCookie(COOKIE_KEYS.AUTH_TOKEN);
  const [searchQuery, setSearchQuery] = useState('');

  const { data, isError, isLoading } = useGetMyWardrobe(
    {},
    { query: { queryKey: [QUERY_KEYS.WARDROBE], enabled: !!token } }
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <WardrobeSkeleton />
      </div>
    );
  }

  if (isError) {
    return <ErrorFallback />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Mi Guardaropa
              </h1>
              <p className="text-muted-foreground mt-1">
                {data?.data?.length}{' '}
                {data?.data?.length === 1 ? 'prenda' : 'prendas'}
              </p>
            </div>
            {/* Desktop button - hidden on mobile */}
            <Link
              to={PATHS.NewClothing}
              className={cn(
                buttonVariants({ variant: 'default', size: 'lg' }),
                'hidden md:flex cursor-pointer'
              )}
            >
              <Plus className="mr-2 size-2" />
              Agregar Prenda
            </Link>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      {/* <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground cursor-pointer" />
            <Input
              type="search"
              placeholder="Buscar por nombre o categoría..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </div> */}

      {/* Clothing Grid */}
      <div className="container mx-auto px-8 pb-24 md:pb-12">
        {data?.data?.length !== 0 ? (
          <Card className="mt-5">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="text-muted-foreground text-center">
                {searchQuery
                  ? 'No se encontraron prendas con esa búsqueda'
                  : 'No tienes prendas en tu guardaropa aún'}
              </p>
              {!searchQuery && (
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
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {data.data.map((item) => (
              <ClothingCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>

      <Link
        to={PATHS.NewClothing}
        aria-label="Agregar prenda"
        className={cn(
          buttonVariants({ size: 'lg' }),
          'fixed bottom-6 right-6 z-50 size-14 rounded-full p-0 shadow-lg md:hidden cursor-pointer'
        )}
      >
        <Plus className="size-4" />
      </Link>
    </div>
  );
};

export default Wardrobe;
