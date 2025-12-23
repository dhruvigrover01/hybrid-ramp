import { useState } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppStore } from "@/store/appStore";
import { toast } from "sonner";
import { 
  Shield, 
  CheckCircle2, 
  Circle, 
  Upload, 
  Phone, 
  Mail, 
  FileText, 
  Camera,
  MapPin,
  ChevronRight,
  AlertTriangle,
  Star
} from "lucide-react";

const tiers = [
  {
    tier: 1,
    name: "Basic",
    requirements: ["Email verification", "Phone verification"],
    limits: "$500/day",
    color: "from-slate-500 to-slate-600",
  },
  {
    tier: 2,
    name: "Verified",
    requirements: ["Government ID", "Selfie verification"],
    limits: "$5,000/day",
    color: "from-blue-500 to-blue-600",
  },
  {
    tier: 3,
    name: "Premium",
    requirements: ["Address proof", "Enhanced due diligence"],
    limits: "Unlimited",
    color: "from-amber-500 to-orange-500",
  },
];

const KycPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);

  const { user, uploadKycDocument, verifyPhone, updateKycTier } = useAppStore();

  const currentTier = user?.kycTier || 0;

  const handlePhoneVerify = async () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      toast.error("Please enter a valid phone number");
      return;
    }
    
    if (!showOtp) {
      setShowOtp(true);
      toast.success("OTP sent to your phone!");
      return;
    }

    if (otp !== "123456") {
      toast.error("Invalid OTP. Use 123456 for demo.");
      return;
    }

    const success = await verifyPhone(phoneNumber);
    if (success) {
      toast.success("Phone verified successfully!");
      setShowOtp(false);
      setOtp("");
    }
  };

  const handleDocumentUpload = async (docType: "id" | "addressProof" | "selfie") => {
    setUploading(docType);
    
    // Simulate file upload
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    const success = await uploadKycDocument(docType);
    if (success) {
      toast.success(`${docType === "id" ? "ID" : docType === "addressProof" ? "Address proof" : "Selfie"} uploaded successfully!`);
    }
    
    setUploading(null);
  };

  return (
    <>
      <Helmet>
        <title>KYC Verification - HybridRampX</title>
      </Helmet>

      <div className="min-h-screen bg-background flex">
        <DashboardSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <div className="flex-1 lg:ml-64">
          <DashboardHeader onMenuClick={() => setSidebarOpen(true)} onBuyClick={() => {}} />

          <main className="p-4 lg:p-8 pt-24">
            <div className="max-w-4xl mx-auto space-y-8">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h1 className="text-2xl lg:text-3xl font-heading font-bold mb-2">
                  KYC Verification
                </h1>
                <p className="text-muted-foreground">
                  Complete verification to unlock higher trading limits
                </p>
              </motion.div>

              {/* Current Status */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="glass rounded-2xl p-6"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${
                    currentTier === 0 ? "from-slate-500 to-slate-600" :
                    currentTier === 1 ? "from-slate-500 to-slate-600" :
                    currentTier === 2 ? "from-blue-500 to-blue-600" :
                    "from-amber-500 to-orange-500"
                  } flex items-center justify-center`}>
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Current Status</p>
                    <h2 className="text-2xl font-heading font-bold">
                      Tier {currentTier}: {currentTier === 0 ? "Unverified" : currentTier === 1 ? "Basic" : currentTier === 2 ? "Verified" : "Premium"}
                    </h2>
                    <p className="text-sm text-primary">
                      {currentTier === 0 ? "Up to $100/day" : currentTier === 1 ? "Up to $500/day" : currentTier === 2 ? "Up to $5,000/day" : "Unlimited"}
                    </p>
                  </div>
                </div>

                {/* Progress */}
                <div className="flex items-center gap-2 mb-2">
                  {[1, 2, 3].map((tier) => (
                    <div
                      key={tier}
                      className={`flex-1 h-2 rounded-full ${
                        currentTier >= tier ? "bg-primary" : "bg-secondary"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground text-right">
                  {currentTier}/3 tiers completed
                </p>
              </motion.div>

              {/* Tier Cards */}
              <div className="grid md:grid-cols-3 gap-4">
                {tiers.map((tier, index) => {
                  const isCompleted = currentTier >= tier.tier;
                  const isCurrent = currentTier === tier.tier - 1;
                  
                  return (
                    <motion.div
                      key={tier.tier}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + index * 0.1 }}
                      className={`rounded-2xl p-6 ${
                        isCompleted 
                          ? "bg-primary/10 border-2 border-primary" 
                          : isCurrent
                          ? "glass border-2 border-dashed border-primary/50"
                          : "glass opacity-60"
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tier.color} flex items-center justify-center mb-4`}>
                        {isCompleted ? (
                          <CheckCircle2 className="w-6 h-6 text-white" />
                        ) : (
                          <Star className="w-6 h-6 text-white" />
                        )}
                      </div>
                      
                      <h3 className="font-heading font-semibold text-lg mb-1">
                        Tier {tier.tier}: {tier.name}
                      </h3>
                      <p className="text-primary text-sm font-medium mb-4">{tier.limits}</p>
                      
                      <ul className="space-y-2 mb-4">
                        {tier.requirements.map((req, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CheckCircle2 className={`w-4 h-4 ${isCompleted ? "text-primary" : "text-muted-foreground"}`} />
                            {req}
                          </li>
                        ))}
                      </ul>
                      
                      {isCompleted && (
                        <span className="inline-flex items-center gap-1 text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
                          <CheckCircle2 className="w-3 h-3" />
                          Completed
                        </span>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {/* Verification Steps */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="glass rounded-2xl p-6"
              >
                <h3 className="text-lg font-heading font-semibold mb-6">Complete Verification</h3>
                
                <div className="space-y-6">
                  {/* Email Verification */}
                  <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/50">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                        <Mail className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Email Verification</p>
                        <p className="text-sm text-muted-foreground">{user?.email}</p>
                      </div>
                    </div>
                    <span className="flex items-center gap-1 text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
                      <CheckCircle2 className="w-3 h-3" />
                      Verified
                    </span>
                  </div>

                  {/* Phone Verification */}
                  <div className="p-4 rounded-xl bg-secondary/50">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                          <Phone className="w-5 h-5 text-blue-500" />
                        </div>
                        <div>
                          <p className="font-medium">Phone Verification</p>
                          <p className="text-sm text-muted-foreground">Required for Tier 1</p>
                        </div>
                      </div>
                      {user?.phone ? (
                        <span className="flex items-center gap-1 text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
                          <CheckCircle2 className="w-3 h-3" />
                          Verified
                        </span>
                      ) : (
                        <span className="text-xs bg-amber-500/20 text-amber-500 px-2 py-1 rounded-full">
                          Pending
                        </span>
                      )}
                    </div>
                    
                    {!user?.phone && (
                      <div className="space-y-3">
                        <div className="flex gap-2">
                          <Input
                            type="tel"
                            placeholder="+1 234 567 8900"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className="flex-1 bg-background"
                          />
                          {!showOtp && (
                            <Button onClick={handlePhoneVerify}>
                              Send OTP
                            </Button>
                          )}
                        </div>
                        {showOtp && (
                          <div className="flex gap-2">
                            <Input
                              type="text"
                              placeholder="Enter OTP (use 123456)"
                              value={otp}
                              onChange={(e) => setOtp(e.target.value)}
                              className="flex-1 bg-background"
                            />
                            <Button onClick={handlePhoneVerify}>
                              Verify
                            </Button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* ID Upload */}
                  <div className="p-4 rounded-xl bg-secondary/50">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center">
                          <FileText className="w-5 h-5 text-violet-500" />
                        </div>
                        <div>
                          <p className="font-medium">Government ID</p>
                          <p className="text-sm text-muted-foreground">Passport, Driver's License, or National ID</p>
                        </div>
                      </div>
                      {user?.kycDocuments?.idUploaded ? (
                        <span className="flex items-center gap-1 text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
                          <CheckCircle2 className="w-3 h-3" />
                          Uploaded
                        </span>
                      ) : (
                        <span className="text-xs bg-amber-500/20 text-amber-500 px-2 py-1 rounded-full">
                          Required for Tier 2
                        </span>
                      )}
                    </div>
                    
                    {!user?.kycDocuments?.idUploaded && currentTier >= 1 && (
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => handleDocumentUpload("id")}
                        disabled={uploading === "id"}
                      >
                        {uploading === "id" ? (
                          <span className="flex items-center gap-2">
                            <span className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                            Uploading...
                          </span>
                        ) : (
                          <>
                            <Upload className="w-4 h-4 mr-2" />
                            Upload ID Document
                          </>
                        )}
                      </Button>
                    )}
                  </div>

                  {/* Selfie Verification */}
                  <div className="p-4 rounded-xl bg-secondary/50">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-pink-500/20 flex items-center justify-center">
                          <Camera className="w-5 h-5 text-pink-500" />
                        </div>
                        <div>
                          <p className="font-medium">Selfie Verification</p>
                          <p className="text-sm text-muted-foreground">Take a photo holding your ID</p>
                        </div>
                      </div>
                      {user?.kycDocuments?.selfieUploaded ? (
                        <span className="flex items-center gap-1 text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
                          <CheckCircle2 className="w-3 h-3" />
                          Verified
                        </span>
                      ) : (
                        <span className="text-xs bg-amber-500/20 text-amber-500 px-2 py-1 rounded-full">
                          Required for Tier 2
                        </span>
                      )}
                    </div>
                    
                    {!user?.kycDocuments?.selfieUploaded && user?.kycDocuments?.idUploaded && (
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => handleDocumentUpload("selfie")}
                        disabled={uploading === "selfie"}
                      >
                        {uploading === "selfie" ? (
                          <span className="flex items-center gap-2">
                            <span className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                            Verifying...
                          </span>
                        ) : (
                          <>
                            <Camera className="w-4 h-4 mr-2" />
                            Take Selfie
                          </>
                        )}
                      </Button>
                    )}
                  </div>

                  {/* Address Proof */}
                  <div className="p-4 rounded-xl bg-secondary/50">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                          <MapPin className="w-5 h-5 text-emerald-500" />
                        </div>
                        <div>
                          <p className="font-medium">Address Proof</p>
                          <p className="text-sm text-muted-foreground">Utility bill or bank statement</p>
                        </div>
                      </div>
                      {user?.kycDocuments?.addressProofUploaded ? (
                        <span className="flex items-center gap-1 text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
                          <CheckCircle2 className="w-3 h-3" />
                          Uploaded
                        </span>
                      ) : (
                        <span className="text-xs bg-amber-500/20 text-amber-500 px-2 py-1 rounded-full">
                          Required for Tier 3
                        </span>
                      )}
                    </div>
                    
                    {!user?.kycDocuments?.addressProofUploaded && currentTier >= 2 && (
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => handleDocumentUpload("addressProof")}
                        disabled={uploading === "addressProof"}
                      >
                        {uploading === "addressProof" ? (
                          <span className="flex items-center gap-2">
                            <span className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                            Uploading...
                          </span>
                        ) : (
                          <>
                            <Upload className="w-4 h-4 mr-2" />
                            Upload Address Proof
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Why KYC */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20"
              >
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-blue-500">Why is KYC required?</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      KYC (Know Your Customer) verification helps us comply with regulations, prevent fraud, and protect your account. 
                      Higher verification tiers unlock increased trading limits and additional features.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default KycPage;

