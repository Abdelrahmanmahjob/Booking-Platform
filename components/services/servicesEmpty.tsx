"use client";

import { motion } from "framer-motion";
import { useAppDispatch } from "@/lib/hooks";
import { resetFilters } from "@/store/slices/servicesSlice";

export function ServicesEmpty() {
  const dispatch = useAppDispatch();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-20 text-center"
    >
      <div className="text-6xl mb-6">🔍</div>
      <h3 className="text-xl font-semibold text-foreground mb-2">
        No services found
      </h3>
      <p className="text-muted-foreground max-w-sm mb-6">
        We couldn't find any services matching your search. Try adjusting your
        filters.
      </p>
      <button
        onClick={() => dispatch(resetFilters())}
        className="
          px-6 py-2.5
          bg-primary text-primary-foreground
          rounded-xl font-medium
          hover:bg-primary/90
          transition-all duration-200
          shadow-lg shadow-primary/25
        "
      >
        Reset Filters
      </button>
    </motion.div>
  );
}
