"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField } from "../shared/form-field";
import { SubmitButton } from "../shared/submit-button";
import { ErrorAlert } from "../shared/error-alert";
import { formFields } from "./constant/formFields";
import {
  RegisterProviderInput,
  registerProviderSchema,
} from "@/schemas/auth.schema";

import { MdBusinessCenter } from "react-icons/md";
import { useRegisterProvider } from "@/hooks/auth/useRegister";
import { DayOfWeek, ServiceCategory } from "@/types";
import StepsIndicator from "./stepsIndicator";

const WORKING_DAYS = [
  { value: "sunday", label: "Sun" },
  { value: "monday", label: "Mon" },
  { value: "tuesday", label: "Tue" },
  { value: "wednesday", label: "Wed" },
  { value: "thursday", label: "Thu" },
  { value: "friday", label: "Fri" },
  { value: "saturday", label: "Sat" },
];

const SERVICE_CATEGORIES = [
  { value: "medical", label: "Medical", icon: "🏥" },
  { value: "fitness", label: "Fitness", icon: "💪" },
  { value: "education", label: "Education", icon: "📚" },
];

export function RegisterProviderForm() {
  const {
    register,
    handleSubmit,
    trigger,
    watch,
    getValues,
    formState: { errors },
    setError,
  } = useForm<RegisterProviderInput>({
    resolver: zodResolver(registerProviderSchema),
    mode: "onChange",
    defaultValues: {
      serviceCategories: [],
      workingDays: [],
      workingHours: {
        start: "",
        end: "",
      },
    },
  });

  const [currentStep, setCurrentStep] = useState(1);
  const { mutate: registerProvider, isPending, error } = useRegisterProvider();

  const handleNext = async () => {
    if (currentStep === 1) {
      const isFieldsValid = await trigger([
        "name",
        "email",
        "phone",
        "password",
        "confirmPassword",
      ]);

      const password = getValues("password");
      const confirmPassword = getValues("confirmPassword");
      const isMatching = password === confirmPassword;

      if (!isMatching) {
        setError("confirmPassword", {
          type: "manual",
          message: "Passwords do not match",
        });
      }

      if (isFieldsValid && isMatching) {
        setCurrentStep((prev) => prev + 1);
      }
    }
    if (currentStep === 2) {
      const isFieldsValid = await trigger([
        "businessName",
        "serviceCategories",
      ]);
      if (isFieldsValid) {
        setCurrentStep((prev) => prev + 1);
      }
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const onSubmit = (data: any) => {
    registerProvider(data);
    console.log("Error : ", error);
  };

  return (
    <div className="space-y-6">
      <StepsIndicator currentStep={currentStep} />
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Step 1: Account Info */}
        {currentStep === 1 && (
          <div className="space-y-5 animate-fade-in">
            {formFields.map((field) => (
              <FormField
                key={field.name}
                label={field.label}
                type={field.type}
                placeholder={field.placeholder}
                icon={field.icon}
                {...register(field.name as keyof RegisterProviderInput)}
                error={
                  errors[field.name as keyof RegisterProviderInput]?.message
                }
              />
            ))}
          </div>
        )}

        {/* Step 2: Business Info */}
        {currentStep === 2 && (
          <div className="space-y-5 animate-fade-in">
            <FormField
              label="Business Name"
              type="text"
              placeholder="Ahmed's Clinic"
              icon={MdBusinessCenter}
              {...register("businessName")}
              error={errors.businessName?.message}
            />

            {/* Service Categories */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground/80">
                Service Categories
              </label>
              <div className="grid grid-cols-3 gap-3">
                {SERVICE_CATEGORIES.map((cat) => {
                  const selectedCategories = watch("serviceCategories") ?? [];
                  const isSelected =
                    Array.isArray(selectedCategories) &&
                    selectedCategories.includes(cat.value as ServiceCategory);

                  return (
                    <label
                      key={cat.value}
                      className={`
                      relative flex flex-col items-center gap-2 p-4
                      border-2 rounded-xl cursor-pointer
                      transition-all duration-200
                      ${
                        isSelected
                          ? "border-primary bg-primary/10 shadow-sm shadow-primary/20"
                          : "border-border hover:border-primary/40 hover:bg-accent"
                      }
                    `}
                    >
                      {/* Hidden Checkbox */}
                      <input
                        type="checkbox"
                        value={cat.value}
                        className="sr-only"
                        {...register("serviceCategories")}
                      />

                      {/* Check Badge */}
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

                      {/* Icon */}
                      <span
                        className={`
                        text-3xl transition-transform duration-200
                        ${isSelected ? "scale-110" : ""}
                      `}
                      >
                        {cat.icon}
                      </span>

                      {/* Label */}
                      <span
                        className={`
                        text-xs font-semibold transition-colors
                        ${isSelected ? "text-primary" : "text-foreground/70"}
                      `}
                      >
                        {cat.label}
                      </span>
                    </label>
                  );
                })}
              </div>
              {errors.serviceCategories && (
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
                  {errors.serviceCategories?.message}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Step 3: Schedule */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-fade-in">
            {/* Working Days */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-foreground/80">
                  Working Days
                </label>
                <span className="text-xs text-muted-foreground">
                  {watch("workingDays")?.length || 0} selected
                </span>
              </div>

              <div className="grid grid-cols-7 gap-1.5">
                {WORKING_DAYS.map((day) => {
                  const selectedDays = watch("workingDays") ?? [];
                  const isSelected =
                    Array.isArray(selectedDays) &&
                    selectedDays.includes(day.value as DayOfWeek);

                  return (
                    <label
                      key={day.value}
                      className={`
                      relative flex flex-col items-center gap-1
                      py-3 rounded-xl cursor-pointer
                      border-2 transition-all duration-200
                      ${
                        isSelected
                          ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/30"
                          : "border-border hover:border-primary/40 hover:bg-accent text-foreground/70"
                      }
                    `}
                    >
                      {/* Hidden Checkbox */}
                      <input
                        type="checkbox"
                        value={day.value}
                        className="sr-only"
                        {...register("workingDays")}
                      />

                      {/* Day Label */}
                      <span className="text-xs font-bold">{day.label}</span>

                      {/* Selected Dot */}
                      {isSelected && (
                        <div className="w-1 h-1 rounded-full bg-primary-foreground animate-scale-in" />
                      )}
                    </label>
                  );
                })}
              </div>
              {errors.workingDays && (
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
                  {errors.workingDays?.message}
                </p>
              )}
            </div>

            {/* Working Hours */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground/80">
                Working Hours
              </label>

              <div className="grid grid-cols-2 gap-4">
                {/* From */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <label className="text-xs font-medium text-muted-foreground">
                      Start Time
                    </label>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                      <svg
                        className="w-4 h-4 text-muted-foreground"
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
                    </div>
                    <input
                      type="time"
                      {...register("workingHours.start")}
                      className={`
                      w-full pl-9 pr-3 py-3
                      border-2 rounded-xl
                      bg-background/50 text-foreground
                      transition-all duration-200
                      focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary
                      ${
                        errors.workingHours?.start
                          ? "border-destructive/50"
                          : "border-border hover:border-primary/40"
                      }
                    `}
                    />
                  </div>
                </div>

                {/* To */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500" />
                    <label className="text-xs font-medium text-muted-foreground">
                      End Time
                    </label>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                      <svg
                        className="w-4 h-4 text-muted-foreground"
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
                    </div>
                    <input
                      type="time"
                      {...register("workingHours.end")}
                      className={`
                      w-full pl-9 pr-3 py-3
                      border-2 rounded-xl
                      bg-background/50 text-foreground
                      transition-all duration-200
                      focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary
                      ${
                        errors.workingHours?.end
                          ? "border-destructive/50"
                          : "border-border hover:border-primary/40"
                      }
                    `}
                    />
                  </div>
                </div>
              </div>

              {/* Duration Preview */}
              {watch("workingHours.start") && watch("workingHours.end") && (
                <div className="flex items-center gap-2 p-3 bg-primary/5 border border-primary/20 rounded-xl animate-fade-in">
                  <svg
                    className="w-4 h-4 text-primary shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="text-xs text-primary font-medium">
                    Working {watch("workingHours.start")} →{" "}
                    {watch("workingHours.end")}
                  </p>
                </div>
              )}

              {errors.workingHours && (
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

            {/* Error Alert */}
            {error && <ErrorAlert message={error?.message} />}
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex gap-3 pt-2">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={handleBack}
              className="
              flex-1 py-3 px-4
              border-2 border-border
              hover:border-primary/30 hover:bg-accent
              text-foreground font-medium rounded-xl
              transition-all duration-200
              focus:outline-none focus:ring-4 focus:ring-primary/20
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
                  d="M7 16l-4-4m0 0l4-4m-4 4h18"
                />
              </svg>
              Back
            </button>
          )}

          {currentStep < 3 ? (
            <button
              type="button"
              onClick={handleNext}
              className="
              flex-1 py-3 px-4
              bg-primary hover:bg-primary/90
              text-primary-foreground font-medium rounded-xl
              shadow-lg shadow-primary/25
              hover:shadow-xl hover:shadow-primary/30
              transition-all duration-200
              focus:outline-none focus:ring-4 focus:ring-primary/30
              flex items-center justify-center gap-2
              group
            "
            >
              Next
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
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
            </button>
          ) : (
            <SubmitButton
              isLoading={isPending}
              loadingText="Creating account..."
              text="Create Account"
            />
          )}
        </div>
      </form>
    </div>
  );
}
