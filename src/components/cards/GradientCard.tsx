import * as React from "react";
import { cn } from "@/lib/utils";

interface GradientCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  gradientFrom?: string;
  gradientTo?: string;
}

export function GradientCard({
  className,
  children,
  gradientFrom = "from-primary/10",
  gradientTo = "to-transparent",
  ...props
}: GradientCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-border/50 bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-md",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br opacity-50 pointer-events-none transition-opacity duration-500",
          gradientFrom,
          gradientTo
        )}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
