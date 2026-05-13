"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TabSwitcherProps {
  tabs: string[];
  activeTab: string;
  onChange: (tab: string) => void;
  className?: string;
}

export function TabSwitcher({ tabs, activeTab, onChange, className }: TabSwitcherProps) {
  return (
    <div className={cn("flex items-center p-1 bg-surface rounded-xl border border-border", className)}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab;
        return (
          <button
            key={tab}
            onClick={() => onChange(tab)}
            className={cn(
              "relative px-4 py-2 text-sm font-medium transition-colors rounded-lg flex-1",
              isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            )}
          >
            {isActive && (
              <motion.div
                layoutId="active-tab"
                className="absolute inset-0 bg-card rounded-lg shadow-sm border border-border/50"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">{tab}</span>
          </button>
        );
      })}
    </div>
  );
}
