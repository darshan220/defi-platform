"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Calculator,
  ArrowRight,
  TrendingUp,
  ChevronDown,
  ArrowUpRight,
} from "lucide-react";
import { tokens } from "@/lib/mockData";
import { cn } from "@/lib/utils";

// Helper for company brand colors to match premium design
const getCompanyColors = (id: string) => {
  const colors: Record<string, { bg: string; text: string }> = {
    spacex: { bg: "#000000", text: "#ffffff" },
    openai: { bg: "#74aa9c", text: "#ffffff" },
    anthropic: { bg: "#d97757", text: "#ffffff" },
    anduril: { bg: "#000000", text: "#ffffff" },
    kalshi: { bg: "#0052ff", text: "#ffffff" },
    polymarket: { bg: "#0032fa", text: "#ffffff" },
    stripe: { bg: "#635bff", text: "#ffffff" },
    chime: { bg: "#21e16f", text: "#000000" },
  };
  return colors[id] || { bg: "#333333", text: "#ffffff" };
};

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
        className="flex flex-col gap-4"
      >
        <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-primary mb-2">
          <span>04</span>
          <span className="text-muted-foreground">///</span>
          <span>BORROW</span>
          <span className="text-muted-foreground">///</span>
          <span>LIVE</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
          Borrow
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          Use your private company equity as collateral to access instant
          liquidity without selling your shares or triggering taxable events.
        </p>
      </motion.div>

      {/* Two-Column Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start"
      >
        {/* Calculator Card */}
        <div
          className="rounded-2xl border border-border bg-card/50 
          backdrop-blur-sm p-6 flex flex-col gap-5 h-full transition-colors duration-300"
        >
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-sm font-medium text-foreground">
              Select a Company
            </h3>
          </div>

          <div className="relative">
            <select
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
              className="w-full appearance-none bg-surface/50 border 
                border-border rounded-xl px-4 py-3 text-sm text-foreground
                focus:outline-none focus:border-primary/50 focus:bg-surface
                focus:ring-1 focus:ring-primary/20 cursor-pointer
                transition-all duration-300 pr-10"
            >
              <option value="" disabled>
                Select from available tokens...
              </option>
              {tokens.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name} — {t.symbol}
                </option>
              ))}
            </select>
            <ChevronDown
              size={14}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 
                text-gray-500 pointer-events-none"
            />
          </div>

          {/* Row with two toggles side by side */}
          <div className="grid grid-cols-2 gap-4">
            {/* Share Type */}
            <div className="flex flex-col gap-2">
              <label
                className="text-[10px] font-mono tracking-widest 
                text-muted-foreground uppercase"
              >
                Share Type
              </label>
              <div
                className="flex bg-muted/30 border border-border 
                rounded-xl p-1 gap-1"
              >
                {["Common", "Preferred"].map((type) => (
                  <button
                    key={type}
                    onClick={() => setShareType(type)}
                    className={cn(
                      "flex-1 py-2 text-xs font-medium rounded-lg transition-all duration-150",
                      shareType === type
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Type */}
            <div className="flex flex-col gap-2">
              <label
                className="text-[10px] font-mono tracking-widest 
                text-muted-foreground uppercase"
              >
                Input Type
              </label>
              <div
                className="flex bg-muted/30 border border-border 
                rounded-xl p-1 gap-1"
              >
                {["By Shares", "By Amount"].map((type) => (
                  <button
                    key={type}
                    onClick={() => setInputType(type)}
                    className={cn(
                      "flex-1 py-2 text-xs font-medium rounded-lg transition-all duration-150",
                      inputType === type
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Number Input */}
          <div className="flex flex-col gap-2">
            <label
              className="text-[10px] font-mono tracking-widest 
              text-gray-500 uppercase"
            >
              {inputType === "By Shares"
                ? "Number of Shares"
                : "Loan Amount (USD)"}
            </label>

            <div className="relative">
              <input
                type="number"
                min="0"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={
                  inputType === "By Shares" ? "e.g. 100" : "e.g. 50000"
                }
                className="w-full bg-surface/50 border border-border 
                  rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/30
                  focus:outline-none focus:border-primary/40 focus:bg-surface
                  focus:ring-1 focus:ring-primary/20 transition-all duration-300
                  [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
              />
              <span
                className="absolute right-4 top-1/2 -translate-y-1/2 
                text-xs text-muted-foreground/40 pointer-events-none"
              >
                {inputType === "By Shares" ? "shares" : "USD"}
              </span>
            </div>
          </div>

          <button
            onClick={handleEstimate}
            className="w-full py-3.5 rounded-xl bg-primary hover:bg-primary/90
              text-primary-foreground text-sm font-semibold tracking-wide
              flex items-center justify-center gap-2
              transition-all duration-150 active:scale-[0.98]
              shadow-[0_0_20px_rgba(var(--primary-rgb),0.15)] 
              hover:shadow-[0_0_28px_rgba(var(--primary-rgb),0.25)]
              disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
            disabled={!inputValue || !selectedCompany}
          >
            Estimate Loan
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Result Card */}
        <div
          className="rounded-2xl border border-border bg-card/50 
          backdrop-blur-sm p-6 flex flex-col gap-5 min-h-[400px] transition-colors duration-300"
        >
          {!showCalculation ? (
            <div className="flex flex-col h-full">
              {/* Card header */}
              <div className="flex items-center gap-2 mb-6">
                <span
                  className="text-[10px] font-mono tracking-widest 
                  text-primary uppercase"
                >
                  Calculation
                </span>
                <div className="flex-1 h-px bg-primary/20" />
              </div>

              {/* Empty state */}
              <div
                className="flex-1 flex flex-col items-center justify-center 
                gap-4 py-12"
              >
                <Calculator size={20} className="text-muted-foreground/40" />
                <div className="text-center">
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    Your estimate will appear here
                  </p>
                  <p className="text-xs text-muted-foreground/40">
                    Select a company and enter collateral details
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col gap-4"
            >
              {/* Same header */}
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="text-[10px] font-mono tracking-widest 
                  text-primary uppercase"
                >
                  Calculation
                </span>
                <div className="flex-1 h-px bg-primary/20" />
              </div>

              {/* Result rows */}
              {[
                { label: "Estimated Loan", value: "$47,250", highlight: true },
                { label: "Collateral Value", value: "$94,500" },
                { label: "Monthly Interest", value: "$393.75" },
                { label: "LTV Ratio", value: "50%" },
                { label: "Loan Term", value: "12 months" },
              ].map(({ label, value, highlight }) => (
                <div
                  key={label}
                  className={cn(
                    "flex items-center justify-between py-3 px-4 rounded-xl",
                    highlight
                      ? "bg-primary/10 border border-primary/20"
                      : "bg-surface/30 border border-border/50",
                  )}
                >
                  <span className="text-xs text-muted-foreground">{label}</span>
                  <span
                    className={cn(
                      "text-sm font-semibold font-mono",
                      highlight ? "text-primary" : "text-foreground",
                    )}
                  >
                    {value}
                  </span>
                </div>
              ))}

              {/* Risk indicator */}
              <div className="flex items-center gap-2 mt-1 px-1">
                <span className="text-xs text-gray-500">Risk level:</span>
                <div className="flex gap-1">
                  <div className="w-6 h-1.5 rounded-full bg-primary" />
                  <div className="w-6 h-1.5 rounded-full bg-primary/40" />
                  <div className="w-6 h-1.5 rounded-full bg-white/10" />
                </div>
                <span className="text-xs text-primary font-medium">Low</span>
              </div>

              <button
                className="w-full mt-4 py-3 rounded-xl border border-border 
                bg-background hover:bg-surface text-foreground text-xs font-medium
                transition-all duration-300"
              >
                Proceed with Application
              </button>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Supported Collateral Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="w-full flex flex-col gap-6"
      >
        {/* Section title */}
        <div className="flex items-center gap-3 mb-4">
          <TrendingUp size={16} className="text-primary" />
          <h2 className="text-base font-semibold text-white">
            Supported Collateral
          </h2>
          <div className="flex-1 h-px bg-border/50" />
        </div>

        {/* Table */}
        <div className="rounded-xl border border-white/[0.07] overflow-hidden overflow-x-auto">
          <div className="min-w-[900px]">
            {/* Table header */}
            <div
              className="grid px-5 py-3 bg-surface/50 border-b border-border"
              style={{ gridTemplateColumns: "2fr 1.2fr 1fr 1fr 1fr 1fr auto" }}
            >
              {[
                "Company",
                "Token Price",
                "Implied Val",
                "Mark Price",
                "Mark Val",
                "All Time Vol",
                "Action",
              ].map((col) => (
                <span
                  key={col}
                  className="text-[10px] font-mono tracking-wider 
                  text-muted-foreground uppercase"
                >
                  {col}
                </span>
              ))}
            </div>

            {/* Table rows */}
            {tokens.slice(0, 8).map((co) => {
              const brand = getCompanyColors(co.id);
              return (
                <div
                  key={co.id}
                  className="grid items-center px-5 py-4 
                    border-b border-border/50 last:border-0
                    hover:bg-surface/30 transition-colors duration-300"
                  style={{
                    gridTemplateColumns: "2fr 1.2fr 1fr 1fr 1fr 1fr auto",
                  }}
                >
                  {/* Company */}
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center 
                      justify-center text-[10px] font-bold overflow-hidden"
                      style={{ background: brand.bg, color: brand.text }}
                    >
                      {co.logo ? (
                        <img
                          src={co.logo}
                          alt={co.name}
                          className="w-full h-full object-cover p-1.5 opacity-80"
                        />
                      ) : (
                        co.symbol[0]
                      )}
                    </div>
                    <span className="text-sm font-medium text-foreground">
                      {co.name}
                    </span>
                  </div>

                  {/* Token Price */}
                  <div>
                    <p className="text-sm font-mono text-foreground">
                      ${co.price.toFixed(2)}
                    </p>
                    <p
                      className={cn(
                        "text-[10px] font-mono",
                        co.priceChange > 0 ? "text-primary" : "text-negative",
                      )}
                    >
                      {co.priceChange > 0 ? "↗" : "↘"}{" "}
                      {Math.abs(co.priceChange)}%
                    </p>
                  </div>

                  <span className="text-sm text-muted-foreground font-mono">
                    {co.impliedVal}
                  </span>
                  <span className="text-sm text-foreground font-mono">
                    ${co.markPrice.toFixed(2)}
                  </span>
                  <span className="text-sm text-muted-foreground font-mono">
                    {co.markVal}
                  </span>
                  <span className="text-sm text-muted-foreground font-mono">
                    {co.allTimeVol}
                  </span>

                  {/* Action */}
                  <div className="flex justify-end">
                    <button
                      className="text-xs font-medium text-primary 
                      hover:text-primary/80 flex items-center gap-1 
                      transition-colors duration-100 whitespace-nowrap"
                    >
                      Borrow <ArrowUpRight size={11} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
