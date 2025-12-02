import { Sparkles } from 'lucide-react';
import ModeHeaderOutfit from './ModeHeaderOutfit';

const AiOutfit = () => {
  return (
    <>
      <ModeHeaderOutfit
        title="IA Personalizada"
        description="Responde estas preguntas para crear tu outfit perfecto"
        icon={<Sparkles className="size-6 sm:size-7 text-primary" />}
      />
      <div>AiOutfit</div>
    </>
  );
};

export default AiOutfit;
