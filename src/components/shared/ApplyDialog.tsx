"use client";

import * as React from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ApplyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
}

export const ApplyDialog = ({
  open,
  onOpenChange,
  title = "Start Your Application",
  description = "Complete the form below to begin your equity-backed application process.",
}: ApplyDialogProps) => {
  const [status, setStatus] = React.useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    setStatus("success");
    
    // Auto close after 3 seconds on success
    setTimeout(() => {
      onOpenChange(false);
      // Reset status after close animation
      setTimeout(() => setStatus("idle"), 300);
    }, 3000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[450px] overflow-hidden border-border/40 backdrop-blur-xl bg-background/95">
        {status !== "success" ? (
          <div className="flex flex-col gap-6">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold tracking-tight">
                {title}
              </DialogTitle>
              <DialogDescription className="text-muted-foreground pt-1">
                {description}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="space-y-4">
                <div className="grid gap-2">
                  <label
                    htmlFor="full-name"
                    className="text-xs font-mono uppercase tracking-widest text-muted-foreground"
                  >
                    Full Name
                  </label>
                  <input
                    id="full-name"
                    required
                    placeholder="John Doe"
                    className="w-full bg-surface/50 border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  />
                </div>
                
                <div className="grid gap-2">
                  <label
                    htmlFor="email"
                    className="text-xs font-mono uppercase tracking-widest text-muted-foreground"
                  >
                    Work Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="john@company.com"
                    className="w-full bg-surface/50 border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  />
                </div>

                <div className="grid gap-2">
                  <label
                    htmlFor="notes"
                    className="text-xs font-mono uppercase tracking-widest text-muted-foreground"
                  >
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    id="notes"
                    rows={3}
                    placeholder="Tell us about your equity holdings..."
                    className="w-full bg-surface/50 border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={status === "submitting"}
                className="h-12 text-sm font-bold mt-2 gap-2 shadow-lg shadow-primary/20 cursor-pointer"
              >
                {status === "submitting" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Verifying Details...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Submit Application
                  </>
                )}
              </Button>
              
              <p className="text-[10px] text-center text-muted-foreground/60 px-4">
                By clicking submit, you agree to Equivo's Terms of Service and Privacy Policy.
              </p>
            </form>
          </div>
        ) : (
          <div
            className="flex flex-col items-center justify-center py-12 gap-4 text-center animate-in fade-in zoom-in-95 duration-500"
          >
            <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mb-2">
              <div className="animate-in zoom-in duration-500 delay-150 fill-mode-both">
                <CheckCircle2 className="h-10 w-10 text-primary" />
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="text-2xl font-bold tracking-tight">Application Received!</h3>
              <p className="text-muted-foreground">
                Our team will review your details and contact you within 24 hours.
              </p>
            </div>
            <Button
              variant="outline"
              className="mt-4 rounded-xl px-8 cursor-pointer"
              onClick={() => onOpenChange(false)}
            >
              Done
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
