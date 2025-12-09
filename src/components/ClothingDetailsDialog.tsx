import { DialogDescription } from '@radix-ui/react-dialog';
import { useQueryClient } from '@tanstack/react-query';
import { Edit, Trash2, X } from 'lucide-react';
import { useCallback, useState } from 'react';
import {
  useGetClothesById,
  useUpdateClothesStatus,
} from '../api/generated/wardrobe/wardrobe';
import { QUERY_KEYS } from '../constants/querys';
import { getSeasonLabel } from '../helpers/season-helper';
import { ErrorToast, SuccessToast } from '../lib/toast';
import type { ClothingItem } from '../types/clothing';
import { DetailItem } from './DetailItem';
import { ClothingDetailsSkeleton } from './skeletons/ClothingDetailsSkeleton';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import ImageCarousel from './wardrobe/ImageCarousel';

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
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const { mutate: deleteClothing, isPending: isDeletingClothing } =
    useUpdateClothesStatus();
  const queryClient = useQueryClient();

  const {
    data: item,
    isLoading: isClothingLoading,
    isError,
  } = useGetClothesById(itemId || '', {
    query: {
      enabled: !!itemId && open,
      select: (response: any) => response?.data as ClothingItem | undefined,
    },
  });

  const handleDelete = useCallback(() => {
    if (!itemId) return;

    deleteClothing(
      { id: itemId },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.WARDROBE] });
          onOpenChange(false);
          SuccessToast({ title: 'Prenda eliminada exitosamente' });
        },
        onError: () => {
          ErrorToast({ title: 'Error al eliminar la prenda' });
        },
      }
    );
  }, [itemId, deleteClothing, queryClient, onOpenChange]);

  if (!itemId || isError || !open) return null;

  const isLoading = isClothingLoading || isDeletingClothing;
  return (
    <>
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
                <ImageCarousel images={item?.images || []} />
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
                    <DetailItem label="Talla" value={item?.size} />
                    <DetailItem
                      label="Temporada"
                      value={getSeasonLabel(item?.season)}
                    />
                    <DetailItem label="Material" value={item?.material} />
                    <DetailItem label="Estilo" value={item?.style} />
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
                      className="flex-1 font-semibold uppercase tracking-wide text-xs md:text-sm cursor-pointer"
                    >
                      <Edit className="mr-2 size-4" />
                      Editar
                    </Button>
                    <Button
                      variant="destructive"
                      className="flex-1 font-semibold uppercase tracking-wide text-xs md:text-sm cursor-pointer"
                      onClick={() => setDeleteDialogOpen(true)}
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

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              ¿Estás seguro de eliminar esta prenda?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. La prenda &quot;{item?.name}
              &quot; será eliminada permanentemente de tu guardaropa.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="cursor-pointer">
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 text-white cursor-pointer"
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
