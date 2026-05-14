"use client";

import React, { useEffect, useState } from "react";
import { useWalletStore, WalletType } from "@/store/useWalletStore";
import { X, Loader2, Info, AlertCircle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

declare global {
  interface Window {
    ethereum?: any;
    solana?: any;
  }
}

const WALLETS = {
  metamask: {
    id: "metamask" as WalletType,
    name: "MetaMask",
    installUrl: "https://metamask.io/download/",
    icon: (
      <svg viewBox="0 0 1024 1024" className="w-8 h-8">
        <path
          d="M965.8 459.7l-94.8-292.8c-2.3-7.2-9-12-16.6-12-3.1 0-6.2 1-8.7 2.8L616.4 321.3l-59.5-121.7c-5.8-11.9-22-11.9-27.8 0L469.7 321.3 240.4 157.7c-2.5-1.8-5.6-2.8-8.7-2.8-7.7 0-14.3 4.8-16.6 12L120.3 459.7c-2.2 6.7-1.1 14.2 2.9 20l247.9 363.3L336.5 873.3c-1.3 2.5-.7 5.5 1.4 7.3 2.1 1.8 5.1 2.1 7.5.7l158.6-86.8c3.8-2.1 8.2-2.1 12 0l158.6 86.8c2.4 1.3 5.4 1 7.5-.7 2.1-1.8 2.7-4.8 1.4-7.3l-34.6-30.3 247.9-363.3c4-5.8 5.1-13.3 2.9-20z"
          fill="#E2761B"
        />
      </svg>
    ),
  },
  phantom: {
    id: "phantom" as WalletType,
    name: "Phantom",
    installUrl: "https://phantom.app/download",
    icon: (
      <div className="w-8 h-8 bg-[#AB9FF2] rounded-full flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="w-5 h-5 text-white">
          <path
            fill="currentColor"
            d="M50 10C27.9 10 10 27.9 10 50v40l15-10 15 10 15-10 15 10 15-10 15 10V50C100 27.9 82.1 10 50 10zm-15 45c-5.5 0-10-4.5-10-10s4.5-10 10-10 10 4.5 10 10-4.5 10-10 10zm30 0c-5.5 0-10-4.5-10-10s4.5-10 10-10 10 4.5 10 10-4.5 10-10 10z"
          />
        </svg>
      </div>
    ),
  },
};

export function ConnectWalletModal() {
  const { isModalOpen, closeModal, setConnecting, setConnected, isConnecting } =
    useWalletStore();
  const [activeWallet, setActiveWallet] = useState<WalletType>(null);
  const [inlineError, setInlineError] = useState<string | null>(null);
  const [notInstalled, setNotInstalled] = useState<WalletType>(null);
  const [successTick, setSuccessTick] = useState(false);

  const [hasMetaMask, setHasMetaMask] = useState(false);
  const [hasPhantom, setHasPhantom] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasMetaMask(!!window.ethereum?.isMetaMask);
      setHasPhantom(!!window.solana?.isPhantom);
    }
  }, [isModalOpen]);

  if (!isModalOpen) return null;

  const handleConnect = async (walletId: WalletType) => {
    if (isConnecting) return;

    setInlineError(null);
    setNotInstalled(null);
    setActiveWallet(walletId);
    setConnecting(true);

    try {
      if (walletId === "metamask") {
        if (!hasMetaMask) {
          setNotInstalled(walletId);
          setConnecting(false);
          return;
        }
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        if (!accounts || accounts.length === 0) {
          setInlineError(
            "Your wallet is locked. Please unlock it and try again.",
          );
          setConnecting(false);
          return;
        }
        const chainId = await window.ethereum.request({
          method: "eth_chainId",
        });
        finishConnection(accounts[0], walletId, parseInt(chainId, 16));
      } else if (walletId === "phantom") {
        if (!hasPhantom) {
          setNotInstalled(walletId);
          setConnecting(false);
          return;
        }
        const resp = await window.solana.connect();
        finishConnection(resp.publicKey.toString(), walletId, null);
      }
    } catch (error: any) {
      console.error(error);
      if (error?.code === 4001) {
        setInlineError("Connection rejected. Please try again.");
      } else if (error?.code === -32002) {
        setInlineError(
          `${WALLETS[walletId as keyof typeof WALLETS]?.name} is already open. Please check your extension.`,
        );
      } else {
        setInlineError("Failed to connect. Please try again.");
      }
      setConnecting(false);
    }
  };

  const finishConnection = (
    address: string,
    wallet: WalletType,
    chainId: number | null,
  ) => {
    setSuccessTick(true);
    setTimeout(() => {
      setConnected(address, wallet, chainId);
      setConnecting(false);
      setSuccessTick(false);
      closeModal();
    }, 1000);
  };

  const renderWalletRow = (wallet: (typeof WALLETS)[keyof typeof WALLETS]) => {
    const isThisWalletConnecting = activeWallet === wallet.id && isConnecting;
    const isDisabled = isConnecting && activeWallet !== wallet.id;
    const isThisNotInstalled = notInstalled === wallet.id;

    return (
      <div key={wallet.id} className="mb-2">
        <button
          onClick={() => handleConnect(wallet.id)}
          disabled={isDisabled}
          className={cn(
            "w-full flex items-center justify-between p-4 rounded-xl border transition-all duration-200",
            isDisabled
              ? "opacity-50 cursor-not-allowed bg-slate-900 border-slate-800"
              : "bg-slate-900 border-slate-800 hover:border-[#0D9488] hover:bg-slate-800 cursor-pointer",
            isThisWalletConnecting ? "border-[#0D9488] bg-slate-800" : "",
          )}
        >
          <div className="flex items-center gap-4">
            {wallet.icon}
            <div className="text-left">
              <div className="font-semibold text-white">{wallet.name}</div>
              {isThisWalletConnecting && !successTick && (
                <div className="text-xs text-[#0D9488] mt-0.5">
                  Connecting to {wallet.name}...
                </div>
              )}
              {isThisWalletConnecting && successTick && (
                <div className="text-xs text-green-500 mt-0.5 flex items-center gap-1">
                  Connected <CheckCircle2 size={12} />
                </div>
              )}
            </div>
          </div>
          {isThisWalletConnecting && !successTick && (
            <Loader2 className="w-5 h-5 text-[#0D9488] animate-spin" />
          )}
        </button>

        {isThisNotInstalled && (
          <div className="mt-2 text-sm text-slate-400 flex items-center justify-between px-2">
            <span>{wallet.name} not detected.</span>
            <a
              href={wallet.installUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0D9488] hover:underline flex items-center gap-1"
            >
              Install it <Info size={14} />
            </a>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-[#111827] border border-slate-800 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800">
          <h2 className="text-xl font-bold text-white">Connect Wallet</h2>
          <button
            onClick={closeModal}
            className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Error message */}
        {inlineError && (
          <div className="m-6 mb-0 p-3 bg-red-950/50 border border-red-900 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <p className="text-sm text-red-200">{inlineError}</p>
          </div>
        )}

        {/* Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          <div className="space-y-4">
            <div className="text-sm font-semibold text-slate-500 mb-3 uppercase tracking-wider">
              Available Wallets
            </div>
            {renderWalletRow(WALLETS.metamask)}
            {renderWalletRow(WALLETS.phantom)}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 text-center bg-slate-900/50">
          <p className="text-sm text-slate-400">
            New to Ethereum wallets?{" "}
            <a
              href="https://ethereum.org/en/wallets/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-500 hover:text-amber-400 hover:underline"
            >
              Learn More
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
