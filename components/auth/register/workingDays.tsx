import { useFormContext } from "react-hook-form";
import { WORKING_DAYS } from "../constants/registerProviderData";
import { RegisterProviderInput } from "@/schemas/auth.schema";
import { DayOfWeek } from "@/types";

export function WorkingDays() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<RegisterProviderInput>();
  const selectedDays = watch("workingDays") ?? [];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-foreground/80">
          Working Days
        </label>
        <span className="text-xs text-muted-foreground">
          {selectedDays.length} selected
        </span>
      </div>
      <div className="grid grid-cols-7 gap-1.5">
        {WORKING_DAYS.map((day) => {
          const isSelected =
            Array.isArray(selectedDays) &&
            selectedDays.includes(day.value as DayOfWeek);
          return (
            <label
              key={day.value}
              className={`relative flex flex-col items-center gap-1 py-3 rounded-xl cursor-pointer border-2 transition-all duration-200 ${isSelected ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/30" : "border-border hover:border-primary/40 hover:bg-accent text-foreground/70"}`}
            >
              <input
                type="checkbox"
                value={day.value}
                className="sr-only"
                {...register("workingDays")}
              />
              <span className="text-xs font-bold">{day.label}</span>
              {isSelected && (
                <div className="w-1 h-1 rounded-full bg-primary-foreground animate-scale-in" />
              )}
            </label>
          );
        })}
      </div>
      {errors.workingDays && (
        <p className="text-sm text-destructive">{errors.workingDays.message}</p>
      )}
    </div>
  );
}
