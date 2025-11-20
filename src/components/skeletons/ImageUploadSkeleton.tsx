type ImageUploadSkeletonProps = {
  count: number;
};

export function ImageUploadSkeleton({ count }: ImageUploadSkeletonProps) {
  return (
    <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
      {Array.from({ length: count }).map((_, i) => (
        <li
          key={i}
          className="relative overflow-hidden aspect-2/2 lg:aspect-square rounded-lg bg-gray-200"
        >
          <div className="absolute inset-0 animate-pulse bg-gray-300" />
          <div className="absolute inset-0 shimmer" />
        </li>
      ))}
    </ul>
  );
}
