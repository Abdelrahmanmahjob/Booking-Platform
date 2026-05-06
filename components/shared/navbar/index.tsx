"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useAppSelector } from "@/lib/hooks";
import {
  selectCurrentUser,
  selectIsAuthenticated,
} from "@/store/slices/authSlice";
import { ThemeToggle } from "@/components/theme/theme-toggle";

import { DesktopNav } from "./desktop-nav";
import { MobileMenu } from "./mobile-menu";
import { UserProfile } from "./user-profile";
import { AuthButtons } from "./auth-buttons";

const CLIENT_LINKS = [
  { href: "/services", label: "Services", icon: "🔍" },
  { href: "/my-bookings", label: "My Bookings", icon: "📅" },
];

const PROVIDER_LINKS = [
  { href: "/provider/dashboard", label: "Dashboard", icon: "📊" },
  { href: "/provider/services", label: "My Services", icon: "🛠️" },
  { href: "/provider/bookings", label: "Bookings", icon: "📅" },
];

export function Navbar() {
  const pathname = usePathname();
  const user = useAppSelector(selectCurrentUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isAuthPage =
    pathname.startsWith("/login") || pathname.startsWith("/register");

  if (isAuthPage) return null;

  const links = user?.role === "provider" ? PROVIDER_LINKS : CLIENT_LINKS;

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-sm shadow-primary/50 group-hover:scale-110 transition-transform">
              <svg className="w-4 h-4 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="font-bold text-lg text-foreground">
              Book<span className="text-primary">It</span>
            </span>
          </Link>

          {mounted && isAuthenticated && <DesktopNav links={links} />}

          <div className="flex items-center gap-3">
            <ThemeToggle />

            {mounted && (
              <>
                {isAuthenticated && user ? (
                  <UserProfile user={user} />
                ) : (
                  <AuthButtons />
                )}
              </>
            )}

            {mounted && (
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-xl hover:bg-accent transition-colors text-foreground"
              >
                <motion.div
                  animate={isMenuOpen ? "open" : "closed"}
                  className="w-5 h-5 flex flex-col justify-center gap-1"
                >
                  <motion.span variants={{ open: { rotate: 45, y: 6 }, closed: { rotate: 0, y: 0 } }} className="block h-0.5 w-5 bg-current rounded-full origin-center" />
                  <motion.span variants={{ open: { opacity: 0 }, closed: { opacity: 1 } }} className="block h-0.5 w-5 bg-current rounded-full" />
                  <motion.span variants={{ open: { rotate: -45, y: -6 }, closed: { rotate: 0, y: 0 } }} className="block h-0.5 w-5 bg-current rounded-full origin-center" />
                </motion.div>
              </button>
            )}
          </div>
        </div>
      </div>

      {mounted && (
        <MobileMenu
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          isAuthenticated={isAuthenticated}
          user={user}
          links={links}
        />
      )}
    </nav>
  );
}
