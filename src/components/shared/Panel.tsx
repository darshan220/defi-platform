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
        "rounded-xl border border-border",
        "bg-card/50 backdrop-blur-sm",
        "p-5 relative overflow-hidden",
        "hover:border-border/80 transition-colors duration-300",
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
        "text-[9px] font-mono tracking-[0.15em] text-muted-foreground uppercase mb-3",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}

