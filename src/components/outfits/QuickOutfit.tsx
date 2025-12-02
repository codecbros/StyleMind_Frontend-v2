import { Zap } from 'lucide-react';
import ModeHeaderOutfit from './ModeHeaderOutfit';

const QuickOutfit = () => {
  return (
    <>
      <ModeHeaderOutfit
        title="Generación Rápida"
        description="Describe lo que necesitas y lo crearemos para ti."
        icon={
          <Zap className="size-6 sm:size-7 text-green-600 dark:text-green-500" />
        }
      />
      <div>QuickOutfit</div>
    </>
  );
};

export default QuickOutfit;
