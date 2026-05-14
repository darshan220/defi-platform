"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Blocks, Plus } from "lucide-react";
import { GlowCard } from "@/components/shared/GlowCard";
import { BadgeStatus } from "@/components/shared/BadgeStatus";
import { ecosystemPartners } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const FILTERS = ["All", "Chain", "Stablecoin", "RWA", "Yield", "Trading"];

export default function EcosystemPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredPartners = activeFilter === "All" 
    ? ecosystemPartners 
    : ecosystemPartners.filter(p => p.tags.includes(activeFilter));

  return (
    <div className="w-full max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-8 py-12 flex flex-col gap-12">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-2"
      >
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground">
          Equivo Ecosystem
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          An overview of apps, protocols, and integrations building the future of
          tokenized assets on Equivo.
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-wrap gap-2 mb-4"
      >
        {FILTERS.map(filter => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
              activeFilter === filter
                ? "bg-foreground text-background shadow-md"
                : "bg-surface border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
            )}
          >
            {filter}
          </button>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredPartners.map((partner, idx) => (
            <motion.div
              key={partner.name}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
            >
              <GlowCard className="h-full flex flex-col group/card p-8">
                <div className="flex justify-between items-start mb-6">
                  <div className="h-14 w-14 rounded-2xl bg-surface border border-border flex items-center justify-center font-bold text-xl overflow-hidden group-hover/card:scale-110 transition-transform duration-500">
                    {partner.name.substring(0, 1)}
                  </div>
                  <BadgeStatus status={partner.status as any} />
                </div>
                
                <h3 className="text-xl font-bold mb-2">{partner.name}</h3>
                <p className="text-muted-foreground text-sm flex-1 mb-6">{partner.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {partner.tags.map(tag => (
                    <span key={tag} className="text-xs px-2 py-1 bg-surface border border-border rounded-md text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-auto overflow-hidden">
                  <div className="translate-y-8 opacity-0 group-hover/card:translate-y-0 group-hover/card:opacity-100 transition-all duration-300 ease-out">
                    <a href="#" className="flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80">
                      Learn More <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-12 flex flex-col items-center justify-center p-12 border border-dashed border-border/50 rounded-3xl bg-surface/20 text-center max-w-3xl mx-auto"
      >
        <h3 className="text-2xl font-bold mb-3">Building on Equivo?</h3>
        <p className="text-muted-foreground mb-8">
          Join our ecosystem and bring your protocol to thousands of users trading pre-IPO equity and real-world assets.
        </p>
        <Button size="lg" className="gap-2 bg-foreground text-background hover:bg-foreground/90">
          <Plus className="h-4 w-4" /> Propose Integration
        </Button>
      </motion.div>
    </div>
  );
}
