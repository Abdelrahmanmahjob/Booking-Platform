"use client";

import { useForm } from "react-hook-form";
import { FormField } from "../shared/form-field";
import { SubmitButton } from "../shared/submit-button";
import { ErrorAlert } from "../shared/error-alert";
import { SocialLogin } from "../shared/social-login";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  RegisterClientInput,
  registerClientSchema,
} from "@/schemas/auth.schema";
import { useRegisterClient } from "@/hooks/auth/useRegister";
import { formFields } from "./constant/formFields";

export function RegisterClientForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterClientInput>({
    resolver: zodResolver(registerClientSchema),
  });

  const { mutate: registerClient, isPending, error } = useRegisterClient();

  const onSubmit = (data: RegisterClientInput) => {
    registerClient(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {formFields.map((field) => (
        <FormField
          key={field.name}
          label={field.label}
          type={field.type}
          placeholder={field.placeholder}
          {...register(field.name as keyof RegisterClientInput)}
          error={errors[field.name as keyof RegisterClientInput]?.message}
          icon={field.icon}
        />
      ))}
      {/* Error Alert */}
      <ErrorAlert message={error?.message} />

      {/* Submit */}
      <SubmitButton
        isLoading={isPending}
        loadingText="Creating account..."
        text="Create Account"
      />

      <SocialLogin />
    </form>
  );
}
