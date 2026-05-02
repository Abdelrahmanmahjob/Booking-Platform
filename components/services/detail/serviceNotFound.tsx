"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function ServiceNotFound() {
  return (
    <div className="min-h-screen bg-linear-to-b from-background to-muted/30 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md mx-auto px-4"
      >
        {/* Icon */}
        <div className="text-8xl mb-8">🔍</div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-foreground mb-4">
          Service Not Found
        </h1>

        {/* Description */}
        <p className="text-muted-foreground mb-8 leading-relaxed">
          Sorry, we couldn't find the service you're looking for. It might have
          been removed or the link is incorrect.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/services"
            className="
              px-6 py-3
              bg-primary text-primary-foreground
              rounded-xl font-medium
              hover:bg-primary/90
              transition-colors duration-200
              flex items-center justify-center gap-2
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
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            Browse Services
          </Link>

          <Link
            href="/"
            className="
              px-6 py-3
              border-2 border-border hover:border-primary/40
              text-foreground hover:bg-accent
              rounded-xl font-medium
              transition-all duration-200
              flex items-center justify-center gap-2
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
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Go Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
