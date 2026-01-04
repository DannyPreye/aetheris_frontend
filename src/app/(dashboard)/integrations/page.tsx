"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  CreditCard,
  Hash,
  Users,
  Mail,
  Webhook,
  Zap,
  Puzzle,
  Plus,
  Trash2,
  Edit2,
  Play,
  Loader2,
  CheckCircle2,
  XCircle,
  Filter,
  Activity,
  Power,
  Clock,
  AlertTriangle,
  X,
  Save,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { IntegrationsService } from "@/lib/api/services/IntegrationsService";
import { useUserDeps } from "@/components/contexts/UserDeps";
import { toast } from "sonner";
import { Integration } from "@/lib/api/models/Integration";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { formatDistanceToNow } from "date-fns";

// Integration type icons
const integrationIcons: Record<string, React.ElementType> = {
  calendly: Calendar,
  stripe: CreditCard,
  slack: Hash,
  crm: Users,
  email: Mail,
  webhook: Webhook,
  zapier: Zap,
  custom: Puzzle,
};

// Integration type colors
const integrationColors: Record<string, string> = {
  calendly: "text-blue-400 bg-blue-500/10",
  stripe: "text-purple-400 bg-purple-500/10",
  slack: "text-pink-400 bg-pink-500/10",
  crm: "text-amber-400 bg-amber-500/10",
  email: "text-emerald-400 bg-emerald-500/10",
  webhook: "text-orange-400 bg-orange-500/10",
  zapier: "text-rose-400 bg-rose-500/10",
  custom: "text-cyan-400 bg-cyan-500/10",
};

// Form schema
const integrationFormSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  type: z.enum([
    "calendly",
    "stripe",
    "slack",
    "crm",
    "email",
    "webhook",
    "zapier",
    "custom",
  ]),
  isActive: z.boolean(),
  config: z.record(z.string(), z.any()),
});

type IntegrationFormValues = z.infer<typeof integrationFormSchema>;

// Config field definitions by type
const configFields: Record<string, { key: string; label: string; type: string; placeholder?: string }[]> = {
  calendly: [
    { key: "apiKey", label: "API Key", type: "password", placeholder: "Enter your Calendly API key" },
    { key: "calendarUrl", label: "Calendar URL", type: "text", placeholder: "https://calendly.com/your-calendar" },
  ],
  stripe: [
    { key: "apiKey", label: "Secret Key", type: "password", placeholder: "sk_live_..." },
    { key: "publishableKey", label: "Publishable Key", type: "text", placeholder: "pk_live_..." },
  ],
  slack: [
    { key: "botToken", label: "Bot Token", type: "password", placeholder: "xoxb-..." },
    { key: "channelId", label: "Channel ID", type: "text", placeholder: "C01234567" },
  ],
  crm: [
    { key: "apiUrl", label: "API URL", type: "text", placeholder: "https://api.yourcrm.com" },
    { key: "apiKey", label: "API Key", type: "password", placeholder: "Enter your CRM API key" },
  ],
  email: [
    { key: "smtpHost", label: "SMTP Host", type: "text", placeholder: "smtp.example.com" },
    { key: "smtpPort", label: "SMTP Port", type: "text", placeholder: "587" },
    { key: "username", label: "Username", type: "text", placeholder: "user@example.com" },
    { key: "password", label: "Password", type: "password", placeholder: "Enter password" },
  ],
  webhook: [
    { key: "webhookUrl", label: "Webhook URL", type: "text", placeholder: "https://your-webhook.com/endpoint" },
    { key: "secret", label: "Secret", type: "password", placeholder: "Optional webhook secret" },
  ],
  zapier: [
    { key: "webhookUrl", label: "Zapier Webhook URL", type: "text", placeholder: "https://hooks.zapier.com/..." },
  ],
  custom: [
    { key: "apiUrl", label: "API URL", type: "text", placeholder: "https://api.example.com" },
    { key: "apiKey", label: "API Key", type: "password", placeholder: "Enter API key" },
    { key: "headers", label: "Custom Headers (JSON)", type: "text", placeholder: '{"Authorization": "Bearer ..."}' },
  ],
};

export default function IntegrationsPage() {
  const { deps } = useUserDeps();
  // @ts-ignore
  const organizationId = deps?.organizations?.[0]?.organization?._id;
  const queryClient = useQueryClient();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingIntegration, setEditingIntegration] = useState<Integration | null>(null);
  const [deletingIntegration, setDeletingIntegration] = useState<Integration | null>(null);
  const [typeFilter, setTypeFilter] = useState<string>("all");

  // Fetch integrations
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["integrations", organizationId],
    queryFn: () => IntegrationsService.getApiV1Integrations(organizationId),
    enabled: !!organizationId,
  });

  const integrations = data?.data || [];
  const filteredIntegrations =
    typeFilter === "all"
      ? integrations
      : integrations.filter((i) => i.type === typeFilter);

  // Stats
  const totalCount = integrations.length;
  const activeCount = integrations.filter((i) => i.isActive).length;
  const testedCount = integrations.filter((i) => i.lastTestedAt).length;
  const failedCount = integrations.filter(
    (i) => i.testStatus === "failed"
  ).length;

  // Form
  const form = useForm<IntegrationFormValues>({
    resolver: zodResolver(integrationFormSchema),
    defaultValues: {
      name: "",
      type: "webhook",
      isActive: true,
      config: {},
    },
  });

  const selectedType = form.watch("type");

  // Create mutation
  const createMutation = useMutation({
    mutationFn: (values: IntegrationFormValues) =>
      IntegrationsService.postApiV1Integrations({
        organizationId,
        name: values.name,
        type: values.type as any,
        config: values.config,
        isActive: values.isActive,
      }),
    onSuccess: () => {
      toast.success("Integration created successfully");
      queryClient.invalidateQueries({ queryKey: ["integrations"] });
      setIsDialogOpen(false);
      form.reset();
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to create integration");
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: (values: IntegrationFormValues) =>
      IntegrationsService.putApiV1Integrations(editingIntegration!.id, {
        organizationId,
        name: values.name,
        type: values.type as any,
        config: values.config,
        isActive: values.isActive,
      }),
    onSuccess: () => {
      toast.success("Integration updated successfully");
      queryClient.invalidateQueries({ queryKey: ["integrations"] });
      setIsDialogOpen(false);
      setEditingIntegration(null);
      form.reset();
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to update integration");
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (id: string) => IntegrationsService.deleteApiV1Integrations(id),
    onSuccess: () => {
      toast.success("Integration deleted");
      queryClient.invalidateQueries({ queryKey: ["integrations"] });
      setIsDeleteDialogOpen(false);
      setDeletingIntegration(null);
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to delete integration");
    },
  });

  // Test mutation
  const testMutation = useMutation({
    mutationFn: (id: string) => IntegrationsService.postApiV1IntegrationsTest(id),
    onSuccess: (response) => {
      if (response.success) {
        toast.success(response.message || "Connection test successful");
      } else {
        toast.error(response.message || "Connection test failed");
      }
      queryClient.invalidateQueries({ queryKey: ["integrations"] });
    },
    onError: (error: any) => {
      toast.error(error?.message || "Connection test failed");
    },
  });

  const onSubmit = (values: IntegrationFormValues) => {
    if (editingIntegration) {
      updateMutation.mutate(values);
    } else {
      createMutation.mutate(values);
    }
  };

  const openCreateDialog = () => {
    setEditingIntegration(null);
    form.reset({
      name: "",
      type: "webhook",
      isActive: true,
      config: {},
    });
    setIsDialogOpen(true);
  };

  const openEditDialog = (integration: Integration) => {
    setEditingIntegration(integration);
    form.reset({
      name: integration.name,
      type: integration.type as any,
      isActive: integration.isActive,
      config: integration.config || {},
    });
    setIsDialogOpen(true);
  };

  const openDeleteDialog = (integration: Integration) => {
    setDeletingIntegration(integration);
    setIsDeleteDialogOpen(true);
  };

  const stats = [
    {
      label: "Total Integrations",
      value: totalCount,
      icon: Activity,
      color: "text-blue-400",
    },
    {
      label: "Active",
      value: activeCount,
      icon: Power,
      color: "text-emerald-400",
    },
    {
      label: "Tested",
      value: testedCount,
      icon: Clock,
      color: "text-amber-400",
    },
    {
      label: "Failed Tests",
      value: failedCount,
      icon: AlertTriangle,
      color: "text-rose-400",
    },
  ];

  if (!organizationId) return null;

  return (
    <div className="space-y-10 pb-12">
      {/* Header */}
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-white mb-2">
            Integrations
          </h1>
          <p className="text-zinc-500 font-light text-lg">
            Connect your favorite tools and automate workflows.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[180px] bg-transparent border-white/10 text-white h-11 rounded-xl">
              <Filter className="w-4 h-4 mr-2 text-zinc-400" />
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent className="bg-zinc-900 border-white/10">
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="calendly">Calendly</SelectItem>
              <SelectItem value="stripe">Stripe</SelectItem>
              <SelectItem value="slack">Slack</SelectItem>
              <SelectItem value="crm">CRM</SelectItem>
              <SelectItem value="email">Email</SelectItem>
              <SelectItem value="webhook">Webhook</SelectItem>
              <SelectItem value="zapier">Zapier</SelectItem>
              <SelectItem value="custom">Custom</SelectItem>
            </SelectContent>
          </Select>
          <Button
            className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold h-11 rounded-xl px-6 shadow-xl shadow-emerald-500/20"
            onClick={openCreateDialog}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Integration
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Card
            key={s.label}
            className="bg-zinc-900/40 backdrop-blur-xl border-white/5 overflow-hidden"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">
                  {s.label}
                </p>
                <s.icon className={cn("w-4 h-4", s.color)} />
              </div>
              <div className="flex items-baseline justify-between">
                {isLoading ? (
                  <div className="h-9 w-16 bg-white/5 animate-pulse rounded-lg" />
                ) : (
                  <h3 className="text-3xl font-bold text-white tracking-tight">
                    {s.value}
                  </h3>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Integrations Grid */}
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
        </div>
      ) : filteredIntegrations.length === 0 ? (
        <Card className="bg-zinc-900/40 backdrop-blur-xl border-white/5 border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="w-16 h-16 rounded-2xl bg-zinc-800/50 flex items-center justify-center mb-6">
              <Puzzle className="w-8 h-8 text-zinc-500" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              {typeFilter === "all" ? "No integrations yet" : `No ${typeFilter} integrations`}
            </h3>
            <p className="text-zinc-500 text-center mb-6 max-w-md">
              Connect your favorite tools to automate workflows and enhance your
              WhatsApp business experience.
            </p>
            <Button
              className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold"
              onClick={openCreateDialog}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Integration
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredIntegrations.map((integration, index) => {
              const Icon = integrationIcons[integration.type] || Puzzle;
              const colorClass = integrationColors[integration.type] || "text-zinc-400 bg-zinc-500/10";

              return (
                <motion.div
                  key={integration.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="bg-zinc-900/40 backdrop-blur-xl border-white/5 overflow-hidden group hover:border-white/10 transition-all">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className={cn(
                              "w-10 h-10 rounded-xl flex items-center justify-center",
                              colorClass
                            )}
                          >
                            <Icon className="w-5 h-5" />
                          </div>
                          <div>
                            <CardTitle className="text-white text-lg">
                              {integration.name}
                            </CardTitle>
                            <CardDescription className="text-zinc-500 capitalize">
                              {integration.type}
                            </CardDescription>
                          </div>
                        </div>
                        <Badge
                          variant={integration.isActive ? "default" : "secondary"}
                          className={cn(
                            "text-[10px] uppercase tracking-wider",
                            integration.isActive
                              ? "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                              : "bg-zinc-800 text-zinc-500"
                          )}
                        >
                          {integration.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Test Status */}
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-zinc-500">Connection Status</span>
                        {integration.testStatus === "success" ? (
                          <span className="flex items-center gap-1.5 text-emerald-400">
                            <CheckCircle2 className="w-4 h-4" />
                            Connected
                          </span>
                        ) : integration.testStatus === "failed" ? (
                          <span className="flex items-center gap-1.5 text-rose-400">
                            <XCircle className="w-4 h-4" />
                            Failed
                          </span>
                        ) : (
                          <span className="text-zinc-500">Not tested</span>
                        )}
                      </div>

                      {/* Last Tested */}
                      {integration.lastTestedAt && (
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-zinc-500">Last Tested</span>
                          <span className="text-zinc-400">
                            {formatDistanceToNow(new Date(integration.lastTestedAt), {
                              addSuffix: true,
                            })}
                          </span>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex items-center gap-2 pt-2 border-t border-white/5">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex-1 text-zinc-400 hover:text-white hover:bg-white/5"
                          onClick={() => testMutation.mutate(integration.id)}
                          disabled={testMutation.isPending}
                        >
                          {testMutation.isPending ? (
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          ) : (
                            <Play className="w-4 h-4 mr-2" />
                          )}
                          Test
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex-1 text-zinc-400 hover:text-white hover:bg-white/5"
                          onClick={() => openEditDialog(integration)}
                        >
                          <Edit2 className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-zinc-400 hover:text-rose-400 hover:bg-rose-500/10"
                          onClick={() => openDeleteDialog(integration)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-zinc-900 border-white/10 max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-white text-xl">
              {editingIntegration ? "Edit Integration" : "Add Integration"}
            </DialogTitle>
            <DialogDescription className="text-zinc-500">
              {editingIntegration
                ? "Update your integration settings."
                : "Connect a new service to your workspace."}
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-300">Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="My Integration"
                        className="bg-zinc-800/50 border-white/10 text-white"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-300">Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={!!editingIntegration}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-zinc-800/50 border-white/10 text-white">
                          <SelectValue placeholder="Select integration type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-zinc-900 border-white/10">
                        <SelectItem value="calendly">Calendly</SelectItem>
                        <SelectItem value="stripe">Stripe</SelectItem>
                        <SelectItem value="slack">Slack</SelectItem>
                        <SelectItem value="crm">CRM</SelectItem>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="webhook">Webhook</SelectItem>
                        <SelectItem value="zapier">Zapier</SelectItem>
                        <SelectItem value="custom">Custom</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Dynamic config fields */}
              {configFields[selectedType]?.map((fieldDef) => (
                <FormField
                  key={fieldDef.key}
                  control={form.control}
                  name={`config.${fieldDef.key}` as any}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-zinc-300">
                        {fieldDef.label}
                      </FormLabel>
                      <FormControl>
                        <Input
                          type={fieldDef.type}
                          placeholder={fieldDef.placeholder}
                          className="bg-zinc-800/50 border-white/10 text-white"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}

              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-lg border border-white/10 p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-zinc-300">Active</FormLabel>
                      <p className="text-sm text-zinc-500">
                        Enable this integration
                      </p>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                  className="border-white/10 text-zinc-300 hover:bg-white/5"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold"
                  disabled={createMutation.isPending || updateMutation.isPending}
                >
                  {(createMutation.isPending || updateMutation.isPending) && (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  )}
                  <Save className="w-4 h-4 mr-2" />
                  {editingIntegration ? "Update" : "Create"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="bg-zinc-900 border-white/10 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white">Delete Integration</DialogTitle>
            <DialogDescription className="text-zinc-500">
              Are you sure you want to delete "{deletingIntegration?.name}"? This
              action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
              className="border-white/10 text-zinc-300 hover:bg-white/5"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() =>
                deletingIntegration && deleteMutation.mutate(deletingIntegration.id)
              }
              disabled={deleteMutation.isPending}
              className="bg-rose-500 hover:bg-rose-400"
            >
              {deleteMutation.isPending && (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              )}
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
