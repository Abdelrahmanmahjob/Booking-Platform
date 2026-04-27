"use client";

import { SubmitButton } from "../../shared/submitButton";
import {
  UseFormTrigger,
  UseFormGetValues,
  UseFormSetError,
} from "react-hook-form";
import { RegisterProviderInput } from "@/schemas/auth.schema";

interface Props {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  trigger: UseFormTrigger<RegisterProviderInput>;
  getValues: UseFormGetValues<RegisterProviderInput>;
  setError: UseFormSetError<RegisterProviderInput>;
  isPending: boolean;
}

export default function NavigationButtons({
  currentStep,
  setCurrentStep,
  trigger,
  getValues,
  setError,
  isPending,
}: Props) {
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

  return (
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
  );
}
