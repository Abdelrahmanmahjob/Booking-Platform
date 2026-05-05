"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Booking } from "@/types";
import { BookingStatusBadge } from "./bookingStatusBadge";
import { useService } from "@/hooks/services/useService";
import { useCancelBooking } from "@/hooks/booking/useCancelBooking";
import {
  Calendar,
  Clock,
  DollarSign,
  Timer,
  ChevronDown,
  ChevronUp,
  X,
} from "lucide-react";

const CATEGORY_CONFIG = {
  medical: {
    icon: "🏥",
    gradient: "from-blue-500/10 to-indigo-500/10",
    border: "border-blue-200 dark:border-blue-800",
    iconBg: "bg-blue-100 dark:bg-blue-900/30",
  },
  fitness: {
    icon: "💪",
    gradient: "from-green-500/10 to-emerald-500/10",
    border: "border-green-200 dark:border-green-800",
    iconBg: "bg-green-100 dark:bg-green-900/30",
  },
  education: {
    icon: "📚",
    gradient: "from-purple-500/10 to-violet-500/10",
    border: "border-purple-200 dark:border-purple-800",
    iconBg: "bg-purple-100 dark:bg-purple-900/30",
  },
};

interface BookingCardProps {
  booking: Booking;
  index: number;
}

export function BookingCard({ booking, index }: BookingCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  const { data: service, isPending: isServiceLoading } = useService(
    booking.serviceId,
  );
  const { mutate: cancelBooking, isPending: isCancelling } = useCancelBooking();

  const config = service
    ? CATEGORY_CONFIG[service.category]
    : CATEGORY_CONFIG.medical;

  const canCancel =
    booking.status === "pending" || booking.status === "confirmed";

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const handleCancel = () => {
    cancelBooking(
      { id: booking.id, reason: "Cancelled by client" },
      { onSuccess: () => setShowCancelConfirm(false) },
    );
  };

  // ─── Loading ──────────────────────────────────
  if (isServiceLoading) {
    return (
      <div className="bg-card border border-border rounded-2xl p-6 animate-pulse">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-muted rounded-xl" />
            <div className="space-y-2">
              <div className="h-5 w-40 bg-muted rounded" />
              <div className="h-4 w-24 bg-muted rounded" />
            </div>
          </div>
          <div className="h-7 w-24 bg-muted rounded-full" />
        </div>
        <div className="flex gap-4">
          <div className="h-4 w-32 bg-muted rounded" />
          <div className="h-4 w-24 bg-muted rounded" />
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      layout
      className={`
        bg-card border border-border
        rounded-2xl overflow-hidden
        shadow-sm hover:shadow-md
        transition-shadow duration-300
      `}
    >
      {/* Top Gradient Bar */}
      <div className={`h-1 w-full bg-linear-to-r ${config.gradient}`} />

      <div className="p-6">
        {/* ─── Header ──────────────────────────── */}
        <div className="flex items-start justify-between flex-wrap gap-4 mb-5">
          {/* Left: Icon + Info */}
          <div className="flex items-center gap-4">
            <div
              className={`
              w-10 md:w-14  h-10 md:h-14 rounded-2xl
              ${config.iconBg}
              flex items-center justify-center
              text-xl md:text-2xl shrink-0
            `}
            >
              {config.icon}
            </div>

            <div>
              <h2 className="text-md md:text-lg font-bold text-foreground leading-tight">
                {service?.name || "Unknown Service"}
              </h2>
              <p className="text-sm text-muted-foreground mt-0.5 capitalize">
                {service?.category} Service
              </p>
            </div>
          </div>

          {/* Right: Status Badge */}
          <BookingStatusBadge status={booking.status} />
        </div>

        {/* ─── Details ─────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
          <DetailChip
            icon={<Calendar className="w-3.5 h-3.5" />}
            label="Date"
            value={formatDate(booking.date)}
            fullWidth
          />
          <DetailChip
            icon={<Clock className="w-3.5 h-3.5" />}
            label="Time"
            value={formatTime(booking.time)}
          />
          <DetailChip
            icon={<Timer className="w-3.5 h-3.5" />}
            label="Duration"
            value={`${service?.duration || "—"} min`}
          />
          <DetailChip
            icon={<DollarSign className="w-3.5 h-3.5" />}
            label="Price"
            value={`$${service?.price || "—"}`}
            highlight
          />
        </div>

        {/* ─── Expandable Notes ────────────────── */}
        {booking.notes && (
          <div className="mb-5">
            <button
              onClick={() => setExpanded(!expanded)}
              className="
                flex items-center gap-2
                text-sm text-muted-foreground
                hover:text-foreground
                transition-colors duration-200
              "
            >
              {expanded ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
              {expanded ? "Hide notes" : "Show notes"}
            </button>

            <AnimatePresence>
              {expanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div
                    className="
                    mt-3 p-4
                    bg-muted/50 rounded-xl
                    text-sm text-muted-foreground
                    leading-relaxed
                    border border-border
                  "
                  >
                    📝 {booking.notes}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* ─── Footer ──────────────────────────── */}
        <div
          className="
          flex items-center justify-between
          pt-4 border-t border-border
        "
        >
          {/* Booking ID */}
          <p className="text-xs text-muted-foreground font-mono">
            #{booking.id.slice(0, 8).toUpperCase()}
          </p>

          {/* Cancel Button */}
          {canCancel && !showCancelConfirm && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowCancelConfirm(true)}
              className="
                flex items-center gap-2
                px-4 py-2
                border-2 border-destructive/30
                text-destructive
                rounded-xl text-sm font-medium
                hover:bg-destructive/10
                transition-all duration-200
              "
            >
              <X className="w-4 h-4" />
              Cancel Booking
            </motion.button>
          )}
        </div>

        {/* ─── Cancel Confirmation ─────────────── */}
        <AnimatePresence>
          {showCancelConfirm && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="
                mt-4 p-4
                bg-destructive/10
                border-2 border-destructive/20
                rounded-xl
              "
            >
              <p className="text-sm font-semibold text-foreground mb-1">
                Cancel this booking?
              </p>
              <p className="text-xs text-muted-foreground mb-4">
                This action cannot be undone.
              </p>

              <div className="flex gap-2">
                {/* Keep */}
                <button
                  onClick={() => setShowCancelConfirm(false)}
                  disabled={isCancelling}
                  className="
                    flex-1 py-2
                    border-2 border-border
                    text-foreground text-sm font-medium
                    rounded-xl
                    hover:bg-muted
                    transition-all duration-200
                    disabled:opacity-50
                  "
                >
                  Keep Booking
                </button>

                {/* Confirm Cancel */}
                <button
                  onClick={handleCancel}
                  disabled={isCancelling}
                  className="
                    flex-1 py-2
                    bg-destructive text-white
                    text-sm font-bold
                    rounded-xl
                    hover:bg-destructive/90
                    transition-all duration-200
                    disabled:opacity-50
                    flex items-center justify-center gap-2
                  "
                >
                  {isCancelling ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Cancelling...
                    </>
                  ) : (
                    <>
                      <X className="w-4 h-4" />
                      Yes, Cancel
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ─── Detail Chip ──────────────────────────────────
function DetailChip({
  icon,
  label,
  value,
  fullWidth,
  highlight,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  fullWidth?: boolean;
  highlight?: boolean;
}) {
  return (
    <div
      className={`
      flex items-center gap-2.5
      p-3 bg-muted/50 rounded-xl
      ${fullWidth ? "col-span-2 sm:col-span-4" : ""}
    `}
    >
      <div className="text-muted-foreground shrink-0">{icon}</div>
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p
          className={`
          text-sm font-bold truncate
          ${highlight ? "text-primary" : "text-foreground"}
        `}
        >
          {value}
        </p>
      </div>
    </div>
  );
}
