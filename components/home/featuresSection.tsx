"use client";

import { motion } from "framer-motion";

const FEATURES = [
  {
    icon: "⚡",
    title: "Instant Booking",
    description: "Book appointments in seconds with real-time availability",
    color: "from-yellow-500/20 to-orange-500/20",
  },
  {
    icon: "✅",
    title: "Verified Providers",
    description: "All professionals are verified and highly rated",
    color: "from-green-500/20 to-emerald-500/20",
  },
  {
    icon: "💳",
    title: "Secure Payments",
    description: "Safe and encrypted payment processing",
    color: "from-blue-500/20 to-cyan-500/20",
  },
  {
    icon: "🔔",
    title: "Smart Reminders",
    description: "Never miss an appointment with automatic notifications",
    color: "from-purple-500/20 to-pink-500/20",
  },
  {
    icon: "📊",
    title: "Track History",
    description: "Keep track of all your bookings in one place",
    color: "from-indigo-500/20 to-violet-500/20",
  },
  {
    icon: "💬",
    title: "24/7 Support",
    description: "Get help whenever you need it",
    color: "from-red-500/20 to-rose-500/20",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Why Choose BookIt?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to manage your bookings efficiently
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group bg-card border border-border rounded-2xl p-8 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300"
            >
              {/* Icon */}
              <div
                className={`w-16 h-16 bg-linear-to-br ${feature.color} rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                {feature.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
