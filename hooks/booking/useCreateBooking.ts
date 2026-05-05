"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bookingsApi } from "@/lib/api/bookings";
import type { Booking } from "@/types";
import { toast } from "react-toastify";

type CreateBookingInput = Omit<
  Booking,
  "id" | "createdAt" | "updatedAt" | "status"
>;

export function useCreateBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateBookingInput) => {
      const bookingData = {
        ...data,
        status: "pending" as const,
      };

      return bookingsApi.create(bookingData);
    },

    onSuccess: (newBooking) => {
      // Invalidate queries
      queryClient.invalidateQueries({
        queryKey: ["provider-bookings", newBooking.providerId],
      });

      queryClient.invalidateQueries({
        queryKey: ["client-bookings", newBooking.clientId],
      });

      queryClient.invalidateQueries({
        queryKey: ["available-slots", newBooking.serviceId],
      });

      toast.success("Booking confirmed! 🎉");
    },

    onError: (error: any) => {
      toast.error("Failed to create booking");
      console.error("Booking error:", error);
    },
  });
}
