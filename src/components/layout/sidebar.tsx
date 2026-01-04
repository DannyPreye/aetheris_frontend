"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  MessageSquare,
  Users,
  Database,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Building2,
  Bot,
  Plug,
  Zap,
  Target,
  Cpu,
  ShieldCheck,
  Globe,
  Terminal
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sidebar as SidebarUI,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";

const mainNavItems = [
  { title: "Dashboard", icon: LayoutDashboard, href: "/dashboard", accent: "emerald" },
  // { title: "Conversations", icon: MessageSquare, href: "/conversations", accent: "emerald" },
  { title: "Customers", icon: Users, href: "/customers", accent: "emerald" },
  { title: "Knowledge Base", icon: Database, href: "/knowledge-base", accent: "emerald" },
  { title: "Analytics", icon: BarChart3, href: "/analytics", accent: "emerald" },
];

const settingsNavItems = [
  { title: "Organization", icon: Building2, href: "/settings/organization", accent: "blue" },
  { title: "AI Agent", icon: Bot, href: "/settings/agent", accent: "blue" },
  { title: "Integrations", icon: Plug, href: "/integrations", accent: "blue" },
  // { title: "Users", icon: Users, href: "/settings/users", accent: "blue" },
];

export function Sidebar() {
  const pathname = usePathname();
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <SidebarUI className="border-r border-white/5 bg-black">
       <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-emerald-500/5 to-transparent pointer-events-none" />

      <SidebarHeader className="h-24 flex items-center px-6 relative z-10">
        <Link href="/dashboard" className="flex items-center gap-4 group">
          <div className="relative">
            <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center overflow-hidden group-hover:border-emerald-500/50 transition-all duration-500 shadow-2xl">
              <img src="/logo.png" alt="Aetheris Logo" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-black animate-pulse" />
          </div>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col"
            >
               <span className="font-black text-xl tracking-[0.1em] text-white leading-none">AETHERIS</span>
               <span className="text-[9px] text-zinc-600 uppercase tracking-[0.3em] font-bold mt-1.5 flex items-center gap-1.5">
                 <Globe className="w-2.5 h-2.5 text-zinc-800" />
                 Global Matrix
               </span>
            </motion.div>
          )}
        </Link>
      </SidebarHeader>

      <SidebarContent className="py-8 scrollbar-none relative z-10 px-4">
        <SidebarMenu className="gap-2">
          <div className="px-4 mb-4 flex items-center gap-2">
             {!collapsed && (
                <>
                  <Terminal className="w-3 h-3 text-zinc-800" />
                  <span className="text-[10px] font-bold text-zinc-700 uppercase tracking-[0.3em]">Synaptic Hub</span>
                </>
             )}
          </div>
          {mainNavItems.map((item) => {
             const isActive = pathname === item.href;
             return (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                   asChild
                   isActive={isActive}
                   tooltip={item.title}
                   className={cn(
                     "h-12 rounded-2xl transition-all duration-500 relative group overflow-hidden",
                     isActive
                       ? "bg-emerald-500/5 text-emerald-400 border border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.05)]"
                       : "text-zinc-500 hover:text-white hover:bg-white/[0.03]"
                   )}
                >
                  <Link href={item.href} className="flex items-center gap-4">
                    <div className={cn(
                      "transition-colors duration-500",
                      isActive ? "text-emerald-400" : "text-zinc-600 group-hover:text-zinc-400"
                    )}>
                       <item.icon className="w-5 h-5" />
                    </div>
                    <span className={cn("text-sm font-bold tracking-tight", isActive ? "text-white" : "text-zinc-500 group-hover:text-zinc-300")}>
                      {item.title}
                    </span>
                    {isActive && !collapsed && (
                       <motion.div
                        layoutId="active-glow"
                        className="absolute right-0 top-0 bottom-0 w-1 bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,1)]"
                       />
                    )}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
             );
          })}

          <div className="px-4 mt-12 mb-4 flex items-center gap-2">
             {!collapsed && (
                <>
                  <Cpu className="w-3 h-3 text-zinc-800" />
                  <span className="text-[10px] font-bold text-zinc-700 uppercase tracking-[0.3em]">Neural Protocol</span>
                </>
             )}
          </div>
          {settingsNavItems.map((item) => {
             const isActive = pathname.startsWith(item.href);
             return (
               <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                   asChild
                   isActive={isActive}
                   tooltip={item.title}
                   className={cn(
                     "h-12 rounded-2xl transition-all duration-500 relative group overflow-hidden",
                     isActive
                       ? "bg-blue-500/5 text-blue-400 border border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.05)]"
                       : "text-zinc-500 hover:text-white hover:bg-white/[0.03]"
                   )}
                >
                  <Link href={item.href} className="flex items-center gap-4">
                    <div className={cn(
                      "transition-colors duration-500",
                      isActive ? "text-blue-400" : "text-zinc-600 group-hover:text-zinc-400"
                    )}>
                       <item.icon className="w-5 h-5" />
                    </div>
                    <span className={cn("text-sm font-bold tracking-tight", isActive ? "text-white" : "text-zinc-500 group-hover:text-zinc-300")}>
                      {item.title}
                    </span>
                    {isActive && !collapsed && (
                       <motion.div
                        layoutId="active-glow"
                        className="absolute right-0 top-0 bottom-0 w-1 bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,1)]"
                       />
                    )}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
             );
          })}
        </SidebarMenu>

        {!collapsed && (
           <div className="mt-12 px-2">
              <div className="p-6 rounded-[2rem] bg-zinc-900/40 backdrop-blur-xl border border-white/5 relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-4 text-emerald-500/5 group-hover:text-emerald-500/20 transition-all duration-700">
                    <Zap className="w-12 h-12 rotate-12 scale-150" />
                 </div>
                 <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Compute Shard</span>
                 </div>
                 <div className="space-y-3">
                    <div className="flex items-end justify-between">
                       <h4 className="text-xl font-bold text-white tracking-tighter">65<span className="text-zinc-600 text-sm ml-0.5">%</span></h4>
                       <span className="text-[9px] text-zinc-600 font-bold uppercase tracking-tighter">8.4 tflops</span>
                    </div>
                    <div className="h-1.5 w-full bg-black rounded-full overflow-hidden border border-white/5 p-[1px]">
                       <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "65%" }}
                          transition={{ duration: 2, ease: "easeOut" }}
                          className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.3)]"
                       />
                    </div>
                 </div>
              </div>
           </div>
        )}
      </SidebarContent>

      <SidebarFooter className="border-t border-white/5 p-6 relative z-10">
        <Button
           variant="ghost"
           className={cn(
             "w-full h-14 justify-start gap-5 text-zinc-500 hover:text-rose-400 hover:bg-rose-500/5 rounded-2xl transition-all group overflow-hidden",
             collapsed && "justify-center px-0"
           )}
           onClick={() => signOut()}
        >
           <div className="relative">
              <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-rose-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
           </div>
           {!collapsed && <span className="font-bold text-[11px] uppercase tracking-[0.2em] mt-0.5">Purge Session</span>}
        </Button>
      </SidebarFooter>
    </SidebarUI>
  );
}
