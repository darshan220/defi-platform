"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wallet,
  PieChart,
  TrendingUp,
  Gift,
  DownloadCloud,
  Clock,
  ArrowUpRight,
  Droplets,
} from "lucide-react";
import { GlowCard } from "@/components/shared/GlowCard";
import { Button } from "@/components/ui/button";
import { tokens } from "@/lib/mockData";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

const performanceData = [
  { name: "Mon", value: 4000 },
  { name: "Tue", value: 4200 },
  { name: "Wed", value: 3800 },
  { name: "Thu", value: 4800 },
  { name: "Fri", value: 5200 },
  { name: "Sat", value: 5100 },
  { name: "Sun", value: 5600 },
];

export default function PortfolioPage() {
  const [isConnected, setIsConnected] = useState(false);

  return (
    <div className="w-full max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-8 py-12 flex flex-col gap-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-end"
      >
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tighter mb-2">
            Portfolio
          </h1>
          <p className="text-muted-foreground">
            Manage your assets, track performance, and claim rewards.
          </p>
        </div>

        {isConnected && (
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2">
              <DownloadCloud className="h-4 w-4" />
              Export CSV
            </Button>
          </div>
        )}
      </motion.div>

      <AnimatePresence mode="wait">
        {!isConnected ? (
          <motion.div
            key="disconnected"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col items-center justify-center py-32 text-center border border-dashed border-border/50 rounded-3xl bg-surface/20 max-w-4xl mx-auto w-full"
          >
            <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center mb-6 ring-4 ring-primary/5">
              <Wallet className="h-10 w-10 text-primary" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Total Balance: $0.00</h2>
            <p className="text-muted-foreground max-w-md mb-8">
              Connect your wallet to view your deposits, open positions, staked
              assets, and claimable rewards.
            </p>
            <Button
              size="lg"
              className="font-bold px-8 bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() => setIsConnected(true)}
            >
              Connect Wallet
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key="connected"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-8"
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <GlowCard className="lg:col-span-2 p-6 md:p-8 flex flex-col gap-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">
                      Total Balance
                    </h3>
                    <div className="flex items-baseline gap-3">
                      <p className="text-4xl md:text-5xl font-mono font-bold tracking-tight">
                        $42,560.00
                      </p>
                      <span className="flex items-center text-positive text-sm font-medium bg-positive/10 px-2 py-1 rounded">
                        <ArrowUpRight className="h-3 w-3 mr-1" />
                        8.4%
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2 bg-surface p-1 rounded-lg">
                    {["1D", "1W", "1M", "ALL"].map((t) => (
                      <button
                        key={t}
                        className={`px-3 py-1 rounded text-xs font-medium ${t === "1W" ? "bg-card shadow text-foreground" : "text-muted-foreground"}`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="h-[250px] w-full mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={performanceData}>
                      <defs>
                        <linearGradient
                          id="colorValue"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#00E5CC"
                            stopOpacity={0.3}
                          />
                          <stop
                            offset="95%"
                            stopColor="#00E5CC"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1a1a1a",
                          borderColor: "#333",
                          borderRadius: "8px",
                        }}
                        itemStyle={{ color: "#00E5CC", fontWeight: "bold" }}
                      />
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#00E5CC"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorValue)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </GlowCard>

              <div className="flex flex-col gap-6">
                <GlowCard className="p-6">
                  <div className="flex items-center gap-3 mb-6 text-primary">
                    <Gift className="h-5 w-5" />
                    <h3 className="font-bold">Rewards</h3>
                  </div>
                  <div className="flex flex-col gap-1 mb-6">
                    <p className="text-sm text-muted-foreground">
                      Claimable Tokens
                    </p>
                    <p className="text-3xl font-mono font-bold text-foreground">
                      1,240{" "}
                      <span className="text-lg text-muted-foreground">NEX</span>
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      ≈ $450.20
                    </p>
                  </div>
                  <Button className="w-full font-bold">Claim Rewards</Button>
                </GlowCard>

                <GlowCard className="p-6 flex-1">
                  <div className="flex items-center gap-3 mb-6 text-secondary">
                    <PieChart className="h-5 w-5" />
                    <h3 className="font-bold">Allocation</h3>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-primary" />
                        <span className="text-muted-foreground">
                          Deposits (Stable)
                        </span>
                      </div>
                      <span className="font-mono font-medium">45%</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-secondary" />
                        <span className="text-muted-foreground">
                          Equity Tokens
                        </span>
                      </div>
                      <span className="font-mono font-medium">35%</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-chart-3" />
                        <span className="text-muted-foreground">Staked</span>
                      </div>
                      <span className="font-mono font-medium">20%</span>
                    </div>
                  </div>
                </GlowCard>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Balances */}
              <div className="flex flex-col gap-4">
                <h3 className="text-xl font-bold">Balances</h3>
                <div className="rounded-2xl border border-border bg-card/50 overflow-hidden">
                  {tokens.slice(0, 3).map((t, i) => (
                    <div
                      key={t.id}
                      className={`flex items-center justify-between p-4 ${i !== 2 ? "border-b border-border/50" : ""}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-surface border border-border flex items-center justify-center font-bold text-sm overflow-hidden">
                          {t.logo ? (
                            <img
                              src={t.logo}
                              alt={t.name}
                              className="w-full h-full object-cover p-1"
                            />
                          ) : (
                            t.symbol.substring(0, 2)
                          )}
                        </div>
                        <div>
                          <p className="font-semibold">{t.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {t.symbol}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-mono font-bold">14.5 {t.symbol}</p>
                        <p className="text-xs font-mono text-muted-foreground">
                          ${(14.5 * t.price).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Staked */}
              <div className="flex flex-col gap-4">
                <h3 className="text-xl font-bold">Staked</h3>
                <div className="rounded-2xl border border-border bg-card/50 overflow-hidden">
                  <div className="flex items-center justify-between p-4 border-b border-border/50">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center font-bold text-[10px] text-primary">
                        USDos
                      </div>
                      <div>
                        <p className="font-semibold">Staked USDos</p>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60"></span>
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary"></span>
                          </span>
                          <p className="text-xs text-primary font-medium">
                            14.2% APY
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-mono font-bold">10,500.00 USDos</p>
                      <p className="text-xs font-mono text-muted-foreground">
                        $10,500.00
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 mt-4">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Clock className="h-5 w-5 text-muted-foreground" /> Recent
                Activity
              </h3>
              <div className="rounded-2xl border border-border bg-card/50 px-4 py-2">
                <div className="flex items-center justify-between py-3 border-b border-border/50 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-positive/10 text-positive">
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Bought SpaceX Token</p>
                      <p className="text-xs text-muted-foreground">
                        Today, 14:32
                      </p>
                    </div>
                  </div>
                  <p className="font-mono text-sm font-medium">+12.5 SPCX</p>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-border/50 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-primary/10 text-primary">
                      <Droplets className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Staked USDos</p>
                      <p className="text-xs text-muted-foreground">
                        Yesterday, 09:15
                      </p>
                    </div>
                  </div>
                  <p className="font-mono text-sm font-medium">-5,000 USDos</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
