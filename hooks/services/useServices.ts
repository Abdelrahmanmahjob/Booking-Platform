"use client";

import { useQuery } from "@tanstack/react-query";
import { servicesApi } from "@/lib/api/services";
import { serviceKeys } from "./serviceKeys";
import type { Service } from "@/types";

export function useServices() {
  return useQuery<Service[]>({
    queryKey: serviceKeys.all,
    queryFn: () => servicesApi.getAll(),
  });
}
