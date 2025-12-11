import { Check, ShirtIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PATHS } from '../constants/paths';
import { cn } from '../lib/utils';
import type { ClothingItem } from '../types/clothing';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

type ClothingSelectorProps = {
  clothingItems: ClothingItem[] | undefined;
  selectedIds?: string[];
  maxSelection?: number;
  onSelectionChange?: (selectedIds: string[]) => void;
};

const ClothingSelector = ({
  clothingItems,
  selectedIds,
  maxSelection,
  onSelectionChange,
}: ClothingSelectorProps) => {
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

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
      {clothingItems?.map((item) => {
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

            {/* Image */}
            <div className="aspect-square overflow-hidden bg-muted">
              <img
                src={item.images?.[0].url || '/placeholder.svg'}
                alt={item.name}
                className={cn(
                  'size-full object-cover transition-transform',
                  !isDisabled && 'group-hover:scale-105'
                )}
              />
            </div>

            {/* Info */}
            <div className="space-y-1 sm:space-y-1.5 p-2 sm:p-3">
              <p className="truncate text-xs sm:text-sm font-medium leading-tight">
                {item.name}
              </p>
              <Badge variant="secondary" className="text-[10px] sm:text-xs">
                {item.categories?.[0].category.name || 'Sin categoría'}
              </Badge>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default ClothingSelector;
