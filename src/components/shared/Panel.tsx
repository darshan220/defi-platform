import { cn } from "@/lib/utils";
import React from "react";

interface PanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  cols?: number;
}

export function Panel({ children, className, cols = 1, ...props }: PanelProps) {
  return (
    <div 
      className={cn(
        "rounded-2xl border border-border",
        "bg-card shadow-sm",
        "p-6 relative overflow-hidden",
        "hover:shadow-md transition-all duration-300",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function PanelHeader({ children, className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p 
      className={cn(
        "text-[10px] font-bold tracking-[0.05em] text-muted-foreground uppercase mb-4",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}

