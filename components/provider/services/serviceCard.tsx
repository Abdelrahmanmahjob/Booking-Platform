"use client";

import { motion } from "framer-motion";
import { Service } from "@/types";
import { useDeleteService } from "@/hooks/services/useDeleteService";
import { useState } from "react";
import { useAppSelector } from "@/lib/hooks";
import { selectCurrentUser } from "@/store/slices/authSlice";

const CATEGORY_CONFIG = {
  medical: {
    icon: "🏥",
    color:
      "text-blue-600 bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800 dark:text-blue-400",
  },
  fitness: {
    icon: "💪",
    color:
      "text-green-600 bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800 dark:text-green-400",
  },
  education: {
    icon: "📚",
    color:
      "text-purple-600 bg-purple-50 border-purple-200 dark:bg-purple-950 dark:border-purple-800 dark:text-purple-400",
  },
};

interface ServiceCardProps {
  service: Service;
  index: number;
  onEdit: () => void;
}

export function ServiceCard({ service, index, onEdit }: ServiceCardProps) {
  const { mutate: deleteService, isPending: isDeleting } = useDeleteService();
  const [showConfirm, setShowConfirm] = useState(false);
  const config = CATEGORY_CONFIG[service.category];
  const user = useAppSelector(selectCurrentUser);

  const handleDelete = () => {
    deleteService({
      id: service.id,
      providerId: user?.id,
    });
    setShowConfirm(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: index * 0.05 }}
      className="bg-card border border-border rounded-2xl p-6 shadow-elevated hover:shadow-high transition-all duration-300 group"
    >
      {/* Top Row */}
      <div className="flex items-center justify-between mb-4">
        <span
          className={`
          inline-flex items-center gap-1.5 px-3 py-1
          rounded-full text-xs font-semibold border
          ${config.color}
        `}
        >
          {config.icon} {service.category}
        </span>

        <span className="text-lg font-bold text-foreground">
          ${service.price}
        </span>
      </div>

      {/* Title */}
      <h3 className="font-bold text-lg text-foreground mb-2 line-clamp-1">
        {service.name}
      </h3>

      {/* Description */}
      <p className="text-sm text-muted-foreground line-clamp-2 mb-4 leading-relaxed">
        {service.description}
      </p>

      {/* Duration */}
      <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-5">
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

      {/* Actions */}
      {!showConfirm ? (
        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="
              flex-1 flex items-center justify-center gap-2
              py-2.5 px-4
              border-2 border-border hover:border-primary/40
              hover:bg-accent
              text-foreground text-sm font-medium
              rounded-xl transition-all duration-200
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
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            Edit
          </button>

          <button
            onClick={() => setShowConfirm(true)}
            className="
              p-2.5
              border-2 border-border hover:border-destructive/40
              hover:bg-destructive/10
              text-muted-foreground hover:text-destructive
              rounded-xl transition-all duration-200
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
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2"
        >
          <p className="text-sm text-center text-muted-foreground mb-3">
            Delete this service?
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setShowConfirm(false)}
              className="
                flex-1 py-2.5
                border-2 border-border hover:bg-accent
                text-foreground text-sm font-medium
                rounded-xl transition-all
              "
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="
                flex-1 py-2.5
                bg-destructive hover:bg-destructive/90
                text-white text-sm font-medium
                rounded-xl transition-all
                disabled:opacity-50
              "
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
