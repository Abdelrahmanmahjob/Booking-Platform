"use client";

import { useFormContext } from "react-hook-form";
import { SERVICE_CATEGORIES } from "../constants/registerProviderData";
import { RegisterProviderInput } from "@/schemas/auth.schema";
import { ServiceCategory } from "@/types";

export function ServiceCategories() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<RegisterProviderInput>();
  const selectedCategories = watch("serviceCategories") ?? [];

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-foreground/80">
        Service Categories
      </label>
      <div className="grid grid-cols-3 gap-3">
        {SERVICE_CATEGORIES.map((cat) => {
          const isSelected =
            Array.isArray(selectedCategories) &&
            selectedCategories.includes(cat.value as ServiceCategory);
          return (
            <label
              key={cat.value}
              className={`relative flex flex-col items-center gap-2 p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${isSelected ? "border-primary bg-primary/10 shadow-sm shadow-primary/20" : "border-border hover:border-primary/40 hover:bg-accent"}`}
            >
              <input
                type="checkbox"
                value={cat.value}
                className="sr-only"
                {...register("serviceCategories")}
              />
              {isSelected && (
                <div className="absolute top-2 right-2 w-4 h-4 bg-primary rounded-full flex items-center justify-center animate-scale-in">
                  <svg
                    className="w-2.5 h-2.5 text-primary-foreground"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              )}
              <span
                className={`text-3xl transition-transform duration-200 ${isSelected ? "scale-110" : ""}`}
              >
                {cat.icon}
              </span>
              <span
                className={`text-xs font-semibold transition-colors ${isSelected ? "text-primary" : "text-foreground/70"}`}
              >
                {cat.label}
              </span>
            </label>
          );
        })}
      </div>
      {errors.serviceCategories && (
        <p className="text-sm text-destructive flex items-center gap-1 animate-slide-down">
          {errors.serviceCategories.message}
        </p>
      )}
    </div>
  );
}
