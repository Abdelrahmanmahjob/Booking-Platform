"use client";

import { motion } from "framer-motion";

interface BookingsErrorProps {
  message?: string;
  onRetry?: () => void;
}

export function BookingsError({
  message = "Something went wrong",
  onRetry,
}: BookingsErrorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-24 text-center"
    >
      <div className="text-7xl mb-6">⚠️</div>

      <h3 className="text-xl font-bold text-foreground mb-2">
        Failed to load bookings
      </h3>
      <p className="text-muted-foreground text-sm max-w-sm">{message}</p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="
            mt-8 px-6 py-3
            border-2 border-border
            text-foreground rounded-xl
            font-medium text-sm
            hover:bg-muted
            transition-all duration-200
            flex items-center gap-2
          "
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Try Again
        </button>
      )}
    </motion.div>
  );
}
