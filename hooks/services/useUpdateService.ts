"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { servicesApi } from "@/lib/api/services";
import { serviceKeys } from "./serviceKeys";
import type { ServiceInput } from "@/schemas/service.schema";

export function useUpdateService() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, { id: string; data: Partial<ServiceInput> }>({
    mutationFn: ({ id, data }) => servicesApi.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: serviceKeys.all });
      queryClient.invalidateQueries({ queryKey: serviceKeys.detail(id) });
    },
    onError: (error) => {
      console.error("Error updating service:", error);
    },
  });
}
