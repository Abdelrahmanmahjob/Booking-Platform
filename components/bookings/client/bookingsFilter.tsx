"use client";

import { motion } from "framer-motion";
import { BookingStatus } from "@/types";

type FilterOption = BookingStatus | "all";

interface BookingsFilterProps {
  active: FilterOption;
  onChange: (filter: FilterOption) => void;
  counts: Record<FilterOption, number>;
}

const FILTERS: {
  value: FilterOption;
  label: string;
  activeClass: string;
}[] = [
  {
    value: "all",
    label: "All",
    activeClass: "bg-foreground text-background border-foreground",
  },
  {
    value: "pending",
    label: "Pending",
    activeClass: "bg-yellow-500 text-white border-yellow-500",
  },
  {
    value: "confirmed",
    label: "Confirmed",
    activeClass: "bg-blue-500 text-white border-blue-500",
  },
  {
    value: "completed",
    label: "Completed",
    activeClass: "bg-green-500 text-white border-green-500",
  },
  {
    value: "cancelled",
    label: "Cancelled",
    activeClass: "bg-red-500 text-white border-red-500",
  },
];

export function BookingsFilter({
  active,
  onChange,
  counts,
}: BookingsFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {FILTERS.map((filter) => {
        const isActive = active === filter.value;
        const count = counts[filter.value];

        return (
          <motion.button
            key={filter.value}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onChange(filter.value)}
            className={`
              flex items-center gap-2
              px-4 py-2 rounded-xl
              text-sm font-semibold
              border-2
              transition-all duration-200
              ${
                isActive
                  ? filter.activeClass
                  : "bg-card border-border text-muted-foreground hover:border-primary/30 hover:text-foreground"
              }
            `}
          >
            {filter.label}
            <span
              className={`
              text-xs px-1.5 py-0.5
              rounded-full font-bold
              ${isActive ? "bg-white/20" : "bg-muted"}
            `}
            >
              {count}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
