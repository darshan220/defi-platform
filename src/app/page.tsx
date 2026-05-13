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
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-8">
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse" />
            V2.0 Platform is now live
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-6 leading-tight">
            Next Generation <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">
              Trading Intelligence
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl">
            Experience institutional-grade trading infrastructure with zero latency, deep liquidity, and advanced analytics all in one premium interface.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button size="lg" className="rounded-full px-8 h-14 text-base font-semibold group">
              Start Trading Now
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8 h-14 text-base font-semibold border-border hover:bg-secondary">
              Explore Markets
            </Button>
          </div>
        </section>

        {/* Feature Cards Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <GradientCard gradientFrom="from-blue-500/10">
            <div className="h-12 w-12 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center mb-6">
              <Zap className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-foreground">Lightning Fast</h3>
            <p className="text-muted-foreground leading-relaxed">
              Execute trades with sub-millisecond latency on our highly optimized matching engine.
            </p>
          </GradientCard>
          
          <GradientCard gradientFrom="from-emerald-500/10">
            <div className="h-12 w-12 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-6">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-foreground">Bank-Grade Security</h3>
            <p className="text-muted-foreground leading-relaxed">
              Your assets are protected by MPC technology and hardware security modules.
            </p>
          </GradientCard>

          <GradientCard gradientFrom="from-purple-500/10">
            <div className="h-12 w-12 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center mb-6">
              <LineChart className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-foreground">Pro Analytics</h3>
            <p className="text-muted-foreground leading-relaxed">
              Advanced charting tools with 100+ technical indicators built right into the dashboard.
            </p>
          </GradientCard>

          <GradientCard gradientFrom="from-amber-500/10">
            <div className="h-12 w-12 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-6">
              <BarChart3 className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-foreground">Deep Liquidity</h3>
            <p className="text-muted-foreground leading-relaxed">
              Access aggregated liquidity from top-tier providers for the best execution prices.
            </p>
          </GradientCard>
        </section>

        {/* Dashboard Preview Section */}
        <section className="relative mt-8">
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 bottom-0 top-auto h-32" />
          <div className="rounded-2xl border border-border/50 bg-card/50 overflow-hidden backdrop-blur-sm shadow-2xl relative">
            <div className="h-12 border-b border-border/50 bg-muted/30 flex items-center px-4 gap-2">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
            </div>
            <div className="p-8 aspect-video flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="h-16 w-16 text-muted mx-auto mb-4" />
                <p className="text-muted-foreground font-medium">Trading Dashboard Preview</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </DashboardShell>
  );
}
