"use client";

import { motion } from "framer-motion";
import { Service } from "@/types";
import Link from "next/link";
import Image from "next/image";

const CATEGORY_CONFIG = {
  medical: {
    color:
      "text-blue-600 bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800 dark:text-blue-400",
    image:
      "https://images.unsplash.com/photo-1628348070889-cb656235b4eb?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    icon: "🏥",
  },
  fitness: {
    color:
      "text-green-600 bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800 dark:text-green-400",
    image:
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    icon: "💪",
  },
  education: {
    color:
      "text-purple-600 bg-purple-50 border-purple-200 dark:bg-purple-950 dark:border-purple-800 dark:text-purple-400",
    image:
      "https://images.unsplash.com/photo-1684146771259-99b8b6089568?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    icon: "📚",
  },
};

interface ServiceCardProps {
  service: Service;
  index: number;
}

export function ServiceCard({ service, index }: ServiceCardProps) {
  const config = CATEGORY_CONFIG[service.category];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      whileHover={{ y: -4 }}
      className="group bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-primary/10 transition-shadow duration-300"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={config.image}
          alt={service.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

        {/* Price Badge */}
        <div className="absolute top-3 right-3 px-3 py-1 bg-black/50 backdrop-blur-sm text-white text-sm font-bold rounded-full border border-white/20">
          ${service.price}
        </div>

        {/* Duration Badge */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-3 py-1 bg-black/50 backdrop-blur-sm text-white text-xs rounded-full border border-white/20">
          <svg
            className="w-3.5 h-3.5"
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
          {service.duration} min
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Category Badge */}
        <div
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border mb-3 ${config.color}`}
        >
          <span>{config.icon}</span>
          <span className="capitalize">{service.category}</span>
        </div>

        {/* Title */}
        <h3 className="font-bold text-lg text-foreground mb-2 line-clamp-1 group-hover:text-primary transition-colors">
          {service.name}
        </h3>

        {/* Description */}
        <p className="text-muted-foreground text-sm line-clamp-2 mb-4 leading-relaxed">
          {service.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                className="w-3.5 h-3.5 text-yellow-400 fill-current"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="text-xs text-muted-foreground ml-1">5.0</span>
          </div>

          <Link
            href={`/services/${service.id}`}
            className="
              px-4 py-2
              bg-primary text-primary-foreground
              text-sm font-medium rounded-xl
              hover:bg-primary/90
              transition-all duration-200
              shadow-sm shadow-primary/25
              group-hover:shadow-md group-hover:shadow-primary/30
            "
          >
            Book Now
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
