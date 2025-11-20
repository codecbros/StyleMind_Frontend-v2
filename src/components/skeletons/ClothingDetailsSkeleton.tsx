export function ClothingDetailsSkeleton() {
  return (
    <div className="px-4 sm:px-6 py-6">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Image Skeleton */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg bg-muted animate-pulse" />

          {/* Thumbnails Skeleton */}
          <div className="flex gap-2">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="size-16 sm:size-20 shrink-0 rounded-md bg-muted animate-pulse"
              />
            ))}
          </div>
        </div>

        {/* Details Skeleton */}
        <div className="space-y-6">
          {/* Categories */}
          <div className="space-y-2">
            <div className="h-3 w-20 bg-muted animate-pulse rounded" />
            <div className="flex gap-2">
              <div className="h-6 w-16 bg-muted animate-pulse rounded-full" />
              <div className="h-6 w-20 bg-muted animate-pulse rounded-full" />
            </div>
          </div>

          {/* Colors */}
          <div className="space-y-2">
            <div className="h-3 w-16 bg-muted animate-pulse rounded" />
            <div className="flex gap-3">
              <div className="flex items-center gap-2">
                <div className="size-8 rounded-full bg-muted animate-pulse" />
                <div className="h-4 w-16 bg-muted animate-pulse rounded" />
              </div>
              <div className="flex items-center gap-2">
                <div className="size-8 rounded-full bg-muted animate-pulse" />
                <div className="h-4 w-20 bg-muted animate-pulse rounded" />
              </div>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-x-6 md:gap-x-8 gap-y-4 md:gap-y-5">
            {[...Array(4)].map((_, index) => (
              <div key={index}>
                <div className="h-3 w-16 bg-muted animate-pulse rounded mb-1.5" />
                <div className="h-4 w-12 bg-muted animate-pulse rounded" />
              </div>
            ))}
          </div>

          {/* Description */}
          <div>
            <div className="h-3 w-24 bg-muted animate-pulse rounded mb-2" />
            <div className="bg-muted/30 rounded-lg p-4 border border-border/40 space-y-2">
              <div className="h-4 w-full bg-muted animate-pulse rounded" />
              <div className="h-4 w-5/6 bg-muted animate-pulse rounded" />
              <div className="h-4 w-4/6 bg-muted animate-pulse rounded" />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 pt-4 border-t border-border/40">
            <div className="flex-1 h-10 bg-muted animate-pulse rounded-md" />
            <div className="flex-1 h-10 bg-muted animate-pulse rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}
