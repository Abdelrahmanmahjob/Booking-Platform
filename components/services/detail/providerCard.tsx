"use client";

import { motion } from "framer-motion";
import { Service } from "@/types";
import { useProvider } from "@/hooks/provider/useProvider";
import { useState } from "react";

interface ProviderCardProps {
  service: Service;
}

export function ProviderCard({ service }: ProviderCardProps) {
  const [showBookingModal, setShowBookingModal] = useState(false);

  const {
    data: provider,
    isPending: isProviderLoading,
    error: providerError,
  } = useProvider(service.providerId);

  // Loading state
  if (isProviderLoading) {
    return <ProviderCardSkeleton />;
  }

  // Error or provider not found
  if (providerError || !provider) {
    return <ProviderCardError />;
  }

  // Helper functions
  const getDisplaySpecialization = () => {
    if (provider.serviceCategories.length > 0) {
      return (
        provider.serviceCategories[0].charAt(0).toUpperCase() +
        provider.serviceCategories[0].slice(1) +
        " Specialist"
      );
    }
    return "Service Provider";
  };

  const getWorkingDaysText = () => {
    const days = provider.workingDays;
    if (days.length === 7) return "7 days a week";
    if (
      days.length === 5 &&
      days.includes("monday") &&
      days.includes("friday")
    ) {
      return "Mon-Fri";
    }
    return `${days.length} days a week`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-card border border-border rounded-2xl p-6 shadow-elevated"
    >
      {/* Provider Header */}
      <div className="flex items-center gap-4 mb-6">
        {/* Avatar */}
        <div className="w-16 h-16 bg-linear-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center overflow-hidden">
          <span className="text-2xl font-bold text-primary">
            {provider.name.charAt(0).toUpperCase()}
          </span>
        </div>

        {/* Provider Info */}
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-foreground">
              {provider.name}
            </h3>
          </div>

          <p className="text-sm text-muted-foreground">
            {getDisplaySpecialization()}
          </p>

          {/* Rating - استخدام ProviderRating type */}
          <div className="flex items-center gap-1 mt-1">
            <div className="flex text-yellow-500">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i}>
                  {i < Math.floor(provider.rating.rating) ? "⭐" : "☆"}
                </span>
              ))}
            </div>
            <span className="text-sm font-medium text-foreground">
              {provider.rating.rating.toFixed(1)}
            </span>
            <span className="text-sm text-muted-foreground">
              • {provider.rating.totalReviews} reviews
            </span>
          </div>
        </div>
      </div>

      {/* Provider Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center p-3 bg-muted/30 rounded-xl">
          <div className="text-2xl font-bold text-foreground">
            {provider.totalBookingsCompleted}+
          </div>
          <div className="text-xs text-muted-foreground">Completed</div>
        </div>
        <div className="text-center p-3 bg-muted/30 rounded-xl">
          <div className="text-2xl font-bold text-foreground">
            {provider.rating.rating.toFixed(1)}
          </div>
          <div className="text-xs text-muted-foreground">Rating</div>
        </div>
      </div>

      {/* Contact Info */}
      <div className="space-y-3 mb-6">
        {/* Working Hours */}
        <div className="flex items-center gap-3 text-sm">
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
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="text-foreground">
            {provider.workingHours.start} - {provider.workingHours.end},{" "}
            {getWorkingDaysText()}
          </span>
        </div>

        {/* Business Name */}
        <div className="flex items-center gap-3 text-sm">
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
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
          <span className="text-foreground">{provider.businessName}</span>
        </div>
      </div>

      {/* Service Categories */}
      {provider.serviceCategories.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-foreground mb-3">
            Services
          </h4>
          <div className="flex flex-wrap gap-2">
            {provider.serviceCategories.map((category: any) => (
              <span
                key={category}
                className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full capitalize"
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Divider */}
      <div className="border-t border-border my-6" />

      {/* Booking Section */}
      <div className="space-y-4">
        {/* Price Summary */}
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Service Price:</span>
          <span className="text-2xl font-bold text-foreground">
            ${service.price}
          </span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Duration:</span>
          <span className="text-foreground font-medium">
            {service.duration} minutes
          </span>
        </div>

        {/* Book Now Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowBookingModal(true)}
          className="
            w-full flex items-center justify-center gap-3
            py-4 px-6
            bg-primary text-primary-foreground
            rounded-xl font-bold text-lg
            shadow-lg shadow-primary/25
            hover:shadow-xl hover:shadow-primary/30
            transition-all duration-200
          "
        >
          <svg
            className="w-5 h-5"
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

        {/* Secondary Actions */}
        <div className="grid grid-cols-2 gap-2">
          {/* Call/Message Provider */}
          {provider.phone && (
            <a
              href={`tel:${provider.phone}`}
              className="
                py-2.5 px-4
                border-2 border-border hover:border-primary/40
                text-foreground hover:bg-accent
                rounded-xl text-sm font-medium
                transition-all duration-200
                flex items-center justify-center
              "
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
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </a>
          )}

          <button
            className="
            py-2.5 px-4
            border-2 border-border hover:border-primary/40
            text-foreground hover:bg-accent
            rounded-xl text-sm font-medium
            transition-all duration-200
          "
          >
            <svg
              className="w-4 h-4 mx-auto"
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
          </button>
        </div>

        {/* Trust Signals */}
        <div className="flex items-center justify-center gap-4 pt-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            Secure Payment
          </div>
          <div className="flex items-center gap-1">
            <svg
              className="w-3 h-3"
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
            Instant Confirmation
          </div>
        </div>
      </div>

      {/* Booking Modal Placeholder */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card border border-border rounded-2xl p-6 mx-4 max-w-md w-full"
          >
            <h3 className="text-lg font-bold mb-4">Book {service.name}</h3>
            <p className="text-muted-foreground mb-4">
              Booking modal coming in BOOK-302...
            </p>
            <button
              onClick={() => setShowBookingModal(false)}
              className="w-full px-4 py-3 bg-primary text-primary-foreground rounded-xl font-medium"
            >
              Close
            </button>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}

// Same skeleton & error components from previous code...
function ProviderCardSkeleton() {
  return (
    <div className="bg-card border border-border rounded-2xl p-6 shadow-elevated">
      {/* Skeleton content */}
      <div className="animate-pulse space-y-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-muted rounded-2xl" />
          <div className="space-y-2 flex-1">
            <div className="h-6 w-32 bg-muted rounded" />
            <div className="h-4 w-24 bg-muted rounded" />
            <div className="h-4 w-28 bg-muted rounded" />
          </div>
        </div>
        {/* More skeleton items... */}
      </div>
    </div>
  );
}

function ProviderCardError() {
  return (
    <div className="bg-card border border-border rounded-2xl p-6 text-center">
      <div className="text-4xl mb-3">⚠️</div>
      <h3 className="font-bold text-foreground mb-2">Provider not found</h3>
      <p className="text-sm text-muted-foreground">
        Unable to load provider information
      </p>
    </div>
  );
}
