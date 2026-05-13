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

  const animatedApy = useCountUp(14.2, 1000);

  const amountNum = parseFloat(amount) || 0;
  const estimatedYield = (amountNum * 0.142).toFixed(2);

  const panels = [
    // ROW 1
    {
      span: "col-span-12 md:col-span-4",
      content: (
        <>
          <PanelHeader>Your USDos Bal</PanelHeader>
          <div className="text-3xl font-mono font-bold text-white mt-4">
            0.00
          </div>
        </>
      ),
    },
    {
      span: "col-span-12 md:col-span-4",
      content: (
        <>
          <PanelHeader>Your Staked</PanelHeader>
          <div className="text-3xl font-mono font-bold text-white mt-4">
            0.00
          </div>
        </>
      ),
    },
    {
      span: "col-span-12 md:col-span-4",
      content: (
        <>
          <PanelHeader>Staking APY</PanelHeader>
          <div className="flex items-center gap-3 mt-4 text-[#00E5CC]">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00E5CC] opacity-60"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00E5CC]"></span>
            </span>
            <div className="text-3xl font-mono font-bold">
              {animatedApy.toFixed(1)}%{" "}
              <span className="text-sm font-sans tracking-wide uppercase opacity-80">
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
          <div className="flex items-center gap-2 mb-6">
            <div className="flex bg-black/40 border border-white/[0.06] rounded-full p-1">
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
                      "relative px-6 py-2 rounded-full text-sm font-medium transition-all duration-300",
                      isActive
                        ? "text-white"
                        : "text-gray-400 hover:text-white",
                    )}
                  >
                    <span className="relative z-10">
                      {tab.label} {tab.id === "stake" && "14.2%"}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="activeTabPill"
                        className="absolute inset-0 bg-white/10 rounded-full"
                        initial={false}
                        transition={{
                          type: "spring",
                          bounce: 0.2,
                          duration: 0.6,
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
                    <div className="bg-black/30 border border-white/[0.06] rounded-xl p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs text-gray-500 uppercase tracking-wider">
                          From
                        </span>
                        <span className="text-xs font-mono text-gray-500">
                          Balance: 0.00
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <Input
                          type="number"
                          placeholder="0.0"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          className="w-full bg-transparent text-3xl font-mono text-white placeholder:text-gray-700 outline-none border-none ring-0 p-0"
                        />
                        <div className="flex items-center gap-2 bg-[#080B0F] border border-white/10 px-3 py-1.5 rounded-lg shrink-0">
                          <div className="w-5 h-5 rounded-full bg-[#26A17B] flex items-center justify-center text-[9px] font-bold text-white">
                            ₮
                          </div>
                          <span className="font-semibold text-white text-sm">
                            USDT
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-center -my-6 relative z-10">
                      <div className="bg-[#080B0F] border border-white/10 rounded-full p-1.5 text-gray-400">
                        <ArrowDown className="h-4 w-4" />
                      </div>
                    </div>

                    <div className="bg-black/30 border border-white/[0.06] rounded-xl p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs text-gray-500 uppercase tracking-wider">
                          To
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <Input
                          type="number"
                          placeholder="0.0"
                          readOnly
                          value={amount}
                          className="w-full bg-transparent text-3xl font-mono text-white placeholder:text-gray-700 outline-none border-none ring-0 p-0 opacity-80"
                        />
                        <div className="flex items-center gap-2 bg-[#080B0F] border border-white/10 px-3 py-1.5 rounded-lg shrink-0">
                          <div className="w-5 h-5 rounded-full bg-[#00E5CC] flex items-center justify-center text-[9px] font-bold text-black">
                            U
                          </div>
                          <span className="font-semibold text-white text-sm">
                            USDos
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-2 px-1">
                      <span className="text-sm text-gray-400">
                        You Receive:
                      </span>
                      <span className="font-mono text-lg font-bold text-[#00E5CC]">
                        {amountNum > 0 ? amountNum.toFixed(2) : "0.00"} USDos
                      </span>
                    </div>
                  </>
                )}

                {activeTab === "stake" && (
                  <>
                    <div className="bg-black/30 border border-white/[0.06] rounded-xl p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs text-gray-500 uppercase tracking-wider">
                          Stake Amount
                        </span>
                        <span className="text-xs font-mono text-gray-500">
                          Available: 0.00 USDos
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <Input
                          type="number"
                          placeholder="0.0"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          className="w-full bg-transparent text-3xl font-mono text-white placeholder:text-gray-700 outline-none border-none ring-0 p-0"
                        />
                        <button className="text-xs font-semibold text-[#00E5CC] bg-[#00E5CC]/10 hover:bg-[#00E5CC]/20 px-3 py-1.5 rounded-lg transition-colors">
                          MAX
                        </button>
                      </div>
                    </div>

                    <div className="p-4 bg-[#00E5CC]/5 rounded-xl border border-[#00E5CC]/10">
                      <p className="text-sm text-gray-300">
                        You will stake{" "}
                        <span className="text-white font-bold">
                          {amountNum > 0 ? amountNum.toFixed(2) : "0.00"} USDos
                        </span>{" "}
                        and earn{" "}
                        <span className="text-[#00E5CC] font-bold">
                          14.2% APY
                        </span>
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Estimated yearly earnings:{" "}
                        <span className="text-gray-300 font-mono">
                          {estimatedYield} USDos
                        </span>
                      </p>
                    </div>
                  </>
                )}

                {activeTab === "unstake" && (
                  <>
                    <div className="bg-black/30 border border-white/[0.06] rounded-xl p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs text-gray-500 uppercase tracking-wider">
                          Unstake Amount
                        </span>
                        <span className="text-xs font-mono text-gray-500">
                          Staked: 0.00 USDos
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <Input
                          type="number"
                          placeholder="0.0"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          className="w-full bg-transparent text-3xl font-mono text-white placeholder:text-gray-700 outline-none border-none ring-0 p-0"
                        />
                        <button className="text-xs font-semibold text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-colors">
                          MAX
                        </button>
                      </div>
                    </div>

                    <div className="p-4 bg-white/[0.02] rounded-xl border border-white/[0.06] flex gap-3 items-start">
                      <Info className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                      <p className="text-sm text-gray-400">
                        Unstaking will stop earning rewards immediately. There
                        is no lock period, so you can withdraw right away.
                      </p>
                    </div>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <button className="w-full h-12 mt-6 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium transition-all duration-200">
            Connect Wallet
          </button>
        </div>
      ),
    },
    {
      span: "col-span-12 lg:col-span-4",
      content: (
        <div className="flex flex-col h-full">
          <PanelHeader>Transaction</PanelHeader>

          <div className="flex-1 mt-4">
            <div className="flex flex-col gap-6 relative before:absolute before:top-2 before:bottom-2 before:left-[9px] before:w-px before:border-l before:border-dashed before:border-white/20">
              <div className="flex gap-4 relative z-10">
                <div className="bg-[#080B0F] mt-0.5 rounded-full h-fit border border-white/10">
                  <CheckCircle2 className="h-5 w-5 text-gray-500" />
                </div>
                <div>
                  <p className="font-medium text-sm text-white mb-1">
                    Step 1: Approve
                  </p>
                  <p className="text-xs text-gray-500">
                    Allow protocol to use USDT
                  </p>
                </div>
              </div>
              <div className="flex gap-4 relative z-10">
                <div className="bg-[#080B0F] mt-0.5 rounded-full h-fit border border-white/10">
                  <Circle className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <p className="font-medium text-sm text-gray-400 mb-1">
                    Step 2: Deposit
                  </p>
                  <p className="text-xs text-gray-500">
                    Swap and receive USDos
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center gap-2 text-xs text-gray-500">
            <HelpCircle className="h-3.5 w-3.5" />
            <span>How it works</span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-8 py-12 flex flex-col gap-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-4"
      >
        <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-primary mb-2">
          <span>01</span>
          <span className="text-muted-foreground">///</span>
          <span>DEPOSIT</span>
          <span className="text-muted-foreground">///</span>
          <span>LIVE</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
          Deposit
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
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
