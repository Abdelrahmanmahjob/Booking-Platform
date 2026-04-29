"use client";

import { useServices } from "@/hooks/services/useServices";
import { useAppSelector } from "@/lib/hooks";
import { selectFilters } from "@/store/slices/servicesSlice";
import { ServiceCard } from "./serviceCard";
import { ServiceCardSkeleton } from "./serviceCardSkeleton";
import { ServicesEmpty } from "./servicesEmpty";
import { motion } from "framer-motion";

export function ServicesList() {
  const { data: services, isPending, error } = useServices();
  const filters = useAppSelector(selectFilters);

  const filteredServices = services?.filter((service) => {
    const matchesCategory =
      filters.category === "all" || service.category === filters.category;

    const matchesSearch =
      service.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      service.description
        .toLowerCase()
        .includes(filters.searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

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
      </motion.div>
    );
  }

  // Empty State
  if (!filteredServices || filteredServices.length === 0) {
    return <ServicesEmpty />;
  }

  return (
    <div>
      {/* Results Count */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
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

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service, index) => (
          <ServiceCard key={service.id} service={service} index={index} />
        ))}
      </div>
    </div>
  );
}
