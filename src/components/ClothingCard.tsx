import { Card, CardContent } from '@/components/ui/card';
import { ImageIcon } from 'lucide-react';
import { Badge } from './ui/badge';

interface ClothingCardProps {
  item: any;
  onSelect?: () => void;
}

export function ClothingCard({ item, onSelect }: ClothingCardProps) {
  const hasMultipleImages = item.images.length > 1;

  console.log(item);
  return (
    <Card
      className="group cursor-pointer overflow-hidden transition-all hover:shadow-lg"
      onClick={onSelect}
    >
      <div className="relative aspect-square overflow-hidden bg-muted">
        {item?.images.map((image: { id: string; url: string }) => (
          <img
            key={image.id}
            src={image.url || '/placeholder.svg'}
            alt={item.name}
            className="object-cover transition-transform group-hover:scale-105"
          />
        ))}

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
        {/* Name */}
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

        {/* Quick Info */}
        <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
          <span>{item.size}</span>
          <span>{item.season}</span>
          <span className="line-clamp-1">{item.style}</span>
        </div>
      </CardContent>
    </Card>
  );
}
