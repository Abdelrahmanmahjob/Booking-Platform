import { ProviderServicesClient } from "@/components/provider/services/providerServicesClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Services | BookIt Provider",
};

export default function ProviderServicesPage() {
  return <ProviderServicesClient />;
}
