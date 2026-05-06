"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { User } from "@/types";
import { useLogout } from "@/hooks/auth/useLogout";
import { usePathname } from "next/navigation";

interface UserProfileProps {
  user: User;
}

export function UserProfile({ user }: UserProfileProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { mutate: logout, isPending } = useLogout();

  const pathname = usePathname();
  const CLIENT_LINKS = [
    { href: "/services", label: "Services", icon: "🔍" },
    { href: "/my-bookings", label: "My Bookings", icon: "📅" },
  ];

  const PROVIDER_LINKS = [
    { href: "/provider/dashboard", label: "Dashboard", icon: "📊" },
    { href: "/provider/services", label: "My Services", icon: "🛠️" },
    { href: "/provider/bookings", label: "Bookings", icon: "📅" },
  ];

  const links = user.role === "client" ? CLIENT_LINKS : PROVIDER_LINKS;

  return (
    <div className="relative">
      <button
        onClick={() => setIsProfileOpen(!isProfileOpen)}
        className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-accent transition-all duration-200 group"
      >
        <div className="w-8 h-8 bg-linear-to-br from-primary to-primary/60 rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold shadow-sm">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <div className="hidden sm:block text-left">
          <p className="text-sm font-medium text-foreground leading-none">
            {user.name.split(" ")[0]}
          </p>
          <p className="text-xs text-muted-foreground capitalize mt-0.5">
            {user.role}
          </p>
        </div>
        <svg
          className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${isProfileOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <AnimatePresence>
        {isProfileOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsProfileOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 mt-2 w-56 bg-card border border-border rounded-2xl shadow-2xl overflow-hidden z-50"
            >
              <div className="px-4 py-3 border-b border-border bg-muted/30">
                <p className="text-sm font-semibold text-foreground">
                  {user.name}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5 truncate">
                  {user.email}
                </p>
              </div>
              <div className="md:hidden flex flex-col gap-2 py-2">
                {links.map((link) => {
                  const isActive = pathname === link.href;

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`
                        relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium
                        transition-all duration-200
                        ${
                          isActive
                            ? "text-primary bg-primary/10"
                            : "text-muted-foreground hover:text-foreground hover:bg-accent"
                        }
                      `}
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <span>{link.icon}</span>
                      <span>{link.label}</span>
                      {isActive && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 bg-primary/10 rounded-xl -z-10"
                        />
                      )}
                    </Link>
                  );
                })}
              </div>
              <div className="p-2">
                <Link
                  href="/profile"
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-foreground hover:bg-accent transition-colors"
                >
                  <svg
                    className="w-4 h-4 text-muted-foreground"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  Profile
                </Link>

                <button
                  onClick={() => {
                    setIsProfileOpen(false);
                    logout();
                  }}
                  disabled={isPending}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-destructive hover:bg-destructive/10 transition-colors disabled:opacity-50"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  {isPending ? "Logging out..." : "Logout"}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
