import { useMemo, useState } from 'react';
import type { ClothingItem } from '../types/clothing';
import { ClothingGrid } from './clothing/ClothingGrid';
import { ClothingModal } from './clothing/ClothingModal';
import { EmptyClothingState } from './clothing/EmptyClothingState';
import { Button } from './ui/button';

type ClothingSelectorProps = {
  clothingItems: ClothingItem[] | undefined;
  selectedIds?: string[];
  maxSelection?: number;
  onSelectionChange?: (selectedIds: string[]) => void;
};

const PREVIEW_LIMIT = 5;

const ClothingSelector = ({
  clothingItems,
  selectedIds = [],
  maxSelection = 999,
  onSelectionChange,
}: ClothingSelectorProps) => {
  const [showAllModal, setShowAllModal] = useState(false);

  const previewItems = useMemo(
    () => clothingItems?.slice(0, PREVIEW_LIMIT),
    [clothingItems]
  );

  const handleToggle = (id: string) => {
    if (!onSelectionChange) return;

    if (selectedIds.includes(id)) {
      onSelectionChange(selectedIds.filter((selectedId) => selectedId !== id));
    } else {
      if (selectedIds.length < maxSelection) {
        onSelectionChange([...selectedIds, id]);
      }
    }
  };

  if (clothingItems === undefined || !clothingItems) {
    return null;
  }

  if (clothingItems?.length === 0) {
    return <EmptyClothingState />;
  }

  return (
    <>
      <div className="space-y-3 sm:space-y-4">
        <ClothingGrid
          itemsToShow={previewItems}
          selectedIds={selectedIds}
          maxSelection={maxSelection}
          onToggle={handleToggle}
        />

        {clothingItems.length > PREVIEW_LIMIT && (
          <Button
            type="button"
            variant="outline"
            className="w-full text-sm sm:text-base bg-transparent cursor-pointer"
            onClick={() => setShowAllModal(true)}
          >
            Ver todas las prendas ({clothingItems.length})
          </Button>
        )}
      </div>

      {clothingItems.length > PREVIEW_LIMIT && (
        <ClothingModal
          isOpen={showAllModal}
          onClose={() => setShowAllModal(false)}
          clothingItems={clothingItems}
          selectedIds={selectedIds}
          maxSelection={maxSelection}
          onToggle={handleToggle}
        />
      )}
    </>
  );
};

export default ClothingSelector;
