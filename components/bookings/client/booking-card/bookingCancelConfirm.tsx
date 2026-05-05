"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface BookingCancelConfirmProps {
  show: boolean;
  isCancelling: boolean;
  onConfirm: () => void;
  onDismiss: () => void;
}

export function BookingCancelConfirm({
  show,
  isCancelling,
  onConfirm,
  onDismiss,
}: BookingCancelConfirmProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="p-4 bg-destructive/10 border-2 border-destructive/20 rounded-xl"
        >
          <p className="text-sm font-semibold text-foreground mb-1">
            Cancel this booking?
          </p>
          <p className="text-xs text-muted-foreground mb-4">
            This action cannot be undone.
          </p>

          <div className="flex gap-2">
            {/* Keep */}
            <button
              onClick={onDismiss}
              disabled={isCancelling}
              className="
                flex-1 py-2
                border-2 border-border
                text-foreground text-sm font-medium
                rounded-xl hover:bg-muted
                transition-all duration-200
                disabled:opacity-50
              "
            >
              Keep Booking
            </button>

            {/* Confirm */}
            <button
              onClick={onConfirm}
              disabled={isCancelling}
              className="
                flex-1 py-2
                bg-destructive text-white
                text-sm font-bold rounded-xl
                hover:bg-destructive/90
                transition-all duration-200
                disabled:opacity-50
                flex items-center justify-center gap-2
              "
            >
              {isCancelling ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Cancelling...
                </>
              ) : (
                <>
                  <X className="w-4 h-4" />
                  Yes, Cancel
                </>
              )}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
