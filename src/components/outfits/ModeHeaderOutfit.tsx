import { ArrowLeft } from 'lucide-react';
import { useOutfitStore } from '../../store/outfits.store';

type ModeHeaderOutfitProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  backgroundIconColor?: string;
};

const ModeHeaderOutfit = ({
  icon,
  title,
  description,
  backgroundIconColor,
}: ModeHeaderOutfitProps) => {
  const setMode = useOutfitStore((state) => state.setMode);

  return (
    <div className="mb-6">
      <button
        className="flex items-center mb-4 cursor-pointer"
        onClick={() => setMode('selection')}
      >
        <ArrowLeft className="mr-2" />
        Volver
      </button>

      <div className="flex items-start gap-4">
        <div
          className={`size-11 rounded-xl ${
            backgroundIconColor ?? 'bg-primary/10'
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
