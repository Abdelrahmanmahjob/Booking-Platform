"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bookingsApi } from "@/lib/api/bookings";
import { BookingStatus } from "@/types";
import { toast } from "react-toastify";

export function useUpdateBookingStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: BookingStatus }) =>
      bookingsApi.updateStatus(id, status),

    onSuccess: (_, { status }) => {
      queryClient.invalidateQueries({
        queryKey: ["provider-bookings"],
      });
      queryClient.invalidateQueries({
        queryKey: ["available-slots"],
      });

      const messages: Record<BookingStatus, string> = {
        confirmed: "Booking confirmed! ✅",
        completed: "Booking marked as completed! 🎉",
        cancelled: "Booking cancelled",
        pending: "",
      };

      toast.success(messages[status]);
    },

    onError: (error: any) => {
      toast.error(error.message || "Failed to update booking");
    },
  });
}
