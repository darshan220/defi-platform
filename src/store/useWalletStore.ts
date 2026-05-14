import { create } from 'zustand';

export type WalletType = 'metamask' | 'phantom' | null;

interface WalletState {
  isModalOpen: boolean;
  isConnecting: boolean;
  connectedAddress: string | null;
  connectedWallet: WalletType;
  chainId: number | null;
  error: string | null;

  openModal: () => void;
  closeModal: () => void;
  setConnecting: (isConnecting: boolean) => void;
  setConnected: (address: string, wallet: WalletType, chainId: number | null) => void;
  setError: (error: string | null) => void;
  setChainId: (chainId: number | null) => void;
  disconnect: () => void;
}

export const useWalletStore = create<WalletState>((set) => ({
  isModalOpen: false,
  isConnecting: false,
  connectedAddress: null,
  connectedWallet: null,
  chainId: null,
  error: null,

  openModal: () => set({ isModalOpen: true, error: null }),
  closeModal: () => set({ isModalOpen: false }),
  setConnecting: (isConnecting) => set({ isConnecting }),
  setConnected: (connectedAddress, connectedWallet, chainId) =>
    set({ connectedAddress, connectedWallet, chainId, error: null }),
  setError: (error) => set({ error }),
  setChainId: (chainId) => set({ chainId }),
  disconnect: () =>
    set({
      connectedAddress: null,
      connectedWallet: null,
      chainId: null,
      error: null,
    }),
}));
