"use client";

import { ProviderTopbar } from "./providerTopbar";

export function ProviderLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-muted/30 flex">
      <div className="flex-1 flex flex-col">
        <ProviderTopbar />
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
