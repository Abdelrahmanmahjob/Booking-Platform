"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const STEPS = [
  {
    number: "01",
    title: "Browse Services",
    description: "Explore our wide range of professional services",
    image:
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop",
  },
  {
    number: "02",
    title: "Choose Provider",
    description: "Select from verified and highly-rated professionals",
    image:
      "https://images.unsplash.com/photo-1762522926262-d96de462ad54?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    number: "03",
    title: "Book & Confirm",
    description: "Pick your time slot and confirm your booking",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=400&fit=crop",
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get started in three simple steps
          </p>
        </motion.div>

        {/* Steps */}
        <div className="space-y-24">
          {STEPS.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className={`flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} gap-12 items-center`}
            >
              {/* Image */}
              <div className="flex-1 relative">
                <div className="relative aspect-4/3 rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    src={step.image}
                    alt={step.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute -z-10 -inset-6 bg-primary/5 rounded-3xl" />
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="text-8xl font-bold text-primary/10 mb-4">
                  {step.number}
                </div>
                <h3 className="text-3xl font-bold text-foreground mb-4">
                  {step.title}
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  {step.description}
                </p>
                <div className="flex items-center gap-2 text-primary font-medium">
                  Learn more
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
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
