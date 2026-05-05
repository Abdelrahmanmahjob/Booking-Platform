"use client";

import { motion } from "framer-motion";
import { Service } from "@/types";
import { Calendar, Clock, DollarSign, Tag } from "lucide-react";

interface BookingSummaryProps {
  service: Service;
  date: Date;
  time: string;
}

export function BookingSummary({ service, date, time }: BookingSummaryProps) {
  const formatDate = (date: Date) =>
    date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="border-2 border-border rounded-2xl overflow-hidden"
    >
      {/* Summary Header */}
      <div className="px-6 py-4 bg-linear-to-r from-primary/10 to-primary/5 border-b border-border">
        <h3 className="font-bold text-lg text-foreground">
          📋 Booking Summary
        </h3>
        <p className="text-sm text-muted-foreground">
          Review your appointment details
        </p>
      </div>

      {/* Details */}
      <div className="p-6 space-y-4">
        {/* Service */}
        <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl">
          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
            <Tag className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Service</p>
            <p className="font-bold text-foreground">{service.name}</p>
          </div>
        </div>

        {/* Date */}
        <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl">
          <div className="w-9 h-9 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
            <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Date</p>
            <p className="font-bold text-foreground">{formatDate(date)}</p>
          </div>
        </div>

        {/* Time & Duration */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl">
            <div className="w-9 h-9 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <Clock className="w-4 h-4 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Time</p>
              <p className="font-bold text-foreground">{formatTime(time)}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl">
            <div className="w-9 h-9 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <Clock className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Duration</p>
              <p className="font-bold text-foreground">
                {service.duration} min
              </p>
            </div>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between p-4 bg-primary/5 border-2 border-primary/20 rounded-xl mt-2">
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-primary" />
            <span className="font-bold text-foreground">Total Amount</span>
          </div>
          <span className="text-3xl font-bold text-primary">
            ${service.price}
          </span>
        </div>

        {/* Note */}
        <p className="text-center text-xs text-muted-foreground pt-2">
          💳 Payment will be processed after confirmation
        </p>
      </div>
    </motion.div>
  );
}
