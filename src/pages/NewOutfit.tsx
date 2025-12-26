import AiOutfit from '../components/outfits/AiOutfit';
import ManualOutfit from '../components/outfits/ManualOutfit';
import OutfitCreationSelector from '../components/outfits/OutfitCreationSelector';
import QuickOutfit from '../components/outfits/QuickOutfit';
import OutfitLayout from '../layouts/OutfitLayout';
import { useOutfitStore } from '../store/outfits.store';

const NewOutfit = () => {
  const mode = useOutfitStore((state) => state.mode);

  return (
    <OutfitLayout>
      {mode === 'selection' && <OutfitCreationSelector />}
      {mode === 'ai' && <AiOutfit />}
      {mode === 'quick' && <QuickOutfit />}
      {mode === 'manual' && <ManualOutfit />}
    </OutfitLayout>
  );
};

export default NewOutfit;
