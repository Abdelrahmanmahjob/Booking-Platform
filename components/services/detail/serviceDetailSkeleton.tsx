"use client";

export function ServiceDetailSkeleton() {
  return (
    <div className="min-h-screen bg-linear-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Breadcrumbs Skeleton */}
        <div className="flex items-center gap-2 mb-6">
          <div className="h-4 w-12 bg-muted rounded animate-pulse" />
          <div className="h-4 w-1 bg-muted rounded animate-pulse" />
          <div className="h-4 w-16 bg-muted rounded animate-pulse" />
          <div className="h-4 w-1 bg-muted rounded animate-pulse" />
          <div className="h-4 w-24 bg-muted rounded animate-pulse" />
        </div>

        <div className="space-y-8">
          {/* Hero Skeleton */}
          <div className="bg-card border border-border rounded-2xl p-8 md:p-12">
            <div className="space-y-6">
              {/* Category & Rating */}
              <div className="flex items-center gap-4">
                <div className="h-8 w-24 bg-muted rounded-full animate-pulse" />
                <div className="h-6 w-32 bg-muted rounded animate-pulse" />
              </div>

              {/* Title & Price */}
              <div className="flex justify-between">
                <div className="space-y-2">
                  <div className="h-10 w-80 bg-muted rounded animate-pulse" />
                  <div className="h-6 w-48 bg-muted rounded animate-pulse" />
                </div>
                <div className="text-right space-y-2">
                  <div className="h-10 w-20 bg-muted rounded animate-pulse" />
                  <div className="h-5 w-16 bg-muted rounded animate-pulse" />
                </div>
              </div>

              {/* CTA */}
              <div className="h-14 w-48 bg-muted rounded-2xl animate-pulse" />

              {/* Quick Info */}
              <div className="flex gap-6">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-5 w-24 bg-muted rounded animate-pulse"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Service Info Skeleton */}
              <div className="bg-card border border-border rounded-2xl p-8 space-y-6">
                <div className="h-8 w-48 bg-muted rounded animate-pulse" />
                <div className="space-y-3">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-5 w-full bg-muted rounded animate-pulse"
                    />
                  ))}
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="p-4 bg-muted/30 rounded-xl">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-muted rounded-xl animate-pulse" />
                        <div className="space-y-2">
                          <div className="h-5 w-16 bg-muted rounded animate-pulse" />
                          <div className="h-4 w-20 bg-muted rounded animate-pulse" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reviews Skeleton */}
              <div className="bg-card border border-border rounded-2xl p-8 space-y-6">
                <div className="flex justify-between">
                  <div className="space-y-2">
                    <div className="h-8 w-48 bg-muted rounded animate-pulse" />
                    <div className="h-5 w-36 bg-muted rounded animate-pulse" />
                  </div>
                  <div className="text-center space-y-1">
                    <div className="h-8 w-12 bg-muted rounded animate-pulse mx-auto" />
                    <div className="h-6 w-16 bg-muted rounded animate-pulse" />
                    <div className="h-4 w-12 bg-muted rounded animate-pulse" />
                  </div>
                </div>

                <div className="space-y-6">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="border-b border-border pb-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-muted rounded-full animate-pulse" />
                        <div className="space-y-1">
                          <div className="h-5 w-24 bg-muted rounded animate-pulse" />
                          <div className="h-4 w-16 bg-muted rounded animate-pulse" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-4 w-full bg-muted rounded animate-pulse" />
                        <div className="h-4 w-3/4 bg-muted rounded animate-pulse" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Provider Card Skeleton */}
            <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-2xl p-6 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-muted rounded-2xl animate-pulse" />
                  <div className="space-y-2">
                    <div className="h-6 w-32 bg-muted rounded animate-pulse" />
                    <div className="h-4 w-24 bg-muted rounded animate-pulse" />
                    <div className="h-4 w-28 bg-muted rounded animate-pulse" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {Array.from({ length: 2 }).map((_, i) => (
                    <div
                      key={i}
                      className="p-3 bg-muted/30 rounded-xl text-center space-y-1"
                    >
                      <div className="h-8 w-12 bg-muted rounded animate-pulse mx-auto" />
                      <div className="h-3 w-16 bg-muted rounded animate-pulse mx-auto" />
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-4 h-4 bg-muted rounded animate-pulse" />
                      <div className="h-4 flex-1 bg-muted rounded animate-pulse" />
                    </div>
                  ))}
                </div>

                <div className="border-t border-border pt-6 space-y-4">
                  <div className="flex justify-between">
                    <div className="h-5 w-24 bg-muted rounded animate-pulse" />
                    <div className="h-8 w-16 bg-muted rounded animate-pulse" />
                  </div>
                  <div className="h-12 w-full bg-muted rounded-xl animate-pulse" />
                  <div className="grid grid-cols-2 gap-2">
                    {Array.from({ length: 2 }).map((_, i) => (
                      <div
                        key={i}
                        className="h-10 bg-muted rounded-xl animate-pulse"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
