import { ServicesHeader } from "@/components/services/servicesHeader";
import { ServicesFilter } from "@/components/services/servicesFilter";
import { ServicesSearch } from "@/components/services/servicesSearch";
import { ServicesList } from "@/components/services/servicesList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | Booking Platform",
  description: "Browse and book from our wide range of professional services",
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-background">
      <ServicesHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          <div className="flex-1">
            <ServicesSearch />
          </div>
          <ServicesFilter />
        </div>

        {/* Services Grid */}
        <ServicesList />
      </div>
    </main>
  );
}
