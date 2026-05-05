"use client";

import { X } from "lucide-react";

interface BookingCardFooterProps {
  bookingId: string;
  canCancel: boolean;
  onCancelClick: () => void;
}

export function BookingCardFooter({
  bookingId,
  canCancel,
  onCancelClick,
}: BookingCardFooterProps) {
  return (
    <div className="flex items-center justify-between pt-4 border-t border-border">
      {/* Booking ID */}
      <p className="text-xs text-muted-foreground font-mono">
        #{bookingId.slice(0, 8).toUpperCase()}
      </p>

      {/* Cancel Button */}
      {canCancel && (
        <button
          onClick={onCancelClick}
          className="
            flex items-center gap-2
            px-4 py-2
            border-2 border-destructive/30
            text-destructive text-sm font-medium
            rounded-xl
            hover:bg-destructive/10
            transition-all duration-200
          "
        >
          <X className="w-4 h-4" />
          Cancel
        </button>
      )}
    </div>
  );
}
