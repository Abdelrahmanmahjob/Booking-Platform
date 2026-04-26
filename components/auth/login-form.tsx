"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginInput } from "@/schemas/auth.schema";
import { useLogin } from "@/hooks/auth/useLogin";
import {
  EnvelopeClosedIcon,
  LockClosedIcon,
  ReloadIcon,
} from "@radix-ui/react-icons";
import { useState } from "react";

export function LoginForm() {
  const { mutate: login, isPending, error } = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginInput) => {
    login(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Email Field */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground/80">
          Email Address
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <EnvelopeClosedIcon className="h-5 w-5 text-muted-foreground" />
          </div>
          <input
            {...register("email")}
            type="email"
            className={`
              w-full pl-10 pr-4 py-3 
              border-2 rounded-xl
              bg-background/50
              transition-all duration-200
              placeholder:text-muted-foreground
              focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary
              ${errors.email ? "border-destructive/50 focus:border-destructive focus:ring-destructive/20" : "border-border"}
            `}
            placeholder="you@example.com"
          />
        </div>
        {errors.email && (
          <p className="text-sm text-destructive flex items-center gap-1 animate-slide-down">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Password Field */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground/80">
          Password
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <LockClosedIcon className="h-5 w-5 text-muted-foreground" />
          </div>
          <input
            {...register("password")}
            type={showPassword ? "text" : "password"}
            className={`
              w-full pl-10 pr-12 py-3 
              border-2 rounded-xl
              bg-background/50
              transition-all duration-200
              placeholder:text-muted-foreground
              focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary
              ${errors.password ? "border-destructive/50 focus:border-destructive focus:ring-destructive/20" : "border-border"}
            `}
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground transition"
          >
            {showPassword ? (
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
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                />
              </svg>
            ) : (
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
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            )}
          </button>
        </div>
        {errors.password && (
          <p className="text-sm text-destructive flex items-center gap-1 animate-slide-down">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Error Alert */}
      {error && (
        <div className="p-4 bg-destructive/10 border-l-4 border-destructive rounded-lg animate-slide-down">
          <div className="flex items-start gap-3">
            <svg
              className="w-5 h-5 text-destructive mt-0.5 shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            <div>
              <h3 className="text-sm font-medium text-destructive">
                Login Failed
              </h3>
              <p className="text-sm text-destructive/80 mt-1">
                Invalid email or password.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isPending}
        className="
          group relative w-full py-3 px-4
          bg-primary hover:bg-primary/90
          text-primary-foreground font-medium rounded-xl
          shadow-lg shadow-primary/25
          hover:shadow-xl hover:shadow-primary/30
          transition-all duration-200
          disabled:opacity-50 disabled:cursor-not-allowed
          disabled:hover:shadow-lg
          focus:outline-none focus:ring-4 focus:ring-primary/30
        "
      >
        <span className="flex items-center justify-center gap-2">
          {isPending ? (
            <>
              <ReloadIcon className="h-5 w-5 animate-spin" />
              Signing in...
            </>
          ) : (
            <>
              Sign In
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
            </>
          )}
        </span>
      </button>
    </form>
  );
}
