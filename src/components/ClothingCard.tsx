import { Card, CardContent } from '@/components/ui/card';
import { ImageIcon, Shirt } from 'lucide-react';
import { getSeasonLabel } from '../helpers/season-helper';
import { Badge } from './ui/badge';

interface ClothingCardProps {
  item: any;
  onSelect?: () => void;
}

export function ClothingCard({ item, onSelect }: ClothingCardProps) {
  const hasMultipleImages = item.images.length > 1;

  return (
    <Card
      className="group cursor-pointer overflow-hidden transition-all hover:shadow-lg"
      onClick={onSelect}
    >
      <div className="relative aspect-square overflow-hidden bg-muted">
        {item?.images?.length ? (
          <img
            src={item.images[0].url || '/placeholder.svg'}
            alt={item.name}
            loading="lazy"
            className="object-cover transition-transform group-hover:scale-105 w-full h-full"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted">
            <Shirt className="size-12 text-muted-foreground" />
          </div>
        )}

        {/* Image Counter Badge */}
        {hasMultipleImages && (
          <div className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-black/60 px-2 py-1 text-xs text-white backdrop-blur-sm">
            <ImageIcon className="size-3" />
            <span>{item.images.length}</span>
          </div>
        )}
        {/* Color Indicators */}
        <div className="absolute bottom-2 left-2 flex gap-1.5">
          <div
            className="size-6 rounded-full border-2 border-white shadow-md"
            style={{ backgroundColor: item.primaryColor }}
            title="Color principal"
          />
          {item.secondaryColor && (
            <div
              className="size-6 rounded-full border-2 border-white shadow-md"
              style={{ backgroundColor: item.secondaryColor }}
              title="Color secundario"
            />
          )}
        </div>
      </div>

      <CardContent className="p-4">
        <h3
          className="font-semibold text-foreground line-clamp-1"
          title={item.name}
        >
          {item.name}
        </h3>

        {/* Categories */}
        <div className="mt-2 flex flex-wrap gap-1">
          {item.categories.slice(0, 3).map((category: any) => (
            <Badge
              key={category.category.name}
              variant="secondary"
              className="text-xs"
            >
              {category.category.name}
            </Badge>
          ))}
          {item.categories.length > 2 && (
            <Badge variant="outline" className="text-xs">
              +{item.categories.length - 2}
            </Badge>
          )}
        </div>

        <div className="mt-3 grid grid-cols-3 place-items-center gap-2 text-xs">
          <div className="flex flex-col items-center">
            <p className="font-medium text-foreground">{item.size}</p>
            <p className="text-muted-foreground/75">Talla</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="font-medium text-foreground">
              {getSeasonLabel(item.season)}
            </p>
            <p className="text-muted-foreground/75">Temporada</p>
          </div>
          <div className="flex flex-col items-center">
            <p
              className="font-medium text-foreground line-clamp-1"
              title={item.style}
            >
              {item.style}
            </p>
            <p className="text-muted-foreground/75">Estilo</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
