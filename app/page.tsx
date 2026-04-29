import { HeroSection } from "@/components/home/heroSection";
import { FeaturesSection } from "@/components/home/featuresSection";
import { StatsSection } from "@/components/home/statsSection";
import { CTASection } from "@/components/home/ctaSection";
import { HowItWorksSection } from "@/components/home/howItWorksSection";
import { TestimonialsSection } from "@/components/home/testimonialsSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "BookIt | Professional Booking Platform",
  description:
    "Connect with top-rated professionals and book services in seconds",
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <StatsSection />
      <TestimonialsSection />
      <CTASection />
    </main>
  );
}
