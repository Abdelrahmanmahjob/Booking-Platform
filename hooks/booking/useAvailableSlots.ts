"use client";

import { useQuery } from "@tanstack/react-query";
import { bookingsApi } from "@/lib/api/bookings";

// Type واضح
type Slot = {
  time: string;
  available: boolean;
};

export function useAvailableSlots(serviceId: string, date: Date | undefined) {
  const dateString = date ? date.toISOString().split("T")[0] : null;

  return useQuery<Slot[]>({
    queryKey: ["available-slots", serviceId, dateString],
    queryFn: () => bookingsApi.getAvailableSlots(serviceId, dateString!),
    enabled: !!serviceId && !!dateString,
    staleTime: 60 * 1000,
  });
}
