import { StatsCards } from "@/components/provider/dashboard/statsCards";
// import { QuickActions } from "@/components/provider/dashboard/quickActions";
// import { RecentBookings } from "@/components/provider/dashboard/recentBookings";

export default function ProviderDashboardPage() {
  return (
    <div className="space-y-8">
      <StatsCards />
      {/* <QuickActions />
      <RecentBookings /> */}
    </div>
  );
}
