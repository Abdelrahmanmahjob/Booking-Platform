"use client";

import { useQuery } from "@tanstack/react-query";
import { bookingsApi } from "@/lib/api/bookings";

export function useProviderBookings(providerId: string) {
  return useQuery({
    queryKey: ["provider-bookings", providerId],
    queryFn: () => bookingsApi.getByProvider(providerId),
    enabled: !!providerId,
  });
}
