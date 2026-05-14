"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { MAIN_NAV_ITEMS, MORE_NAV_ITEMS } from "@/constants/nav";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Wallet, Menu, ChevronDown } from "lucide-react";
import EquivoLogo from "@/components/logos/EquivoLogo";
import { ConnectWalletButton } from "@/components/wallet/ConnectWalletButton";


export function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isMoreDropdownOpen, setIsMoreDropdownOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto w-full max-w-screen-2xl px-4 md:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 group">
              <EquivoLogo size={32} className="transition-transform group-hover:scale-105" />
              <span className="font-bold text-xl tracking-tight hidden sm:inline-block">
                Equivo
              </span>
            </Link>
            
            <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
              {MAIN_NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-4 py-2 rounded-full transition-colors hover:text-primary hover:bg-surface",
                    pathname === item.href || pathname?.startsWith(item.href + "/")
                      ? "bg-surface text-primary font-semibold"
                      : "text-muted-foreground"
                  )}
                >
                  {item.title}
                </Link>
              ))}

              <div 
                className="relative"
                onMouseEnter={() => setIsMoreDropdownOpen(true)}
                onMouseLeave={() => setIsMoreDropdownOpen(false)}
              >
                <button className="px-4 py-2 rounded-full transition-colors hover:text-primary hover:bg-surface text-muted-foreground flex items-center gap-1 cursor-pointer">
                  More <ChevronDown className="h-4 w-4" />
                </button>
                {isMoreDropdownOpen && (
                  <div
                    className="absolute top-full left-0 mt-2 w-48 rounded-xl border border-border bg-card p-2 shadow-xl backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200"
                  >
                    {MORE_NAV_ITEMS.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block px-4 py-2 text-sm text-muted-foreground hover:bg-surface hover:text-primary rounded-lg transition-colors"
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </nav>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <div className="hidden sm:block">
              <ThemeToggle />
            </div>
            <div className="hidden sm:block w-[180px]">
              <ConnectWalletButton className="py-2 px-5 bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground border border-primary/20 shadow-[0_0_15px_rgba(0,229,204,0.15)] hover:shadow-[0_0_25px_rgba(0,229,204,0.3)]" />
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden cursor-pointer"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden border-b border-border bg-background animate-in fade-in slide-in-from-top-4 duration-300"
        >
          <div className="flex flex-col px-4 py-4 space-y-2">
            {[...MAIN_NAV_ITEMS, ...MORE_NAV_ITEMS].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "px-4 py-3 rounded-xl transition-colors font-medium",
                  pathname === item.href
                    ? "bg-surface text-primary"
                    : "text-muted-foreground hover:bg-surface hover:text-foreground"
                )}
              >
                {item.title}
              </Link>
            ))}
            <div className="pt-4 flex justify-between items-center border-t border-border mt-2">
              <span className="text-muted-foreground font-medium">Theme</span>
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
