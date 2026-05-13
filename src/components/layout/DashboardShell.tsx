import * as React from "react";
import { cn } from "@/lib/utils";
import { Container } from "./Container";

interface DashboardShellProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function DashboardShell({
  children,
  className,
  ...props
}: DashboardShellProps) {
  return (
    <div className={cn("flex flex-1 flex-col overflow-hidden", className)} {...props}>
      <Container className="py-8 md:py-10">
        <main className="flex w-full flex-1 flex-col">
          {children}
        </main>
      </Container>
    </div>
  );
}
