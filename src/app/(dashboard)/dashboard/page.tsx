"use client";

import { motion } from "framer-motion";
import {
  Users,
  MessageSquare,
  Zap,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  Plus,
  ArrowRight,
  Database,
  BarChart3,
  Activity,
  ShieldCheck,
  Globe
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const stats = [
  {
    title: "Neural Sessions",
    value: "154",
    change: "+12.5%",
    trend: "up",
    icon: MessageSquare,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    glow: "shadow-emerald-500/20"
  },
  {
    title: "Global Nodes",
    value: "2,845",
    change: "+4.3%",
    trend: "up",
    icon: Globe,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    glow: "shadow-blue-500/20"
  },
  {
    title: "AI Resolution",
    value: "88.2%",
    change: "+2.1%",
    trend: "up",
    icon: Zap,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    glow: "shadow-amber-500/20"
  },
  {
    title: "Compute Latency",
    value: "142ms",
    change: "-15ms",
    trend: "down",
    icon: Activity,
    color: "text-indigo-400",
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/20",
    glow: "shadow-indigo-500/20"
  },
];

const recentActivity = [
  {
    id: 1,
    customer: "John Doe",
    action: "Neural handshake complete",
    time: "2 minutes ago",
    status: "Active",
    type: "SUCCESS"
  },
  {
    id: 2,
    customer: "Alice Smith",
    action: "AI synthesized resolution",
    time: "15 minutes ago",
    status: "Resolved",
    type: "SUCCESS"
  },
  {
    id: 3,
    customer: "Tech Corp",
    action: "Vectorizing new documents",
    time: "45 minutes ago",
    status: "Processing",
    type: "WARNING"
  },
  {
    id: 4,
    customer: "Bob Johnson",
    action: "Manual override requested",
    time: "1 hour ago",
    status: "Escalated",
    type: "ALERT"
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function DashboardPage() {
  return (
    <div className="space-y-12">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
           <Badge variant="outline" className="mb-4 border-emerald-500/30 text-emerald-400 bg-emerald-500/5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest">System Operational</Badge>
          <h1 className="text-4xl font-bold tracking-tight text-white mb-2">Command Center</h1>
          <p className="text-zinc-500 font-light text-lg">
            Orchestrating autonomous intelligence across your enterprise.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="bg-transparent border-white/10 text-white hover:bg-white/5 h-12 rounded-xl px-6">
            Neural Audit
          </Button>
          <Button className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold h-12 rounded-xl px-6 shadow-xl shadow-emerald-500/20 group">
            <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform" />
            Deploy Agent
          </Button>
        </div>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
      >
        {stats.map((stat) => (
          <motion.div key={stat.title} variants={item}>
            <Card className="bg-zinc-900/50 backdrop-blur-xl border-white/5 hover:border-white/10 transition-all duration-300 group overflow-hidden relative">
               <div className={cn("absolute -right-4 -top-4 w-24 h-24 rounded-full blur-[40px] opacity-0 group-hover:opacity-20 transition-opacity", stat.bg)} />
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
                  {stat.title}
                </CardTitle>
                <div className={cn("p-2 rounded-xl border transition-colors", stat.bg, stat.border, stat.color)}>
                  <stat.icon className="h-5 w-5" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white mb-2 tracking-tight">{stat.value}</div>
                <div className="flex items-center gap-2">
                  <div className={cn(
                    "flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-tighter",
                    stat.trend === "up" ? "bg-emerald-500/10 text-emerald-400" : "bg-zinc-800 text-zinc-400"
                  )}>
                    {stat.trend === "up" ? (
                      <ArrowUpRight className="h-3 w-3" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3" />
                    )}
                    {stat.change}
                  </div>
                  <span className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest mt-0.5">Vector Shift</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid gap-8 lg:grid-cols-7">
        <Card className="lg:col-span-4 bg-zinc-900/40 backdrop-blur-xl border-white/5 rounded-3xl overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between p-8">
            <div>
              <CardTitle className="text-2xl font-bold text-white">Neural Activity</CardTitle>
              <CardDescription className="text-zinc-500">Real-time trace of autonomous interactions.</CardDescription>
            </div>
            <Button variant="ghost" className="text-emerald-400 hover:text-emerald-300 hover:bg-emerald-400/5 h-10 px-4 rounded-xl gap-2 font-bold text-xs uppercase tracking-widest">
              Full Spectrum
              <ArrowRight className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent className="px-8 pb-8 pt-0">
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors group">
                  <div className="flex items-center gap-5">
                    <div className="relative">
                       <div className="w-12 h-12 rounded-2xl bg-zinc-800 flex items-center justify-center font-bold text-emerald-400 border border-white/5">
                        {activity.customer[0]}
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-zinc-900 shadow-xl" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors uppercase tracking-tight">{activity.customer}</p>
                      <p className="text-xs text-zinc-500 mt-1 font-light">{activity.action}</p>
                    </div>
                  </div>
                  <div className="text-right flex flex-col items-end gap-2">
                    <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">{activity.time}</p>
                    <Badge className={cn(
                       "text-[9px] font-bold uppercase px-2 py-0 border-none transition-colors",
                       activity.type === "SUCCESS" ? "bg-emerald-500/10 text-emerald-400" :
                       activity.type === "WARNING" ? "bg-amber-500/10 text-amber-400" : "bg-rose-500/10 text-rose-400"
                    )}>
                      {activity.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3 bg-zinc-900/40 backdrop-blur-xl border-white/5 rounded-3xl overflow-hidden flex flex-col">
          <CardHeader className="p-8 pb-4">
            <CardTitle className="text-2xl font-bold text-white">Neural Fabric</CardTitle>
            <CardDescription className="text-zinc-500">Accelerate your autonomous deployment.</CardDescription>
          </CardHeader>
          <CardContent className="px-8 pb-8 pt-4 flex-1">
            <div className="grid gap-4 h-full">
              {[
                { title: "Integrate Cluster", icon: Users, color: "emerald", desc: "Sync new customer nodes" },
                { title: "Ingest Knowledge", icon: Database, color: "blue", desc: "Vectorize unstructured data" },
                { title: "Agent Synthesis", icon: Zap, color: "amber", desc: "Fine-tune LLM responses" },
                { title: "Neural Audit", icon: BarChart3, color: "indigo", desc: "Performance spectroscopy" }
              ].map((action, i) => (
                <button key={i} className="flex items-center gap-5 p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/20 hover:bg-white/[0.05] transition-all group text-left">
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 shadow-lg",
                    action.color === "emerald" ? "bg-emerald-500/10 text-emerald-400 group-hover:shadow-emerald-500/10" :
                    action.color === "blue" ? "bg-blue-500/10 text-blue-400 group-hover:shadow-blue-500/10" :
                    action.color === "amber" ? "bg-amber-500/10 text-amber-400 group-hover:shadow-amber-500/10" :
                    "bg-indigo-500/10 text-indigo-400 group-hover:shadow-indigo-500/10"
                  )}>
                    <action.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-white tracking-tight">{action.title}</h5>
                    <p className="text-xs text-zinc-500 font-light mt-0.5">{action.desc}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 ml-auto text-zinc-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
