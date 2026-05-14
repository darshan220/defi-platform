"use client";

import { motion } from "framer-motion";
import { Activity, Search, Droplets, TrendingUp, Filter } from "lucide-react";
import { StatCard } from "@/components/shared/StatCard";
import { TokenRow } from "@/components/shared/TokenRow";
import { tokens } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@base-ui/react";
import { PriceChange } from "@/components/shared/PriceChange";

export default function TradePage() {
  return (
    <div className="w-full max-w-screen-2xl mx-auto px-4 md:px-8 py-10 flex flex-col gap-10">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-2"
      >
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground">
          Markets
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Trade tokenized real-world assets with institutional-grade liquidity
          and security.
        </p>
      </motion.div>

      {/* Stats Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <StatCard
          title="24h Volume"
          value="$2.4B"
          icon={<TrendingUp className="h-6 w-6" />}
          subValue={<PriceChange value={12.5} className="text-xs" />}
        />
        <StatCard
          title="Total Value Locked"
          value="$1.2B"
          icon={<Droplets className="h-6 w-6" />}
        />
        <StatCard
          title="Active Traders"
          value="42.8k"
          icon={<Activity className="h-6 w-6" />}
        />
      </motion.div>

      {/* Main Table Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col gap-6"
      >
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              placeholder="Search assets..."
              className="w-full pl-11 pr-4 py-2.5 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-medium shadow-sm text-foreground"
            />
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Button
              variant="outline"
              className="gap-2 w-full sm:w-auto rounded-xl border-border font-bold text-foreground"
            >
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>
        </div>

        {/* Table Container */}
        <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead>
                <tr className="bg-muted/50 border-b border-border">
                  <th className="py-4 pl-6 pr-2 font-bold text-muted-foreground text-[11px] uppercase tracking-wider">
                    Asset
                  </th>
                  <th className="py-4 px-2 font-bold text-muted-foreground text-[11px] uppercase tracking-wider">
                    Price
                  </th>
                  <th className="py-4 px-2 font-bold text-muted-foreground text-[11px] uppercase tracking-wider">
                    Implied Val
                  </th>
                  <th className="py-4 px-2 font-bold text-muted-foreground text-[11px] uppercase tracking-wider">
                    Mark Price
                  </th>
                  <th className="py-4 px-2 font-bold text-muted-foreground text-[11px] uppercase tracking-wider">
                    Mark Val
                  </th>
                  <th className="py-4 px-2 font-bold text-muted-foreground text-[11px] uppercase tracking-wider">
                    Volume
                  </th>
                  <th className="py-4 px-2 font-bold text-muted-foreground text-[11px] uppercase tracking-wider">
                    Address
                  </th>
                  <th className="py-4 pr-6 pl-2 font-bold text-muted-foreground text-[11px] uppercase tracking-wider text-right">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {tokens.map((token, idx) => (
                  <TokenRow key={token.id} token={token} index={idx} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
