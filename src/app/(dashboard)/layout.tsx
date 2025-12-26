import { UserDepsProvider } from "@/components/contexts/UserDeps";
import { DashboardLayout } from "@/components/layout/dashboard-layout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <UserDepsProvider >
  <DashboardLayout>
    { children }</DashboardLayout>
  </UserDepsProvider>;
}
