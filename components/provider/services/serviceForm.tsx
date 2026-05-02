"use client";

import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Service } from "@/types";
import { ServiceInput, serviceSchema } from "@/schemas/service.schema";
import { useCreateService } from "@/hooks/services/useCreateService";
import { useUpdateService } from "@/hooks/services/useUpdateService";
import { useAppSelector } from "@/lib/hooks";
import { selectCurrentUser } from "@/store/slices/authSlice";
import { SubmitButton } from "@/components/shared/submitButton";

const CATEGORIES = [
  { value: "medical", label: "Medical", icon: "🏥" },
  { value: "fitness", label: "Fitness", icon: "💪" },
  { value: "education", label: "Education", icon: "📚" },
] as const;

const DURATIONS = [15, 30, 45, 60, 90, 120] as const;

interface ServiceFormProps {
  service: Service | null;
  onSuccess: () => void;
}

export function ServiceForm({ service, onSuccess }: ServiceFormProps) {
  const user = useAppSelector(selectCurrentUser);
  const providerId = user?.id;

  const defaultValues = useMemo<ServiceInput>(
    () => ({
      name: service?.name ?? "",
      description: service?.description ?? "",
      category: (service?.category as ServiceInput["category"]) ?? "medical",
      duration: service?.duration ?? 30,
      price: service?.price ?? 0,
    }),
    [service],
  );

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ServiceInput>({
    resolver: zodResolver(serviceSchema),
    defaultValues,
  });

  const selectedCategory = watch("category");

  const { mutate: createService, isPending: createPending } =
    useCreateService();
  const { mutate: updateService, isPending: updatePending } =
    useUpdateService();

  const isLoading = service ? updatePending : createPending;

  const onSubmit = (data: ServiceInput) => {
    if (!providerId) return;

    if (service) {
      updateService({ id: service.id, data, providerId }, { onSuccess });
      return;
    }

    createService({ providerId, data }, { onSuccess });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Service Name */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground/80">
          Service Name
        </label>
        <input
          {...register("name")}
          type="text"
          placeholder="e.g. General Checkup"
          className="w-full px-4 py-3 border-2 border-border rounded-xl bg-background/50"
        />
        {errors.name && (
          <p className="text-sm text-destructive">{errors.name.message}</p>
        )}
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground/80">
          Description
        </label>
        <textarea
          {...register("description")}
          rows={3}
          placeholder="Describe your service..."
          className="w-full px-4 py-3 border-2 border-border rounded-xl bg-background/50 resize-none"
        />
        {errors.description && (
          <p className="text-sm text-destructive">
            {errors.description.message}
          </p>
        )}
      </div>

      {/* Category */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground/80">
          Category
        </label>
        <div className="grid grid-cols-3 gap-3">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.value;
            return (
              <label
                key={cat.value}
                className={[
                  "flex flex-col items-center gap-2 p-3 border-2 rounded-xl cursor-pointer transition-all duration-200",
                  isSelected
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/40 hover:bg-accent",
                ].join(" ")}
              >
                <input
                  {...register("category")}
                  type="radio"
                  value={cat.value}
                  className="sr-only"
                />
                <span className="text-2xl">{cat.icon}</span>
                <span className="text-xs font-medium text-foreground/80">
                  {cat.label}
                </span>
              </label>
            );
          })}
        </div>
        {errors.category && (
          <p className="text-sm text-destructive">{errors.category.message}</p>
        )}
      </div>

      {/* Duration */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground/80">
          Duration (minutes)
        </label>
        <div className="grid grid-cols-6 gap-2">
          {DURATIONS.map((d) => {
            const currentDuration = watch("duration");
            const isSelected = currentDuration === d;

            return (
              <button
                key={d}
                type="button"
                onClick={() =>
                  setValue("duration", d, { shouldValidate: true })
                }
                className={[
                  "py-2.5 rounded-xl text-sm font-medium transition-all duration-200 border-2",
                  isSelected
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border hover:border-primary/40 hover:bg-accent text-foreground",
                ].join(" ")}
              >
                {d}
              </button>
            );
          })}
        </div>
        {errors.duration && (
          <p className="text-sm text-destructive">{errors.duration.message}</p>
        )}
      </div>

      {/* Price */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground/80">
          Price ($)
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <span className="text-muted-foreground font-medium">$</span>
          </div>
          <input
            {...register("price", { valueAsNumber: true })}
            type="number"
            step="0.01"
            placeholder="0.00"
            className="w-full pl-8 pr-4 py-3 border-2 border-border rounded-xl bg-background/50"
          />
        </div>
        {errors.price && (
          <p className="text-sm text-destructive">{errors.price.message}</p>
        )}
      </div>

      <SubmitButton
        isLoading={isLoading}
        loadingText={service ? "Updating..." : "Adding..."}
        text={service ? "Update Service" : "Add Service"}
      />
    </form>
  );
}
