"use client";

import { BookingStatus } from "@/types";

const STATUS_CONFIG: Record<
  BookingStatus,
  { label: string; className: string; dotClass: string }
> = {
  pending: {
    label: "Pending",
    className:
      "bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-950/50 dark:text-yellow-400 dark:border-yellow-800",
    dotClass: "bg-yellow-500 animate-pulse",
  },
  confirmed: {
    label: "Confirmed",
    className:
      "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-950/50 dark:text-blue-400 dark:border-blue-800",
    dotClass: "bg-blue-500",
  },
  completed: {
    label: "Completed",
    className:
      "bg-green-100 text-green-700 border-green-200 dark:bg-green-950/50 dark:text-green-400 dark:border-green-800",
    dotClass: "bg-green-500",
  },
  cancelled: {
    label: "Cancelled",
    className:
      "bg-red-100 text-red-700 border-red-200 dark:bg-red-950/50 dark:text-red-400 dark:border-red-800",
    dotClass: "bg-red-500",
  },
};

interface BookingStatusBadgeProps {
  status: BookingStatus;
}

export function BookingStatusBadge({ status }: BookingStatusBadgeProps) {
  const config = STATUS_CONFIG[status];

  return (
    <span
      className={`
      inline-flex items-center gap-1.5
      px-3 py-1 rounded-full
      text-xs font-bold border
      shrink-0
      ${config.className}
    `}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dotClass}`} />
      {config.label}
    </span>
  );
}
