"use client";

import { Booking, Service } from "@/types";
import { BookingStatusBadge } from "../bookingStatusBadge";

interface BookingCardHeaderProps {
  service: Service;
  booking: Booking;
  config: {
    icon: string;
    iconBg: string;
  };
}

export function BookingCardHeader({
  service,
  booking,
  config,
}: BookingCardHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-4">
      {/* Left */}
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
            {service.name}
          </h2>
          <p className="text-sm text-muted-foreground mt-0.5 capitalize">
            {service.category} Service
          </p>
        </div>
      </div>

      {/* Right */}
      <BookingStatusBadge status={booking.status} />
    </div>
  );
}
