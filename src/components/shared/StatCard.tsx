import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  subValue?: ReactNode;
}

export function StatCard({ title, value, icon, subValue }: StatCardProps) {
  return (
    <div className="p-6 rounded-2xl bg-card border border-border shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">{title}</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-bold tracking-tight text-foreground">{value}</h3>
            {subValue && <div className="ml-1">{subValue}</div>}
          </div>
        </div>
        {icon && (
          <div className="h-12 w-12 rounded-xl bg-surface border border-border flex items-center justify-center text-primary shadow-sm">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
