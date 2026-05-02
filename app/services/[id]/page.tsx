import { ServiceDetailClient } from "@/components/services/detail/serviceDetailClient";
import { Metadata } from "next";

interface ServiceDetailPageProps {
  params: {
    id: string;
  };
}

// Dynamic metadata
export async function generateMetadata({
  params,
}: ServiceDetailPageProps): Promise<Metadata> {
  return {
    title: `Service Details | BookIt`,
    description: "Book this amazing service",
  };
}

export default async function ServiceDetailPage({
  params,
}: ServiceDetailPageProps) {
  const { id } = await params;
  return <ServiceDetailClient serviceId={id} />;
}
