import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PriceChangeProps {
  value: number;
  className?: string;
  showIcon?: boolean;
}

export function PriceChange({ value, className, showIcon = true }: PriceChangeProps) {
  const isPositive = value >= 0;
  
  return (
    <span className={cn(
      "flex items-center gap-1 font-medium",
      isPositive ? "text-positive" : "text-negative",
      className
    )}>
      {showIcon && (
        isPositive ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />
      )}
      {isPositive ? "+" : ""}{value.toFixed(2)}%
    </span>
  );
}
