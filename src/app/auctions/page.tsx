"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Gavel,
  RefreshCw,
  AlertCircle,
  Clock,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { GlowCard } from "@/components/shared/GlowCard";
import { BadgeStatus } from "@/components/shared/BadgeStatus";
import { auctions } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@base-ui/react";

// Formatter for countdown
const formatTimeLeft = (endDateStr: string) => {
  const diff = new Date(endDateStr).getTime() - new Date().getTime();
  if (diff <= 0) return "00:00:00";

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

export default function AuctionsPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [now, setNow] = useState(new Date());

  const openAuctionsCount = auctions.filter((a) => a.status === "open").length;
  const closedAuctionsCount = auctions.filter(
    (a) => a.status === "closed" || a.status === "completed",
  ).length;

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const toggleExpand = (id: string) => {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
    }
  };

  return (
    <div className="w-full max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-8 py-12 flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-2"
        >
          <h1 className="text-3xl md:text-4xl font-bold tracking-tighter flex items-center gap-3">
            <Gavel className="h-8 w-8 text-primary" />
            Auctions
          </h1>
          <p className="text-lg text-muted-foreground">
            A simple auction list with open and closed status.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Button
            variant="outline"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="gap-2"
          >
            <RefreshCw
              className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
        </motion.div>
      </div>

      {/* Alert Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="w-full bg-primary/10 border border-primary/20 rounded-xl p-4 flex items-center gap-3 text-primary"
      >
        <AlertCircle className="h-5 w-5 shrink-0" />
        <p className="text-sm font-medium">
          Connect your wallet to place bids on active auctions.
        </p>
        <Button
          size="sm"
          variant="outline"
          className="ml-auto shrink-0 bg-background/50 border-primary/20 hover:bg-primary hover:text-primary-foreground"
        >
          Connect
        </Button>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <GlowCard className="p-6 text-center">
          <p className="text-muted-foreground text-sm font-medium mb-1">
            Open Auctions
          </p>
          <p className="text-4xl font-bold font-mono text-foreground">
            {openAuctionsCount}
          </p>
        </GlowCard>
        <GlowCard className="p-6 text-center">
          <p className="text-muted-foreground text-sm font-medium mb-1">
            Closed Auctions
          </p>
          <p className="text-4xl font-bold font-mono text-foreground">
            {closedAuctionsCount}
          </p>
        </GlowCard>
        <div className="hidden lg:block lg:col-span-2"></div>
      </motion.div>

      {/* Auction List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="rounded-2xl border border-border bg-card/50 backdrop-blur-xl overflow-hidden mt-4"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="border-b border-border bg-surface/50">
                <th className="py-4 pl-6 pr-2 font-medium text-muted-foreground text-sm">
                  Auction
                </th>
                <th className="py-4 px-2 font-medium text-muted-foreground text-sm">
                  Status
                </th>
                <th className="py-4 px-2 font-medium text-muted-foreground text-sm">
                  Current Amount
                </th>
                <th className="py-4 px-2 font-medium text-muted-foreground text-sm">
                  Reserve
                </th>
                <th className="py-4 px-2 font-medium text-muted-foreground text-sm">
                  Bids
                </th>
                <th className="py-4 px-2 font-medium text-muted-foreground text-sm">
                  End Date
                </th>
                <th className="py-4 pr-6 pl-2 font-medium text-muted-foreground text-sm text-right">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {auctions.map((auction) => {
                const isExpanded = expandedId === auction.id;
                const isOpen = auction.status === "open";

                return (
                  <React.Fragment key={auction.id}>
                    <tr
                      className={`border-b border-border/50 hover:bg-surface/30 transition-colors cursor-pointer ${isExpanded ? "bg-surface/30" : ""}`}
                      onClick={() => toggleExpand(auction.id)}
                    >
                      <td className="py-4 pl-6 pr-2 font-semibold">
                        {auction.name}
                      </td>
                      <td className="py-4 px-2">
                        <BadgeStatus status={auction.status as any} />
                      </td>
                      <td className="py-4 px-2 font-mono font-bold">
                        {auction.currentAmount}
                      </td>
                      <td className="py-4 px-2 text-muted-foreground font-mono">
                        {auction.reserve}
                      </td>
                      <td className="py-4 px-2 font-mono">{auction.bids}</td>
                      <td className="py-4 px-2 text-muted-foreground text-sm">
                        {new Date(auction.endDate).toLocaleDateString()}
                      </td>
                      <td className="py-4 pr-6 pl-2 text-right">
                        <Button variant="ghost" size="icon">
                          {isExpanded ? (
                            <ChevronUp className="h-5 w-5" />
                          ) : (
                            <ChevronDown className="h-5 w-5" />
                          )}
                        </Button>
                      </td>
                    </tr>

                    {/* Expanded Row */}
                    <AnimatePresence>
                      {isExpanded && (
                        <tr>
                          <td
                            colSpan={7}
                            className="p-0 border-b border-border"
                          >
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden bg-surface/50 border-t border-border/50"
                            >
                              <div className="p-6 flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
                                <div className="flex items-center gap-6">
                                  <div className="flex flex-col gap-1 p-4 bg-background rounded-xl border border-border">
                                    <span className="text-xs text-muted-foreground uppercase tracking-widest font-bold flex items-center gap-1">
                                      <Clock className="h-3 w-3" />
                                      {isOpen ? "Time Remaining" : "Ended"}
                                    </span>
                                    <span
                                      className={`text-2xl font-mono font-bold ${isOpen ? "text-primary" : "text-muted-foreground"}`}
                                    >
                                      {isOpen
                                        ? formatTimeLeft(auction.endDate)
                                        : "00:00:00"}
                                    </span>
                                  </div>

                                  {isOpen && (
                                    <div className="flex flex-col gap-1">
                                      <span className="text-xs text-muted-foreground uppercase tracking-widest font-bold">
                                        Min Increment
                                      </span>
                                      <span className="text-lg font-mono font-semibold">
                                        $50,000
                                      </span>
                                    </div>
                                  )}
                                </div>

                                {isOpen ? (
                                  <div className="flex items-center gap-3 w-full md:w-auto">
                                    <div className="relative w-full md:w-64">
                                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-mono">
                                        $
                                      </span>
                                      <Input
                                        type="number"
                                        placeholder="Enter bid amount"
                                        className="pl-8 h-12 bg-background border-border"
                                      />
                                    </div>
                                    <Button className="h-12 px-8 font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_15px_rgba(0,229,204,0.2)]">
                                      Place Bid
                                    </Button>
                                  </div>
                                ) : (
                                  <div className="px-6 py-3 bg-muted rounded-xl border border-border text-muted-foreground font-medium text-sm text-center md:text-left">
                                    This auction has ended. No further bids can
                                    be placed.
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          </td>
                        </tr>
                      )}
                    </AnimatePresence>
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
