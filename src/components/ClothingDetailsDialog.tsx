import { DialogDescription } from '@radix-ui/react-dialog';
import {
  ChevronLeft,
  ChevronRight,
  Edit,
  Shirt,
  Trash2,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { useGetClothesById } from '../api/generated/wardrobe/wardrobe';
import { getSeasonLabel } from '../helpers/season-helper';
import { cn } from '../lib/utils';
import type { ClothingItem } from '../types/clothing';
import { ClothingDetailsSkeleton } from './skeletons/ClothingDetailsSkeleton';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';

interface ClothingDetailsDialogProps {
  itemId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ClothingDetailsDialog({
  itemId,
  open,
  onOpenChange,
}: ClothingDetailsDialogProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const {
    data: item,
    isLoading,
    isError,
  } = useGetClothesById(itemId || '', {
    query: {
      enabled: !!itemId && open,
      select: (response: any) => response?.data as ClothingItem | undefined,
    },
  });

  if (!itemId || isError) return null;

  const nextImage = () => {
    if (!item?.images?.length) return;
    setCurrentImageIndex((prev) => (prev + 1) % item.images.length);
  };

  const previousImage = () => {
    if (!item?.images?.length) return;
    setCurrentImageIndex(
      (prev) => (prev - 1 + item.images.length) % item.images.length
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl md:max-w-4xl lg:max-w-5xl max-h-[95vh] overflow-y-auto p-0 gap-0">
        <DialogHeader className="sticky top-0 z-10 bg-background border-b px-4 sm:px-6 py-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 pr-8">
              <DialogTitle className="text-xl sm:text-2xl">
                {isLoading ? (
                  <div className="h-7 w-48 bg-muted animate-pulse rounded" />
                ) : (
                  item?.name
                )}
              </DialogTitle>
              <DialogDescription>{''}</DialogDescription>
            </div>
            {isLoading ? null : (
              <Button
                variant="ghost"
                size="icon"
                className="size-8 rounded-full hover:bg-muted cursor-pointer shrink-0"
                onClick={() => onOpenChange(false)}
              >
                <X className="size-5" />
                <span className="sr-only">Cerrar</span>
              </Button>
            )}
          </div>
        </DialogHeader>

        {isLoading ? (
          <ClothingDetailsSkeleton />
        ) : (
          <div className="px-4 sm:px-6 py-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Image Carousel */}
              <div className="space-y-4">
                <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
                  {item?.images.length === 0 ? (
                    <div className="flex h-full w-full items-center justify-center bg-muted">
                      <Shirt className="size-20 text-muted-foreground" />
                    </div>
                  ) : (
                    <img
                      src={
                        item?.images[currentImageIndex]?.url ||
                        '/placeholder.svg'
                      }
                      alt={`${item?.name} - imagen ${currentImageIndex + 1}`}
                      className="object-cover w-full h-full"
                      loading="lazy"
                    />
                  )}

                  {/* Navigation Arrows */}
                  {item && item.images.length > 1 && (
                    <>
                      <Button
                        variant="secondary"
                        size="icon"
                        className="absolute left-2 top-1/2 -translate-y-1/2 size-10 sm:size-9 shadow-lg cursor-pointer"
                        onClick={previousImage}
                        aria-label="Imagen anterior"
                      >
                        <ChevronLeft className="size-5 sm:size-4" />
                      </Button>
                      <Button
                        variant="secondary"
                        size="icon"
                        className="absolute right-2 top-1/2 -translate-y-1/2 size-10 sm:size-9 shadow-lg cursor-pointer"
                        onClick={nextImage}
                        aria-label="Imagen siguiente"
                      >
                        <ChevronRight className="size-5 sm:size-4" />
                      </Button>
                    </>
                  )}

                  {/* Image counter indicator */}
                  {item && item.images.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">
                      {currentImageIndex + 1} / {item?.images.length}
                    </div>
                  )}
                </div>

                {/* Image Thumbnails */}
                {item && item.images.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {item?.images.map((image, index) => (
                      <button
                        key={image.id}
                        onClick={() => setCurrentImageIndex(index)}
                        className={cn(
                          'relative size-16 sm:size-20 shrink-0 overflow-hidden rounded-md border-2 transition-all',
                          currentImageIndex === index
                            ? 'border-primary'
                            : 'border-transparent opacity-60 hover:opacity-100'
                        )}
                        aria-label={`Ver imagen ${index + 1}`}
                      >
                        <img
                          src={image?.url || '/placeholder.svg'}
                          alt={`Miniatura ${index + 1}`}
                          loading="lazy"
                          className="object-cover w-full h-full"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Categorías
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {item?.categories.map((category) => (
                      <Badge key={category.category.name} variant="secondary">
                        {category.category.name}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Colores
                  </p>
                  <div className="flex gap-3">
                    <div className="flex items-center gap-2">
                      <div
                        className="size-8 rounded-full border-2 border-border shadow-sm"
                        style={{ backgroundColor: item?.primaryColor }}
                        aria-label={`Color principal: ${item?.primaryColor}`}
                      />
                      <span className="text-sm">Principal</span>
                    </div>
                    {item?.secondaryColor && (
                      <div className="flex items-center gap-2">
                        <div
                          className="size-8 rounded-full border-2 border-border shadow-sm"
                          style={{ backgroundColor: item.secondaryColor }}
                          aria-label={`Color secundario: ${item.secondaryColor}`}
                        />
                        <span className="text-sm">Secundario</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-x-6 md:gap-x-8 gap-y-4 md:gap-y-5">
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Talla
                    </p>
                    <p className="mt-1.5 text-sm text-foreground">
                      {item?.size}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Temporada
                    </p>
                    <p className="mt-1.5 text-sm text-foreground">
                      {getSeasonLabel(item?.season)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Material
                    </p>
                    <p className="mt-1.5 text-sm text-foreground">
                      {item?.material}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Estilo
                    </p>
                    <p className="mt-1.5 text-sm text-foreground">
                      {item?.style}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    Descripción
                  </p>
                  <div className="bg-muted/30 rounded-lg p-4 border border-border/40">
                    <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">
                      {item?.description || 'Sin descripción'}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 pt-4 border-t border-border/40">
                  <Button
                    variant="outline"
                    className="flex-1 font-semibold uppercase tracking-wide text-xs md:text-sm"
                  >
                    <Edit className="mr-2 size-4" />
                    Editar
                  </Button>
                  <Button
                    variant="destructive"
                    className="flex-1 font-semibold uppercase tracking-wide text-xs md:text-sm"
                  >
                    <Trash2 className="mr-2 size-4" />
                    Eliminar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
