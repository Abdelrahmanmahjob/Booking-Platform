"use client";

import { servicesApi } from "@/lib/api/services";
import { useQuery } from "@tanstack/react-query";

export function useProviderServices(providerId: string) {
  return useQuery({
    queryKey: ["provider-services", providerId],
    queryFn: () => servicesApi.getByProvider(providerId),
    enabled: !!providerId,
  });
}
