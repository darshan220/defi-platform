"use client";

import Link from "next/link";
import Image from "next/image";
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
} from "lucide-react";
import { cn } from "@/lib/utils";
import EquivoLogo from "@/components/logos/EquivoLogo";
import { ConnectWalletButton } from "@/components/wallet/ConnectWalletButton";

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
    <aside className="w-[240px] h-screen shrink-0 bg-[#111827] border-r border-slate-800 flex flex-col hidden md:flex transition-colors duration-300">
      {/* Logo Area */}
      <div className="h-[80px] px-6 flex items-center gap-3">
        <EquivoLogo size={32} />
        <span className="font-bold text-xl tracking-wider text-white">
          EQUIVO
        </span>
      </div>

      {/* Action Button Above Nav */}
      <div className="px-4 mb-6">
        <ConnectWalletButton />
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto">
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
                  "flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all duration-200 cursor-pointer",
                  isActive
                    ? "font-semibold text-white bg-[#0D9488]"
                    : "text-slate-400 hover:text-white hover:bg-white/5",
                )}
              >
                <Icon size={18} className={cn(isActive ? "text-white" : "text-slate-400")} />
                {item.label}
              </Link>
            );
          })}

          <div className="my-6 mx-4 h-px bg-white/10" />

          {/* Secondary Navigation */}
          {SECONDARY_NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all duration-200 cursor-pointer",
                  isActive
                    ? "font-semibold text-white bg-[#0D9488]"
                    : "text-slate-400 hover:text-white hover:bg-white/5",
                )}
              >
                <Icon size={18} className={cn(isActive ? "text-white" : "text-slate-400")} />
                {item.label}
              </Link>
            );
          })}
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 space-y-4">
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-sidebar-accent transition-all duration-200 w-full cursor-pointer"
        >
          {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          <span>Theme</span>
        </button>
      </div>
    </aside>
  );
}
