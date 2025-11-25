import { ChevronLeft, ChevronRight, Shirt } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../../lib/utils';
import type { ClothingItem } from '../../types/clothing';
import { Button } from '../ui/button';

type ImageCarouselProps = {
  images: ClothingItem['images'] | null;
};

const ImageCarousel = ({ images }: ImageCarouselProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!images) return null;
  const nextImage = () => {
    if (!images?.length) return;
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const previousImage = () => {
    if (!images?.length) return;
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="space-y-4">
      <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
        {images.length === 0 ? (
          <div className="flex h-full w-full items-center justify-center bg-muted">
            <Shirt className="size-20 text-muted-foreground" />
          </div>
        ) : (
          <img
            src={images[currentImageIndex]?.url || '/placeholder.svg'}
            alt={`Imagen ${currentImageIndex + 1}`}
            className="object-cover w-full h-full"
            loading="lazy"
          />
        )}

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <Button
              variant="secondary"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 size-10 sm:size-9 shadow-lg cursor-pointer"
              onClick={previousImage}
              aria-label="Imagen anterior"
            >
              <ChevronLeft className="size-5 sm:size-4" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 size-10 sm:size-9 shadow-lg cursor-pointer"
              onClick={nextImage}
              aria-label="Imagen siguiente"
            >
              <ChevronRight className="size-5 sm:size-4" />
            </Button>
          </>
        )}

        {/* Image counter indicator */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">
            {currentImageIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Image Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => setCurrentImageIndex(index)}
              className={cn(
                'relative size-16 sm:size-20 shrink-0 overflow-hidden rounded-md border-2 transition-all',
                currentImageIndex === index
                  ? 'border-primary'
                  : 'border-transparent opacity-60 hover:opacity-100'
              )}
              aria-label={`Ver imagen ${index + 1}`}
            >
              <img
                src={image?.url || '/placeholder.svg'}
                alt={`Miniatura ${index + 1}`}
                loading="lazy"
                className="object-cover w-full h-full"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;
