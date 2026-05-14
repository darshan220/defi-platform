"use client";

import { useState } from "react";
import { Copy, ExternalLink, TrendingUp } from "lucide-react";
import { PriceChange } from "./PriceChange";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ApplyDialog } from "@/components/shared/ApplyDialog";

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
  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const isSelected = index === 1; // Highlight the second row for demonstration

  return (
    <tr
      className={cn(
        "group border-b border-border hover:bg-surface/50 transition-colors cursor-pointer",
        isSelected && "bg-highlight border-l-4 border-l-highlight-border",
      )}
    >
      <ApplyDialog
        open={isApplyOpen}
        onOpenChange={setIsApplyOpen}
        title={`Apply for ${token.symbol}`}
        description={`Start your application to trade or borrow against ${token.name} (${token.symbol}) equity.`}
      />
      <td className="py-4 pl-4 pr-2">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-card border border-border flex items-center justify-center font-bold text-sm overflow-hidden relative shadow-sm">
            {token.logo ? (
              <img
                src={token.logo}
                alt={token.name}
                className="w-full h-full object-cover p-1"
              />
            ) : (
              <span className="text-muted-foreground">
                {token.symbol.substring(0, 2)}
              </span>
            )}
          </div>
          <div>
            <div className="font-bold text-foreground flex items-center gap-2">
              {token.name}
            </div>
            <div className="text-xs text-muted-foreground font-medium">
              {token.symbol}
            </div>
          </div>
        </div>
      </td>
      <td className="py-4 px-2 font-mono font-bold text-foreground">
        ${token.price.toFixed(2)}
        <PriceChange value={token.priceChange} className="text-[10px] mt-0.5" />
      </td>
      <td className="py-4 px-2 text-muted-foreground font-mono text-sm">
        ${token.impliedVal}
      </td>
      <td className="py-4 px-2 font-mono text-sm text-foreground">
        ${token.markPrice.toFixed(2)}
      </td>
      <td className="py-4 px-2 text-muted-foreground font-mono text-sm">
        ${token.markVal}
      </td>
      <td className="py-4 px-2 font-mono text-sm text-muted-foreground">
        {token.allTimeVol}
      </td>
      <td className="py-4 px-2">
        <div className="flex items-center gap-2 transition-colors cursor-pointer w-fit">
          <span className="font-mono text-[10px] font-bold bg-chip text-chip-foreground px-3 py-1 rounded-full border border-chip-foreground/10">
            {token.address.substring(0, 6)}...
            {token.address.substring(token.address.length - 4)}
          </span>
        </div>
      </td>
      <td className="py-4 pr-4 pl-2 text-right">
        <Button
          variant="outline"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            setIsApplyOpen(true);
          }}
          className="font-bold rounded-lg border-border text-foreground hover:bg-primary hover:text-white hover:border-primary transition-all cursor-pointer"
        >
          Apply
        </Button>
      </td>
    </tr>
  );
}
