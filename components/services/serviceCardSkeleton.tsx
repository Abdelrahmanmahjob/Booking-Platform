export function ServiceCardSkeleton() {
  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden animate-pulse">
      {/* Image Skeleton */}
      <div className="h-48 bg-muted" />

      <div className="p-5 space-y-3">
        {/* Category Badge */}
        <div className="h-5 w-20 bg-muted rounded-full" />

        {/* Title */}
        <div className="h-6 w-3/4 bg-muted rounded-lg" />

        {/* Description */}
        <div className="space-y-2">
          <div className="h-4 w-full bg-muted rounded" />
          <div className="h-4 w-2/3 bg-muted rounded" />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2">
          <div className="h-6 w-16 bg-muted rounded-lg" />
          <div className="h-9 w-24 bg-muted rounded-xl" />
        </div>
      </div>
    </div>
  );
}
