import { cn } from "@/lib/utils";

interface BadgeStatusProps {
  status: "LIVE" | "COMING SOON" | "open" | "closed" | "paused" | "completed";
  className?: string;
}

export function BadgeStatus({ status, className }: BadgeStatusProps) {
  const getStatusStyles = () => {
    switch (status.toLowerCase()) {
      case "live":
      case "open":
        return "bg-primary/10 text-primary border-primary/20";
      case "completed":
        return "bg-positive/10 text-positive border-positive/20";
      case "paused":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "closed":
      case "coming soon":
        return "bg-muted text-muted-foreground border-border";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  const isLive = status.toLowerCase() === "live" || status.toLowerCase() === "open";

  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border uppercase tracking-wider",
      getStatusStyles(),
      className
    )}>
      {isLive && (
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-40"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-current"></span>
        </span>
      )}
      {status}
    </span>
  );
}
