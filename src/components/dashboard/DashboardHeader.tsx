import { Button } from "@/components/ui/button";
import { Menu, Bell, Plus } from "lucide-react";
import { useAppStore } from "@/store/appStore";

interface DashboardHeaderProps {
  onMenuClick: () => void;
  onBuyClick: () => void;
}

const DashboardHeader = ({ onMenuClick, onBuyClick }: DashboardHeaderProps) => {
  const walletConnected = useAppStore((state) => state.walletConnected);
  const user = useAppStore((state) => state.user);

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
          <div className="hidden sm:block">
            <h2 className="font-heading font-semibold">Dashboard</h2>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Wallet Status */}
          {walletConnected && user?.walletAddress && (
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm text-primary font-medium">
                {user.walletAddress.slice(0, 6)}...{user.walletAddress.slice(-4)}
              </span>
            </div>
          )}

          {/* Notifications */}
          <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-primary" />
          </button>

          {/* Buy Button */}
          <Button variant="hero" size="sm" onClick={onBuyClick} className="gap-2">
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Buy Crypto</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
