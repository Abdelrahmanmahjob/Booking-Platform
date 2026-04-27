import { useFormContext } from "react-hook-form";
import { RegisterProviderInput } from "@/schemas/auth.schema";

export function WorkingHours() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<RegisterProviderInput>();
  const startTime = watch("workingHours.start");
  const endTime = watch("workingHours.end");

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-foreground/80">
        Working Hours
      </label>
      <div className="grid grid-cols-2 gap-4">
        {/* Start Time */}
        <div className="space-y-2">
          <input
            type="time"
            {...register("workingHours.start")}
            className={`w-full p-3 border-2 rounded-xl bg-background/50 ${errors.workingHours?.start ? "border-destructive" : "border-border"}`}
          />
        </div>
        {/* End Time */}
        <div className="space-y-2">
          <input
            type="time"
            {...register("workingHours.end")}
            className={`w-full p-3 border-2 rounded-xl bg-background/50 ${errors.workingHours?.end ? "border-destructive" : "border-border"}`}
          />
        </div>
      </div>
      {startTime && endTime && (
        <div className="p-3 bg-primary/5 border border-primary/20 rounded-xl">
          <p className="text-xs text-primary font-medium">
            Working {startTime} → {endTime}
          </p>
        </div>
      )}
      {errors.workingHours?.message && (
        <p className="text-sm text-destructive flex items-center gap-1 animate-slide-down">
          <svg
            className="w-4 h-4 shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {errors.workingHours?.message}
        </p>
      )}
    </div>
  );
}
