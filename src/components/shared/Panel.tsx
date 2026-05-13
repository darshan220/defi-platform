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
        "rounded-xl border border-white/[0.06]",
        "bg-white/[0.02] backdrop-blur-sm",
        "p-5 relative overflow-hidden",
        "hover:border-white/[0.10] transition-colors duration-200",
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
        "text-[9px] font-mono tracking-[0.15em] text-gray-500 uppercase mb-3",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}
