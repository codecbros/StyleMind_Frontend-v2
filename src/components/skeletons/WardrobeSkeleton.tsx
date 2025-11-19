import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function WardrobeSkeleton() {
  return (
    <div className="container mx-auto px-8 py-24 md:py-12">
      <div className="w-full  mx-auto">
        <Card className="w-full px-4 sm:px-6 md:px-8 lg:px-10 py-6 md:py-8">
          {/* Header Section */}
          <section className="space-y-4 mb-8">
            <div className="flex items-center gap-3">
              <Skeleton className="h-6 w-40" />
              <div className="h-0.5 flex-1 bg-linear-to-r from-foreground/20 via-foreground/10 to-transparent" />
            </div>
            <Skeleton className="h-4 w-32" />
          </section>

          {/* Search Section */}
          <section className="space-y-4 mb-6">
            <Skeleton className="h-10 w-full" />
          </section>

          {/* Clothing Grid Section */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <Skeleton className="h-6 w-24" />
              <div className="h-0.5 flex-1 bg-linear-to-r from-foreground/20 via-foreground/10 to-transparent" />
            </div>

            {/* Grid of Skeleton Cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
          </section>
        </Card>
      </div>
    </div>
  );
}
