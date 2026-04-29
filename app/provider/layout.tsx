import { ProviderLayout } from "@/components/provider/providerLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <ProviderLayout>{children}</ProviderLayout>;
}
