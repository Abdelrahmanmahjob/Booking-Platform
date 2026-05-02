"use client";

import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useServices } from "@/hooks/services/useServices";
import { useAppSelector } from "@/lib/hooks";
import { selectFilters } from "@/store/slices/servicesSlice";
import { ServiceCard } from "./serviceCard";
import { ServiceCardSkeleton } from "./serviceCardSkeleton";
import { ServicesEmpty } from "./servicesEmpty";

export function ServicesList() {
  const { data: services, isPending, error } = useServices();
  const filters = useAppSelector(selectFilters);

  // ✅ useMemo - filter مرة واحدة لما services أو filters يتغيروا
  const filteredServices = useMemo(() => {
    if (!services) return [];

    return services.filter((service) => {
      // Category filter
      const matchesCategory =
        filters.category === "all" || service.category === filters.category;

      // Search filter with null safety
      const searchLower = filters.searchQuery.toLowerCase().trim();
      const matchesSearch =
        !searchLower ||
        service.name?.toLowerCase().includes(searchLower) ||
        service.description?.toLowerCase().includes(searchLower);

      return matchesCategory && matchesSearch;
    });
  }, [services, filters]);

  // Loading State
  if (isPending) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <ServiceCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center py-20 text-center"
      >
        <div className="text-5xl mb-4">⚠️</div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Something went wrong
        </h3>
        <p className="text-muted-foreground text-sm">{error.message}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          Try Again
        </button>
      </motion.div>
    );
  }

  // ✅ Empty State - نفرق بين حالتين
  const hasServices = services && services.length > 0;
  const hasFilters = filters.category !== "all" || filters.searchQuery.trim();

  if (!hasServices) {
    // مفيش services أصلاً
    return <ServicesEmpty />;
  }

  if (filteredServices.length === 0 && hasFilters) {
    // في services لكن الفلتر مرجعش نتايج
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-20 text-center"
      >
        <div className="text-5xl mb-4">🔍</div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          No services found
        </h3>
        <p className="text-muted-foreground text-sm max-w-md">
          We couldn't find any services matching{" "}
          {filters.searchQuery && (
            <>
              <span className="font-semibold">"{filters.searchQuery}"</span>
            </>
          )}
          {filters.category !== "all" && (
            <>
              {" "}
              in <span className="font-semibold">{filters.category}</span>
            </>
          )}
        </p>
        <button
          onClick={() => {
            // Reset filters - لو عندك dispatch للـ reset
            // dispatch(resetFilters())
          }}
          className="mt-6 px-4 py-2 border-2 border-border rounded-xl text-sm font-medium hover:bg-accent transition-colors"
        >
          Clear Filters
        </button>
      </motion.div>
    );
  }

  return (
    <div>
      {/* Results Count - with aria-live for accessibility */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        aria-live="polite"
        aria-atomic="true"
        className="text-sm text-muted-foreground mb-6"
      >
        Showing{" "}
        <span className="font-semibold text-foreground">
          {filteredServices.length}
        </span>{" "}
        {filteredServices.length === 1 ? "service" : "services"}
        {filters.searchQuery && (
          <>
            {" "}
            for{" "}
            <span className="font-semibold text-foreground">
              "{filters.searchQuery}"
            </span>
          </>
        )}
      </motion.p>

      {/* Grid with AnimatePresence for smooth transitions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredServices.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
