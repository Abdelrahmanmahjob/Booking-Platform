export function ProviderBookingCardSkeleton() {
  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden animate-pulse">
      <div className="h-1 w-full bg-muted" />
      <div className="p-6 space-y-5">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-muted rounded-2xl" />
            <div className="space-y-2">
              <div className="h-5 w-40 bg-muted rounded" />
              <div className="h-4 w-24 bg-muted rounded" />
            </div>
          </div>
          <div className="h-7 w-24 bg-muted rounded-full" />
        </div>

        {/* Client */}
        <div className="h-14 bg-muted rounded-xl" />

        {/* Details */}
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2 h-14 bg-muted rounded-xl" />
          <div className="h-14 bg-muted rounded-xl" />
          <div className="h-14 bg-muted rounded-xl" />
          <div className="col-span-2 h-14 bg-muted rounded-xl" />
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-4 border-t border-border">
          <div className="flex-1 h-10 bg-muted rounded-xl" />
          <div className="h-10 w-24 bg-muted rounded-xl" />
        </div>
      </div>
    </div>
  );
}
