import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import PortfolioOverview from "@/components/dashboard/PortfolioOverview";
import KycStatus from "@/components/dashboard/KycStatus";
import TransactionHistory from "@/components/dashboard/TransactionHistory";
import RiskTier from "@/components/dashboard/RiskTier";
import QuickActions from "@/components/dashboard/QuickActions";
import WalletConnect from "@/components/dashboard/WalletConnect";
import BuyCryptoModal from "@/components/dashboard/BuyCryptoModal";
import { useAppStore } from "@/store/appStore";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Dashboard = () => {
  const [buyModalOpen, setBuyModalOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isAuthenticated, user } = useAppStore();
  const navigate = useNavigate();

  useEffect(() => {
    // For demo purposes, auto-login if not authenticated
    if (!isAuthenticated) {
      useAppStore.getState().login("demo@example.com", "password");
    }
  }, [isAuthenticated]);

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
          <DashboardHeader onMenuClick={() => setSidebarOpen(true)} onBuyClick={() => setBuyModalOpen(true)} />

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
              </motion.div>

              {/* Quick Actions */}
              <QuickActions onBuyClick={() => setBuyModalOpen(true)} />

              {/* Main Grid */}
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Portfolio - Takes 2 columns */}
                <div className="lg:col-span-2 space-y-6">
                  <PortfolioOverview />
                  <TransactionHistory />
                </div>

                {/* Right Sidebar */}
                <div className="space-y-6">
                  <WalletConnect />
                  <KycStatus />
                  <RiskTier />
                </div>
              </div>
            </div>
          </main>
        </div>

        {/* Buy Crypto Modal */}
        <BuyCryptoModal isOpen={buyModalOpen} onClose={() => setBuyModalOpen(false)} />
      </div>
    </>
  );
};

export default Dashboard;
