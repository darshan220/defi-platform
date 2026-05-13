import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Sidebar } from "@/components/shared/Sidebar";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Nexus | Premium Trading Platform",
  description:
    "Next-generation fintech trading platform designed for modern investors.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans antialiased bg-[#080B0F] text-white flex h-screen overflow-hidden selection:bg-teal-500/30 selection:text-teal-200`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <Sidebar />
          <main className="flex-1 overflow-y-auto">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
