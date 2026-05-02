"use client";

import { motion } from "framer-motion";
import { useAppSelector } from "@/lib/hooks";
import { selectCurrentUser } from "@/store/slices/authSlice";
import { useProviderBookings } from "@/hooks/provider/useProviderBookings";
import { useProviderServices } from "@/hooks/provider/useProviderServices";
import { Booking } from "@/types";
import Link from "next/link";

const STATUS_CONFIG = {
  pending: {
    label: "Pending",
    className:
      "bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-400 dark:border-yellow-800",
  },
  confirmed: {
    label: "Confirmed",
    className:
      "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-400 dark:border-blue-800",
  },
  completed: {
    label: "Completed",
    className:
      "bg-green-100 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-400 dark:border-green-800",
  },
  cancelled: {
    label: "Cancelled",
    className:
      "bg-red-100 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-400 dark:border-red-800",
  },
};

export function RecentBookings() {
  const user = useAppSelector(selectCurrentUser);
  const { data: bookings = [], isPending } = useProviderBookings(
    user?.id || "",
  );
  const { data: services = [] } = useProviderServices(user?.id || "");

  const recentBookings = bookings.slice(0, 5);

  const getServiceName = (serviceId: string) => {
    return services.find((s) => s.id === serviceId)?.name || "Unknown Service";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-card border border-border rounded-2xl shadow-elevated overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-border">
        <div>
          <h2 className="text-lg font-semibold text-foreground">
            Recent Bookings
          </h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            Your latest {recentBookings.length} bookings
          </p>
        </div>

        <Link
          href="/provider/bookings"
          className="text-sm text-primary hover:underline font-medium"
        >
          View all →
        </Link>
      </div>

      {/* Content */}
      {isPending ? (
        <BookingsSkeleton />
      ) : recentBookings.length === 0 ? (
        <EmptyBookings />
      ) : (
        <div className="divide-y divide-border">
          {recentBookings.map((booking, index) => (
            <BookingRow
              key={booking.id}
              booking={booking}
              serviceName={getServiceName(booking.serviceId)}
              index={index}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}

// ============================================
// Booking Row
// ============================================

function BookingRow({
  booking,
  serviceName,
  index,
}: {
  booking: Booking;
  serviceName: string;
  index: number;
}) {
  const status = STATUS_CONFIG[booking.status];

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="flex items-center justify-between px-6 py-4 hover:bg-muted/30 transition-colors"
    >
      {/* Left */}
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm shrink-0">
          {booking.clientId.charAt(0).toUpperCase()}
        </div>

        {/* Info */}
        <div>
          <p className="text-sm font-medium text-foreground">{serviceName}</p>
          <p className="text-xs text-muted-foreground mt-0.5">
            {booking.date
              ? `${booking.date} at ${booking.time}`
              : booking.createdAt.split("T")[0]}
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        <span
          className={`
          px-2.5 py-1 rounded-full text-xs font-semibold border
          ${status.className}
        `}
        >
          {status.label}
        </span>
      </div>
    </motion.div>
  );
}

// ============================================
// Skeleton
// ============================================

function BookingsSkeleton() {
  return (
    <div className="divide-y divide-border">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-4 px-6 py-4 animate-pulse"
        >
          <div className="w-10 h-10 rounded-full bg-muted shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-muted rounded w-1/3" />
            <div className="h-3 bg-muted rounded w-1/4" />
          </div>
          <div className="h-6 w-20 bg-muted rounded-full" />
        </div>
      ))}
    </div>
  );
}

// ============================================
// Empty State
// ============================================

function EmptyBookings() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="text-5xl mb-4">📭</div>
      <h3 className="text-base font-semibold text-foreground mb-1">
        No bookings yet
      </h3>
      <p className="text-sm text-muted-foreground max-w-xs">
        When clients book your services, they'll appear here
      </p>
    </div>
  );
}
