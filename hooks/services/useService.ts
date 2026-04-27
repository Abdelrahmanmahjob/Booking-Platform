"use client";

import { useQuery } from "@tanstack/react-query";
import { servicesApi } from "@/lib/api/services";
import { serviceKeys } from "./serviceKeys";
import type { Service } from "@/types";

export function useService(id: string) {
  return useQuery<Service>({
    queryKey: serviceKeys.detail(id),
    queryFn: () => servicesApi.getById(id),
    enabled: !!id,
  });
}
