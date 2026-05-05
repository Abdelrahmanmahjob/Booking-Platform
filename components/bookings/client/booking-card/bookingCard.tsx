"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Booking } from "@/types";
import { useService } from "@/hooks/services/useService";
import { useCancelBooking } from "@/hooks/booking/useCancelBooking";
import { BookingCardHeader } from "./bookingCardHeader";
import { BookingCardDetails } from "./bookingCardDetails";
import { BookingCardFooter } from "./bookingCardFooter";
import { BookingCancelConfirm } from "./bookingCancelConfirm";

const CATEGORY_CONFIG = {
  medical: {
    icon: "🏥",
    gradient: "from-blue-500/10 to-indigo-500/10",
    iconBg: "bg-blue-100 dark:bg-blue-900/30",
  },
  fitness: {
    icon: "💪",
    gradient: "from-green-500/10 to-emerald-500/10",
    iconBg: "bg-green-100 dark:bg-green-900/30",
  },
  education: {
    icon: "📚",
    gradient: "from-purple-500/10 to-violet-500/10",
    iconBg: "bg-purple-100 dark:bg-purple-900/30",
  },
};

interface BookingCardProps {
  booking: Booking;
  index: number;
}

export function BookingCard({ booking, index }: BookingCardProps) {
  const [showCancel, setShowCancel] = useState(false);

  const { data: service, isPending } = useService(booking.serviceId);
  const { mutate: cancelBooking, isPending: isCancelling } = useCancelBooking();

  const config = service
    ? CATEGORY_CONFIG[service.category]
    : CATEGORY_CONFIG.medical;

  const canCancel =
    booking.status === "pending" || booking.status === "confirmed";

  const handleCancel = () => {
    cancelBooking(
      { id: booking.id, reason: "Cancelled by client" },
      { onSuccess: () => setShowCancel(false) },
    );
  };

  // Loading
  if (isPending) return <BookingCardSkeleton />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      layout
      className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      {/* Top Gradient Bar */}
      <div className={`h-1 w-full bg-linear-to-r ${config.gradient}`} />

      <div className="p-6 space-y-5">
        {/* Header */}
        <BookingCardHeader
          service={service!}
          booking={booking}
          config={config}
        />

        {/* Details */}
        <BookingCardDetails booking={booking} service={service!} />

        {/* Footer */}
        <BookingCardFooter
          bookingId={booking.id}
          canCancel={canCancel}
          onCancelClick={() => setShowCancel(true)}
        />

        {/* Cancel Confirm */}
        <BookingCancelConfirm
          show={showCancel}
          isCancelling={isCancelling}
          onConfirm={handleCancel}
          onDismiss={() => setShowCancel(false)}
        />
      </div>
    </motion.div>
  );
}

// Skeleton
function BookingCardSkeleton() {
  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden animate-pulse">
      <div className="h-1 w-full bg-muted" />
      <div className="p-6 space-y-5">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-muted rounded-2xl" />
            <div className="space-y-2">
              <div className="h-5 w-40 bg-muted rounded" />
              <div className="h-4 w-24 bg-muted rounded" />
            </div>
          </div>
          <div className="h-7 w-24 bg-muted rounded-full" />
        </div>
        <div className="grid grid-cols-4 gap-3">
          <div className="col-span-4 h-14 bg-muted rounded-xl" />
          <div className="col-span-2 h-14 bg-muted rounded-xl" />
          <div className="col-span-2 h-14 bg-muted rounded-xl" />
        </div>
        <div className="flex justify-between pt-4 border-t border-border">
          <div className="h-4 w-24 bg-muted rounded" />
          <div className="h-9 w-32 bg-muted rounded-xl" />
        </div>
      </div>
    </div>
  );
}
