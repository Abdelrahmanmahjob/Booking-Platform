"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField } from "../../shared/formField";
import { ErrorAlert } from "../../shared/errorAlert";
import { formFields } from "../constants/formFields";
import {
  RegisterProviderInput,
  registerProviderSchema,
} from "@/schemas/auth.schema";

import { MdBusinessCenter } from "react-icons/md";
import { useRegisterProvider } from "@/hooks/auth/useRegister";
import StepsIndicator from "./stepsIndicator";
import NavigationButtons from "./navigationButtons";
import { useState } from "react";
import { ServiceCategories } from "./ServiceCategories";
import { WorkingDays } from "./workingDays";
import { WorkingHours } from "./workingHours";

export function RegisterProviderForm() {
  const methods = useForm<RegisterProviderInput>({
    resolver: zodResolver(registerProviderSchema),
    mode: "onChange",
    defaultValues: {
      serviceCategories: [],
      workingDays: [],
      workingHours: { start: "", end: "" },
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    trigger,
    getValues,
    setError,
  } = methods;
  const [currentStep, setCurrentStep] = useState<number>(1);
  const { mutate: registerProvider, isPending, error } = useRegisterProvider();

  const onSubmit = (data: RegisterProviderInput) => {
    registerProvider(data);
  };

  return (
    <div className="space-y-6">
      <StepsIndicator currentStep={currentStep} />
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {currentStep === 1 && (
            <div className="space-y-5 animate-fade-in">
              {formFields.map((field) => (
                <FormField
                  key={field.name}
                  {...field}
                  {...register(field.name as any)}
                  error={
                    errors[field.name as keyof RegisterProviderInput]?.message
                  }
                />
              ))}
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-5 animate-fade-in">
              <FormField
                label="Business Name"
                icon={MdBusinessCenter}
                {...register("businessName")}
                error={errors.businessName?.message}
                placeholder="Ahmed's Clinic"
              />
              <ServiceCategories />
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6 animate-fade-in">
              <WorkingDays />
              <WorkingHours />
              {error && <ErrorAlert message={error?.message} />}
            </div>
          )}

          <NavigationButtons
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            trigger={trigger}
            getValues={getValues}
            setError={setError}
            isPending={isPending}
          />
        </form>
      </FormProvider>
    </div>
  );
}
