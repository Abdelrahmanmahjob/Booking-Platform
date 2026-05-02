"use client";

import { useQuery } from "@tanstack/react-query";
import { providersApi } from "@/lib/api/providers";
import type { Provider } from "@/types";

export function useProvider(providerId: string) {
  return useQuery<Provider | null>({
    queryKey: ["provider", providerId],
    queryFn: () => providersApi.getById(providerId),
    enabled: !!providerId,
    staleTime: 5 * 60 * 1000, // 5 minutes - provider data doesn't change often
  });
}
