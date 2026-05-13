"use client";

import { motion } from "framer-motion";
import { Activity, Search, Droplets, TrendingUp, Filter } from "lucide-react";
import { StatCard } from "@/components/shared/StatCard";
import { TokenRow } from "@/components/shared/TokenRow";
import { tokens } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@base-ui/react";

export default function TradePage() {
  return (
    <div className="w-full max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-8 py-12 flex flex-col gap-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-4"
      >
        <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-primary mb-2">
          <span>03</span>
          <span className="text-muted-foreground">///</span>
          <span>TRADE</span>
          <span className="text-muted-foreground">///</span>
          <span>LIVE</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
          Trade
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          Trade and lend against tokenized shares of the world's most valuable
          private companies.
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
          title="Trading Volume"
          value="$26,730.91"
          icon={<TrendingUp className="h-5 w-5" />}
          subValue={<span className="text-positive ml-2 text-xs">+12.5%</span>}
        />
        <StatCard
          title="Total Liquidity"
          value="$1,216.87"
          icon={<Droplets className="h-5 w-5" />}
        />
        <StatCard
          title="Total Trades"
          value="41"
          icon={<Activity className="h-5 w-5" />}
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
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search companies or tokens..."
              className="pl-10 bg-surface/50 border-border/50 focus:border-primary/50 transition-colors"
            />
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Button variant="outline" className="gap-2 w-full sm:w-auto">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>
        </div>

        {/* Table Container */}
        <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-xl overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="border-b border-border bg-surface/50">
                <th className="py-4 pl-4 pr-2 font-medium text-muted-foreground text-sm">
                  Product
                </th>
                <th className="py-4 px-2 font-medium text-muted-foreground text-sm">
                  Token Price
                </th>
                <th className="py-4 px-2 font-medium text-muted-foreground text-sm">
                  Implied Val
                </th>
                <th className="py-4 px-2 font-medium text-muted-foreground text-sm">
                  Mark Price
                </th>
                <th className="py-4 px-2 font-medium text-muted-foreground text-sm">
                  Mark Val
                </th>
                <th className="py-4 px-2 font-medium text-muted-foreground text-sm">
                  All Time Vol
                </th>
                <th className="py-4 px-2 font-medium text-muted-foreground text-sm">
                  Address
                </th>
                <th className="py-4 pr-4 pl-2 font-medium text-muted-foreground text-sm text-right">
                  Trade
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
      </motion.div>
    </div>
  );
}
