"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

interface DesktopNavProps {
  links: { href: string; label: string; icon: string }[];
}

export function DesktopNav({ links }: DesktopNavProps) {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex items-center gap-1">
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
  );
}
