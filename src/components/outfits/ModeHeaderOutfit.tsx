import { ArrowLeft } from 'lucide-react';
import { useOutfitStore } from '../../store/outfits.store';
import { Button } from '../ui/button';

type ModeHeaderOutfitProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  iconBackgroundClass?: string;
};

const ModeHeaderOutfit = ({
  icon,
  title,
  description,
  iconBackgroundClass,
}: ModeHeaderOutfitProps) => {
  const setMode = useOutfitStore((state) => state.setMode);

  return (
    <div className="mb-6">
      <Button
        type="button"
        variant="link"
        className="flex items-center mb-4 cursor-pointer"
        aria-label="Volver a la selección de modo"
        onClick={() => setMode('selection')}
      >
        <ArrowLeft className="mr-2" />
        Volver
      </Button>

      <div className="flex items-start gap-4">
        <div
          className={`size-10 md:size-12 rounded-xl ${
            iconBackgroundClass ?? 'bg-primary/10'
          } flex items-center justify-center`}
        >
          {icon}
        </div>

        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default ModeHeaderOutfit;
