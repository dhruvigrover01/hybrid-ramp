import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import PortfolioOverview from "@/components/dashboard/PortfolioOverview";
import KycStatus from "@/components/dashboard/KycStatus";
import TransactionHistory from "@/components/dashboard/TransactionHistory";
import RiskTier from "@/components/dashboard/RiskTier";
import WalletConnect from "@/components/dashboard/WalletConnect";
import BuyCryptoModal from "@/components/dashboard/BuyCryptoModal";
import SellCryptoModal from "@/components/dashboard/SellCryptoModal";
import SwapModal from "@/components/dashboard/SwapModal";
import SendModal from "@/components/dashboard/SendModal";
import PracticeModeToggle from "@/components/dashboard/PracticeModeToggle";
import PracticePortfolio from "@/components/dashboard/PracticePortfolio";
import PracticeTradeModal from "@/components/dashboard/PracticeTradeModal";
import AICoachPanel from "@/components/dashboard/AICoachPanel";
import SafetyWarnings from "@/components/dashboard/SafetyWarnings";
import { useAppStore } from "@/store/appStore";
import { useNavigate } from "react-router-dom";
import { FlaskConical, Sparkles, RefreshCw, ArrowDownLeft, ArrowUpRight, Send } from "lucide-react";

const Dashboard = () => {
  const [buyModalOpen, setBuyModalOpen] = useState(false);
  const [sellModalOpen, setSellModalOpen] = useState(false);
  const [swapModalOpen, setSwapModalOpen] = useState(false);
  const [sendModalOpen, setSendModalOpen] = useState(false);
  const [practiceTradeOpen, setPracticeTradeOpen] = useState(false);
  const [practiceTradeType, setPracticeTradeType] = useState<"buy" | "sell">("buy");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const { 
    isAuthenticated, 
    user, 
    isPracticeMode, 
    isReadyForRealTrading, 
    fetchMarketPrices,
    isLoadingPrices,
    lastPriceUpdate 
  } = useAppStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth");
      return;
    }
    
    // Fetch real market prices on mount
    fetchMarketPrices();
    
    // Refresh prices every 60 seconds
    const interval = setInterval(() => {
      fetchMarketPrices();
    }, 60000);
    
    return () => clearInterval(interval);
  }, [isAuthenticated, navigate, fetchMarketPrices]);

  const handleQuickAction = (action: string) => {
    if (isPracticeMode) {
      if (action === "buy" || action === "sell") {
        setPracticeTradeType(action);
        setPracticeTradeOpen(true);
      }
    } else {
      switch (action) {
        case "buy":
          setBuyModalOpen(true);
          break;
        case "sell":
          setSellModalOpen(true);
          break;
        case "swap":
          setSwapModalOpen(true);
          break;
        case "send":
          setSendModalOpen(true);
          break;
      }
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>Dashboard - HybridRampX</title>
        <meta name="description" content="Manage your crypto portfolio, view transactions, and trade securely." />
      </Helmet>

      <div className="min-h-screen bg-background flex">
        {/* Sidebar */}
        <DashboardSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Main Content */}
        <div className="flex-1 lg:ml-64">
          <DashboardHeader 
            onMenuClick={() => setSidebarOpen(true)} 
            onBuyClick={() => isPracticeMode ? (setPracticeTradeType("buy"), setPracticeTradeOpen(true)) : setBuyModalOpen(true)} 
          />

          <main className="p-4 lg:p-8 pt-24">
            <div className="max-w-7xl mx-auto space-y-6">
              {/* Welcome Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
              >
                <div>
                  <h1 className="text-2xl lg:text-3xl font-heading font-bold">
                    Welcome back, {user?.name || "User"} 👋
                  </h1>
                  <p className="text-muted-foreground">
                    Here's what's happening with your portfolio today.
                  </p>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  {isLoadingPrices && (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  )}
                  {lastPriceUpdate && (
                    <span>
                      Prices updated: {new Date(lastPriceUpdate).toLocaleTimeString()}
                    </span>
                  )}
                </div>
              </motion.div>

              {/* Practice Mode Toggle */}
              <PracticeModeToggle />

              {/* Ready for Real Trading Banner */}
              {isPracticeMode && isReadyForRealTrading && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/30 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-emerald-500" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-emerald-500">You're Ready for Real Trading!</p>
                      <p className="text-sm text-muted-foreground">
                        Based on your practice performance, you've demonstrated good trading habits. Start with small amounts when you switch to real trading.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Safety Warnings */}
              <SafetyWarnings />

              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="grid grid-cols-2 sm:grid-cols-4 gap-4"
              >
                {[
                  { 
                    icon: ArrowDownLeft, 
                    label: isPracticeMode ? "Practice Buy" : "Buy", 
                    color: isPracticeMode ? "bg-amber-500/20 text-amber-500" : "bg-primary/20 text-primary", 
                    action: "buy" 
                  },
                  { 
                    icon: ArrowUpRight, 
                    label: isPracticeMode ? "Practice Sell" : "Sell", 
                    color: "bg-destructive/20 text-destructive", 
                    action: "sell" 
                  },
                  { 
                    icon: RefreshCw, 
                    label: "Swap", 
                    color: "bg-blue-500/20 text-blue-500", 
                    action: "swap",
                    disabled: isPracticeMode
                  },
                  { 
                    icon: Send, 
                    label: "Send", 
                    color: "bg-amber-500/20 text-amber-500", 
                    action: "send",
                    disabled: isPracticeMode
                  },
                ].map((item, index) => (
                  <motion.button
                    key={item.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                    onClick={() => !item.disabled && handleQuickAction(item.action)}
                    disabled={item.disabled}
                    className={`glass rounded-2xl p-6 hover:glow-sm transition-all group ${
                      item.disabled ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                      <item.icon className="w-6 h-6" />
                    </div>
                    <p className="font-medium text-center">{item.label}</p>
                    {item.disabled && isPracticeMode && (
                      <p className="text-xs text-muted-foreground text-center mt-1">Real mode only</p>
                    )}
                  </motion.button>
                ))}
              </motion.div>

              {/* Main Grid */}
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Portfolio - Takes 2 columns */}
                <div className="lg:col-span-2 space-y-6">
                  {isPracticeMode ? (
                    <>
                      <PracticePortfolio />
                      <AICoachPanel />
                    </>
                  ) : (
                    <>
                      <PortfolioOverview />
                      <TransactionHistory />
                    </>
                  )}
                </div>

                {/* Right Sidebar */}
                <div className="space-y-6">
                  {!isPracticeMode && <WalletConnect />}
                  <KycStatus />
                  <RiskTier />
                </div>
              </div>

              {/* Practice Mode Transactions */}
              {isPracticeMode && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass rounded-2xl p-6"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <FlaskConical className="w-5 h-5 text-amber-500" />
                    <h3 className="text-lg font-heading font-semibold">Practice Transactions</h3>
                  </div>
                  <TransactionHistory />
                </motion.div>
              )}
            </div>
          </main>
        </div>

        {/* Modals */}
        <BuyCryptoModal isOpen={buyModalOpen} onClose={() => setBuyModalOpen(false)} />
        <SellCryptoModal isOpen={sellModalOpen} onClose={() => setSellModalOpen(false)} />
        <SwapModal isOpen={swapModalOpen} onClose={() => setSwapModalOpen(false)} />
        <SendModal isOpen={sendModalOpen} onClose={() => setSendModalOpen(false)} />
        <PracticeTradeModal 
          isOpen={practiceTradeOpen} 
          onClose={() => setPracticeTradeOpen(false)} 
          defaultTab={practiceTradeType}
        />
      </div>
    </>
  );
};

export default Dashboard;
