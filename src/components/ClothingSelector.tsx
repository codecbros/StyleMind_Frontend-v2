import { Check, Search, ShirtIcon } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PATHS } from '../constants/paths';
import { cn } from '../lib/utils';
import type { ClothingItem } from '../types/clothing';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Input } from './ui/input';

type ClothingSelectorProps = {
  clothingItems: ClothingItem[] | undefined;
  selectedIds?: string[];
  maxSelection?: number;
  onSelectionChange?: (selectedIds: string[]) => void;
};

const PREVIEW_LIMIT = 5;

const ClothingSelector = ({ clothingItems }: ClothingSelectorProps) => {
  const [showAllModal, setShowAllModal] = useState(false);

  if (clothingItems === undefined || !clothingItems) {
    return null;
  }

  if (clothingItems?.length === 0) {
    return (
      <div className="rounded-lg border-2 border-dashed p-4 text-center space-y-4">
        <div className="flex justify-center">
          <div className="rounded-full bg-muted p-4 sm:p-6">
            <ShirtIcon className="size-8 sm:size-10 text-muted-foreground" />
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-base sm:text-lg font-medium text-foreground">
            No tienes prendas de esta categoría
          </p>
          <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto">
            Agrega prendas a tu guardaropa para poder crear outfits increíbles
            con ellas
          </p>
        </div>
        <Button asChild className="mt-2">
          <Link to={PATHS.NewClothing}>Ir al Guardaropa</Link>
        </Button>
      </div>
    );
  }

  const ClothingGrid = ({
    itemsToShow,
  }: {
    itemsToShow: ClothingItem[] | undefined;
  }) => {
    return (
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
        {itemsToShow?.map((item) => {
          const isSelected = false; // mocked for now
          const isDisabled = false; // mocked for now

          return (
            <button
              key={item.id}
              type="button"
              className={cn(
                'group relative overflow-hidden rounded-lg border-2 transition-all',
                isSelected && 'border-primary shadow-md ring-2 ring-primary/20',
                !isSelected &&
                  !isDisabled &&
                  'border-border hover:border-primary/50 hover:shadow-md',
                isDisabled && 'cursor-not-allowed opacity-50'
              )}
            >
              {/* Checkbox indicator */}
              <div
                className={cn(
                  'absolute right-2 top-2 z-10 flex size-5 sm:size-6 items-center justify-center rounded-full border-2 transition-all shadow-sm',
                  isSelected
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-muted-foreground/30 bg-background/90 backdrop-blur-sm group-hover:border-primary/50'
                )}
              >
                {isSelected && <Check className="size-3 sm:size-4" />}
              </div>

              <div className="aspect-square overflow-hidden bg-muted">
                <img
                  src={item.images?.[0].url || '/placeholder.svg'}
                  alt={item.name}
                  className={cn(
                    'size-full object-cover transition-transform',
                    !isDisabled && 'group-hover:scale-105'
                  )}
                  loading="lazy"
                />
              </div>

              <div className="space-y-1 sm:space-y-1.5 p-2 sm:p-3 flex flex-col items-center">
                <p className="truncate text-xs sm:text-sm font-medium leading-tight">
                  {item.name}
                </p>
                <Badge variant="secondary" className="text-[10px] sm:text-xs">
                  {item.style}
                </Badge>
              </div>
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <>
      <div className="space-y-3 sm:space-y-4">
        <ClothingGrid itemsToShow={clothingItems?.slice(0, PREVIEW_LIMIT)} />

        {clothingItems?.length > PREVIEW_LIMIT && (
          <Button
            type="button"
            variant="outline"
            className="w-full text-sm sm:text-base bg-transparent cursor-pointer"
            onClick={() => setShowAllModal(true)}
          >
            Ver todas las prendas ({clothingItems?.length})
          </Button>
        )}
      </div>

      {clothingItems?.length > PREVIEW_LIMIT && (
        <Dialog open={showAllModal} onOpenChange={setShowAllModal}>
          <DialogContent className="max-w-5xl max-h-[90vh] flex flex-col p-0">
            <DialogHeader className="px-4 sm:px-6 pt-4 sm:pt-6 pb-3 sm:pb-4 border-b">
              <DialogTitle className="text-lg sm:text-xl">
                Selecciona tus prendas
              </DialogTitle>
              <DialogDescription className="text-sm sm:text-base">
                {/* Seleccionadas: {selectedIds.length} / {maxSelection} */}
              </DialogDescription>
            </DialogHeader>

            {/* Buscador */}
            <div className="px-4 sm:px-6 py-3 sm:py-4 border-b bg-muted/30">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Buscar por nombre de prenda..."
                  // value={searchQuery}
                  // onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 text-sm sm:text-base"
                />
              </div>
            </div>

            {/* Grid scrolleable */}
            <div className="overflow-y-auto flex-1 px-4 sm:px-6 py-4 sm:py-6">
              {/* {filteredItems.length === 0 ? (
              <div className="text-center py-8 sm:py-12 text-muted-foreground text-sm sm:text-base">
                No se encontraron prendas con &quot;{searchQuery}&quot;
              </div>
            ) : (
              <ClothingGrid itemsToShow={filteredItems} />
            )} */}
            </div>

            {/* Footer con botón cerrar */}
            <div className="px-4 sm:px-6 py-3 sm:py-4 border-t bg-muted/30">
              <Button
                type="button"
                // onClick={() => setShowAllModal(false)}
                className="w-full sm:w-auto text-sm sm:text-base"
              >
                {/* Listo ({selectedIds.length} seleccionadas) */}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default ClothingSelector;
