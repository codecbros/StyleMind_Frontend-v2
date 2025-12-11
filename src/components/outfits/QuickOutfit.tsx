import { Zap } from 'lucide-react';
import ModeHeaderOutfit from './ModeHeaderOutfit';
import QuickOutfitForm from './QuickOutfitForm';

const QuickOutfit = () => {
  return (
    <>
      <ModeHeaderOutfit
        title="Generación Rápida"
        description="Describe lo que necesitas y lo crearemos para ti."
        icon={<Zap className="size-6 text-green-600 dark:text-green-500" />}
      />
      <QuickOutfitForm />
    </>
  );
};

export default QuickOutfit;
