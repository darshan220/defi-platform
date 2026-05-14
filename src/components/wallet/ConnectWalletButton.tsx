"use client";

import React, { useEffect, useState } from "react";
import { useWalletStore } from "@/store/useWalletStore";
import {
  Copy,
  ExternalLink,
  LogOut,
  Wallet,
  ChevronDown,
  AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/utils";

const TARGET_CHAIN_ID = 1; // Ethereum Mainnet

export function ConnectWalletButton({ className }: { className?: string }) {
  const {
    connectedAddress,
    chainId,
    openModal,
    disconnect,
    setConnected,
    setChainId,
  } = useWalletStore();

  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Setup listeners only, don't auto-initialize
  useEffect(() => {
    if (typeof window === "undefined" || !window.ethereum) return;

    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        disconnect();
      } else {
        setConnected(accounts[0], "metamask", chainId);
      }
    };

    const handleChainChanged = (newChainId: string) => {
      setChainId(parseInt(newChainId, 16));
    };

    window.ethereum.on("accountsChanged", handleAccountsChanged);
    window.ethereum.on("chainChanged", handleChainChanged);

    return () => {
      if (window.ethereum.removeListener) {
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged,
        );
        window.ethereum.removeListener("chainChanged", handleChainChanged);
      }
    };
  }, [setConnected, disconnect, setChainId, chainId]);

  const truncateAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const handleCopy = () => {
    if (connectedAddress) {
      navigator.clipboard.writeText(connectedAddress);
    }
  };

  const handleSwitchNetwork = async () => {
    if (!window.ethereum) return;
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: `0x${TARGET_CHAIN_ID.toString(16)}` }],
      });
    } catch (error) {
      console.error("Failed to switch network:", error);
    }
  };

  if (connectedAddress) {
    const isWrongNetwork = chainId !== TARGET_CHAIN_ID;

    return (
      <div className="relative inline-block w-full">
        {isWrongNetwork && (
          <div className="absolute -top-12 left-0 right-0 z-50 bg-amber-500/10 border border-amber-500/50 text-amber-500 rounded-lg p-2 text-xs flex items-center justify-between">
            <span className="flex items-center gap-1">
              <AlertTriangle size={14} /> Wrong network
            </span>
            <button
              onClick={handleSwitchNetwork}
              className="px-2 py-1 bg-amber-500 text-black font-semibold rounded hover:bg-amber-400 transition-colors cursor-pointer"
            >
              Switch
            </button>
          </div>
        )}

        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className={cn(
            "w-full py-3 px-4 flex items-center justify-between rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer border",
            isWrongNetwork
              ? "bg-red-950/30 text-red-400 border-red-900/50"
              : "bg-slate-800 text-white border-slate-700 hover:bg-slate-700",
            className,
          )}
        >
          <div className="flex items-center gap-2">
            {!isWrongNetwork && (
              <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse" />
            )}
            {truncateAddress(connectedAddress)}
          </div>
          <ChevronDown
            size={16}
            className={cn(
              "transition-transform",
              dropdownOpen ? "rotate-180" : "",
            )}
          />
        </button>

        {dropdownOpen && (
          <div className="absolute top-full left-0 mt-2 w-full bg-[#111827] border border-slate-800 rounded-xl shadow-xl z-50 overflow-hidden">
            <button
              onClick={() => {
                handleCopy();
                setDropdownOpen(false);
              }}
              className="w-full text-left px-4 py-3 text-sm text-slate-300 hover:bg-slate-800 hover:text-white flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Copy size={16} /> Copy Address
            </button>
            <a
              href={`https://etherscan.io/address/${connectedAddress}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setDropdownOpen(false)}
              className="w-full text-left px-4 py-3 text-sm text-slate-300 hover:bg-slate-800 hover:text-white flex items-center gap-2 transition-colors cursor-pointer"
            >
              <ExternalLink size={16} /> View on Explorer
            </a>
            <div className="h-px bg-slate-800" />
            <button
              onClick={() => {
                disconnect();
                setDropdownOpen(false);
              }}
              className="w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 flex items-center gap-2 transition-colors cursor-pointer"
            >
              <LogOut size={16} /> Disconnect
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <button
      onClick={openModal}
      className={cn(
        "w-full py-3 px-3 flex items-center justify-center gap-2 rounded-xl text-sm font-semibold text-white bg-[#0D9488] hover:bg-[#0D9488]/90 transition-all duration-200 shadow-lg shadow-teal-900/20 cursor-pointer",
        className,
      )}
    >
      <Wallet size={16} />
      Connect Wallet
    </button>
  );
}
