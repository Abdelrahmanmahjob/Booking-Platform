"use client";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { selectCategory, setCategory } from "@/store/slices/servicesSlice";
import { ServiceCategory } from "@/types";
import { motion } from "framer-motion";

const CATEGORIES = [
  { value: "all", label: "All", icon: "✨" },
  { value: "medical", label: "Medical", icon: "🏥" },
  { value: "fitness", label: "Fitness", icon: "💪" },
  { value: "education", label: "Education", icon: "📚" },
] as const;

export function ServicesFilter() {
  const dispatch = useAppDispatch();
  const currentCategory = useAppSelector(selectCategory);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="flex items-center gap-2 flex-wrap"
    >
      {CATEGORIES.map((category) => {
        const isSelected = currentCategory === category.value;

        return (
          <button
            key={category.value}
            onClick={() =>
              dispatch(setCategory(category.value as ServiceCategory | "all"))
            }
            className={`
              flex items-center gap-2 px-4 py-3
              rounded-xl border-2 font-medium text-sm
              transition-all duration-200
              whitespace-nowrap
              ${
                isSelected
                  ? "border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                  : "border-border bg-card text-foreground hover:border-primary/40 hover:bg-accent"
              }
            `}
          >
            <span>{category.icon}</span>
            <span>{category.label}</span>
          </button>
        );
      })}
    </motion.div>
  );
}
