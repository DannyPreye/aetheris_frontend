"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CustomersService } from "@/lib/api/services/CustomersService";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Megaphone, Send } from "lucide-react";
import { useState } from "react";
import { Label } from "@/components/ui/label";

interface OutreachDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  organizationId: string;
}

export function OutreachDialog({
  open,
  onOpenChange,
  organizationId,
}: OutreachDialogProps) {
  const queryClient = useQueryClient();
  const [message, setMessage] = useState("");

  const outreachMutation = useMutation({
    mutationFn: () => {
      return CustomersService.postApiV1CustomersBulk({
          organizationId,
          message: message || undefined
      });
    },
    onSuccess: (data) => {
      toast.success(`Outreach sequence initiated for ${data.data?.count || 'target'} customers.`);
      queryClient.invalidateQueries({ queryKey: ["customers", organizationId] });
      setMessage("");
      onOpenChange(false);
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to initiate outreach sequence.");
    },
  });

  const handleSend = () => {
    outreachMutation.mutate();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-zinc-900 border-white/10 text-white">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
             <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500 border border-purple-500/20">
                <Megaphone className="w-5 h-5" />
             </div>
             <div>
                <DialogTitle className="text-xl font-bold">Neural Outreach</DialogTitle>
                <DialogDescription className="text-zinc-400">
                    Broadcast AI-generated initiation messages to all new leads.
                </DialogDescription>
             </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 py-4">
            <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Contextual Hint (Optional)</Label>
                <Textarea
                    placeholder="e.g. Focus on our new enterprise pricing plan..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="bg-black/40 border-white/10 text-white min-h-[100px] resize-none"
                />
                <p className="text-[10px] text-zinc-500 italic">
                    The agent will use this context to craft personalized opening messages for each customer based on their available data.
                </p>
            </div>

            <div className="p-4 rounded-xl bg-purple-500/5 border border-purple-500/10">
                <p className="text-xs text-purple-200">
                    <span className="font-bold">Note:</span> This will trigger background jobs to message all customers marked as "Lead" with no prior conversation history.
                </p>
            </div>
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)} disabled={outreachMutation.isPending}>
            Cancel
          </Button>
          <Button
            onClick={handleSend}
            disabled={outreachMutation.isPending}
            className="bg-purple-600 hover:bg-purple-500 text-white font-bold shadow-lg shadow-purple-500/20"
          >
            {outreachMutation.isPending ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : (
              <Send className="w-4 h-4 mr-2" />
            )}
            Launch Campaign
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
