import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";
import { useAppStore } from "@/store/appStore";

const PortfolioOverview = () => {
  const assets = useAppStore((state) => state.assets);
  const totalValue = assets.reduce((sum, asset) => sum + asset.usdValue, 0);
  const totalChange = ((assets.reduce((sum, asset) => sum + asset.usdValue * (asset.change24h / 100), 0) / totalValue) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="glass rounded-2xl p-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-heading font-semibold">Portfolio</h3>
        <span className={`flex items-center gap-1 text-sm font-medium ${
          totalChange >= 0 ? "text-primary" : "text-destructive"
        }`}>
          {totalChange >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          {totalChange >= 0 ? "+" : ""}{totalChange.toFixed(2)}%
        </span>
      </div>

      {/* Total Balance */}
      <div className="mb-8">
        <p className="text-muted-foreground text-sm mb-1">Total Balance</p>
        <div className="text-4xl font-heading font-bold">
          ${totalValue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
        <p className="text-sm text-muted-foreground mt-1">USD</p>
      </div>

      {/* Asset List */}
      <div className="space-y-3">
        {assets.map((asset, index) => (
          <motion.div
            key={asset.symbol}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + index * 0.05 }}
            className="flex items-center justify-between p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                asset.symbol === "BTC" ? "gradient-primary" :
                asset.symbol === "ETH" ? "bg-info/20" :
                asset.symbol === "USDT" ? "bg-success/20" :
                "bg-muted"
              }`}>
                <span className={`font-bold ${
                  asset.symbol === "BTC" ? "text-primary-foreground" :
                  asset.symbol === "ETH" ? "text-info" :
                  asset.symbol === "USDT" ? "text-success" :
                  "text-foreground"
                }`}>
                  {asset.icon}
                </span>
              </div>
              <div>
                <p className="font-medium">{asset.name}</p>
                <p className="text-sm text-muted-foreground">
                  {asset.balance} {asset.symbol}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-medium">
                ${asset.usdValue.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </p>
              <p className={`text-sm ${asset.change24h >= 0 ? "text-primary" : "text-destructive"}`}>
                {asset.change24h >= 0 ? "+" : ""}{asset.change24h}%
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default PortfolioOverview;
