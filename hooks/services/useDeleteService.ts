"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { servicesApi } from "@/lib/api/services";
import { serviceKeys } from "./serviceKeys";

export function useDeleteService() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, { id: string; providerId?: string }>({
    // ← اضف providerId
    mutationFn: ({ id }) => servicesApi.delete(id),
    onSuccess: (_, { providerId }) => {
      queryClient.invalidateQueries({ queryKey: serviceKeys.all });

      if (providerId) {
        queryClient.invalidateQueries({
          queryKey: serviceKeys.byProvider(providerId),
        });
      }
    },
    onError: (error) => {
      console.error("Error deleting service:", error);
    },
  });
}
