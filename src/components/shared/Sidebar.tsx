"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import {
  ArrowDownToLine,
  Landmark,
  BarChart2,
  PieChart,
  Globe2,
  CreditCard,
  Gavel,
  Moon,
  Sun,
  Hexagon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/deposit", label: "Deposit", icon: ArrowDownToLine },
  { href: "/borrow", label: "Borrow", icon: Landmark },
  { href: "/trade", label: "Trade", icon: BarChart2 },
  { href: "/portfolio", label: "Portfolio", icon: PieChart },
  { href: "/ecosystem", label: "Ecosystem", icon: Globe2 },
];

const SECONDARY_NAV_ITEMS = [
  { href: "/card", label: "Card", icon: CreditCard },
  { href: "/auctions", label: "Auctions", icon: Gavel },
];

export function Sidebar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  return (
    <aside className="w-[220px] h-screen shrink-0 bg-white/[0.02] border-r border-white/[0.06] flex flex-col hidden md:flex">
      {/* Logo Area */}
      <div className="h-[72px] px-6 flex items-center gap-3">
        <Hexagon className="text-teal-400" size={24} fill="currentColor" />
        <span className="font-semibold text-lg tracking-wide text-white">
          NEXUS
        </span>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const isActive =
            pathname === item.href ||
            (pathname === "/" && item.href === "/deposit");
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all duration-150",
                isActive
                  ? "font-medium text-white bg-teal-500/10 border border-teal-500/20"
                  : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent",
              )}
            >
              <Icon size={16} className={isActive ? "text-teal-400" : ""} />
              {item.label}
            </Link>
          );
        })}

        <div className="my-4 mx-4 h-px bg-white/[0.06]" />

        {/* Secondary Navigation */}
        {SECONDARY_NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all duration-150",
                isActive
                  ? "font-medium text-white bg-teal-500/10 border border-teal-500/20"
                  : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent",
              )}
            >
              <Icon size={16} className={isActive ? "text-teal-400" : ""} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 space-y-4">
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-150 w-full"
        >
          {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          <span>Theme</span>
        </button>

        <button className="w-full py-2.5 rounded-lg text-sm font-medium text-teal-400 bg-teal-500/10 border border-teal-500/20 hover:bg-teal-500/20 transition-all duration-150">
          Connect Wallet
        </button>
      </div>
    </aside>
  );
}
