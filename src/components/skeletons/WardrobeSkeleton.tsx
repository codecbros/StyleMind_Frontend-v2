import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function ClothingGridSkeleton() {
  return (
    <div className="grid grid-auto-fit gap-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <Card key={index} className="overflow-hidden">
          {/* Image skeleton */}
          <Skeleton className="aspect-square w-full" />

          {/* Content skeleton */}
          <div className="p-4 space-y-3">
            {/* Color circles skeleton */}
            <div className="flex gap-2">
              <Skeleton className="size-6 rounded-full" />
              <Skeleton className="size-6 rounded-full" />
            </div>

            {/* Name skeleton */}
            <Skeleton className="h-5 w-3/4" />

            {/* Categories skeleton */}
            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-5 w-16 rounded-full" />
              <Skeleton className="h-5 w-20 rounded-full" />
            </div>

            {/* Info skeleton */}
            <div className="flex gap-2 text-xs">
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-14" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
