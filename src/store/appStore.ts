import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  id: string;
  email: string;
  name: string;
  kycTier: 0 | 1 | 2 | 3;
  riskLevel: "low" | "medium" | "high";
  walletAddress: string | null;
  custodyType: "self" | "vault" | null;
  twoFactorEnabled: boolean;
  phone: string | null;
  kycDocuments: {
    idUploaded: boolean;
    addressProofUploaded: boolean;
    selfieUploaded: boolean;
  };
  createdAt: Date;
}

export interface Asset {
  symbol: string;
  name: string;
  balance: number;
  usdValue: number;
  change24h: number;
  icon: string;
  price: number;
}

export interface Transaction {
  id: string;
  type: "buy" | "sell" | "deposit" | "withdraw" | "swap";
  asset: string;
  amount: number;
  usdValue: number;
  status: "pending" | "completed" | "failed";
  timestamp: Date;
  txHash?: string;
  isPractice?: boolean;
}

// Practice Mode Types
export interface PracticePortfolio {
  fiatBalance: number;
  assets: Asset[];
  totalValue: number;
}

export interface TradingBehavior {
  totalTrades: number;
  winningTrades: number;
  losingTrades: number;
  averageHoldTime: number; // in hours
  panicSells: number;
  fomoBuys: number;
  overtradingDays: number;
  riskScore: number; // 0-100, lower is better
  lastTradeTime: Date | null;
  tradesLast24h: number;
  consecutiveLosses: number;
  largestLoss: number;
  largestGain: number;
}

export interface AICoachInsight {
  id: string;
  type: "warning" | "tip" | "praise" | "analysis";
  title: string;
  message: string;
  timestamp: Date;
  relatedTrade?: string;
}

export interface SafetyWarning {
  id: string;
  type: "kyc_required" | "high_risk" | "large_trade" | "volatility" | "overtrading";
  message: string;
  severity: "low" | "medium" | "high";
  action?: string;
}

interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  assets: Asset[];
  transactions: Transaction[];
  walletConnected: boolean;

  // Practice Mode State
  isPracticeMode: boolean;
  practicePortfolio: PracticePortfolio;
  practiceTransactions: Transaction[];
  tradingBehavior: TradingBehavior;
  aiInsights: AICoachInsight[];
  
  // Safety Layer
  safetyWarnings: SafetyWarning[];
  progressionLevel: number; // 1-5
  isReadyForRealTrading: boolean;

  // Market Data (simulated)
  marketPrices: Record<string, { price: number; change24h: number }>;

  // Actions
  setUser: (user: User | null) => void;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  connectWallet: (address: string) => void;
  disconnectWallet: () => void;
  updateKycTier: (tier: 0 | 1 | 2 | 3) => void;
  setCustodyType: (type: "self" | "vault") => void;
  addTransaction: (tx: Omit<Transaction, "id" | "timestamp">) => void;
  executeTrade: (asset: string, amount: number, type: "buy" | "sell") => Promise<{ success: boolean; executionPlan: string[]; warning?: SafetyWarning }>;
  
  // Practice Mode Actions
  togglePracticeMode: () => void;
  executePracticeTrade: (asset: string, amount: number, type: "buy" | "sell", price: number) => Promise<{ success: boolean; feedback: AICoachInsight }>;
  resetPracticePortfolio: () => void;
  
  // KYC Actions
  uploadKycDocument: (docType: "id" | "addressProof" | "selfie") => Promise<boolean>;
  verifyPhone: (phone: string) => Promise<boolean>;
  
  // Security Actions
  enableTwoFactor: () => Promise<boolean>;
  disableTwoFactor: () => Promise<boolean>;
  
  // AI Coach Actions
  addAIInsight: (insight: Omit<AICoachInsight, "id" | "timestamp">) => void;
  clearInsights: () => void;
  
  // Safety Actions
  addSafetyWarning: (warning: Omit<SafetyWarning, "id">) => void;
  dismissWarning: (id: string) => void;
  checkProgressionStatus: () => void;
  
  // Market Actions
  updateMarketPrices: () => void;
}

const initialPracticePortfolio: PracticePortfolio = {
  fiatBalance: 10000,
  assets: [],
  totalValue: 10000,
};

const initialTradingBehavior: TradingBehavior = {
  totalTrades: 0,
  winningTrades: 0,
  losingTrades: 0,
  averageHoldTime: 0,
  panicSells: 0,
  fomoBuys: 0,
  overtradingDays: 0,
  riskScore: 50,
  lastTradeTime: null,
  tradesLast24h: 0,
  consecutiveLosses: 0,
  largestLoss: 0,
  largestGain: 0,
};

const mockAssets: Asset[] = [
  { symbol: "BTC", name: "Bitcoin", balance: 0.52, usdValue: 28450, change24h: 5.2, icon: "₿", price: 54750 },
  { symbol: "ETH", name: "Ethereum", balance: 4.8, usdValue: 15840, change24h: 8.1, icon: "Ξ", price: 3300 },
  { symbol: "USDT", name: "Tether", balance: 2500, usdValue: 2500, change24h: 0.01, icon: "$", price: 1 },
  { symbol: "MATIC", name: "Polygon", balance: 1200, usdValue: 1506.24, change24h: -2.3, icon: "⬡", price: 1.25 },
];

const mockTransactions: Transaction[] = [
  { id: "1", type: "buy", asset: "BTC", amount: 0.1, usdValue: 5500, status: "completed", timestamp: new Date(Date.now() - 86400000) },
  { id: "2", type: "buy", asset: "ETH", amount: 2.0, usdValue: 6600, status: "completed", timestamp: new Date(Date.now() - 172800000) },
  { id: "3", type: "deposit", asset: "USDT", amount: 1000, usdValue: 1000, status: "completed", timestamp: new Date(Date.now() - 259200000) },
];

const initialMarketPrices: Record<string, { price: number; change24h: number }> = {
  BTC: { price: 54750, change24h: 5.2 },
  ETH: { price: 3300, change24h: 8.1 },
  USDT: { price: 1, change24h: 0.01 },
  MATIC: { price: 1.25, change24h: -2.3 },
  SOL: { price: 145, change24h: 12.5 },
  DOGE: { price: 0.12, change24h: -5.2 },
};

// AI Coach Analysis Functions
const analyzeTradeForFeedback = (
  type: "buy" | "sell",
  asset: string,
  amount: number,
  price: number,
  behavior: TradingBehavior,
  portfolio: PracticePortfolio,
  marketPrices: Record<string, { price: number; change24h: number }>
): AICoachInsight => {
  const tradeValue = amount * price;
  const portfolioPercentage = (tradeValue / portfolio.totalValue) * 100;
  const assetData = marketPrices[asset];
  
  // Check for FOMO buying (buying after big pump)
  if (type === "buy" && assetData && assetData.change24h > 10) {
    return {
      id: "",
      type: "warning",
      title: "Potential FOMO Alert",
      message: `${asset} is up ${assetData.change24h.toFixed(1)}% in 24h. Buying after a big pump often leads to buying at local highs. Consider waiting for a pullback or dollar-cost averaging instead.`,
      timestamp: new Date(),
    };
  }
  
  // Check for panic selling (selling after big drop)
  if (type === "sell" && assetData && assetData.change24h < -8) {
    return {
      id: "",
      type: "warning",
      title: "Panic Sell Warning",
      message: `${asset} is down ${Math.abs(assetData.change24h).toFixed(1)}% today. Selling during sharp drops often locks in losses. Unless your thesis has changed, consider holding or buying more at lower prices.`,
      timestamp: new Date(),
    };
  }
  
  // Check for overtrading
  if (behavior.tradesLast24h >= 5) {
    return {
      id: "",
      type: "warning",
      title: "Overtrading Detected",
      message: `You've made ${behavior.tradesLast24h} trades in the last 24 hours. Frequent trading often leads to higher fees and emotional decisions. Consider setting specific entry/exit points and sticking to them.`,
      timestamp: new Date(),
    };
  }
  
  // Check for oversized position
  if (portfolioPercentage > 30) {
    return {
      id: "",
      type: "warning",
      title: "Large Position Size",
      message: `This trade represents ${portfolioPercentage.toFixed(1)}% of your portfolio. Consider keeping individual positions under 20-25% to manage risk. Diversification helps protect against single-asset volatility.`,
      timestamp: new Date(),
    };
  }
  
  // Check for consecutive losses
  if (behavior.consecutiveLosses >= 3) {
    return {
      id: "",
      type: "tip",
      title: "Take a Break",
      message: `You've had ${behavior.consecutiveLosses} losing trades in a row. This is normal, but it might be a good time to step back, review your strategy, and avoid revenge trading.`,
      timestamp: new Date(),
    };
  }
  
  // Good behavior - small position size
  if (portfolioPercentage < 10 && portfolioPercentage > 0) {
    return {
      id: "",
      type: "praise",
      title: "Good Risk Management",
      message: `Nice! You're keeping this position size at ${portfolioPercentage.toFixed(1)}% of your portfolio. This is a smart approach to managing risk while still participating in potential upside.`,
      timestamp: new Date(),
    };
  }
  
  // Default analysis
  return {
    id: "",
    type: "analysis",
    title: "Trade Executed",
    message: `Your ${type} order for ${amount} ${asset} at $${price.toLocaleString()} has been executed. Remember to set mental stop-losses and take-profit levels for every trade.`,
    timestamp: new Date(),
  };
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      assets: mockAssets,
      transactions: mockTransactions,
      walletConnected: false,
      
      // Practice Mode Initial State
      isPracticeMode: false,
      practicePortfolio: initialPracticePortfolio,
      practiceTransactions: [],
      tradingBehavior: initialTradingBehavior,
      aiInsights: [],
      
      // Safety Layer Initial State
      safetyWarnings: [],
      progressionLevel: 1,
      isReadyForRealTrading: false,
      
      // Market Data
      marketPrices: initialMarketPrices,

      setUser: (user) => set({ user, isAuthenticated: !!user }),

      login: async (email: string, password: string) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        const user: User = {
          id: "user-1",
          email,
          name: email.split("@")[0],
          kycTier: 1,
          riskLevel: "low",
          walletAddress: null,
          custodyType: null,
          twoFactorEnabled: false,
          phone: null,
          kycDocuments: {
            idUploaded: false,
            addressProofUploaded: false,
            selfieUploaded: false,
          },
          createdAt: new Date(),
        };
        
        set({ user, isAuthenticated: true });
        return true;
      },

      logout: () => {
        set({ 
          user: null, 
          isAuthenticated: false, 
          walletConnected: false,
          isPracticeMode: false,
        });
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
        const { user, checkProgressionStatus } = get();
        if (user) {
          set({ user: { ...user, kycTier: tier } });
          checkProgressionStatus();
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
        const { user, addTransaction, addSafetyWarning, marketPrices } = get();
        
        const price = marketPrices[asset]?.price || 50000;
        const tradeValue = amount * price;
        const executionPlan: string[] = [];
        let warning: SafetyWarning | undefined;
        
        // Smart execution logic
        if (tradeValue > 10000) {
          const chunks = Math.ceil(tradeValue / 5000);
          executionPlan.push(`Trade size detected: $${tradeValue.toLocaleString()}`);
          executionPlan.push(`Splitting into ${chunks} smaller orders to minimize slippage`);
          executionPlan.push(`Using smart routing across multiple liquidity sources`);
        } else {
          executionPlan.push(`Trade size: $${tradeValue.toLocaleString()}`);
          executionPlan.push(`Executing instantly via primary liquidity pool`);
        }

        // Risk checks based on KYC tier
        if (user) {
          const tierLimits = {
            0: 500,
            1: 5000,
            2: 50000,
            3: Infinity,
          };
          
          const limit = tierLimits[user.kycTier];
          
          if (tradeValue > limit) {
            const tierName = user.kycTier === 0 ? "Basic" : user.kycTier === 1 ? "Verified" : "Premium";
            warning = {
              id: `warning-${Date.now()}`,
              type: "kyc_required",
              message: `Your current KYC tier (${tierName}) allows trades up to $${limit.toLocaleString()}. Please upgrade to trade larger amounts.`,
              severity: "high",
              action: "Upgrade KYC",
            };
            addSafetyWarning(warning);
            executionPlan.push(`⚠️ KYC Tier ${user.kycTier + 1} required for trades above $${limit.toLocaleString()}`);
            return { success: false, executionPlan, warning };
          }
          
          // Volatility warning
          const assetData = marketPrices[asset];
          if (assetData && Math.abs(assetData.change24h) > 10) {
            warning = {
              id: `warning-${Date.now()}`,
              type: "volatility",
              message: `${asset} has moved ${assetData.change24h > 0 ? '+' : ''}${assetData.change24h.toFixed(1)}% in 24h. High volatility increases risk.`,
              severity: "medium",
            };
            addSafetyWarning(warning);
            executionPlan.push(`⚠️ High volatility detected: ${assetData.change24h.toFixed(1)}% 24h change`);
          }
        }

        executionPlan.push(`✓ Risk assessment passed`);
        executionPlan.push(`✓ Order submitted to blockchain`);

        await new Promise((resolve) => setTimeout(resolve, 2000));

        addTransaction({
          type,
          asset,
          amount,
          usdValue: tradeValue,
          status: "completed",
          txHash: `0x${Math.random().toString(16).slice(2, 10)}...`,
        });

        // Update assets
        set((state) => {
          const existingAsset = state.assets.find(a => a.symbol === asset);
          if (type === "buy") {
            if (existingAsset) {
              return {
                assets: state.assets.map(a => 
                  a.symbol === asset 
                    ? { ...a, balance: a.balance + amount, usdValue: a.usdValue + tradeValue }
                    : a
                ),
              };
            }
          } else {
            if (existingAsset) {
              return {
                assets: state.assets.map(a => 
                  a.symbol === asset 
                    ? { ...a, balance: Math.max(0, a.balance - amount), usdValue: Math.max(0, a.usdValue - tradeValue) }
                    : a
                ),
              };
            }
          }
          return state;
        });

        executionPlan.push(`✓ Trade completed successfully!`);

        return { success: true, executionPlan, warning };
      },
      
      // Practice Mode Actions
      togglePracticeMode: () => {
        set((state) => ({ isPracticeMode: !state.isPracticeMode }));
      },
      
      executePracticeTrade: async (asset: string, amount: number, type: "buy" | "sell", price: number) => {
        const { practicePortfolio, tradingBehavior, marketPrices, addAIInsight } = get();
        const tradeValue = amount * price;
        
        // Validate trade
        if (type === "buy" && tradeValue > practicePortfolio.fiatBalance) {
          return {
            success: false,
            feedback: {
              id: `insight-${Date.now()}`,
              type: "warning" as const,
              title: "Insufficient Funds",
              message: `You don't have enough practice funds. Available: $${practicePortfolio.fiatBalance.toLocaleString()}`,
              timestamp: new Date(),
            },
          };
        }
        
        if (type === "sell") {
          const holding = practicePortfolio.assets.find(a => a.symbol === asset);
          if (!holding || holding.balance < amount) {
            return {
              success: false,
              feedback: {
                id: `insight-${Date.now()}`,
                type: "warning" as const,
                title: "Insufficient Holdings",
                message: `You don't have enough ${asset} to sell. Available: ${holding?.balance || 0}`,
                timestamp: new Date(),
              },
            };
          }
        }
        
        // Generate AI feedback
        const feedback = analyzeTradeForFeedback(type, asset, amount, price, tradingBehavior, practicePortfolio, marketPrices);
        feedback.id = `insight-${Date.now()}`;
        
        // Simulate execution
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        // Update practice portfolio
        set((state) => {
          const newAssets = [...state.practicePortfolio.assets];
          const existingIndex = newAssets.findIndex(a => a.symbol === asset);
          
          if (type === "buy") {
            if (existingIndex >= 0) {
              const existing = newAssets[existingIndex];
              const newBalance = existing.balance + amount;
              const newAvgPrice = ((existing.balance * (existing.usdValue / existing.balance)) + tradeValue) / newBalance;
              newAssets[existingIndex] = {
                ...existing,
                balance: newBalance,
                usdValue: newBalance * price,
                price: newAvgPrice,
              };
            } else {
              newAssets.push({
                symbol: asset,
                name: asset,
                balance: amount,
                usdValue: tradeValue,
                change24h: marketPrices[asset]?.change24h || 0,
                icon: asset === "BTC" ? "₿" : asset === "ETH" ? "Ξ" : "$",
                price,
              });
            }
          } else {
            if (existingIndex >= 0) {
              const existing = newAssets[existingIndex];
              const newBalance = existing.balance - amount;
              if (newBalance <= 0) {
                newAssets.splice(existingIndex, 1);
              } else {
                newAssets[existingIndex] = {
                  ...existing,
                  balance: newBalance,
                  usdValue: newBalance * price,
                };
              }
            }
          }
          
          const newFiatBalance = type === "buy" 
            ? state.practicePortfolio.fiatBalance - tradeValue
            : state.practicePortfolio.fiatBalance + tradeValue;
          
          const totalAssetValue = newAssets.reduce((sum, a) => sum + a.usdValue, 0);
          
          return {
            practicePortfolio: {
              fiatBalance: newFiatBalance,
              assets: newAssets,
              totalValue: newFiatBalance + totalAssetValue,
            },
            practiceTransactions: [
              {
                id: `ptx-${Date.now()}`,
                type,
                asset,
                amount,
                usdValue: tradeValue,
                status: "completed" as const,
                timestamp: new Date(),
                isPractice: true,
              },
              ...state.practiceTransactions,
            ],
            tradingBehavior: {
              ...state.tradingBehavior,
              totalTrades: state.tradingBehavior.totalTrades + 1,
              tradesLast24h: state.tradingBehavior.tradesLast24h + 1,
              lastTradeTime: new Date(),
              fomoBuys: feedback.type === "warning" && feedback.title.includes("FOMO") 
                ? state.tradingBehavior.fomoBuys + 1 
                : state.tradingBehavior.fomoBuys,
              panicSells: feedback.type === "warning" && feedback.title.includes("Panic")
                ? state.tradingBehavior.panicSells + 1
                : state.tradingBehavior.panicSells,
            },
          };
        });
        
        // Add the insight
        addAIInsight(feedback);
        
        // Check progression
        get().checkProgressionStatus();
        
        return { success: true, feedback };
      },
      
      resetPracticePortfolio: () => {
        set({
          practicePortfolio: initialPracticePortfolio,
          practiceTransactions: [],
          tradingBehavior: initialTradingBehavior,
          aiInsights: [],
        });
      },
      
      // KYC Actions
      uploadKycDocument: async (docType) => {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        
        set((state) => {
          if (!state.user) return state;
          
          const newDocs = { ...state.user.kycDocuments };
          if (docType === "id") newDocs.idUploaded = true;
          if (docType === "addressProof") newDocs.addressProofUploaded = true;
          if (docType === "selfie") newDocs.selfieUploaded = true;
          
          // Auto-upgrade tier based on documents
          let newTier = state.user.kycTier;
          if (newDocs.idUploaded && newTier < 2) newTier = 2;
          if (newDocs.idUploaded && newDocs.addressProofUploaded && newDocs.selfieUploaded && newTier < 3) newTier = 3;
          
          return {
            user: {
              ...state.user,
              kycDocuments: newDocs,
              kycTier: newTier as 0 | 1 | 2 | 3,
            },
          };
        });
        
        get().checkProgressionStatus();
        return true;
      },
      
      verifyPhone: async (phone) => {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        
        set((state) => {
          if (!state.user) return state;
          
          let newTier = state.user.kycTier;
          if (newTier === 0) newTier = 1;
          
          return {
            user: {
              ...state.user,
              phone,
              kycTier: newTier as 0 | 1 | 2 | 3,
            },
          };
        });
        
        return true;
      },
      
      // Security Actions
      enableTwoFactor: async () => {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        
        set((state) => {
          if (!state.user) return state;
          return {
            user: { ...state.user, twoFactorEnabled: true },
          };
        });
        
        return true;
      },
      
      disableTwoFactor: async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        set((state) => {
          if (!state.user) return state;
          return {
            user: { ...state.user, twoFactorEnabled: false },
          };
        });
        
        return true;
      },
      
      // AI Coach Actions
      addAIInsight: (insight) => {
        const newInsight: AICoachInsight = {
          ...insight,
          id: `insight-${Date.now()}`,
          timestamp: new Date(),
        };
        set((state) => ({
          aiInsights: [newInsight, ...state.aiInsights].slice(0, 50), // Keep last 50
        }));
      },
      
      clearInsights: () => {
        set({ aiInsights: [] });
      },
      
      // Safety Actions
      addSafetyWarning: (warning) => {
        const newWarning: SafetyWarning = {
          ...warning,
          id: `warning-${Date.now()}`,
        };
        set((state) => ({
          safetyWarnings: [newWarning, ...state.safetyWarnings].slice(0, 20),
        }));
      },
      
      dismissWarning: (id) => {
        set((state) => ({
          safetyWarnings: state.safetyWarnings.filter(w => w.id !== id),
        }));
      },
      
      checkProgressionStatus: () => {
        const { user, tradingBehavior, practiceTransactions } = get();
        
        let level = 1;
        let ready = false;
        
        // Level 2: Completed at least 5 practice trades
        if (tradingBehavior.totalTrades >= 5) level = 2;
        
        // Level 3: Good risk management (low FOMO/panic sells)
        if (level >= 2 && tradingBehavior.fomoBuys <= 2 && tradingBehavior.panicSells <= 2) level = 3;
        
        // Level 4: KYC Tier 2+
        if (level >= 3 && user && user.kycTier >= 2) level = 4;
        
        // Level 5: Ready for real trading
        if (level >= 4 && tradingBehavior.totalTrades >= 10 && tradingBehavior.riskScore < 40) {
          level = 5;
          ready = true;
        }
        
        // Calculate risk score
        const riskScore = Math.min(100, Math.max(0,
          50 +
          (tradingBehavior.fomoBuys * 5) +
          (tradingBehavior.panicSells * 5) +
          (tradingBehavior.overtradingDays * 3) -
          (tradingBehavior.totalTrades >= 10 ? 10 : 0) -
          (user?.kycTier ? user.kycTier * 5 : 0)
        ));
        
        set({
          progressionLevel: level,
          isReadyForRealTrading: ready,
          tradingBehavior: {
            ...get().tradingBehavior,
            riskScore,
          },
        });
      },
      
      // Market Actions
      updateMarketPrices: () => {
        set((state) => {
          const newPrices = { ...state.marketPrices };
          Object.keys(newPrices).forEach(symbol => {
            const change = (Math.random() - 0.5) * 2; // -1% to +1%
            newPrices[symbol] = {
              price: newPrices[symbol].price * (1 + change / 100),
              change24h: newPrices[symbol].change24h + change * 0.1,
            };
          });
          return { marketPrices: newPrices };
        });
      },
    }),
    {
      name: "hybrid-ramp-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        practicePortfolio: state.practicePortfolio,
        practiceTransactions: state.practiceTransactions,
        tradingBehavior: state.tradingBehavior,
        progressionLevel: state.progressionLevel,
      }),
    }
  )
);
