import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication | Booking Platform",
  description: "Sign in or create an account",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen bg-auth-gradient">{children}</div>;
}
