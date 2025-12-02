import { PenTool } from 'lucide-react';
import ModeHeaderOutfit from './ModeHeaderOutfit';

const ManualOutfit = () => {
  return (
    <>
      <ModeHeaderOutfit
        title="Creación Manual"
        description="Selecciona cada prenda que quieres usar"
        icon={
          <PenTool className="size-6 sm:size-7 text-blue-600 dark:text-blue-400" />
        }
      />
      <div>ManualOutfit</div>
    </>
  );
};

export default ManualOutfit;
