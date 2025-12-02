import AiOutfit from '../components/outfits/AiOutfit';
import ManualOutfit from '../components/outfits/ManualOutfit';
import OutfitCreationSelector from '../components/outfits/OutfitCreationSelector';
import QuickOutfit from '../components/outfits/QuickOutfit';
import { OutfitLayout } from '../layouts/OutfitLayout';

type OutfitMode = 'selection' | 'ai' | 'quick' | 'manual';

const Outfits = () => {
  // TODO: Reemplazar con Zustand store
  const mode = 'selection' as OutfitMode;

  return (
    <OutfitLayout>
      {mode === 'selection' && <OutfitCreationSelector />}
      {mode === 'ai' && <AiOutfit />}
      {mode === 'quick' && <QuickOutfit />}
      {mode === 'manual' && <ManualOutfit />}
    </OutfitLayout>
  );
};

export default Outfits;
