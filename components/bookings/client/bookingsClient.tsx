"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useAppSelector } from "@/lib/hooks";
import { selectCurrentUser } from "@/store/slices/authSlice";
import { useClientBookings } from "@/hooks/booking/useClientBookings";
import { BookingCard } from "./booking-card/bookingCard";
import { BookingsFilter } from "./bookingsFilter";
import { BookingsSkeleton } from "./bookingsSkeleton";
import { BookingsEmpty } from "./bookingsEmpty";
import { BookingsError } from "./bookingsError";
import { BookingStatus } from "@/types";

export function BookingsClient() {
  const user = useAppSelector(selectCurrentUser);
  const [activeFilter, setActiveFilter] = useState<BookingStatus | "all">(
    "all",
  );

  const {
    data: bookings = [],
    isPending,
    error,
    refetch,
  } = useClientBookings(user?.id || "");

  const filteredBookings = bookings.filter(
    (b) => b.status === activeFilter || activeFilter === "all",
  );

  // Loading State
  if (isPending) {
    return <BookingsSkeleton />;
  }

  // Error State
  if (error) {
    return <BookingsError message={error.message} onRetry={refetch} />;
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-foreground">My Bookings</h1>
          <p className="text-muted-foreground mt-1">
            {filteredBookings.length} booking
            {filteredBookings.length !== 1 ? "s" : ""} found
          </p>
        </motion.div>

        {/* Filters */}
        <BookingsFilter
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

        {filteredBookings.length === 0 && (
          <BookingsEmpty filter={activeFilter} />
        )}

        {/* Bookings List */}
        <div className="space-y-4 mt-6">
          {filteredBookings.map((booking, index) => (
            <BookingCard key={booking.id} booking={booking} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
