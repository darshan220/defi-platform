"use client";

import { Copy, ExternalLink, TrendingUp } from "lucide-react";
import { PriceChange } from "./PriceChange";
import { Button } from "@/components/ui/button";

interface TokenRowProps {
  token: {
    id: string;
    name: string;
    symbol: string;
    logo: string;
    price: number;
    priceChange: number;
    impliedVal: string;
    markPrice: number;
    markVal: string;
    allTimeVol: string;
    liquidity: string;
    address: string;
  };
  index: number;
}

export function TokenRow({ token, index }: TokenRowProps) {
  const isTopPerformer = index === 0; // Just as an example for the highlight effect

  return (
    <tr className={`
      group border-b border-border/50 hover:bg-surface/50 transition-colors
      ${isTopPerformer ? 'relative z-10 before:absolute before:inset-0 before:bg-primary/5 before:-z-10' : ''}
    `}>
      <td className="py-4 pl-4 pr-2">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-surface border border-border flex items-center justify-center font-bold text-sm overflow-hidden relative">
            {token.logo ? (
              <img src={token.logo} alt={token.name} className="w-full h-full object-cover p-1" />
            ) : (
              <span>{token.symbol.substring(0, 2)}</span>
            )}
            {isTopPerformer && (
              <div className="absolute inset-0 rounded-full ring-2 ring-primary ring-offset-2 ring-offset-background animate-pulse" />
            )}
          </div>
          <div>
            <div className="font-semibold text-foreground flex items-center gap-2">
              {token.name}
              {isTopPerformer && <TrendingUp className="h-3 w-3 text-primary" />}
            </div>
            <div className="text-xs text-muted-foreground">{token.symbol}</div>
          </div>
        </div>
      </td>
      <td className="py-4 px-2 font-mono font-medium">
        ${token.price.toFixed(2)}
        <PriceChange value={token.priceChange} className="text-xs mt-0.5" />
      </td>
      <td className="py-4 px-2 text-muted-foreground font-mono text-sm">${token.impliedVal}</td>
      <td className="py-4 px-2 font-mono text-sm">${token.markPrice.toFixed(2)}</td>
      <td className="py-4 px-2 text-muted-foreground font-mono text-sm">${token.markVal}</td>
      <td className="py-4 px-2 font-mono text-sm">{token.allTimeVol}</td>
      <td className="py-4 px-2">
        <div className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer w-fit">
          <span className="font-mono text-xs bg-surface px-2 py-1 rounded border border-border">
            {token.address.substring(0, 6)}...{token.address.substring(token.address.length - 4)}
          </span>
          <Copy className="h-3.5 w-3.5" />
          <ExternalLink className="h-3.5 w-3.5" />
        </div>
      </td>
      <td className="py-4 pr-4 pl-2 text-right">
        <Button variant="outline" size="sm" className="font-medium hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors">
          Trade ↗
        </Button>
      </td>
    </tr>
  );
}
