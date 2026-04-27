import Link from "next/link";
import { AuthBackground } from "@/components/auth/auth-background";
import { RegisterClientForm } from "@/components/auth/register/registerClientForm";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Account | Booking Platform",
  description: "Create a new client account",
};

export default function RegisterClientPage() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center p-4 relative">
      <AuthBackground />
      <ThemeToggle />

      <div className="w-full max-w-md">
        {/* Card */}
        <div className="glass-effect rounded-2xl shadow-2xl p-8 border border-border/50 animate-fade-in">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-2xl mb-4 shadow-lg shadow-primary/50">
              <svg
                className="w-8 h-8 text-primary-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-foreground">
              Create Account
            </h1>
            <p className="text-muted-foreground mt-2">
              Join us and start booking services
            </p>
          </div>

          {/* Role Switcher */}
          <div className="flex rounded-xl border-2 border-border overflow-hidden mb-6">
            <div className="flex-1 py-2.5 text-center bg-primary text-primary-foreground text-sm font-medium">
              Client
            </div>
            <Link
              href="/register/provider"
              className="flex-1 py-2.5 text-center text-muted-foreground hover:text-foreground hover:bg-accent text-sm font-medium transition-colors"
            >
              Provider
            </Link>
          </div>

          {/* Form - انت بتكتبه */}
          <RegisterClientForm />

          {/* Sign In Link */}
          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-primary hover:underline font-semibold transition"
            >
              Sign in
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-muted-foreground mt-6">
          By continuing, you agree to our{" "}
          <Link
            href="/terms"
            className="underline hover:text-foreground transition"
          >
            Terms
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            className="underline hover:text-foreground transition"
          >
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}
