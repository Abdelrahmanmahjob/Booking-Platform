"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Clock, CheckCircle2, Loader2 } from "lucide-react";
import { useAvailableSlots } from "@/hooks/booking/useAvailableSlots";

interface TimeSlotsProps {
  date: Date;
  serviceId: string;
  selectedTime: string | null;
  onSelectTime: (time: string) => void;
}

export function TimeSlots({
  date,
  serviceId,
  selectedTime,
  onSelectTime,
}: TimeSlotsProps) {
  // 🔥 Real data
  const {
    data: slots = [],
    isPending,
    error,
    refetch,
  } = useAvailableSlots(serviceId, date);

  // ─── Loading ──────────────────────────────────
  if (isPending) {
    return (
      <div className="space-y-5">
        <SectionHeader count={null} />
        <div
          className="
          bg-muted/30 border-2 border-border
          rounded-2xl p-12
          flex flex-col items-center justify-center gap-3
        "
        >
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
          <p className="text-sm text-muted-foreground font-medium">
            Loading available times...
          </p>
        </div>
      </div>
    );
  }

  // ─── Error ────────────────────────────────────
  if (error) {
    return (
      <div className="space-y-5">
        <SectionHeader count={null} />
        <div
          className="
          bg-destructive/10
          border-2 border-destructive/30
          rounded-2xl p-8
          flex flex-col items-center gap-4
        "
        >
          <span className="text-4xl">⚠️</span>
          <div className="text-center">
            <p className="font-semibold text-foreground mb-1">
              Failed to load time slots
            </p>
            <p className="text-sm text-muted-foreground">{error.message}</p>
          </div>
          <button
            onClick={() => refetch()}
            className="
              px-4 py-2 text-sm font-medium
              bg-card border-2 border-border
              rounded-xl hover:bg-muted
              transition-all duration-200
            "
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // ─── No Slots ─────────────────────────────────
  if (slots.length === 0) {
    return (
      <div className="space-y-5">
        <SectionHeader count={0} />
        <div
          className="
          bg-muted/30 border-2 border-border
          rounded-2xl p-12
          flex flex-col items-center gap-3
        "
        >
          <span className="text-5xl">😔</span>
          <div className="text-center">
            <p className="font-semibold text-foreground mb-1">
              No available times
            </p>
            <p className="text-sm text-muted-foreground">
              Please select another date
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ─── Slots ────────────────────────────────────
  return (
    <div className="space-y-5">
      <SectionHeader count={slots.length} />

      <div className="bg-muted/30 border-2 border-border rounded-2xl p-6">
        <div className="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-6 gap-3 mb-6">
          {slots.map((slot, index) => {
            const isSelected = selectedTime === slot.time;
            const isBooked = !slot.available;

            return (
              <motion.button
                key={slot.time}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.02 }}
                whileHover={{ scale: isBooked ? 1 : 1.05 }}
                whileTap={{ scale: isBooked ? 1 : 0.95 }}
                onClick={() => !isBooked && onSelectTime(slot.time)}
                disabled={isBooked}
                className={`
                  py-3 rounded-xl text-sm font-bold
                  transition-all duration-200
                  ${
                    isSelected
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 scale-105"
                      : isBooked
                        ? "bg-muted/50 text-muted-foreground/50 line-through cursor-not-allowed"
                        : "bg-card border-2 border-border text-foreground hover:border-primary/50 hover:shadow-md"
                  }
                `}
              >
                {slot.time}
              </motion.button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-4 pt-4 border-t border-border">
          <LegendItem color="bg-primary" label="Selected" />
          <LegendItem
            color="bg-card border-2 border-border"
            label="Available"
          />
          <LegendItem color="bg-muted/50" label="Booked" />
        </div>
      </div>

      {/* Selected Time Confirmation */}
      <AnimatePresence>
        {selectedTime && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="
              flex items-center gap-3 px-4 py-3
              bg-green-50 dark:bg-green-950/30
              border border-green-200 dark:border-green-800
              rounded-xl
            "
          >
            <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400 shrink-0" />
            <p className="text-sm font-medium text-green-900 dark:text-green-100">
              Selected: {selectedTime}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Sub Components ───────────────────────────

function SectionHeader({ count }: { count: number | null }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div
          className="
          w-10 h-10 rounded-xl
          bg-green-100 dark:bg-green-900/30
          flex items-center justify-center
        "
        >
          <Clock className="w-5 h-5 text-green-600 dark:text-green-400" />
        </div>
        <div>
          <h3 className="font-bold text-base text-foreground">Select Time</h3>
          <p className="text-sm text-muted-foreground">
            {count === null
              ? "Checking availability..."
              : count === 0
                ? "No slots available"
                : `${count} slots available`}
          </p>
        </div>
      </div>
    </div>
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className={`w-3 h-3 rounded ${color}`} />
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  );
}
