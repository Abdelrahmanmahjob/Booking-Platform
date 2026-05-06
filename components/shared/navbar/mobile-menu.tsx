"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { UserRole } from "@/types";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isAuthenticated: boolean;
  user?: { name: string; role: UserRole } | null;
  links: { href: string; label: string; icon: string }[];
}

export function MobileMenu({ isOpen, onClose, isAuthenticated, user, links }: MobileMenuProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence>
      {isOpen && (
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
                    onClick={onClose}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium ${
                      pathname === link.href
                        ? "bg-primary/10 text-primary"
                        : "text-foreground hover:bg-accent"
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
                  onClick={onClose}
                  className="px-4 py-3 text-center rounded-xl border border-border"
                >
                  Sign In
                </Link>
                <Link
                  href="/register/client"
                  onClick={onClose}
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
  );
}
