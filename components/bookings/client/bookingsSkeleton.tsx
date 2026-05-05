"use client";

export function BookingsSkeleton() {
  return (
    <div className="min-h-screen bg-linear-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Header */}
        <div className="mb-8 space-y-2">
          <div className="h-9 w-48 bg-muted rounded-xl animate-pulse" />
          <div className="h-5 w-32 bg-muted rounded-lg animate-pulse" />
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="h-10 w-24 bg-muted rounded-xl animate-pulse"
            />
          ))}
        </div>

        {/* Cards */}
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="bg-card border border-border rounded-2xl overflow-hidden animate-pulse"
            >
              {/* Gradient bar */}
              <div className="h-1 w-full bg-muted" />

              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-muted rounded-2xl" />
                    <div className="space-y-2">
                      <div className="h-5 w-40 bg-muted rounded" />
                      <div className="h-4 w-24 bg-muted rounded" />
                    </div>
                  </div>
                  <div className="h-7 w-24 bg-muted rounded-full" />
                </div>

                {/* Details */}
                <div className="grid grid-cols-4 gap-3 mb-5">
                  <div className="col-span-4 h-14 bg-muted rounded-xl" />
                  <div className="col-span-2 h-14 bg-muted rounded-xl" />
                  <div className="col-span-2 h-14 bg-muted rounded-xl" />
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="h-4 w-24 bg-muted rounded" />
                  <div className="h-9 w-32 bg-muted rounded-xl" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
