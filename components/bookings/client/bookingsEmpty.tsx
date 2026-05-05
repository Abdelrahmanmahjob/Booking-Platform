"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BookingStatus } from "@/types";

type FilterOption = BookingStatus | "all";

const EMPTY_CONFIG: Record<
  FilterOption,
  { icon: string; title: string; description: string; showCTA: boolean }
> = {
  all: {
    icon: "📭",
    title: "No bookings yet",
    description:
      "Start by exploring our services and book your first appointment!",
    showCTA: true,
  },
  pending: {
    icon: "⏳",
    title: "No pending bookings",
    description: "You don't have any bookings waiting for confirmation.",
    showCTA: false,
  },
  confirmed: {
    icon: "📅",
    title: "No confirmed bookings",
    description: "You don't have any confirmed upcoming appointments.",
    showCTA: false,
  },
  completed: {
    icon: "✅",
    title: "No completed bookings",
    description: "You haven't completed any bookings yet.",
    showCTA: false,
  },
  cancelled: {
    icon: "🚫",
    title: "No cancelled bookings",
    description: "You don't have any cancelled bookings.",
    showCTA: false,
  },
};

export function BookingsEmpty({ filter }: { filter: FilterOption }) {
  const config = EMPTY_CONFIG[filter];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-24 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
        className="text-7xl mb-6"
      >
        {config.icon}
      </motion.div>

      <h3 className="text-xl font-bold text-foreground mb-2">{config.title}</h3>
      <p className="text-muted-foreground max-w-sm leading-relaxed text-sm">
        {config.description}
      </p>

      {config.showCTA && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8"
        >
          <Link
            href="/services"
            className="
              inline-flex items-center gap-2
              px-8 py-3
              bg-primary text-primary-foreground
              rounded-xl font-bold
              shadow-lg shadow-primary/25
              hover:shadow-xl hover:shadow-primary/30
              transition-all duration-200
            "
          >
            Browse Services →
          </Link>
        </motion.div>
      )}
    </motion.div>
  );
}
