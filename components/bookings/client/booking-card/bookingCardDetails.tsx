"use client";

import { Booking, Service } from "@/types";
import { Calendar, Clock, Timer, DollarSign } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

interface BookingCardDetailsProps {
  booking: Booking;
  service: Service;
}

export function BookingCardDetails({
  booking,
  service,
}: BookingCardDetailsProps) {
  const [showNotes, setShowNotes] = useState(false);

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

  return (
    <div className="space-y-3">
      {/* Detail Grid */}
      <div className="grid grid-cols-2 gap-3">
        {/* Date - Full Width */}
        <DetailChip
          icon={<Calendar className="w-3.5 h-3.5" />}
          label="Date"
          value={formatDate(booking.date)}
          fullWidth
        />

        {/* Time */}
        <DetailChip
          icon={<Clock className="w-3.5 h-3.5" />}
          label="Time"
          value={formatTime(booking.time)}
        />

        {/* Duration */}
        <DetailChip
          icon={<Timer className="w-3.5 h-3.5" />}
          label="Duration"
          value={`${service.duration} min`}
        />

        {/* Price - Full Width */}
        <DetailChip
          icon={<DollarSign className="w-3.5 h-3.5" />}
          label="Price"
          value={`$${service.price}`}
          fullWidth
          highlight
        />
      </div>

      {/* Notes */}
      {booking.notes && (
        <div>
          <button
            onClick={() => setShowNotes(!showNotes)}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {showNotes ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
            {showNotes ? "Hide notes" : "Show notes"}
          </button>

          <AnimatePresence>
            {showNotes && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-2 p-3 bg-muted/50 border border-border rounded-xl text-sm text-muted-foreground leading-relaxed">
                  📝 {booking.notes}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

// Detail Chip
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
      ${fullWidth ? "col-span-2" : ""}
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
