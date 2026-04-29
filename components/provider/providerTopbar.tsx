"use client";

import { useAppSelector } from "@/lib/hooks";
import { selectCurrentUser } from "@/store/slices/authSlice";

export function ProviderTopbar() {
  const user = useAppSelector(selectCurrentUser);

  return (
    <div className="h-20 bg-background border-b border-border px-8 flex items-center justify-center shadow-subtle">
      <div className=" text-center">
        <h1 className="text-xl font-semibold text-foreground">
          Welcome back, {user?.name}
        </h1>
        <p className="text-sm text-muted-foreground">
          Here’s what’s happening today
        </p>
      </div>
    </div>
  );
}
