"use client";

import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from "recharts";
import {
  Calendar,
  TrendingUp,
  Users,
  MessageSquare,
  Zap,
  Download,
  Filter,
  ArrowRight,
  Activity,
  Layers
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const conversationTrends = [
  { name: "Mon", total: 45, ai: 38, human: 7 },
  { name: "Tue", total: 52, ai: 44, human: 8 },
  { name: "Wed", total: 48, ai: 40, human: 8 },
  { name: "Thu", total: 61, ai: 54, human: 7 },
  { name: "Fri", total: 55, ai: 48, human: 7 },
  { name: "Sat", total: 32, ai: 28, human: 4 },
  { name: "Sun", total: 28, ai: 25, human: 3 },
];

const lifecycleData = [
  { name: "Leads", value: 450, color: "#10b981" },
  { name: "Prospects", value: 300, color: "#3b82f6" },
  { name: "Customers", value: 250, color: "#6366f1" },
];

const aiConfidence = [
  { range: "90-100%", count: 1200 },
  { range: "80-89%", count: 450 },
  { range: "70-79%", count: 200 },
  { range: "< 70%", count: 80 },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-10 pb-12">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-white mb-2">Neural Analytics</h1>
          <p className="text-zinc-500 font-light text-lg">
            Deep-space telemetry of your autonomous interaction clusters.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="bg-transparent border-white/10 text-white hover:bg-white/5 h-11 rounded-xl px-4 gap-2">
            <Calendar className="w-4 h-4 text-emerald-400" />
            Vitals: 30D
          </Button>
          <Button className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold h-11 rounded-xl px-6 shadow-xl shadow-emerald-500/20">
            <Download className="w-4 h-4 mr-2" />
            Export Telemetry
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "AI Synthesis Rate", value: "94.2%", trend: "+1.5%", icon: Zap, color: "text-emerald-400" },
          { label: "Vector Processing", value: "12.4k", trend: "+8.2%", icon: Layers, color: "text-blue-400" },
          { label: "Handshake Growth", value: "+124", trend: "+12%", icon: Users, color: "text-amber-400" },
          { label: "Revenue Delta", value: "$4,250", trend: "+5.4%", icon: TrendingUp, color: "text-indigo-400" },
        ].map((m) => (
          <Card key={m.label} className="bg-zinc-900/40 backdrop-blur-xl border-white/5 overflow-hidden group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">{m.label}</p>
                <m.icon className={cn("w-4 h-4", m.color)} />
              </div>
              <div className="flex items-baseline justify-between">
                <h3 className="text-3xl font-bold text-white tracking-tight">{m.value}</h3>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full uppercase tracking-tighter">
                  {m.trend}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-8 md:grid-cols-6 mt-12">
        <Card className="md:col-span-4 bg-zinc-900/40 backdrop-blur-xl border-white/5 rounded-3xl overflow-hidden p-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <CardTitle className="text-xl font-bold text-white tracking-tight">Conversation Trajectory</CardTitle>
              <CardDescription className="text-zinc-500 font-light">Temporal analysis of AI handling vs human fallback.</CardDescription>
            </div>
            <div className="flex gap-4">
               <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="text-[10px] uppercase font-bold text-zinc-400">Autonomous</span>
               </div>
               <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-zinc-700" />
                  <span className="text-[10px] uppercase font-bold text-zinc-400">Manual</span>
               </div>
            </div>
          </div>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={conversationTrends}>
                <defs>
                  <linearGradient id="colorAi" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff05" />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: "#71717a", fontWeight: 600 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: "#71717a", fontWeight: 600 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#18181b',
                    borderRadius: '16px',
                    border: '1px solid rgba(255,255,255,0.1)',
                    boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.5)'
                  }}
                  itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                />
                <Area
                  type="monotone"
                  dataKey="ai"
                  stroke="#10b981"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorAi)"
                  animationDuration={2000}
                />
                <Area
                  type="monotone"
                  dataKey="human"
                  stroke="#3f3f46"
                  strokeWidth={2}
                  fill="transparent"
                  strokeDasharray="5 5"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <div className="md:col-span-2 space-y-8">
          <Card className="bg-zinc-900/40 backdrop-blur-xl border-white/5 rounded-3xl overflow-hidden p-8">
            <CardTitle className="text-xl font-bold text-white mb-6 tracking-tight text-center">Lifecycle Density</CardTitle>
            <div className="h-[250px] flex flex-col items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={lifecycleData}
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={85}
                    paddingAngle={8}
                    dataKey="value"
                    stroke="none"
                  >
                    {lifecycleData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-1 gap-3 w-full mt-4">
                {lifecycleData.map(item => (
                  <div key={item.name} className="flex items-center justify-between p-2 rounded-xl bg-white/[0.02] border border-white/5">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{item.name}</span>
                    </div>
                    <span className="text-xs font-bold text-white">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card className="bg-zinc-900/40 backdrop-blur-xl border-white/5 rounded-3xl overflow-hidden p-8">
            <CardTitle className="text-xl font-bold text-white mb-6 tracking-tight text-center">Neural Confidence</CardTitle>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={aiConfidence} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#ffffff05" />
                  <XAxis type="number" hide />
                  <YAxis
                    dataKey="range"
                    type="category"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fontWeight: 700, fill: "#71717a" }}
                    width={80}
                  />
                  <Tooltip cursor={{ fill: 'transparent' }} />
                  <Bar
                    dataKey="count"
                    fill="#10b981"
                    radius={[0, 8, 8, 0]}
                    barSize={24}
                    animationDuration={1500}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
