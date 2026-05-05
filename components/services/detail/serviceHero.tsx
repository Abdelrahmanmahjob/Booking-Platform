"use client";

import { motion } from "framer-motion";
import { Service } from "@/types";
import { useState } from "react";
import { BookingModal } from "@/components/bookings/bookingModal";

const CATEGORY_CONFIG = {
  medical: {
    icon: "🏥",
    color:
      "text-blue-600 bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800 dark:text-blue-400",
    gradient: "from-blue-500/10 to-indigo-500/10",
  },
  fitness: {
    icon: "💪",
    color:
      "text-green-600 bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800 dark:text-green-400",
    gradient: "from-green-500/10 to-emerald-500/10",
  },
  education: {
    icon: "📚",
    color:
      "text-purple-600 bg-purple-50 border-purple-200 dark:bg-purple-950 dark:border-purple-800 dark:text-purple-400",
    gradient: "from-purple-500/10 to-violet-500/10",
  },
};

interface ServiceHeroProps {
  service: Service;
}

export function ServiceHero({ service }: ServiceHeroProps) {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const config = CATEGORY_CONFIG[service.category];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`
        relative overflow-hidden
        bg-linear-to-br ${config.gradient}
        border border-border rounded-2xl
        p-4 md:p-8 lg:p-12
      `}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] bg-repeat" />
      </div>

      <div className="relative">
        {/* Category Badge */}
        <div className="flex items-center flex-wrap gap-4 mb-4">
          <span
            className={`
            inline-flex items-center gap-2 px-4 py-2
            rounded-full text-sm font-semibold border
            ${config.color}
          `}
          >
            {config.icon} {service.category}
          </span>

          {/* Rating */}
          <div className="flex items-center flex-wrap gap-1 text-sm text-muted-foreground">
            ⭐⭐⭐⭐⭐
            <span className="font-medium text-foreground">4.8</span>
            <span>•</span>
            <span>23 reviews</span>
          </div>
        </div>

        {/* Title & Price */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              {service.name}
            </h1>
            <p className="text-lg text-muted-foreground">
              Professional {service.category} service
            </p>
          </div>

          <div className="text-right">
            <div className="text-3xl md:text-4xl font-bold text-foreground">
              ${service.price}
            </div>
            <div className="text-sm text-muted-foreground">
              {service.duration} minutes
            </div>
          </div>
        </div>

        {/* Primary CTA */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowBookingModal(true)}
          className="
            flex items-center justify-center gap-3
            w-full md:w-auto px-8 py-4
            bg-primary text-primary-foreground
            rounded-2xl font-bold text-lg
            shadow-lg shadow-primary/25
            hover:shadow-xl hover:shadow-primary/30
            transition-all duration-200
          "
        >
          <svg
            className="w-6 h-6"
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
          Book Now
        </motion.button>

        {/* Quick Info */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mt-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
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
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {service.duration} minutes
          </div>
          <div className="flex items-center gap-2">
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
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Instant confirmation
          </div>
          <div className="flex items-center gap-2">
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
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            Free cancellation
          </div>
        </div>
      </div>

      {/* TODO: Booking Modal */}
      <BookingModal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        service={service}
        providerId={service.providerId}
      />
    </motion.div>
  );
}
