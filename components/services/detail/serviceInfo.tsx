"use client";

import { motion } from "framer-motion";
import { Service } from "@/types";

interface ServiceInfoProps {
  service: Service;
}

export function ServiceInfo({ service }: ServiceInfoProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-card border border-border rounded-2xl p-4 md:p-8"
    >
      {/* About Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          About This Service
        </h2>
        <p className="text-muted-foreground leading-relaxed text-lg">
          {service.description}
        </p>
      </div>

      {/* Service Details Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Duration */}
        <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-xl">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-950 rounded-xl flex items-center justify-center">
            <svg
              className="w-6 h-6 text-blue-600 dark:text-blue-400"
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
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Duration</h3>
            <p className="text-muted-foreground">{service.duration} minutes</p>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-xl">
          <div className="w-12 h-12 bg-green-100 dark:bg-green-950 rounded-xl flex items-center justify-center">
            <svg
              className="w-6 h-6 text-green-600 dark:text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
              />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Price</h3>
            <p className="text-muted-foreground">${service.price}</p>
          </div>
        </div>

        {/* Category */}
        <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-xl">
          <div className="w-12 h-12 bg-purple-100 dark:bg-purple-950 rounded-xl flex items-center justify-center">
            <span className="text-2xl">
              {service.category === "medical" && "🏥"}
              {service.category === "fitness" && "💪"}
              {service.category === "education" && "📚"}
            </span>
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Category</h3>
            <p className="text-muted-foreground capitalize">
              {service.category}
            </p>
          </div>
        </div>

        {/* Availability */}
        <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-xl">
          <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-950 rounded-xl flex items-center justify-center">
            <svg
              className="w-6 h-6 text-yellow-600 dark:text-yellow-400"
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
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Availability</h3>
            <p className="text-muted-foreground">Available today</p>
          </div>
        </div>
      </div>

      {/* What's Included */}
      <div className="mt-8">
        <h3 className="text-xl font-bold text-foreground mb-4">
          What's Included
        </h3>
        <ul className="space-y-3">
          {[
            "Professional consultation",
            "Comprehensive examination",
            "Digital report with results",
            "Follow-up recommendations",
            "24/7 support access",
          ].map((item, index) => (
            <motion.li
              key={item}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="flex items-center gap-3"
            >
              <svg
                className="w-5 h-5 text-green-500 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-muted-foreground">{item}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
