"use client";

import Link from "next/link";
import { ShieldCheck, Info } from "lucide-react";
import { cn } from "@/lib/utils";

export const Footer = () => {
  return (
    <footer className="w-full border-t border-border/40 bg-muted/5 backdrop-blur-md py-4 px-6 md:px-6 mt-auto">
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8">
          <div className="flex flex-col items-center md:items-start gap-2">
            <p className="text-xs text-muted-foreground/80 font-medium">
              &copy; {new Date().getFullYear()} Equivo. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest text-muted-foreground/50">
              <span className="hover:text-foreground cursor-pointer transition-colors">
                Documentation
              </span>
              <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
              <span className="hover:text-foreground cursor-pointer transition-colors">
                Audit Report
              </span>
              <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
              <span className="hover:text-foreground cursor-pointer transition-colors">
                Status
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              className={cn(
                "group flex items-center gap-3 px-6 py-3 rounded-xl",
                "bg-[#F3BA2F] hover:bg-[#E2AE24] text-[#111] transition-all duration-300",
                "text-xs font-bold shadow-xl shadow-yellow-500/10 hover:shadow-yellow-500/20",
                "border border-white/10 active:scale-95",
              )}
              aria-label="Add BSC Mainnet to wallet"
            >
              <div className="relative flex items-center justify-center w-6 h-6 bg-[#111]/10 rounded-lg group-hover:rotate-12 transition-transform">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 0L14.73 4.73L19.46 2L16.73 6.73L21.46 4L18.73 8.73L23.46 6L20.73 10.73L25.46 8L22.73 12.73L27.46 10L24.73 14.73L29.46 12L26.73 16.73L31.46 14L28.73 18.73L33.46 16L30.73 20.73L35.46 18L32.73 22.73L37.46 20L34.73 24.73L39.46 22L36.73 26.73L41.46 24L38.73 28.73L43.46 26L40.73 30.73L45.46 28L42.73 32.73L47.46 30L44.73 34.73L49.46 32L46.73 36.73L51.46 34L48.73 38.73L53.46 36L50.73 40.73L55.46 38L52.73 42.73L57.46 40L54.73 44.73L59.46 42L56.73 46.73L61.46 44L58.73 48.73L63.46 46L60.73 50.73L65.46 48L62.73 52.73L67.46 50L64.73 54.73L69.46 52L66.73 56.73L71.46 54L68.73 58.73L73.46 56L70.73 60.73L75.46 58L72.73 62.73L77.46 60L74.73 64.73L79.46 62L76.73 66.73L81.46 64L78.73 68.73L83.46 66L80.73 70.73L85.46 68L82.73 72.73L87.46 70L84.73 74.73L89.46 72L86.73 76.73L91.46 74L88.73 78.73L93.46 76L90.73 80.73L95.46 78L92.73 82.73L97.46 80L94.73 84.73L99.46 82L96.73 86.73L101.46 84L98.73 88.73L103.46 86L100.73 90.73L105.46 88L102.73 92.73L107.46 90L104.73 94.73L109.46 92L106.73 96.73L111.46 94L108.73 98.73L113.46 96L110.73 100.73L115.46 98L112.73 102.73L117.46 100L114.73 104.73L119.46 102L116.73 106.73L121.46 104L118.73 108.73L123.46 106L120.73 110.73L125.46 108L122.73 112.73L127.46 110L124.73 114.73L129.46 112L126.73 116.73L131.46 114L128.73 118.73L133.46 116L130.73 120.73L135.46 118L132.73 122.73L137.46 120L134.73 124.73L139.46 122L136.73 126.73L141.46 124L138.73 128.73L143.46 126L140.73 130.73L145.46 128L142.73 132.73L147.46 130L144.73 134.73L149.46 132L146.73 136.73L151.46 134L148.73 138.73L153.46 136L150.73 140.73L155.46 138L152.73 142.73L157.46 140L154.73 144.73L159.46 142L156.73 146.73L161.46 144L158.73 148.73L163.46 146L160.73 150.73L165.46 148L162.73 152.73L167.46 150L164.73 154.73L169.46 152L166.73 156.73L171.46 154L168.73 158.73L173.46 156L170.73 160.73L175.46 158L172.73 162.73L177.46 160L174.73 164.73L179.46 162L176.73 166.73L181.46 164L178.73 168.73L183.46 166L180.73 170.73L185.46 168L182.73 172.73L187.46 170L184.73 174.73L189.46 172L186.73 176.73L191.46 174L188.73 178.73L193.46 176L190.73 180.73L195.46 178L192.73 182.73L197.46 180L194.73 184.73L199.46 182L196.73 186.73L201.46 184L198.73 188.73L203.46 186L200.73 190.73L205.46 188L202.73 192.73L207.46 190L204.73 194.73L209.46 192L206.73 196.73L211.46 194L208.73 198.73L213.46 196L210.73 200.73L215.46 198L212.73 202.73L217.46 200L214.73 204.73L219.46 202L216.73 206.73L221.46 204L218.73 208.73L223.46 206L220.73 210.73L225.46 208L222.73 212.73L227.46 210L225 214.73" />
                  <path d="M12 24L16.5 21L12 18L7.5 21L12 24Z" />
                  <path d="M12 14.5L16.5 11.5L12 8.5L7.5 11.5L12 14.5Z" />
                  <path d="M12 5L16.5 2L12 -1L7.5 2L12 5Z" />
                  <path d="M21.5 14.5L26 11.5L21.5 8.5L17 11.5L21.5 14.5Z" />
                  <path d="M2.5 14.5L7 11.5L2.5 8.5L-2 11.5L2.5 14.5Z" />
                </svg>
              </div>
              <span>Add BSC Mainnet</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
