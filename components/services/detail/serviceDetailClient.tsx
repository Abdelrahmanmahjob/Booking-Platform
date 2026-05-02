"use client";

import { motion } from "framer-motion";
import { useService } from "@/hooks/services/useService";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { ServiceHero } from "./serviceHero";
import { ServiceInfo } from "./serviceInfo";
import { Service } from "@/types";
import { ProviderCard } from "./providerCard";
import { ServiceReviews } from "./serviceReviews";
import { ServiceDetailSkeleton } from "./serviceDetailSkeleton";
import { ServiceNotFound } from "./serviceNotFound";

interface ServiceDetailClientProps {
  serviceId: string;
}

export function ServiceDetailClient({ serviceId }: ServiceDetailClientProps) {
  const { data: service, isPending, error } = useService(serviceId);

  // Loading State
  if (isPending) {
    return <ServiceDetailSkeleton />;
  }

  // Error/Not Found State
  if (error || !service) {
    return <ServiceNotFound />;
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Breadcrumbs */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          {
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Services", href: "/services" },
                { label: service.name, href: "#", current: true },
              ]}
            />
          }
        </motion.div>

        {/* Content */}
        <div className="space-y-8">
          {/* Hero Section */}
          <ServiceHero service={service as Service} />

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Service Info */}
            <div className="lg:col-span-2 space-y-6">
              <ServiceInfo service={service as Service} />
              <ServiceReviews serviceId={serviceId} />
            </div>

            {/* Right Column - Provider Card (Sticky) */}
            <div className="lg:col-span-1">
              <div className="sticky top-6">
                <ProviderCard service={service} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
