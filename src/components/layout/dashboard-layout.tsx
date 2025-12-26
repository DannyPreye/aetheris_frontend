import { SidebarProvider } from "@/components/ui/sidebar";
import { Sidebar } from "./sidebar";
import { TopBar } from "./topbar";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="dark flex min-h-screen w-full bg-black text-zinc-100 font-sans selection:bg-emerald-500/30">
        <Sidebar />
        <div className="flex flex-col flex-1 min-w-0 overflow-hidden relative">
          <TopBar />
          <main className="flex-1 overflow-y-auto relative z-10 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
             {/* Subtle background glow */}
             <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />

            <div className="mx-auto max-w-7xl p-4 md:p-10 space-y-10">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
