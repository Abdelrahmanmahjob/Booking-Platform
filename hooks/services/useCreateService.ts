"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { servicesApi } from "@/lib/api/services";
import { serviceKeys } from "./serviceKeys";
import type { ServiceInput } from "@/schemas/service.schema";
import type { Service } from "@/types";

export function useCreateService() {
  const queryClient = useQueryClient();

  return useMutation<
    Service,
    Error,
    { data: ServiceInput; providerId: string }
  >({
    mutationFn: ({ data, providerId }) => servicesApi.create(data, providerId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: serviceKeys.all });

      queryClient.invalidateQueries({
        queryKey: serviceKeys.byProvider(variables.providerId),
      });
    },
    onError: (error) => {
      console.error("Error creating service:", error);
    },
  });
}
