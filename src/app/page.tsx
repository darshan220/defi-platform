import { DashboardShell } from "@/components/layout/DashboardShell";
import { GradientCard } from "@/components/cards/GradientCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, LineChart, ShieldCheck, Zap } from "lucide-react";

export default function HomePage() {
  return (
    <DashboardShell>
      <div className="flex flex-col gap-12 md:gap-24 pb-20">
        {/* Hero Section */}
        <section className="pt-12 md:pt-20 flex flex-col items-center text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-[10px] font-extrabold uppercase tracking-widest text-primary mb-8 shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse" />
            EQUIVO V2.0 IS LIVE
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground mb-8 leading-tight">
            Institutional <br className="hidden md:block" />
            <span className="text-primary">
              Trading Intelligence
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl font-medium leading-relaxed">
            Experience next-generation asset management with zero latency, deep liquidity, and advanced analytics on the world's most secure trading infrastructure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button size="lg" className="rounded-2xl px-10 h-16 text-base font-bold bg-primary hover:bg-primary/90 text-white shadow-lg shadow-teal-900/20 transition-all">
              Start Trading
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-2xl px-10 h-16 text-base font-bold border-border text-foreground hover:bg-surface transition-all">
              Market Overview
            </Button>
          </div>
        </section>

        {/* Feature Cards Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="p-8 rounded-3xl bg-card border border-border shadow-sm hover:shadow-xl transition-all group">
            <div className="h-14 w-14 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Zap className="h-7 w-7" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-foreground">Lightning Fast</h3>
            <p className="text-muted-foreground leading-relaxed font-medium">
              Execute trades with sub-millisecond latency on our highly optimized matching engine.
            </p>
          </div>
          
          <div className="p-8 rounded-3xl bg-card border border-border shadow-sm hover:shadow-xl transition-all group">
            <div className="h-14 w-14 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <ShieldCheck className="h-7 w-7" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-foreground">Bank-Grade Security</h3>
            <p className="text-muted-foreground leading-relaxed font-medium">
              Your assets are protected by MPC technology and hardware security modules.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-card border border-border shadow-sm hover:shadow-xl transition-all group">
            <div className="h-14 w-14 rounded-2xl bg-purple-500/10 text-purple-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <LineChart className="h-7 w-7" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-foreground">Pro Analytics</h3>
            <p className="text-muted-foreground leading-relaxed font-medium">
              Advanced charting tools with technical indicators built right into your dashboard.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-card border border-border shadow-sm hover:shadow-xl transition-all group">
            <div className="h-14 w-14 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <BarChart3 className="h-7 w-7" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-foreground">Deep Liquidity</h3>
            <p className="text-muted-foreground leading-relaxed font-medium">
              Access aggregated liquidity from top-tier providers for the best execution prices.
            </p>
          </div>
        </section>

        {/* Dashboard Preview Section */}
        <section className="relative mt-8">
          <div className="rounded-[2.5rem] border border-border bg-card p-4 shadow-2xl relative overflow-hidden">
            <div className="h-10 border-b border-border bg-surface/50 flex items-center px-6 gap-2 rounded-t-[2rem]">
              <div className="flex gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-border" />
                <div className="w-2.5 h-2.5 rounded-full bg-border" />
                <div className="w-2.5 h-2.5 rounded-full bg-border" />
              </div>
            </div>
            <div className="p-12 aspect-video flex items-center justify-center bg-surface/30">
              <div className="text-center">
                <div className="h-24 w-24 bg-card rounded-full shadow-xl flex items-center justify-center mx-auto mb-6 border border-border">
                  <BarChart3 className="h-10 w-10 text-primary" />
                </div>
                <p className="text-foreground font-extrabold text-2xl mb-2">EQUIVO Dashboard</p>
                <p className="text-muted-foreground font-bold">Secure Institutional Interface</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </DashboardShell>
  );
}
