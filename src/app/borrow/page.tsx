"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, ArrowRight, TrendingUp } from "lucide-react";
import { GlowCard } from "@/components/shared/GlowCard";
import { TabSwitcher } from "@/components/shared/TabSwitcher";
import { Button } from "@/components/ui/button";
import { tokens } from "@/lib/mockData";
import { PriceChange } from "@/components/shared/PriceChange";
import { Input } from "@base-ui/react";

export default function BorrowPage() {
  const [shareType, setShareType] = useState("Common");
  const [inputType, setInputType] = useState("By Shares");
  const [inputValue, setInputValue] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");
  const [showCalculation, setShowCalculation] = useState(false);

  const handleEstimate = () => {
    if (inputValue && selectedCompany) {
      setShowCalculation(true);
    }
  };

  return (
    <div className="w-full max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-8 py-12 flex flex-col gap-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-4 text-center items-center max-w-3xl mx-auto"
      >
        <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-primary mb-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
          <Calculator className="h-3 w-3" />
          LOAN CALCULATOR
        </div>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
          Estimate your borrowing capacity before submitting an application.
        </h2>
        <p className="text-lg text-muted-foreground">
          Use your private company equity as collateral to access instant
          liquidity without selling your shares or triggering taxable events.
        </p>
      </motion.div>

      {/* Loan Calculator Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto w-full"
      >
        <GlowCard className="p-6 md:p-8 flex flex-col gap-6">
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Select a Company
            </label>
            <select
              className="w-full h-12 px-4 rounded-xl border border-border bg-surface/50 text-foreground appearance-none focus:outline-none focus:ring-2 focus:ring-primary/50"
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
            >
              <option value="" disabled>
                Select from available tokens...
              </option>
              {tokens.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name} ({t.symbol})
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex-1">
              <label className="text-sm font-medium text-foreground mb-2 block">
                Share Type
              </label>
              <TabSwitcher
                tabs={["Common", "Preferred"]}
                activeTab={shareType}
                onChange={setShareType}
                className="w-full"
              />
            </div>
            <div className="flex-1">
              <label className="text-sm font-medium text-foreground mb-2 block">
                Input Type
              </label>
              <TabSwitcher
                tabs={["By Shares", "By Amount"]}
                activeTab={inputType}
                onChange={setInputType}
                className="w-full"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              {inputType === "By Shares"
                ? "Number of Shares"
                : "Target Amount ($)"}
            </label>
            <Input
              type="number"
              placeholder="0"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="h-12 bg-surface/50 border-border/50 text-lg font-mono"
            />
          </div>

          <Button
            className="w-full h-12 text-base font-bold rounded-xl mt-2 group"
            onClick={handleEstimate}
            disabled={!inputValue || !selectedCompany}
          >
            Estimate Loan
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </GlowCard>

        <GlowCard className="p-6 md:p-8 flex flex-col">
          <div className="flex items-center gap-2 mb-6">
            <h3 className="text-sm font-bold tracking-widest text-primary uppercase">
              Calculation
            </h3>
            <div className="h-px flex-1 bg-border" />
          </div>

          {!showCalculation ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center px-4 py-12 border border-dashed border-border/50 rounded-2xl bg-surface/20">
              <Calculator className="h-12 w-12 text-muted-foreground/30 mb-4" />
              <p className="text-muted-foreground">
                Your estimate will appear here once you fill out the details.
              </p>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col gap-6"
            >
              <div className="p-6 rounded-2xl bg-primary/10 border border-primary/20 text-center">
                <p className="text-primary text-sm font-medium mb-1">
                  Estimated Loan Amount
                </p>
                <p className="text-4xl font-bold font-mono text-foreground tracking-tight">
                  $450,000
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-surface/50 border border-border">
                  <p className="text-xs text-muted-foreground mb-1">
                    Collateral Value
                  </p>
                  <p className="text-lg font-mono font-bold">$1,000,000</p>
                </div>
                <div className="p-4 rounded-xl bg-surface/50 border border-border">
                  <p className="text-xs text-muted-foreground mb-1">
                    Max LTV %
                  </p>
                  <div className="flex items-center gap-2">
                    <p className="text-lg font-mono font-bold text-positive">
                      45.0%
                    </p>
                    <span className="text-[10px] uppercase font-bold bg-positive/20 text-positive px-1.5 py-0.5 rounded">
                      Low Risk
                    </span>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-surface/50 border border-border">
                  <p className="text-xs text-muted-foreground mb-1">
                    Monthly Interest
                  </p>
                  <p className="text-lg font-mono font-bold">
                    $3,150{" "}
                    <span className="text-xs font-sans text-muted-foreground font-normal">
                      (8.4% APR)
                    </span>
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-surface/50 border border-border">
                  <p className="text-xs text-muted-foreground mb-1">
                    Term Length
                  </p>
                  <p className="text-lg font-mono font-bold">12 Months</p>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full mt-auto text-primary border-primary/50 hover:bg-primary/10"
              >
                Proceed with Application
              </Button>
            </motion.div>
          )}
        </GlowCard>
      </motion.div>

      {/* Company Stats Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col gap-4 mt-8"
      >
        <h3 className="text-xl font-bold flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" /> Supported Collateral
        </h3>
        <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-xl overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="border-b border-border bg-surface/50">
                <th className="py-4 pl-4 pr-2 font-medium text-muted-foreground text-sm">
                  Company
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
                <th className="py-4 pr-4 pl-2 font-medium text-muted-foreground text-sm text-right">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {tokens.slice(0, 5).map((token) => (
                <tr
                  key={token.id}
                  className="border-b border-border/50 hover:bg-surface/50 transition-colors"
                >
                  <td className="py-4 pl-4 pr-2">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-surface border border-border flex items-center justify-center font-bold text-xs overflow-hidden">
                        {token.logo ? (
                          <img
                            src={token.logo}
                            alt={token.name}
                            className="w-full h-full object-cover p-0.5"
                          />
                        ) : (
                          <span>{token.symbol.substring(0, 2)}</span>
                        )}
                      </div>
                      <span className="font-semibold">{token.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-2 font-mono font-medium">
                    ${token.price.toFixed(2)}
                    <PriceChange
                      value={token.priceChange}
                      className="text-xs mt-0.5"
                    />
                  </td>
                  <td className="py-4 px-2 text-muted-foreground font-mono text-sm">
                    ${token.impliedVal}
                  </td>
                  <td className="py-4 px-2 font-mono text-sm">
                    ${token.markPrice.toFixed(2)}
                  </td>
                  <td className="py-4 px-2 text-muted-foreground font-mono text-sm">
                    ${token.markVal}
                  </td>
                  <td className="py-4 px-2 font-mono text-sm">
                    {token.allTimeVol}
                  </td>
                  <td className="py-4 pr-4 pl-2 text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="font-medium text-primary hover:text-primary hover:bg-primary/10"
                    >
                      Borrow →
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
