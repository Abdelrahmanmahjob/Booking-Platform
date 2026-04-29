import Link from "next/link";
import { AuthBackground } from "@/components/auth/auth-background";
import { RegisterProviderForm } from "@/components/auth/register/registerProviderForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Join as Provider | Booking Platform",
  description: "Create a provider account and start offering services",
};

export default function RegisterProviderPage() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center p-4 relative">
      <AuthBackground />

      <div className="w-full max-w-lg">
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
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-foreground">
              Become a Provider
            </h1>
            <p className="text-muted-foreground mt-2">
              Set up your business and start accepting bookings
            </p>
          </div>

          {/* Role Switcher */}
          <div className="flex rounded-xl border-2 border-border overflow-hidden mb-6">
            <Link
              href="/register/client"
              className="flex-1 py-2.5 text-center text-muted-foreground hover:text-foreground hover:bg-accent text-sm font-medium transition-colors"
            >
              Client
            </Link>
            <div className="flex-1 py-2.5 text-center bg-primary text-primary-foreground text-sm font-medium">
              Provider
            </div>
          </div>

          {/* Form - انت بتكتبه */}
          <RegisterProviderForm />

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
      </div>
    </div>
  );
}
