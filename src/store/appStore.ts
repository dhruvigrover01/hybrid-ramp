import { create } from "zustand";

export interface User {
  id: string;
  email: string;
  name: string;
  kycTier: 0 | 1 | 2 | 3;
  riskLevel: "low" | "medium" | "high";
  walletAddress: string | null;
  custodyType: "self" | "vault" | null;
}

export interface Asset {
  symbol: string;
  name: string;
  balance: number;
  usdValue: number;
  change24h: number;
  icon: string;
}

export interface Transaction {
  id: string;
  type: "buy" | "sell" | "deposit" | "withdraw";
  asset: string;
  amount: number;
  usdValue: number;
  status: "pending" | "completed" | "failed";
  timestamp: Date;
  txHash?: string;
}

interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  assets: Asset[];
  transactions: Transaction[];
  walletConnected: boolean;

  // Actions
  setUser: (user: User | null) => void;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  connectWallet: (address: string) => void;
  disconnectWallet: () => void;
  updateKycTier: (tier: 0 | 1 | 2 | 3) => void;
  setCustodyType: (type: "self" | "vault") => void;
  addTransaction: (tx: Omit<Transaction, "id" | "timestamp">) => void;
  executeTrade: (asset: string, amount: number, type: "buy" | "sell") => Promise<{ success: boolean; executionPlan: string[] }>;
}

const mockAssets: Asset[] = [
  { symbol: "BTC", name: "Bitcoin", balance: 0.52, usdValue: 28450, change24h: 5.2, icon: "₿" },
  { symbol: "ETH", name: "Ethereum", balance: 4.8, usdValue: 15840, change24h: 8.1, icon: "Ξ" },
  { symbol: "USDT", name: "Tether", balance: 2500, usdValue: 2500, change24h: 0.01, icon: "$" },
  { symbol: "MATIC", name: "Polygon", balance: 1200, usdValue: 1506.24, change24h: -2.3, icon: "⬡" },
];

const mockTransactions: Transaction[] = [
  { id: "1", type: "buy", asset: "BTC", amount: 0.1, usdValue: 5500, status: "completed", timestamp: new Date(Date.now() - 86400000) },
  { id: "2", type: "buy", asset: "ETH", amount: 2.0, usdValue: 6600, status: "completed", timestamp: new Date(Date.now() - 172800000) },
  { id: "3", type: "deposit", asset: "USDT", amount: 1000, usdValue: 1000, status: "completed", timestamp: new Date(Date.now() - 259200000) },
];

export const useAppStore = create<AppState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  assets: mockAssets,
  transactions: mockTransactions,
  walletConnected: false,

  setUser: (user) => set({ user, isAuthenticated: !!user }),

  login: async (email: string, password: string) => {
    // Simulated login
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    const user: User = {
      id: "user-1",
      email,
      name: email.split("@")[0],
      kycTier: 1,
      riskLevel: "low",
      walletAddress: null,
      custodyType: null,
    };
    
    set({ user, isAuthenticated: true });
    return true;
  },

  logout: () => {
    set({ user: null, isAuthenticated: false, walletConnected: false });
  },

  connectWallet: (address: string) => {
    const { user } = get();
    if (user) {
      set({
        user: { ...user, walletAddress: address },
        walletConnected: true,
      });
    }
  },

  disconnectWallet: () => {
    const { user } = get();
    if (user) {
      set({
        user: { ...user, walletAddress: null },
        walletConnected: false,
      });
    }
  },

  updateKycTier: (tier) => {
    const { user } = get();
    if (user) {
      set({ user: { ...user, kycTier: tier } });
    }
  },

  setCustodyType: (type) => {
    const { user } = get();
    if (user) {
      set({ user: { ...user, custodyType: type } });
    }
  },

  addTransaction: (tx) => {
    const newTx: Transaction = {
      ...tx,
      id: `tx-${Date.now()}`,
      timestamp: new Date(),
    };
    set((state) => ({ transactions: [newTx, ...state.transactions] }));
  },

  executeTrade: async (asset: string, amount: number, type: "buy" | "sell") => {
    const { user, addTransaction } = get();
    
    // Risk engine evaluation
    const tradeValue = amount * 50000; // Simplified USD value calculation
    const executionPlan: string[] = [];
    
    // Smart execution logic
    if (tradeValue > 10000) {
      // Large trade - split execution
      const chunks = Math.ceil(tradeValue / 5000);
      executionPlan.push(`Trade size detected: $${tradeValue.toLocaleString()}`);
      executionPlan.push(`Splitting into ${chunks} smaller orders to minimize slippage`);
      executionPlan.push(`Using smart routing across multiple liquidity sources`);
    } else {
      executionPlan.push(`Trade size: $${tradeValue.toLocaleString()}`);
      executionPlan.push(`Executing instantly via primary liquidity pool`);
    }

    // Risk checks
    if (user) {
      if (user.kycTier === 0 && tradeValue > 500) {
        executionPlan.push(`⚠️ KYC required for trades above $500`);
        return { success: false, executionPlan };
      }
      if (user.kycTier === 1 && tradeValue > 5000) {
        executionPlan.push(`⚠️ Upgrade to Tier 2 KYC for trades above $5,000`);
        return { success: false, executionPlan };
      }
      if (user.kycTier === 2 && tradeValue > 50000) {
        executionPlan.push(`⚠️ Upgrade to Tier 3 KYC for trades above $50,000`);
        return { success: false, executionPlan };
      }
    }

    executionPlan.push(`✓ Risk assessment passed`);
    executionPlan.push(`✓ Order submitted to blockchain`);

    // Simulate execution delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    addTransaction({
      type,
      asset,
      amount,
      usdValue: tradeValue,
      status: "completed",
      txHash: `0x${Math.random().toString(16).slice(2, 10)}...`,
    });

    executionPlan.push(`✓ Trade completed successfully!`);

    return { success: true, executionPlan };
  },
}));
