import Link from "next/link";
import { AuthBackground } from "@/components/auth/auth-background";
import { LoginForm } from "@/components/auth/loginForm";
import { SocialLogin } from "@/components/shared/socialLogin";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In | Booking Platform",
  description: "Sign in to your account",
};

export default function LoginPage() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center p-4 relative">
      <AuthBackground />
      <ThemeToggle />

      <div className="w-full max-w-md">
        {/* Card */}
        <div className="glass-effect rounded-2xl shadow-2xl p-8 border border-border/50 animate-fade-in">
          {/* Logo/Brand */}
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
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-foreground">Welcome Back</h1>
            <p className="text-muted-foreground mt-2">
              Sign in to continue to your account
            </p>
          </div>

          <LoginForm />

          <SocialLogin />

          {/* Sign Up Link */}
          <p className="text-center text-sm text-muted-foreground mt-6">
            Don't have an account?{" "}
            <Link
              href="/register/client"
              className="text-primary hover:underline font-semibold transition"
            >
              Create one now
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-muted-foreground mt-6">
          By continuing, you agree to our{" "}
          <Link href="#" className="underline hover:text-foreground transition">
            Terms
          </Link>{" "}
          and{" "}
          <Link href="#" className="underline hover:text-foreground transition">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}
