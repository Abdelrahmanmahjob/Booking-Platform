"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useAppSelector } from "@/lib/hooks";
import {
  selectCurrentUser,
  selectIsAuthenticated,
} from "@/store/slices/authSlice";
import { useLogout } from "@/hooks/auth/useLogout";
import { ThemeToggle } from "@/components/theme/theme-toggle";

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
  const { mutate: logout, isPending } = useLogout();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

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
              <svg
                className="w-4 h-4 text-primary-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <span className="font-bold text-lg text-foreground">
              Book<span className="text-primary">It</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {mounted &&
              isAuthenticated &&
              links.map((link) => {
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

          <div className="flex items-center gap-3">
            <ThemeToggle />

            {mounted && (
              <>
                {isAuthenticated && user ? (
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
                ) : (
                  <div className="hidden sm:flex items-center gap-2">
                    <Link
                      href="/login"
                      className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/register/client"
                      className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all shadow-sm shadow-primary/25"
                    >
                      Get Started
                    </Link>
                  </div>
                )}
              </>
            )}

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-xl hover:bg-accent transition-colors text-foreground"
            >
              <motion.div
                animate={isMenuOpen ? "open" : "closed"}
                className="w-5 h-5 flex flex-col justify-center gap-1"
              >
                <motion.span
                  variants={{
                    open: { rotate: 45, y: 6 },
                    closed: { rotate: 0, y: 0 },
                  }}
                  className="block h-0.5 w-5 bg-current rounded-full origin-center"
                />
                <motion.span
                  variants={{ open: { opacity: 0 }, closed: { opacity: 1 } }}
                  className="block h-0.5 w-5 bg-current rounded-full"
                />
                <motion.span
                  variants={{
                    open: { rotate: -45, y: -6 },
                    closed: { rotate: 0, y: 0 },
                  }}
                  className="block h-0.5 w-5 bg-current rounded-full origin-center"
                />
              </motion.div>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mounted && isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border bg-background overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {isAuthenticated ? (
                <>
                  <div className="flex items-center gap-3 p-3 mb-3 bg-muted/30 rounded-xl">
                    <div className="w-10 h-10 bg-linear-to-br from-primary to-primary/60 rounded-full flex items-center justify-center text-primary-foreground font-bold">
                      {user?.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">
                        {user?.name}
                      </p>
                      <p className="text-xs text-muted-foreground capitalize">
                        {user?.role}
                      </p>
                    </div>
                  </div>
                  {links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium ${
                        pathname === link.href
                          ? "bg-primary/10 text-primary"
                          : "text-foreground"
                      }`}
                    >
                      <span>{link.icon}</span>
                      <span>{link.label}</span>
                    </Link>
                  ))}
                </>
              ) : (
                <div className="grid gap-2">
                  <Link
                    href="/login"
                    className="px-4 py-3 text-center rounded-xl border border-border"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/register/client"
                    className="px-4 py-3 text-center bg-primary text-primary-foreground rounded-xl"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
