import { Check } from 'lucide-react';
import { memo } from 'react';
import { cn } from '../../lib/utils';
import type { ClothingItem } from '../../types/clothing';
import { Badge } from '../ui/badge';

type ClothingGridProps = {
  itemsToShow: ClothingItem[] | undefined;
  selectedIds?: string[];
  maxSelection?: number;
  onToggle?: (id: string) => void;
};

export const ClothingGrid = memo(
  ({
    itemsToShow,
    selectedIds = [],
    maxSelection = 999,
    onToggle,
  }: ClothingGridProps) => {
    return (
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
        {itemsToShow?.map((item) => {
          const isSelected = selectedIds.includes(item.id);
          const isDisabled = !isSelected && selectedIds.length >= maxSelection;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onToggle?.(item.id)}
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
  }
);

ClothingGrid.displayName = 'ClothingGrid';
