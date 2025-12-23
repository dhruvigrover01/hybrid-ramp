import { Button } from "@/components/ui/button";
import { Menu, Bell, Plus, FlaskConical } from "lucide-react";
import { useAppStore } from "@/store/appStore";

interface DashboardHeaderProps {
  onMenuClick: () => void;
  onBuyClick: () => void;
}

const DashboardHeader = ({ onMenuClick, onBuyClick }: DashboardHeaderProps) => {
  const walletConnected = useAppStore((state) => state.walletConnected);
  const user = useAppStore((state) => state.user);
  const isPracticeMode = useAppStore((state) => state.isPracticeMode);

  return (
    <header className="fixed top-0 right-0 left-0 lg:left-64 h-16 bg-card/80 backdrop-blur-sm border-b border-border z-30">
      <div className="flex items-center justify-between h-full px-4 lg:px-8">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 text-muted-foreground hover:text-foreground"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="hidden sm:flex items-center gap-3">
            <h2 className="font-heading font-semibold">Dashboard</h2>
            {isPracticeMode && (
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-500 text-xs font-medium">
                <FlaskConical className="w-3.5 h-3.5" />
                Practice Mode
              </span>
            )}
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Wallet Status */}
          {!isPracticeMode && walletConnected && user?.walletAddress && (
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm text-primary font-medium">
                {user.walletAddress.slice(0, 6)}...{user.walletAddress.slice(-4)}
              </span>
            </div>
          )}

          {/* Practice Mode Balance Indicator */}
          {isPracticeMode && (
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20">
              <FlaskConical className="w-4 h-4 text-amber-500" />
              <span className="text-sm text-amber-500 font-medium">
                Virtual Funds
              </span>
            </div>
          )}

          {/* Notifications */}
          <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-primary" />
          </button>

          {/* Buy Button */}
          <Button 
            variant={isPracticeMode ? "outline" : "hero"} 
            size="sm" 
            onClick={onBuyClick} 
            className={`gap-2 ${isPracticeMode ? "border-amber-500/50 text-amber-500 hover:bg-amber-500/10" : ""}`}
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">
              {isPracticeMode ? "Practice Buy" : "Buy Crypto"}
            </span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
