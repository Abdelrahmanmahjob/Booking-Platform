"use client";

import { motion } from "framer-motion";
import { useAppSelector } from "@/lib/hooks";
import { selectCurrentUser } from "@/store/slices/authSlice";
import { useProviderServices } from "@/hooks/provider/useProviderServices";
import { useProviderBookings } from "@/hooks/provider/useProviderBookings";

export function StatsCards() {
  const user = useAppSelector(selectCurrentUser);

  const { data: services = [] } = useProviderServices(user?.id || "");
  const { data: bookings = [] } = useProviderBookings(user?.id || "");

  const totalServices = services.length;
  const totalBookings = bookings.length;

  const pendingBookings = bookings.filter((b) => b.status === "pending").length;

  const estimatedRevenue = bookings
    .filter((b) => b.status === "completed")
    .reduce((total, booking) => {
      const service = services.find((s) => s.id === booking.serviceId);
      return total + (service?.price || 0);
    }, 0);

  const stats = [
    {
      label: "Total Services",
      value: totalServices,
      icon: "🛠️",
    },
    {
      label: "Total Bookings",
      value: totalBookings,
      icon: "📅",
    },
    {
      label: "Pending",
      value: pendingBookings,
      icon: "⏳",
    },
    {
      label: "Revenue",
      value: `$${estimatedRevenue}`,
      icon: "💰",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="bg-card border border-border rounded-2xl p-6 shadow-elevated hover:shadow-high transition"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-3xl">{stat.icon}</span>
          </div>

          <div className="text-3xl font-bold text-foreground">{stat.value}</div>
          <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  );
}
