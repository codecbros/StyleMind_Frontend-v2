import AiOutfit from '../components/outfits/AiOutfit';
import ManualOutfit from '../components/outfits/ManualOutfit';
import OutfitCreationSelector from '../components/outfits/OutfitCreationSelector';
import QuickOutfit from '../components/outfits/QuickOutfit';

const Outfits = () => {
  const mode = 'selection';

  if (mode === 'selection') return <OutfitCreationSelector />;

  if (mode === 'ai') return <AiOutfit />;

  if (mode === 'quick') return <QuickOutfit />;

  if (mode === 'manual') return <ManualOutfit />;

  return null;
};

export default Outfits;
