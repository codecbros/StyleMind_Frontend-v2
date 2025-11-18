import { Plus } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetMyWardrobe } from '../api/generated/wardrobe/wardrobe';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { COOKIE_KEYS } from '../constants/cookies';
import { PATHS } from '../constants/paths';
import { QUERY_KEYS } from '../constants/querys';
import { getCookie } from '../lib/auth-cookies';

const Wardrobe = () => {
  const token = getCookie(COOKIE_KEYS.AUTH_TOKEN);
  // const [addDialogOpen, setAddDialogOpen] = useState(false);
  // const [selectedItem, setSelectedItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const { data, isError, isLoading } = useGetMyWardrobe(
    {},
    { query: { queryKey: [QUERY_KEYS.WARDROBE], enabled: !!token } }
  );

  // const filteredItems = data?.data?.filter(
  //   (item) =>
  //     item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     item.categories.some((cat) =>
  //       cat.toLowerCase().includes(searchQuery.toLowerCase())
  //     )
  // );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Error loading wardrobe.
      </div>
    );
  }
  console.log(data.data.length);

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
            <Button
              onClick={() => navigate(PATHS.NewClothing)}
              size="lg"
              className="hidden md:flex cursor-pointer"
            >
              <Plus className="mr-2 size-2" />
              Agregar Prenda
            </Button>
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
      <div className="container mx-auto px-4 pb-24 md:pb-12">
        {data.data?.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="text-muted-foreground text-center">
                {searchQuery
                  ? 'No se encontraron prendas con esa búsqueda'
                  : 'No tienes prendas en tu guardaropa aún'}
              </p>
              {!searchQuery && (
                <Button
                  onClick={() => navigate(PATHS.NewClothing)}
                  variant="outline"
                  className="mt-4"
                >
                  <Plus className="mr-2 size-4" />
                  Agregar tu primera prenda
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {/* {filteredItems.map((item) => (
              <ClothingCard
                key={item.id}
                item={item}
                onSelect={() => setSelectedItem(item)}
              />
            ))} */}
          </div>
        )}
      </div>

      <Button
        onClick={() => navigate(PATHS.NewClothing)}
        size="lg"
        className="fixed bottom-6 right-6 z-50 size-14 rounded-full p-0 shadow-lg md:hidden cursor-pointer"
        aria-label="Agregar prenda"
      >
        <Plus className="size-6" />
      </Button>

      {/* Details Dialog
      <ClothingDetailsDialog
        item={selectedItem}
        open={!!selectedItem}
        onOpenChange={(open) => !open && setSelectedItem(null)}
      /> */}
    </div>
  );
};

export default Wardrobe;
