"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function CTASection() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-linear-to-br from-primary to-primary/80 rounded-3xl overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
          </div>

          <div className="relative px-8 py-20 sm:px-12 sm:py-24 text-center">
            <h2 className="text-4xl sm:text-5xl font-bold text-primary-foreground mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto mb-10">
              Join thousands of happy customers and experience the easiest way
              to book professional services
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register/client"
                className="px-8 py-4 bg-white text-primary rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Sign Up Now
              </Link>
              <Link
                href="/services"
                className="px-8 py-4 border-2 border-white text-white rounded-2xl font-semibold text-lg hover:bg-white/10 transition-all duration-200"
              >
                Browse Services
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
