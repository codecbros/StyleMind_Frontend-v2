import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface ViewSection {
  title?: boolean;
  fields?: number;
  columns?: 1 | 2 | 3 | 4;
  fullWidthFields?: number;
}

interface ViewSkeletonProps {
  sections?: ViewSection[];
  showButton?: boolean;
  spacing?: 'sm' | 'md' | 'lg';
}

const spacingMap = {
  sm: 'gap-2',
  md: 'gap-3',
  lg: 'gap-4',
};

export function ProfileSkeleton({
  sections = [
    { title: true, fields: 4, columns: 2 },
    { title: true, fields: 3, columns: 2 },
    { title: true, fields: 2, columns: 2, fullWidthFields: 1 },
  ],
  showButton = true,
  spacing = 'md',
}: ViewSkeletonProps) {
  return (
    <div className={cn('flex flex-col', spacingMap[spacing])}>
      {sections.map((section, sectionIndex) => (
        <section key={sectionIndex} className="space-y-4">
          {section.title && <Skeleton className="h-6 w-48" />}

          {section.fields && section.fields > 0 && (
            <div
              className={cn(
                'grid gap-4',
                section.columns === 1 && 'grid-cols-1',
                section.columns === 2 && 'grid-cols-1 md:grid-cols-2',
                section.columns === 3 &&
                  'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
                section.columns === 4 &&
                  'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
              )}
            >
              {Array.from({ length: section.fields }).map((_, fieldIndex) => (
                <div key={fieldIndex} className="flex flex-col gap-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-5 w-full" />
                </div>
              ))}
            </div>
          )}

          {section.fullWidthFields && section.fullWidthFields > 0 && (
            <div className="grid grid-cols-1 gap-4">
              {Array.from({ length: section.fullWidthFields }).map(
                (_, fieldIndex) => (
                  <div key={fieldIndex} className="flex flex-col gap-2.5">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-24 w-full rounded" />
                  </div>
                )
              )}
            </div>
          )}
        </section>
      ))}

      {showButton && (
        <div className="flex items-center justify-end">
          <Skeleton className="h-10 w-24" />
        </div>
      )}
    </div>
  );
}
