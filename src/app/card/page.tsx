"use client";

import { motion } from "framer-motion";
import { CreditCard, Zap, ShieldCheck, Globe, RefreshCcw } from "lucide-react";
import { GlowCard } from "@/components/shared/GlowCard";
import { Button } from "@/components/ui/button";

export default function CardPage() {
  return (
    <div className="w-full overflow-hidden">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-8 py-12 lg:py-24 flex flex-col gap-24">
        
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col gap-6"
          >
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-secondary mb-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 w-fit">
              <CreditCard className="h-3 w-3" />
              NEXUS BLACK
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight">
              The credit card <br />
              backed by your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">equity.</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-lg">
              Use your pre-IPO equity as collateral. Spend today anywhere in the world. Keep your upside for tomorrow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Button size="lg" className="h-14 px-8 text-lg font-bold bg-foreground text-background hover:bg-foreground/90 w-full sm:w-auto">
                Apply Now →
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg font-medium w-full sm:w-auto">
                Learn More
              </Button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
            className="relative h-[400px] flex items-center justify-center perspective-[1000px]"
          >
            {/* Animated Card (CSS 3D) */}
            <motion.div 
              animate={{ 
                rotateY: [0, 15, -15, 0],
                rotateX: [0, -10, 10, 0]
              }}
              transition={{ 
                duration: 10,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
              className="relative w-80 h-52 rounded-2xl bg-gradient-to-br from-neutral-800 to-black border border-neutral-700 shadow-2xl p-6 flex flex-col justify-between preserve-3d"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Card content */}
              <div className="flex justify-between items-start translate-z-10">
                <div className="text-white font-bold text-xl tracking-widest">NEXUS</div>
                <CreditCard className="h-8 w-8 text-primary" />
              </div>
              <div className="translate-z-10 flex flex-col gap-1">
                <div className="font-mono text-lg text-neutral-300 tracking-widest">
                  •••• •••• •••• 4092
                </div>
                <div className="flex justify-between items-end mt-2">
                  <div className="text-xs text-neutral-400 uppercase tracking-widest">
                    Darshan
                  </div>
                  <div className="w-12 h-8 flex items-center justify-center -space-x-4">
                    <div className="w-6 h-6 rounded-full bg-red-500/80 mix-blend-screen" />
                    <div className="w-6 h-6 rounded-full bg-orange-500/80 mix-blend-screen" />
                  </div>
                </div>
              </div>

              {/* Glowing aura behind card */}
              <div className="absolute -inset-10 bg-gradient-to-r from-primary/20 to-secondary/20 blur-3xl -z-10 translate-z-[-20px]" />
            </motion.div>
          </motion.div>
        </div>

        {/* Stats Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 border-y border-border/50 py-12"
        >
          <div className="flex flex-col items-center text-center p-6 border-r-0 md:border-r border-border/50">
            <h3 className="text-4xl md:text-5xl font-bold font-mono tracking-tight mb-2">3+</h3>
            <p className="text-lg text-muted-foreground font-medium">Collateral Assets Supported</p>
            <p className="text-sm text-muted-foreground/70 mt-2">SpaceX · OpenAI · Anthropic</p>
          </div>
          <div className="flex flex-col items-center text-center p-6">
            <h3 className="text-4xl md:text-5xl font-bold font-mono tracking-tight mb-2 text-primary">1.0%</h3>
            <p className="text-lg text-muted-foreground font-medium">Cashback on All Purchases</p>
            <p className="text-sm text-muted-foreground/70 mt-2">Paid automatically in USDos</p>
          </div>
        </motion.div>

        {/* Features Section */}
        <div className="flex flex-col gap-12">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Built for Equity Holders who Move Fast</h2>
            <p className="text-lg text-muted-foreground">Stop waiting for an IPO to buy a house, pay taxes, or invest in new opportunities.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <GlowCard className="p-8">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Instant Approval</h3>
              <p className="text-muted-foreground text-sm">Approve collateral smart contracts and get your virtual card instantly.</p>
            </GlowCard>

            <GlowCard className="p-8">
              <div className="h-12 w-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-6">
                <ShieldCheck className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="text-xl font-bold mb-3">No Credit Check</h3>
              <p className="text-muted-foreground text-sm">Your limit is based purely on the value of your tokenized equity collateral.</p>
            </GlowCard>

            <GlowCard className="p-8">
              <div className="h-12 w-12 rounded-xl bg-positive/10 flex items-center justify-center mb-6">
                <Globe className="h-6 w-6 text-positive" />
              </div>
              <h3 className="text-xl font-bold mb-3">Global Acceptance</h3>
              <p className="text-muted-foreground text-sm">Use your Nexus Black card anywhere major credit cards are accepted worldwide.</p>
            </GlowCard>

            <GlowCard className="p-8">
              <div className="h-12 w-12 rounded-xl bg-chart-5/10 flex items-center justify-center mb-6">
                <RefreshCcw className="h-6 w-6 text-chart-5" />
              </div>
              <h3 className="text-xl font-bold mb-3">Auto-Repay</h3>
              <p className="text-muted-foreground text-sm">Optionally use your staking yield to automatically pay down your card balance.</p>
            </GlowCard>
          </div>
        </div>

      </div>
    </div>
  );
}
