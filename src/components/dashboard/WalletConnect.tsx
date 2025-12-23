import { motion } from "framer-motion";
import { Wallet, ExternalLink, Shield, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/store/appStore";
import { useState } from "react";
import { toast } from "sonner";

const WalletConnect = () => {
  const { walletConnected, user, connectWallet, disconnectWallet, setCustodyType } = useAppStore();
  const [connecting, setConnecting] = useState(false);

  const handleConnect = async () => {
    setConnecting(true);
    // Simulate wallet connection
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const mockAddress = `0x${Math.random().toString(16).slice(2, 10)}...${Math.random().toString(16).slice(2, 6)}`;
    connectWallet(mockAddress);
    toast.success("Wallet connected successfully!");
    setConnecting(false);
  };

  const handleDisconnect = () => {
    disconnectWallet();
    toast.info("Wallet disconnected");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="glass rounded-2xl p-6"
    >
      <div className="flex items-center gap-2 mb-4">
        <Wallet className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-heading font-semibold">Wallet</h3>
      </div>

      {walletConnected && user?.walletAddress ? (
        <div className="space-y-4">
          {/* Connected Wallet */}
          <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
                  <Wallet className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-medium">MetaMask</p>
                  <p className="text-xs text-muted-foreground font-mono">{user.walletAddress}</p>
                </div>
              </div>
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            </div>
          </div>

          {/* Custody Selection */}
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Custody Type</p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setCustodyType("self")}
                className={`p-3 rounded-xl border transition-all ${
                  user.custodyType === "self"
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <Wallet className="w-5 h-5 mx-auto mb-1" />
                <p className="text-xs font-medium">Self-Custody</p>
              </button>
              <button
                onClick={() => setCustodyType("vault")}
                className={`p-3 rounded-xl border transition-all ${
                  user.custodyType === "vault"
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <Lock className="w-5 h-5 mx-auto mb-1" />
                <p className="text-xs font-medium">Secure Vault</p>
              </button>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={handleDisconnect}
          >
            Disconnect
          </Button>
        </div>
      ) : (
        <div className="text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-secondary mx-auto flex items-center justify-center">
            <Wallet className="w-8 h-8 text-muted-foreground" />
          </div>
          <div>
            <p className="font-medium mb-1">Connect Your Wallet</p>
            <p className="text-sm text-muted-foreground">
              Link MetaMask or WalletConnect to start trading
            </p>
          </div>
          <Button
            variant="hero"
            className="w-full"
            onClick={handleConnect}
            disabled={connecting}
          >
            {connecting ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                Connecting...
              </span>
            ) : (
              <>
                <Wallet className="w-4 h-4 mr-2" />
                Connect Wallet
              </>
            )}
          </Button>
        </div>
      )}
    </motion.div>
  );
};

export default WalletConnect;
