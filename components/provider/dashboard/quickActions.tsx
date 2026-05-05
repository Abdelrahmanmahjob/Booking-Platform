"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const ACTIONS = [
  {
    label: "Add Service",
    description: "Create a new service",
    icon: "➕",
    href: "/provider/services",
    color:
      "from-blue-500/10 to-indigo-500/10 border-blue-200 dark:border-blue-800",
    iconBg: "bg-blue-100 dark:bg-blue-950",
  },
  {
    label: "View Bookings",
    description: "Manage your bookings",
    icon: "📅",
    href: "/provider/bookings",
    color:
      "from-green-500/10 to-emerald-500/10 border-green-200 dark:border-green-800",
    iconBg: "bg-green-100 dark:bg-green-950",
  },
  {
    label: "Edit Profile",
    description: "Update your business info",
    icon: "✏️",
    href: "/provider/profile",
    color:
      "from-purple-500/10 to-violet-500/10 border-purple-200 dark:border-purple-800",
    iconBg: "bg-purple-100 dark:bg-purple-950",
  },
];

export function QuickActions() {
  return (
    <div>
      <h2 className="text-lg font-semibold text-foreground mb-4">
        Quick Actions
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {ACTIONS.map((action, i) => (
          <motion.div
            key={action.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -3 }}
          >
            <Link
              href={action.href}
              className={`
                flex items-center gap-4 p-5
                bg-linear-to-br ${action.color}
                border rounded-2xl
                transition-all duration-200
                hover:shadow-elevated
                group
              `}
            >
              <div
                className={`
                w-12 h-12 ${action.iconBg}
                rounded-xl flex items-center justify-center text-2xl
                group-hover:scale-110 transition-transform duration-200
              `}
              >
                {action.icon}
              </div>

              <div>
                <p className="font-semibold text-foreground">{action.label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {action.description}
                </p>
              </div>

              <svg
                className="w-5 h-5 text-muted-foreground ml-auto group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
