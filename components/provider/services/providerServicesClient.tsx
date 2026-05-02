"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppSelector } from "@/lib/hooks";
import { selectCurrentUser } from "@/store/slices/authSlice";
import { useProviderServices } from "@/hooks/provider/useProviderServices";
import { ServiceCard } from "./serviceCard";
import { ServiceFormModal } from "./serviceFormModal";
import { Service } from "@/types";

export function ProviderServicesClient() {
  const user = useAppSelector(selectCurrentUser);
  const { data: services = [], isPending } = useProviderServices(
    user?.id || "",
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const handleAdd = () => {
    setSelectedService(null);
    setIsModalOpen(true);
  };

  const handleEdit = (service: Service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">My Services</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {services.length} service{services.length !== 1 ? "s" : ""} listed
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleAdd}
          className="
            flex items-center gap-2
            px-5 py-2.5
            bg-primary text-primary-foreground
            rounded-xl font-medium text-sm
            shadow-lg shadow-primary/25
            hover:shadow-xl hover:shadow-primary/30
            transition-shadow duration-200
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
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add Service
        </motion.button>
      </div>

      {/* Content */}
      {isPending ? (
        <ServicesGridSkeleton />
      ) : services.length === 0 ? (
        <EmptyServices onAdd={handleAdd} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {services.map((service, index) => (
              <ServiceCard
                key={service.id}
                service={service}
                index={index}
                onEdit={() => handleEdit(service)}
              />
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Modal */}
      <ServiceFormModal
        isOpen={isModalOpen}
        onClose={handleClose}
        service={selectedService}
      />
    </div>
  );
}

// ============================================
// Skeleton
// ============================================

function ServicesGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="bg-card border border-border rounded-2xl p-6 space-y-4 animate-pulse"
        >
          <div className="flex items-center justify-between">
            <div className="h-6 w-20 bg-muted rounded-full" />
            <div className="h-6 w-16 bg-muted rounded-full" />
          </div>
          <div className="h-6 w-3/4 bg-muted rounded-lg" />
          <div className="space-y-2">
            <div className="h-4 w-full bg-muted rounded" />
            <div className="h-4 w-2/3 bg-muted rounded" />
          </div>
          <div className="flex gap-2 pt-2">
            <div className="h-9 flex-1 bg-muted rounded-xl" />
            <div className="h-9 w-9 bg-muted rounded-xl" />
          </div>
        </div>
      ))}
    </div>
  );
}

// ============================================
// Empty State
// ============================================

function EmptyServices({ onAdd }: { onAdd: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-24 text-center"
    >
      <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center text-4xl mb-6">
        🛠️
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-2">
        No services yet
      </h3>
      <p className="text-muted-foreground max-w-sm mb-8">
        Add your first service and start accepting bookings from clients
      </p>
      <button
        onClick={onAdd}
        className="
          px-6 py-3
          bg-primary text-primary-foreground
          rounded-xl font-medium
          hover:bg-primary/90
          shadow-lg shadow-primary/25
          transition-all duration-200
        "
      >
        Add Your First Service
      </button>
    </motion.div>
  );
}
