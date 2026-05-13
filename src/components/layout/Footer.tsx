import Link from "next/link";
import Image from "next/image";
import { MessageCircle, X } from "lucide-react";
import EquivoLogo from "@/components/logos/EquivoLogo";


export function Footer() {
  return (
    <footer className="w-full border-t border-border bg-background py-12 mt-auto">
      <div className="mx-auto w-full max-w-screen-2xl px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <EquivoLogo size={32} />
              <span className="font-bold text-xl tracking-tight">Equivo</span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-sm mb-6">
              Next-generation fintech trading platform designed for modern
              investors. Access pre-IPO equity, manage your portfolio, and earn
              yields.
            </p>
            <div className="flex items-center gap-4 text-muted-foreground">
              <Link href="#" className="hover:text-primary transition-colors">
                <X className="h-5 w-5" />
              </Link>

              <Link href="#" className="hover:text-primary transition-colors">
                <MessageCircle className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-foreground">Platform</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/trade"
                  className="hover:text-primary transition-colors"
                >
                  Trade
                </Link>
              </li>
              <li>
                <Link
                  href="/deposit"
                  className="hover:text-primary transition-colors"
                >
                  Deposit
                </Link>
              </li>
              <li>
                <Link
                  href="/borrow"
                  className="hover:text-primary transition-colors"
                >
                  Borrow
                </Link>
              </li>
              <li>
                <Link
                  href="/portfolio"
                  className="hover:text-primary transition-colors"
                >
                  Portfolio
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-foreground">Legal</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Risk Disclaimer
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground max-w-3xl">
            Disclaimer: Trading tokenized pre-IPO assets involves significant
            risk and may not be suitable for all investors. The value of
            investments can go down as well as up. Past performance is not
            indicative of future results. Equivo is not a registered
            broker-dealer and does not provide investment advice.
          </p>
          <p className="text-xs text-muted-foreground whitespace-nowrap">
            &copy; {new Date().getFullYear()} Equivo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
