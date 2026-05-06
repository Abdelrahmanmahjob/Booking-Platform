"use client";

import { motion, AnimatePresence } from "framer-motion";
import { BookingStatus } from "@/types";
import { Check, X, CheckCheck } from "lucide-react";
import { useState } from "react";

interface ProviderBookingActionsProps {
  status: BookingStatus;
  isUpdating: boolean;
  onConfirm: () => void;
  onComplete: () => void;
  onCancel: () => void;
}

export function ProviderBookingActions({
  status,
  isUpdating,
  onConfirm,
  onComplete,
  onCancel,
}: ProviderBookingActionsProps) {
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  // No actions for completed/cancelled
  if (status === "completed" || status === "cancelled") {
    return null;
  }

  return (
    <div className="space-y-3">
      {/* Actions Row */}
      <div className="flex items-center gap-2 pt-4 border-t border-border">
        {/* Primary Action */}
        {status === "pending" && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onConfirm}
            disabled={isUpdating}
            className="
              flex-1 flex items-center justify-center gap-2
              py-2.5 px-4
              bg-blue-500 hover:bg-blue-600
              text-white text-sm font-bold
              rounded-xl
              shadow-md shadow-blue-500/25
              transition-all duration-200
              disabled:opacity-50
            "
          >
            {isUpdating ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Check className="w-4 h-4" />
            )}
            Confirm
          </motion.button>
        )}

        {status === "confirmed" && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onComplete}
            disabled={isUpdating}
            className="
              flex-1 flex items-center justify-center gap-2
              py-2.5 px-4
              bg-green-500 hover:bg-green-600
              text-white text-sm font-bold
              rounded-xl
              shadow-md shadow-green-500/25
              transition-all duration-200
              disabled:opacity-50
            "
          >
            {isUpdating ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <CheckCheck className="w-4 h-4" />
            )}
            Complete
          </motion.button>
        )}

        {/* Cancel Button */}
        {!showCancelConfirm && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowCancelConfirm(true)}
            disabled={isUpdating}
            className="
              flex items-center justify-center gap-2
              py-2.5 px-4
              border-2 border-destructive/30
              text-destructive text-sm font-medium
              rounded-xl
              hover:bg-destructive/10
              transition-all duration-200
              disabled:opacity-50
            "
          >
            <X className="w-4 h-4" />
            Cancel
          </motion.button>
        )}
      </div>

      {/* Cancel Confirmation */}
      <AnimatePresence>
        {showCancelConfirm && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="
              p-4
              bg-destructive/10
              border-2 border-destructive/20
              rounded-xl
            "
          >
            <p className="text-sm font-semibold text-foreground mb-1">
              Cancel this booking?
            </p>
            <p className="text-xs text-muted-foreground mb-4">
              The client will be notified about the cancellation.
            </p>

            <div className="flex gap-2">
              <button
                onClick={() => setShowCancelConfirm(false)}
                disabled={isUpdating}
                className="
                  flex-1 py-2
                  border-2 border-border
                  text-foreground text-sm font-medium
                  rounded-xl hover:bg-muted
                  transition-all duration-200
                  disabled:opacity-50
                "
              >
                Keep
              </button>

              <button
                onClick={() => {
                  onCancel();
                  setShowCancelConfirm(false);
                }}
                disabled={isUpdating}
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
                {isUpdating ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
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
    </div>
  );
}
