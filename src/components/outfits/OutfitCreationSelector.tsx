import { Clock, PenTool, Sparkles, Zap } from 'lucide-react';
import { useOutfitStore } from '../../store/outfits.store';
import { Badge } from '../ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';

const OutfitCreationSelector = () => {
  const setMode = useOutfitStore((state) => state.setMode);

  return (
    <>
      <div className="mb-8 sm:mb-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
          Crear un nuevo Outfit
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Selecciona cómo quieres crear tu combinación perfecta
        </p>
      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
        {/* IA Personalizada - Recomendado */}
        <Card
          className="relative group cursor-pointer border-2 border-primary/60 hover:border-primary hover:shadow-lg transition-all sm:col-span-2 xl:col-span-1"
          onClick={() => setMode('ai')}
        >
          <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary">
            Recomendado
          </Badge>

          <CardHeader className="pb-4">
            <div className="mb-3 size-12 sm:size-14 rounded-xl bg-primary/10 flex items-center justify-center">
              <Sparkles className="size-6 sm:size-7 text-primary" />
            </div>
            <CardTitle className="text-lg sm:text-xl">
              IA Personalizada
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Cuestionario guiado para crear el outfit ideal según la ocasión
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock className="size-3.5" />
              <span>~3 min</span>
            </div>
          </CardContent>
        </Card>

        {/* Generación Rápida */}
        <Card
          className="group hover:border-primary/40 hover:shadow-md transition-all cursor-pointer"
          onClick={() => setMode('quick')}
        >
          <CardHeader className="pb-4">
            <div className="mb-3 size-12 sm:size-14 rounded-xl bg-green-100 dark:bg-green-950/50 flex items-center justify-center">
              <Zap className="size-6 sm:size-7 text-green-600 dark:text-green-500" />
            </div>
            <CardTitle className="text-lg sm:text-xl">
              Generación Rápida
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Describe brevemente qué necesitas y genera al instante
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock className="size-3.5" />
              <span>~30 seg</span>
            </div>
          </CardContent>
        </Card>

        {/* Creación Manual */}
        <Card
          className="group hover:border-primary/40 hover:shadow-md transition-all cursor-pointer"
          onClick={() => setMode('manual')}
        >
          <CardHeader className="pb-4">
            <div className="mb-3 size-12 sm:size-14 rounded-xl bg-blue-100 dark:bg-blue-950/50 flex items-center justify-center">
              <PenTool className="size-6 sm:size-7 text-blue-600 dark:text-blue-400" />
            </div>
            <CardTitle className="text-lg sm:text-xl">
              Creación Manual
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Selecciona cada prenda de tu armario manualmente
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock className="size-3.5" />
              <span>Libre</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default OutfitCreationSelector;
