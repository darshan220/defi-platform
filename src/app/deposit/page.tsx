"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowDown,
  CheckCircle2,
  Circle,
  Info,
  HelpCircle,
} from "lucide-react";
import { Input } from "@base-ui/react";
import { Panel, PanelHeader } from "@/components/shared/Panel";
import { cn } from "@/lib/utils";
import { useWalletStore } from "@/store/useWalletStore";
import { ConnectWalletButton } from "@/components/wallet/ConnectWalletButton";

const tabs = [
  { id: "buy", label: "Buy" },
  { id: "stake", label: "Stake" },
  { id: "unstake", label: "Unstake" },
] as const;

type TabId = (typeof tabs)[number]["id"];

function useCountUp(target: number, duration = 800) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const steps = 40;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setValue(target);
        clearInterval(timer);
      } else {
        setValue(Math.floor(current * 10) / 10); // keeping 1 decimal place for smooth APY
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [target, duration]);
  return value;
}

export default function DepositPage() {
  const [activeTab, setActiveTab] = useState<TabId>("buy");
  const [amount, setAmount] = useState("");
  const { connectedAddress } = useWalletStore();

  const animatedApy = useCountUp(14.2, 1000);

  const amountNum = parseFloat(amount) || 0;
  const estimatedYield = (amountNum * 0.142).toFixed(2);

  const panels = [
    // ROW 1
    {
      span: "col-span-12 md:col-span-4",
      content: (
        <>
          <PanelHeader>Your USDos Balance</PanelHeader>
          <div className="text-4xl font-extrabold text-foreground mt-2">
            0.00
          </div>
        </>
      ),
    },
    {
      span: "col-span-12 md:col-span-4",
      content: (
        <>
          <PanelHeader>Your Staked Assets</PanelHeader>
          <div className="text-4xl font-extrabold text-foreground mt-2">
            0.00
          </div>
        </>
      ),
    },
    {
      span: "col-span-12 md:col-span-4",
      content: (
        <>
          <PanelHeader>Current Staking APY</PanelHeader>
          <div className="flex items-center gap-3 mt-2 text-primary">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-40"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
            </span>
            <div className="text-4xl font-extrabold">
              {animatedApy.toFixed(1)}%{" "}
              <span className="text-xs font-bold tracking-wider uppercase text-muted-foreground ml-1">
                Live
              </span>
            </div>
          </div>
        </>
      ),
    },

    // ROW 2
    {
      span: "col-span-12 lg:col-span-8",
      content: (
        <div className="flex flex-col h-full">
          <div className="flex items-center gap-2 mb-8">
          <div className="flex bg-muted/80 rounded-xl p-1">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setAmount("");
                    }}
                    className={cn(
                      "relative px-6 py-2 rounded-lg text-sm font-bold transition-all duration-300 cursor-pointer",
                      isActive
                        ? "text-white"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    <span className="relative z-10">
                      {tab.label} {tab.id === "stake" && "14.2%"}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="activeTabPill"
                        className="absolute inset-0 bg-primary rounded-lg shadow-sm"
                        initial={false}
                        transition={{
                          type: "spring",
                          bounce: 0.1,
                          duration: 0.5,
                        }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="relative flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col h-full gap-4"
              >
                {activeTab === "buy" && (
                  <>
                    <div className="bg-surface border border-border rounded-2xl p-6">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                          Pay With
                        </span>
                        <span className="text-xs font-bold text-muted-foreground">
                          Balance: 0.00
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <input
                          type="number"
                          placeholder="0.0"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          className="w-full bg-transparent text-4xl font-bold text-foreground placeholder:text-muted/30 outline-none border-none ring-0 p-0"
                        />
                        <div className="flex items-center gap-2 bg-card border border-border px-4 py-2 rounded-xl shrink-0 shadow-sm">
                          <div className="w-6 h-6 rounded-full bg-[#26A17B] flex items-center justify-center text-[10px] font-bold text-white shadow-sm">
                            ₮
                          </div>
                          <span className="font-bold text-foreground text-sm">
                            USDT
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-center -my-8 relative z-10">
                      <div className="bg-card border border-border shadow-md rounded-full p-2.5 text-muted-foreground">
                        <ArrowDown className="h-5 w-5" />
                      </div>
                    </div>

                    <div className="bg-surface border border-border rounded-2xl p-6">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                          Receive
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <input
                          type="number"
                          placeholder="0.0"
                          readOnly
                          value={amount}
                          className="w-full bg-transparent text-4xl font-bold text-foreground placeholder:text-muted/30 outline-none border-none ring-0 p-0 opacity-80"
                        />
                        <div className="flex items-center gap-2 bg-card border border-border px-4 py-2 rounded-xl shrink-0 shadow-sm">
                          <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-[10px] font-bold text-white shadow-sm">
                            U
                          </div>
                          <span className="font-bold text-foreground text-sm">
                            USDos
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-4 px-2">
                      <span className="text-sm font-bold text-muted-foreground">
                        Exchange Rate:
                      </span>
                      <span className="text-sm font-bold text-foreground">
                        1 USDT = 1.00 USDos
                      </span>
                    </div>
                  </>
                )}

                {activeTab === "stake" && (
                  <>
                    <div className="bg-surface border border-border rounded-2xl p-6">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                          Stake Amount
                        </span>
                        <span className="text-xs font-bold text-muted-foreground">
                          Available: 0.00 USDos
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <input
                          type="number"
                          placeholder="0.0"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          className="w-full bg-transparent text-4xl font-bold text-foreground placeholder:text-muted/30 outline-none border-none ring-0 p-0"
                        />
                        <button className="text-[10px] font-extrabold text-primary bg-primary/10 hover:bg-primary/20 px-3 py-1.5 rounded-lg transition-colors uppercase tracking-wider cursor-pointer">
                          MAX
                        </button>
                      </div>
                    </div>

                    <div className="p-6 bg-primary/5 rounded-2xl border border-primary/10 shadow-sm">
                      <div className="flex justify-between items-end">
                        <div>
                          <p className="text-sm font-bold text-muted-foreground mb-1">Estimated Yearly Yield</p>
                          <p className="text-3xl font-extrabold text-primary">
                            {estimatedYield} <span className="text-lg font-bold opacity-60">USDos</span>
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-bold text-muted-foreground mb-1">Annual Rate</p>
                          <p className="text-lg font-extrabold text-primary">14.2% APY</p>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {activeTab === "unstake" && (
                  <>
                    <div className="bg-surface border border-border rounded-2xl p-6">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                          Unstake Amount
                        </span>
                        <span className="text-xs font-bold text-muted-foreground">
                          Staked: 0.00 USDos
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <input
                          type="number"
                          placeholder="0.0"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          className="w-full bg-transparent text-4xl font-bold text-foreground placeholder:text-muted/30 outline-none border-none ring-0 p-0"
                        />
                        <button className="text-[10px] font-extrabold text-muted-foreground bg-muted hover:bg-muted/80 px-3 py-1.5 rounded-lg transition-colors uppercase tracking-wider cursor-pointer">
                          MAX
                        </button>
                      </div>
                    </div>

                    <div className="p-5 bg-amber-500/10 rounded-2xl border border-amber-500/20 flex gap-4 items-start shadow-sm">
                      <Info className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                      <p className="text-sm font-bold text-amber-500 leading-relaxed">
                        Unstaking will stop earning rewards immediately. There
                        is no lock period, so you can withdraw right away.
                      </p>
                    </div>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {!connectedAddress ? (
            <div className="mt-8">
              <ConnectWalletButton className="w-full h-14 text-lg" />
            </div>
          ) : (
            <button className="w-full h-14 mt-8 rounded-2xl bg-primary hover:bg-primary/90 text-white font-extrabold text-lg transition-all duration-200 shadow-lg shadow-teal-900/20 cursor-pointer">
              {activeTab === "buy" ? "Confirm Purchase" : activeTab === "stake" ? "Confirm Stake" : "Confirm Unstake"}
            </button>
          )}
        </div>
      ),
    },
    {
      span: "col-span-12 lg:col-span-4",
      content: (
        <div className="flex flex-col h-full">
          <PanelHeader>Transaction Overview</PanelHeader>

          <div className="flex-1 mt-6">
            <div className="flex flex-col gap-8 relative before:absolute before:top-2 before:bottom-2 before:left-[11px] before:w-px before:bg-border">
              <div className="flex gap-5 relative z-10">
                <div className="bg-card p-1 rounded-full h-fit border-2 border-primary shadow-sm">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-bold text-sm text-foreground mb-1">
                    1. Approve USDT
                  </p>
                  <p className="text-xs font-medium text-muted-foreground">
                    Grant permission to the protocol
                  </p>
                </div>
              </div>
              <div className="flex gap-5 relative z-10">
                <div className="bg-card p-1 rounded-full h-fit border-2 border-border shadow-sm">
                  <Circle className="h-4 w-4 text-muted-foreground/30" />
                </div>
                <div>
                  <p className="font-bold text-sm text-muted-foreground mb-1">
                    2. Execute Transaction
                  </p>
                  <p className="text-xs font-medium text-muted-foreground/50">
                    Finalize your deposit
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-border flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest cursor-pointer hover:text-foreground transition-colors">
            <HelpCircle className="h-4 w-4" />
            <span>Support Center</span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-8 py-12 flex flex-col gap-12">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-2"
      >
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground">
          Deposit
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Swap, stake and earn yield on your USDos stablecoin assets.
        </p>
      </motion.div>

      {/* Stats/Panels Grid */}
      <div className="grid grid-cols-12 auto-rows-auto gap-6">
        {panels.map((p, i) => (
          <motion.div
            key={i}
            className={p.span}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 + 0.1 }}
          >
            <Panel className="h-full">{p.content}</Panel>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
