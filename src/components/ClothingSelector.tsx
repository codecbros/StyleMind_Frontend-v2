import { useMemo, useState } from 'react';
import type { ControllerRenderProps } from 'react-hook-form';
import type { ClothingItem } from '../types/clothing';
import { ClothingGrid } from './clothing/ClothingGrid';
import { ClothingModal } from './clothing/ClothingModal';
import { EmptyClothingState } from './clothing/EmptyClothingState';
import { Button } from './ui/button';

type ClothingSelectorProps = {
  clothingItems: ClothingItem[] | undefined;
  field?: ControllerRenderProps<any, any>;
  maxSelection?: number;
  previewLimit?: number;
};

const ClothingSelector = ({
  clothingItems,
  field,
  maxSelection = 999,
  previewLimit = 5,
}: ClothingSelectorProps) => {
  const [showAllModal, setShowAllModal] = useState(false);
  const selectedIds = field?.value || [];

  const previewItems = useMemo(
    () => clothingItems?.slice(0, previewLimit),
    [clothingItems, previewLimit]
  );

  const handleToggle = (id: string) => {
    if (!field) return;

    if (selectedIds.includes(id)) {
      field.onChange(
        selectedIds.filter((selectedId: string) => selectedId !== id)
      );
    } else {
      if (selectedIds.length < maxSelection) {
        field.onChange([...selectedIds, id]);
      }
    }
  };

  if (!clothingItems) {
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

        {clothingItems.length > previewLimit && (
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

      {clothingItems.length > previewLimit && (
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
