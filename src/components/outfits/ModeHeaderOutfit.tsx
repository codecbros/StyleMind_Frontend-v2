import { ArrowLeft } from 'lucide-react';

type ModeHeaderOutfitProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

const ModeHeaderOutfit = ({
  icon,
  title,
  description,
}: ModeHeaderOutfitProps) => {
  // const setMode = useOutfitStore((s) => s.setMode);

  return (
    <div className="mb-6">
      <button
        // onClick={() => setMode('selection')}
        className="flex items-center mb-4"
      >
        <ArrowLeft className="mr-2" />
        Volver
      </button>

      <div className="flex items-start gap-4">
        <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center">
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
