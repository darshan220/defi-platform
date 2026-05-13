import { ReactNode } from "react";
import { GlowCard } from "./GlowCard";

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  subValue?: ReactNode;
}

export function StatCard({ title, value, icon, subValue }: StatCardProps) {
  return (
    <GlowCard className="p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-bold font-mono tracking-tight text-foreground">{value}</h3>
            {subValue && <span className="text-sm">{subValue}</span>}
          </div>
        </div>
        {icon && (
          <div className="h-10 w-10 rounded-xl bg-surface/50 border border-border flex items-center justify-center text-primary shadow-sm">
            {icon}
          </div>
        )}
      </div>
    </GlowCard>
  );
}
