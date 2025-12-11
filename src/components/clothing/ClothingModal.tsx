import { Search } from 'lucide-react';
import { memo, useMemo, useState } from 'react';
import type { ClothingItem } from '../../types/clothing';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Input } from '../ui/input';
import { ClothingGrid } from './ClothingGrid';

type ClothingModalProps = {
  isOpen: boolean;
  onClose: () => void;
  clothingItems: ClothingItem[];
  selectedIds: string[];
  maxSelection: number;
  onToggle: (id: string) => void;
};

export const ClothingModal = memo(
  ({
    isOpen,
    onClose,
    clothingItems,
    selectedIds,
    maxSelection,
    onToggle,
  }: ClothingModalProps) => {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredItems = useMemo(
      () =>
        clothingItems.filter((item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
        ),
      [clothingItems, searchQuery]
    );

    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-5xl max-h-[90vh] flex flex-col p-0">
          <DialogHeader className="px-4 sm:px-6 pt-4 sm:pt-6 pb-3 sm:pb-4 border-b">
            <DialogTitle className="text-lg sm:text-xl">
              Selecciona tus prendas
            </DialogTitle>
            <DialogDescription className="text-sm sm:text-base">
              Seleccionadas: {selectedIds.length} / {maxSelection}
            </DialogDescription>
          </DialogHeader>

          <div className="px-4 sm:px-6 py-3 sm:py-4 border-b bg-muted/30">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar por nombre de prenda..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 text-sm sm:text-base"
              />
            </div>
          </div>

          <div className="overflow-y-auto flex-1 px-4 sm:px-6 py-4 sm:py-6">
            {filteredItems.length === 0 ? (
              <div className="text-center py-8 sm:py-12 text-muted-foreground text-sm sm:text-base">
                No se encontraron prendas con &quot;{searchQuery}&quot;
              </div>
            ) : (
              <ClothingGrid
                itemsToShow={filteredItems}
                selectedIds={selectedIds}
                maxSelection={maxSelection}
                onToggle={onToggle}
              />
            )}
          </div>

          <div className="px-4 sm:px-6 py-3 sm:py-4 border-t bg-muted/30">
            <Button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto text-sm sm:text-base"
            >
              Listo ({selectedIds.length} seleccionadas)
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }
);

ClothingModal.displayName = 'ClothingModal';
