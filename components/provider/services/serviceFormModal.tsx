"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Service } from "@/types";
import { ServiceForm } from "./serviceForm";

interface ServiceFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: Service | null;
}

export function ServiceFormModal({
  isOpen,
  onClose,
  service,
}: ServiceFormModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="
              fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
              w-full max-w-lg max-h-[90vh] overflow-y-auto
              bg-card border border-border
              rounded-2xl shadow-ultra
              z-50
            "
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-border sticky top-0 bg-card">
              <div>
                <h2 className="text-lg font-bold text-foreground">
                  {service ? "Edit Service" : "Add New Service"}
                </h2>
                <p className="text-sm text-muted-foreground mt-0.5">
                  {service
                    ? "Update your service details"
                    : "Fill in the details to add a new service"}
                </p>
              </div>

              <button
                onClick={onClose}
                className="
                  p-2 rounded-xl
                  hover:bg-accent
                  text-muted-foreground hover:text-foreground
                  transition-colors
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Form */}
            <div className="p-6">
              <ServiceForm service={service} onSuccess={onClose} />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
