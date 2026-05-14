import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Sidebar } from "@/components/shared/Sidebar";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Equivo | Premium Trading Platform",
  description:
    "Next-generation fintech trading platform designed for modern investors.",
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
};

import { ConnectWalletModal } from "@/components/wallet/ConnectWalletModal";
import { Footer } from "@/components/shared/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased bg-background text-foreground flex h-screen overflow-hidden`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          <Sidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
            <main className="flex-1 overflow-y-auto">
              <div className="min-h-full flex flex-col">
                <div className="flex-1">{children}</div>
                <Footer />
              </div>
            </main>
          </div>
          <ConnectWalletModal />
        </ThemeProvider>
      </body>
    </html>
  );
}
