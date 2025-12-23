import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppStore } from "@/store/appStore";
import { toast } from "sonner";
import { CreditCard, Wallet, Zap, CheckCircle2, ArrowRight, AlertCircle } from "lucide-react";

interface BuyCryptoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const cryptoOptions = [
  { symbol: "BTC", name: "Bitcoin", price: 54750, icon: "₿" },
  { symbol: "ETH", name: "Ethereum", price: 3300, icon: "Ξ" },
  { symbol: "USDT", name: "Tether", price: 1, icon: "$" },
  { symbol: "MATIC", name: "Polygon", price: 1.25, icon: "⬡" },
];

const paymentMethods = [
  { id: "upi", name: "UPI", icon: "📱" },
  { id: "card", name: "Card", icon: "💳" },
];

const BuyCryptoModal = ({ isOpen, onClose }: BuyCryptoModalProps) => {
  const [step, setStep] = useState(1);
  const [selectedCrypto, setSelectedCrypto] = useState(cryptoOptions[0]);
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [executing, setExecuting] = useState(false);
  const [executionPlan, setExecutionPlan] = useState<string[]>([]);

  const executeTrade = useAppStore((state) => state.executeTrade);
  const user = useAppStore((state) => state.user);

  const cryptoAmount = amount ? parseFloat(amount) / selectedCrypto.price : 0;

  const handleNext = () => {
    if (step === 1 && !amount) {
      toast.error("Please enter an amount");
      return;
    }
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handleExecute = async () => {
    if (!amount) return;

    setExecuting(true);
    setStep(3);
    
    const result = await executeTrade(selectedCrypto.symbol, cryptoAmount, "buy");
    setExecutionPlan(result.executionPlan);
    
    if (result.success) {
      toast.success("Trade executed successfully!");
    }
    setExecuting(false);
  };

  const handleClose = () => {
    setStep(1);
    setAmount("");
    setExecutionPlan([]);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="font-heading">Buy Crypto</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Progress Steps */}
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= s ? "gradient-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                }`}>
                  {step > s ? <CheckCircle2 className="w-4 h-4" /> : s}
                </div>
                {s < 3 && (
                  <div className={`w-16 h-0.5 mx-2 ${step > s ? "bg-primary" : "bg-border"}`} />
                )}
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {/* Step 1: Select Amount */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label>Select Cryptocurrency</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {cryptoOptions.map((crypto) => (
                      <button
                        key={crypto.symbol}
                        onClick={() => setSelectedCrypto(crypto)}
                        className={`p-3 rounded-xl border transition-all ${
                          selectedCrypto.symbol === crypto.symbol
                            ? "border-primary bg-primary/10"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <span className="text-xl">{crypto.icon}</span>
                        <p className="text-sm font-medium mt-1">{crypto.symbol}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount">Amount (USD)</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="100"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="pl-8 h-12 bg-secondary border-border"
                    />
                  </div>
                  {amount && (
                    <p className="text-sm text-muted-foreground">
                      ≈ {cryptoAmount.toFixed(6)} {selectedCrypto.symbol}
                    </p>
                  )}
                </div>

                <Button variant="hero" className="w-full" onClick={handleNext}>
                  Continue
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </motion.div>
            )}

            {/* Step 2: Payment Method */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label>Payment Method</Label>
                  <div className="space-y-2">
                    {paymentMethods.map((method) => (
                      <button
                        key={method.id}
                        onClick={() => setPaymentMethod(method.id)}
                        className={`w-full p-4 rounded-xl border flex items-center gap-3 transition-all ${
                          paymentMethod === method.id
                            ? "border-primary bg-primary/10"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <span className="text-2xl">{method.icon}</span>
                        <span className="font-medium">{method.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Order Summary */}
                <div className="p-4 rounded-xl bg-secondary/50 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">You pay</span>
                    <span className="font-medium">${amount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">You receive</span>
                    <span className="font-medium">{cryptoAmount.toFixed(6)} {selectedCrypto.symbol}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Fee</span>
                    <span className="font-medium text-primary">$0 (Demo)</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                    Back
                  </Button>
                  <Button variant="hero" className="flex-1" onClick={handleExecute}>
                    <Zap className="w-4 h-4 mr-2" />
                    Execute Trade
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Execution */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="text-center mb-4">
                  <div className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center ${
                    executing ? "bg-primary/20 animate-pulse" : executionPlan.some(p => p.includes("✓")) ? "bg-primary/20" : "bg-warning/20"
                  }`}>
                    {executing ? (
                      <span className="w-8 h-8 border-3 border-primary/30 border-t-primary rounded-full animate-spin" />
                    ) : executionPlan.some(p => p.includes("✓ Trade completed")) ? (
                      <CheckCircle2 className="w-8 h-8 text-primary" />
                    ) : (
                      <AlertCircle className="w-8 h-8 text-warning" />
                    )}
                  </div>
                  <h3 className="font-heading font-semibold mt-4">
                    {executing ? "Smart Execution in Progress..." : "Execution Complete"}
                  </h3>
                </div>

                {/* Execution Log */}
                <div className="p-4 rounded-xl bg-secondary/50 max-h-48 overflow-y-auto">
                  <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">Execution Log</p>
                  <div className="space-y-2">
                    {executionPlan.map((step, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.3 }}
                        className="flex items-start gap-2 text-sm"
                      >
                        <span className={step.includes("✓") ? "text-primary" : step.includes("⚠️") ? "text-warning" : "text-muted-foreground"}>
                          {step.includes("✓") ? "✓" : step.includes("⚠️") ? "⚠️" : "→"}
                        </span>
                        <span className={step.includes("⚠️") ? "text-warning" : "text-foreground"}>
                          {step.replace("✓ ", "").replace("⚠️ ", "")}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {!executing && (
                  <Button variant="hero" className="w-full" onClick={handleClose}>
                    Done
                  </Button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BuyCryptoModal;
