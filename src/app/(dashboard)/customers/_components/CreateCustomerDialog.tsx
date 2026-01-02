"use client";

import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CustomersService } from "@/lib/api/services/CustomersService";
import { toast } from "sonner";
import { Loader2, Plus, Tags } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { CreateCustomerInput } from "@/lib/api/models/CreateCustomerInput";

const formSchema = z.object({
  name: z.string().optional(),
  whatsappNumber: z.string().min(8, "WhatsApp number is too short").max(20, "Number too long"),
  email: z.string().email().optional().or(z.literal("")),
  tags: z.string().optional(),
});

interface CreateCustomerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  organizationId: string;
}

export function CreateCustomerDialog({
  open,
  onOpenChange,
  organizationId,
}: CreateCustomerDialogProps) {
  const queryClient = useQueryClient();
  // We handle tags input as a comma-separated string locally, then split for API

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      whatsappNumber: "",
      email: "",
      tags: "",
    },
  });

  const createMutation = useMutation({
    mutationFn: (values: z.infer<typeof formSchema>) => {
      const payload: CreateCustomerInput = {
        organizationId,
        whatsappNumber: values.whatsappNumber.replace(/^\+/, ""),
        name: values.name || undefined,
        email: values.email || undefined,
        tags: values.tags ? values.tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
      };
      return CustomersService.postApiV1Customers(payload);
    },
    onSuccess: () => {
      toast.success("Customer added successfully");
      queryClient.invalidateQueries({ queryKey: ["customers", organizationId] });
      form.reset();
      onOpenChange(false);
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to add customer. Ensure number is unique.");
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    createMutation.mutate(values);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-zinc-900 border-white/10 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Add New Customer</DialogTitle>
          <DialogDescription className="text-zinc-400">
            Manually add a single customer to your registry.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="whatsappNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-zinc-400 text-xs uppercase tracking-wider font-bold">WhatsApp Number <span className="text-rose-500">*</span></FormLabel>
                    <div className="phone-input-container">
                      <PhoneInput
                        placeholder="Enter phone number"
                        value={field.value}
                        onChange={field.onChange}
                        defaultCountry="US"
                        className="flex h-10 w-full rounded-md border border-white/10 bg-black/40 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-white [&_.PhoneInputCountry]:mr-2 [&_.PhoneInputCountryIcon]:w-6 [&_.PhoneInputInput]:bg-transparent [&_.PhoneInputInput]:border-none [&_.PhoneInputInput]:outline-none [&_.PhoneInputInput]:h-[18px] [&_.PhoneInputInput]:text-white"
                      />
                    </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-zinc-400 text-xs uppercase tracking-wider font-bold">Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. John Doe" {...field} className="bg-black/40 border-white/10 text-white" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-zinc-400 text-xs uppercase tracking-wider font-bold">Email</FormLabel>
                  <FormControl>
                    <Input placeholder="john@example.com" {...field} className="bg-black/40 border-white/10 text-white" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-zinc-400 text-xs uppercase tracking-wider font-bold">Tags (Comma separated)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. vip, lead, interested" {...field} className="bg-black/40 border-white/10 text-white" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="pt-4">
              <Button type="submit" disabled={createMutation.isPending} className="w-full bg-emerald-500 hover:bg-emerald-600 text-black font-bold">
                {createMutation.isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : (
                  <Plus className="w-4 h-4 mr-2" />
                )}
                Create Customer
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
