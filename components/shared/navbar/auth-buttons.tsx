"use client";

import Link from "next/link";

export function AuthButtons() {
  return (
    <div className="flex items-center gap-2">
      <Link
        href="/login"
        className="px-3 md:px-4 py-2 text-xs md:text-sm font-medium text-foreground hover:text-primary transition-colors"
      >
        Sign In
      </Link>
      <Link
        href="/register/client"
        className="px-3 md:px-4 py-2 text-xs md:text-sm font-medium bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all shadow-sm shadow-primary/25"
      >
        Get Started
      </Link>
    </div>
  );
}
