"use client";

import { motion } from "framer-motion";
import { Booking } from "@/types";
import { useService } from "@/hooks/services/useService";
import { useUpdateBookingStatus } from "@/hooks/booking/useUpdateBookingStatus";
import { BookingStatusBadge } from "@/components/bookings/client/bookingStatusBadge";
import { ProviderBookingActions } from "./providerBookingActions";
import { Calendar, Clock, Timer, DollarSign, User } from "lucide-react";
import { ProviderBookingCardSkeleton } from "./providerBookingCardSkeleton";

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

interface ProviderBookingCardProps {
  booking: Booking;
  index: number;
}

export function ProviderBookingCard({
  booking,
  index,
}: ProviderBookingCardProps) {
  const { data: service, isPending } = useService(booking.serviceId);
  const { mutate: updateStatus, isPending: isUpdating } =
    useUpdateBookingStatus();

  const config = service
    ? CATEGORY_CONFIG[service.category]
    : CATEGORY_CONFIG.medical;

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  // Loading
  if (isPending) return <ProviderBookingCardSkeleton />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      layout
      className="
        bg-card border border-border
        rounded-2xl overflow-hidden
        shadow-sm hover:shadow-md
        transition-shadow duration-300
      "
    >
      {/* Top Gradient Bar */}
      <div className={`h-1 w-full bg-linear-to-r ${config.gradient}`} />

      <div className="p-6 space-y-5">
        {/* ─── Header ──────────────────────────── */}
        <div className="flex items-start justify-between flex-wrap gap-4">
          {/* Service Info */}
          <div className="flex items-center gap-4">
            <div
              className={`
              w-14 h-14 rounded-2xl
              ${config.iconBg}
              flex items-center justify-center
              text-2xl shrink-0
            `}
            >
              {config.icon}
            </div>

            <div>
              <h2 className="text-lg font-bold text-foreground leading-tight">
                {service?.name}
              </h2>
              <p className="text-sm text-muted-foreground mt-0.5 capitalize">
                {service?.category} Service
              </p>
            </div>
          </div>

          <BookingStatusBadge status={booking.status} />
        </div>

        {/* ─── Client Info ─────────────────────── */}
        <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl">
          <div
            className="
            w-9 h-9 rounded-xl
            bg-primary/10
            flex items-center justify-center
            shrink-0
          "
          >
            <User className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Client</p>
            <p className="text-sm font-bold text-foreground font-mono">
              #{booking.clientId.slice(0, 8).toUpperCase()}
            </p>
          </div>
        </div>

        {/* ─── Details Grid ────────────────────── */}
        <div className="grid grid-cols-2 gap-3">
          {/* Date - Full Width */}
          <div className="col-span-2 flex items-center gap-2.5 p-3 bg-muted/50 rounded-xl">
            <Calendar className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground">Date</p>
              <p className="text-sm font-bold text-foreground">
                {formatDate(booking.date)}
              </p>
            </div>
          </div>

          {/* Time */}
          <div className="flex items-center gap-2.5 p-3 bg-muted/50 rounded-xl">
            <Clock className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground">Time</p>
              <p className="text-sm font-bold text-foreground">
                {formatTime(booking.time)}
              </p>
            </div>
          </div>

          {/* Duration */}
          <div className="flex items-center gap-2.5 p-3 bg-muted/50 rounded-xl">
            <Timer className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground">Duration</p>
              <p className="text-sm font-bold text-foreground">
                {service?.duration} min
              </p>
            </div>
          </div>

          {/* Price - Full Width */}
          <div className="col-span-2 flex items-center gap-2.5 p-3 bg-primary/5 border border-primary/20 rounded-xl">
            <DollarSign className="w-3.5 h-3.5 text-primary shrink-0" />
            <div className="flex-1">
              <p className="text-xs text-muted-foreground">Price</p>
              <p className="text-sm font-bold text-primary">
                ${service?.price}
              </p>
            </div>
          </div>
        </div>

        {/* ─── Notes ───────────────────────────── */}
        {booking.notes && (
          <div className="p-3 bg-muted/50 border border-border rounded-xl">
            <p className="text-xs text-muted-foreground mb-1">Notes</p>
            <p className="text-sm text-foreground leading-relaxed">
              📝 {booking.notes}
            </p>
          </div>
        )}

        {/* ─── Booking ID ──────────────────────── */}
        <p className="text-xs text-muted-foreground font-mono">
          Booking #{booking.id.slice(0, 8).toUpperCase()}
        </p>

        {/* ─── Actions ─────────────────────────── */}
        <ProviderBookingActions
          status={booking.status}
          isUpdating={isUpdating}
          onConfirm={() =>
            updateStatus({ id: booking.id, status: "confirmed" })
          }
          onComplete={() =>
            updateStatus({ id: booking.id, status: "completed" })
          }
          onCancel={() => updateStatus({ id: booking.id, status: "cancelled" })}
        />
      </div>
    </motion.div>
  );
}
