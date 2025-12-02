import AiOutfit from '../components/outfits/AiOutfit';
import ManualOutfit from '../components/outfits/ManualOutfit';
import OutfitCreationSelector from '../components/outfits/OutfitCreationSelector';
import QuickOutfit from '../components/outfits/QuickOutfit';
import OutfitLayout from '../layouts/OutfitLayout';
import { useOutfitStore } from '../store/outfits.store';

const Outfits = () => {
  const mode = useOutfitStore((state) => state.mode);
  const defaultMode =
    mode === 'selection' || mode === undefined || mode === null;

  return (
    <OutfitLayout>
      {defaultMode && <OutfitCreationSelector />}
      {mode === 'ai' && <AiOutfit />}
      {mode === 'quick' && <QuickOutfit />}
      {mode === 'manual' && <ManualOutfit />}
    </OutfitLayout>
  );
};

export default Outfits;
