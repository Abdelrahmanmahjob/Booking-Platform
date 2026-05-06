import { ProviderBookingsClient } from "@/components/bookings/provider/providerBookingsClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bookings Management | BookIt Provider",
};

export default function ProviderBookingsPage() {
  return <ProviderBookingsClient />;
}
