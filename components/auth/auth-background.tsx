"use client";

import { useTheme } from "@/components/theme/theme-provider";
import { useEffect, useState } from "react";

export function AuthBackground() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div
        className="absolute top-0 -left-4 w-72 h-72 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob dark:mix-blend-lighten"
        style={{
          background: isDark
            ? "oklch(0.35 0.15 300 / 0.3)"
            : "oklch(0.85 0.15 300 / 0.7)",
        }}
      />
      <div
        className="absolute top-0 -right-4 w-72 h-72 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2s dark:mix-blend-lighten"
        style={{
          background: isDark
            ? "oklch(0.40 0.18 90 / 0.3)"
            : "oklch(0.9 0.18 90 / 0.7)",
        }}
      />
      <div
        className="absolute -bottom-8 left-20 w-72 h-72 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4s dark:mix-blend-lighten"
        style={{
          background: isDark
            ? "oklch(0.35 0.2 350 / 0.3)"
            : "oklch(0.85 0.2 350 / 0.7)",
        }}
      />
    </div>
  );
}
