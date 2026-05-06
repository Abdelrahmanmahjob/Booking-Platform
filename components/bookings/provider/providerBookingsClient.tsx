"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useAppSelector } from "@/lib/hooks";
import { selectCurrentUser } from "@/store/slices/authSlice";
import { useProviderBookings } from "@/hooks/provider/useProviderBookings";
import { ProviderBookingCard } from "./providerBookingCard";
import { ProviderBookingsFilter } from "./providerBookingsFilter";
import { BookingsSkeleton } from "@/components/bookings/client/bookingsSkeleton";
import { BookingsEmpty } from "@/components/bookings/client/bookingsEmpty";
import { BookingsError } from "@/components/bookings/client/bookingsError";
import { BookingStatus } from "@/types";

export function ProviderBookingsClient() {
  const user = useAppSelector(selectCurrentUser);
  const [activeFilter, setActiveFilter] = useState<BookingStatus | "all">(
    "all",
  );

  const {
    data: bookings = [],
    isPending,
    error,
    refetch,
  } = useProviderBookings(user?.id || "");

  const filteredBookings =
    activeFilter === "all"
      ? bookings
      : bookings.filter((b) => b.status === activeFilter);

  if (isPending) return <BookingsSkeleton />;
  if (error) return <BookingsError message={error.message} onRetry={refetch} />;

  return (
    <div className="space-y-6 container mx-auto py-8 max-w-3xl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-foreground">
          Bookings Management
        </h1>
        <p className="text-muted-foreground mt-1">
          {filteredBookings.length} booking
          {filteredBookings.length !== 1 ? "s" : ""} found
        </p>
      </motion.div>

      {/* Filters */}
      <ProviderBookingsFilter
        active={activeFilter}
        onChange={setActiveFilter}
        counts={{
          all: bookings.length,
          pending: bookings.filter((b) => b.status === "pending").length,
          confirmed: bookings.filter((b) => b.status === "confirmed").length,
          completed: bookings.filter((b) => b.status === "completed").length,
          cancelled: bookings.filter((b) => b.status === "cancelled").length,
        }}
      />

      {/* Empty */}
      {filteredBookings.length === 0 && <BookingsEmpty filter={activeFilter} />}

      {/* Bookings List */}
      <div className="space-y-4">
        {filteredBookings.map((booking, index) => (
          <ProviderBookingCard
            key={booking.id}
            booking={booking}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
