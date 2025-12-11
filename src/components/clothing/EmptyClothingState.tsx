import { ShirtIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PATHS } from '../../constants/paths';
import { Button } from '../ui/button';

export const EmptyClothingState = () => {
  return (
    <div className="rounded-lg border-2 border-dashed p-4 text-center space-y-4">
      <div className="flex justify-center">
        <div className="rounded-full bg-muted p-4 sm:p-6">
          <ShirtIcon className="size-8 sm:size-10 text-muted-foreground" />
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-base sm:text-lg font-medium text-foreground">
          No tienes prendas de esta categoría
        </p>
        <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto">
          Agrega prendas a tu guardaropa para poder crear outfits increíbles con
          ellas
        </p>
      </div>
      <Button asChild className="mt-2">
        <Link to={PATHS.NewClothing}>Ir al Guardaropa</Link>
      </Button>
    </div>
  );
};
