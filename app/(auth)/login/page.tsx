import Link from "next/link";
import { AuthBackground } from "@/components/auth/auth-background";
import { LoginForm } from "@/components/auth/loginForm";
import { SocialLogin } from "@/components/shared/socialLogin";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Sign In | Booking Platform",
  description: "Sign in to your account",
};

export default function LoginPage() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center p-4 relative">
      <AuthBackground />

      <div className="w-full max-w-md">
        {/* Card */}
        <div className="glass-effect rounded-2xl shadow-2xl p-8 border border-border/50 animate-fade-in">
          {/* Logo/Brand */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl mb-4 shadow-lg shadow-white/30">
              <Image src="/favicon.ico" alt="Logo" width={64} height={64} />
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
