"use client";

import { motion } from "framer-motion";
import { Service } from "@/types";
import { CheckCircle, Calendar, Clock, DollarSign } from "lucide-react";
import { useRouter } from "next/navigation";

interface BookingConfirmationProps {
  service: Service;
  date: Date;
  time: string;
  onClose: () => void;
}

export function BookingConfirmation({
  service,
  date,
  time,
  onClose,
}: BookingConfirmationProps) {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-8 flex flex-col items-center text-center"
    >
      {/* Success Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
        className="
          w-24 h-24 rounded-full
          bg-green-100 dark:bg-green-900/30
          flex items-center justify-center
          mb-6
        "
      >
        <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
      </motion.div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Booking Confirmed! 🎉
        </h2>
        <p className="text-muted-foreground text-base mb-8">
          Your appointment has been successfully booked
        </p>
      </motion.div>

      {/* Details Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="w-full border-2 border-border rounded-2xl overflow-hidden mb-6"
      >
        <div className="px-6 py-4 bg-muted/30 border-b border-border">
          <h3 className="font-bold text-foreground">{service.name}</h3>
        </div>
        <div className="p-6 space-y-3">
          <DetailRow
            icon={<Calendar className="w-4 h-4 text-blue-500" />}
            label="Date"
            value={date.toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          />
          <DetailRow
            icon={<Clock className="w-4 h-4 text-green-500" />}
            label="Time"
            value={time}
          />
          <DetailRow
            icon={<DollarSign className="w-4 h-4 text-primary" />}
            label="Price"
            value={`$${service.price}`}
            highlight
          />
        </div>
      </motion.div>

      {/* Email Notice */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="
          w-full px-4 py-3 mb-8
          bg-blue-50 dark:bg-blue-950/30
          border border-blue-200 dark:border-blue-800
          rounded-xl
        "
      >
        <p className="text-sm text-blue-900 dark:text-blue-100">
          📧 Confirmation email sent to your inbox
        </p>
      </motion.div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex gap-3 w-full"
      >
        <button
          onClick={onClose}
          className="
            flex-1 py-3 px-6
            border-2 border-border
            text-foreground
            rounded-xl font-medium
            hover:bg-muted
            transition-all duration-200
          "
        >
          Close
        </button>

        <button
          onClick={() => router.push("/my-bookings")}
          className="
            flex-1 py-3 px-6
            bg-primary text-primary-foreground
            rounded-xl font-bold
            shadow-lg shadow-primary/25
            hover:shadow-xl hover:shadow-primary/30
            transition-all duration-200
          "
        >
          View My Bookings
        </button>
      </motion.div>
    </motion.div>
  );
}

function DetailRow({
  icon,
  label,
  value,
  highlight,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 text-muted-foreground text-sm">
        {icon}
        <span>{label}</span>
      </div>
      <span
        className={`font-bold ${highlight ? "text-primary text-lg" : "text-foreground"}`}
      >
        {value}
      </span>
    </div>
  );
}
