"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bookingsApi } from "@/lib/api/bookings";
import { toast } from "react-toastify";

export function useCancelBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, reason }: { id: string; reason?: string }) =>
      bookingsApi.cancel(id, reason),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["client-bookings"] });
      queryClient.invalidateQueries({ queryKey: ["available-slots"] });
      toast.success("Booking cancelled successfully");
    },

    onError: (error: any) => {
      toast.error(error.message || "Failed to cancel booking");
    },
  });
}
