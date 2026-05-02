"use client";

import { servicesApi } from "@/lib/api/services";
import { useQuery } from "@tanstack/react-query";
import { serviceKeys } from "../services/serviceKeys";

export function useProviderServices(providerId: string) {
  return useQuery({
    queryKey: serviceKeys.byProvider(providerId),
    queryFn: () => servicesApi.getByProvider(providerId),
    enabled: !!providerId,
  });
}
