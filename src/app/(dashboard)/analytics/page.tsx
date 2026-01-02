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
  AreaChart,
  Area
} from "recharts";
import {
  Calendar,
  TrendingUp,
  Users,
  Zap,
  Download,
  Layers,
  Loader2,
  Clock,
  Heart
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { AnalyticsService } from "@/lib/api/services/AnalyticsService";
import { useUserDeps } from "@/components/contexts/UserDeps";
import { toast } from "sonner";

export default function AnalyticsPage() {
  const { deps } = useUserDeps();
  // @ts-ignore
  const organizationId = deps?.organizations?.[0]?.organization?._id;

  // 1. Overview Metrics
  const { data: overview, isLoading: isOverviewLoading } = useQuery({
    queryKey: ["analytics", "overview", organizationId],
    queryFn: () => AnalyticsService.getApiV1AnalyticsOverview(organizationId),
    enabled: !!organizationId,
  });

  // 2. Conversation Trends
  const { data: conversations, isLoading: isConversationsLoading } = useQuery({
    queryKey: ["analytics", "conversations", organizationId],
    queryFn: () => AnalyticsService.getApiV1AnalyticsConversations(organizationId),
    enabled: !!organizationId,
  });

  // 3. Performance Metrics
  const { data: performance, isLoading: isPerformanceLoading } = useQuery({
    queryKey: ["analytics", "performance", organizationId],
    queryFn: () => AnalyticsService.getApiV1AnalyticsPerformance(organizationId),
    enabled: !!organizationId,
  });

  // 4. CSAT Metrics
  const { data: csat, isLoading: isCsatLoading } = useQuery({
    queryKey: ["analytics", "csat", organizationId],
    queryFn: () => AnalyticsService.getApiV1AnalyticsCustomerSatisfaction(organizationId),
    enabled: !!organizationId,
  });

  const handleExport = async () => {
    try {
      const csvData = await AnalyticsService.getApiV1AnalyticsExport(organizationId);
      const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", `analytics_export_${new Date().toISOString()}.csv`);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("Telemetry export completed.");
    } catch (error) {
      console.error("Export failed:", error);
      toast.error("Failed to export telemetry data.");
    }
  };

  const overviewData = overview?.data || {};
  const conversationData = conversations?.data || [];
  const performanceData = performance?.data || [];
  const csatData = csat?.data || [];

  // Calculate generic trends or use defaults if not available (API doesn't provide trends yet, simulating 0 for now)
  const stats = [
    {
      label: "AI Synthesis Rate",
      value: overviewData.totalConversations ? `${Math.round(((overviewData.resolvedByAI || 0) / overviewData.totalConversations) * 100)}%` : "0%",
      trend: "Real-time",
      icon: Zap,
      color: "text-emerald-400"
    },
    {
      label: "Total Vectors",
      value: (overviewData.totalConversations || 0).toLocaleString(),
      trend: "Total Volume",
      icon: Layers,
      color: "text-blue-400"
    },
    {
      label: "Avg Resolution",
      value: overviewData.avgResolution ? `${Math.round(overviewData.avgResolution / 60)}m` : "N/A",
      trend: "Duration",
      icon: Clock,
      color: "text-amber-400"
    },
    {
      label: "Satisfaction Index",
      value: overviewData.avgCSAT ? overviewData.avgCSAT.toFixed(1) : "N/A",
      trend: "/ 5.0",
      icon: Heart,
      color: "text-rose-400"
    },
  ];

  if (!organizationId) return null;

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
            Vitals: All Time
          </Button>
          <Button
            className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold h-11 rounded-xl px-6 shadow-xl shadow-emerald-500/20"
            onClick={handleExport}
          >
            <Download className="w-4 h-4 mr-2" />
            Export Telemetry
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((m) => (
          <Card key={m.label} className="bg-zinc-900/40 backdrop-blur-xl border-white/5 overflow-hidden group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">{m.label}</p>
                <m.icon className={cn("w-4 h-4", m.color)} />
              </div>
              <div className="flex items-baseline justify-between">
                {isOverviewLoading ? (
                    <div className="h-9 w-24 bg-white/5 animate-pulse rounded-lg"/>
                ) : (
                    <h3 className="text-3xl font-bold text-white tracking-tight">{m.value}</h3>
                )}
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
            {isConversationsLoading ? (
                 <div className="w-full h-full flex items-center justify-center">
                    <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
                 </div>
            ) : (
                <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={conversationData}>
                    <defs>
                    <linearGradient id="colorAi" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff05" />
                    <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 11, fill: "#71717a", fontWeight: 600 }}
                    dy={10}
                    tickFormatter={(val) => new Date(val).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
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
                    labelFormatter={(val) => new Date(val).toLocaleDateString()}
                    />
                    <Area
                    type="monotone"
                    dataKey="resolvedByAI"
                    name="AI Resolved"
                    stroke="#10b981"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorAi)"
                    animationDuration={2000}
                    />
                    <Area
                    type="monotone"
                    dataKey="handedOffToHuman"
                    name="Human Handoff"
                    stroke="#3f3f46"
                    strokeWidth={2}
                    fill="transparent"
                    strokeDasharray="5 5"
                    />
                </AreaChart>
                </ResponsiveContainer>
            )}
          </div>
        </Card>

        <div className="md:col-span-2 space-y-8">
          <Card className="bg-zinc-900/40 backdrop-blur-xl border-white/5 rounded-3xl overflow-hidden p-8">
            <CardTitle className="text-xl font-bold text-white mb-6 tracking-tight text-center">Response Velocity</CardTitle>
            <div className="h-[250px] flex flex-col items-center justify-center">
                {isPerformanceLoading ? (
                    <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
                ) : (
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={performanceData}>
                             <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff05" />
                             <XAxis dataKey="date" hide />
                             <YAxis hide />
                             <Tooltip
                                contentStyle={{ backgroundColor: '#18181b', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}
                                labelFormatter={(val) => new Date(val).toLocaleDateString()}
                             />
                             <Line
                                type="monotone"
                                dataKey="averageResponseTime"
                                stroke="#f59e0b"
                                strokeWidth={3}
                                dot={false}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                )}
                 <p className="text-center text-xs text-zinc-500 mt-4">Average response time trend (sec)</p>
            </div>
          </Card>

          <Card className="bg-zinc-900/40 backdrop-blur-xl border-white/5 rounded-3xl overflow-hidden p-8">
            <CardTitle className="text-xl font-bold text-white mb-6 tracking-tight text-center">Satisfaction Index</CardTitle>
            <div className="h-[200px]">
                {isCsatLoading ? (
                     <div className="w-full h-full flex items-center justify-center">
                        <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
                     </div>
                ) : (
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={csatData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff05" />
                            <XAxis dataKey="date" hide />
                            <Tooltip
                                cursor={{ fill: 'transparent' }}
                                contentStyle={{ backgroundColor: '#18181b', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}
                                labelFormatter={(val) => new Date(val).toLocaleDateString()}
                            />
                            <Bar
                                dataKey="customerSatisfaction"
                                fill="#f43f5e"
                                radius={[4, 4, 4, 4]}
                                barSize={8}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
