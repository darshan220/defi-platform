"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export function GlowCard({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "group relative rounded-2xl border border-border bg-card/50 backdrop-blur-xl p-6 transition-all duration-300 hover:border-primary/50 overflow-hidden",
        className
      )}
      {...props}
    >
      <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
