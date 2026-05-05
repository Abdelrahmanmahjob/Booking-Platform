"use client";

import { useQuery } from "@tanstack/react-query";
import { bookingsApi } from "@/lib/api/bookings";

export function useClientBookings(clientId: string) {
  return useQuery({
    queryKey: ["client-bookings", clientId],
    queryFn: () => bookingsApi.getByClient(clientId),
    enabled: !!clientId,
  });
}
