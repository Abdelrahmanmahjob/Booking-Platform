"use client";

import { useAppSelector } from "@/lib/hooks";
import { selectCurrentUser } from "@/store/slices/authSlice";
import { useEffect, useState } from "react";

export function ProviderTopbar() {
  const user = useAppSelector(selectCurrentUser);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="h-20 bg-background border-b border-border px-8 flex items-center justify-center shadow-subtle">
      <div className="text-center">
        {!mounted ? (
          <div className="space-y-2">
            <div className="h-6 w-48 bg-muted rounded-lg animate-pulse mx-auto" />
            <div className="h-4 w-36 bg-muted rounded-lg animate-pulse mx-auto" />
          </div>
        ) : (
          <>
            <h1 className="text-xl font-semibold text-foreground">
              Welcome back, {user?.name} 👋
            </h1>
            <p className="text-sm text-muted-foreground">
              Here's what's happening today
            </p>
          </>
        )}
      </div>
    </div>
  );
}
