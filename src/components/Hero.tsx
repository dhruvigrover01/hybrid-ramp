import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0 gradient-glow opacity-50" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm text-primary font-medium">Secure • Simple • Smart</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight mb-6"
            >
              Buy and trade
              <br />
              cryptos like{" "}
              <span className="text-gradient">never before.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto lg:mx-0"
            >
              Your beginner-friendly gateway to crypto. Smart execution, dynamic KYC, 
              and hybrid custody — all designed for safety and simplicity.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link to="/dashboard">
                <Button variant="hero" size="xl" className="w-full sm:w-auto gap-2">
                  Get Started
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/#how-it-works">
                <Button variant="hero-outline" size="xl" className="w-full sm:w-auto">
                  How it Works
                </Button>
              </Link>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-6 mt-12 justify-center lg:justify-start"
            >
              <div className="flex items-center gap-2 text-muted-foreground">
                <Shield className="w-5 h-5 text-primary" />
                <span className="text-sm">Bank-grade Security</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Zap className="w-5 h-5 text-primary" />
                <span className="text-sm">Instant Trades</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Animated Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:flex items-center justify-center"
          >
            <div className="relative w-full max-w-lg">
              {/* Background blob */}
              <motion.div
                animate={{ 
                  scale: [1, 1.05, 1],
                  rotate: [0, 5, 0]
                }}
                transition={{ 
                  duration: 8, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="absolute inset-0 bg-primary/10 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] blur-sm"
              />
              
              {/* Main SVG Illustration */}
              <svg
                viewBox="0 0 500 400"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="relative z-10 w-full h-auto"
              >
                {/* Background Shape */}
                <motion.ellipse
                  cx="250"
                  cy="350"
                  rx="180"
                  ry="30"
                  fill="currentColor"
                  className="text-primary/10"
                  animate={{ scaleX: [1, 1.05, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />

                {/* Bean Bag / Chair */}
                <motion.path
                  d="M120 280 C100 280 80 300 80 330 C80 360 100 380 140 380 L220 380 C260 380 280 360 280 330 C280 300 260 280 240 280 Z"
                  fill="currentColor"
                  className="text-primary/20"
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Person Body */}
                <motion.g
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  {/* Torso */}
                  <path
                    d="M160 200 L160 280 L200 280 L200 200 Z"
                    fill="currentColor"
                    className="text-primary"
                  />
                  {/* Shirt details */}
                  <path
                    d="M165 210 L165 270 L195 270 L195 210 Z"
                    fill="currentColor"
                    className="text-primary/80"
                  />
                  
                  {/* Arms */}
                  <motion.path
                    d="M160 210 L130 250 L140 260 L165 225"
                    fill="currentColor"
                    className="text-primary"
                    animate={{ rotate: [-2, 2, -2] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{ transformOrigin: "160px 210px" }}
                  />
                  <motion.path
                    d="M200 210 L230 250 L220 260 L195 225"
                    fill="currentColor"
                    className="text-primary"
                    animate={{ rotate: [2, -2, 2] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{ transformOrigin: "200px 210px" }}
                  />

                  {/* Hands */}
                  <circle cx="130" cy="255" r="8" fill="#FFD5B8" />
                  <circle cx="230" cy="255" r="8" fill="#FFD5B8" />

                  {/* Head */}
                  <circle cx="180" cy="170" r="35" fill="#FFD5B8" />
                  
                  {/* Hair */}
                  <path
                    d="M150 155 C150 130 165 120 180 120 C195 120 210 130 210 155 C210 145 200 140 180 140 C160 140 150 145 150 155 Z"
                    fill="#2D3748"
                  />
                  
                  {/* Face */}
                  <circle cx="170" cy="165" r="3" fill="#2D3748" />
                  <circle cx="190" cy="165" r="3" fill="#2D3748" />
                  <motion.path
                    d="M172 180 Q180 188 188 180"
                    stroke="#2D3748"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    animate={{ d: ["M172 180 Q180 188 188 180", "M172 182 Q180 190 188 182", "M172 180 Q180 188 188 180"] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />

                  {/* Legs */}
                  <path
                    d="M165 280 L150 350 L170 350 L175 290"
                    fill="#1A202C"
                  />
                  <path
                    d="M185 280 L210 350 L190 350 L185 290"
                    fill="#1A202C"
                  />
                  
                  {/* Shoes */}
                  <ellipse cx="160" cy="355" rx="15" ry="8" fill="#4A5568" />
                  <ellipse cx="200" cy="355" rx="15" ry="8" fill="#4A5568" />
                </motion.g>

                {/* Laptop */}
                <motion.g
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  {/* Laptop Base */}
                  <rect x="130" y="250" width="100" height="60" rx="5" fill="#E2E8F0" />
                  {/* Laptop Screen */}
                  <rect x="135" y="200" width="90" height="55" rx="3" fill="#1A202C" />
                  {/* Screen Content */}
                  <rect x="140" y="205" width="80" height="45" rx="2" fill="#0D1117" />
                  
                  {/* Chart on Screen */}
                  <motion.polyline
                    points="145,240 155,235 165,238 175,225 185,230 195,215 205,220 215,210"
                    stroke="currentColor"
                    className="text-primary"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    animate={{ 
                      points: [
                        "145,240 155,235 165,238 175,225 185,230 195,215 205,220 215,210",
                        "145,238 155,240 165,232 175,228 185,225 195,220 205,215 215,205",
                        "145,240 155,235 165,238 175,225 185,230 195,215 205,220 215,210"
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                </motion.g>

                {/* Floating Chart Window */}
                <motion.g
                  animate={{ 
                    y: [0, -10, 0],
                    x: [0, 5, 0]
                  }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <rect x="280" y="80" width="140" height="100" rx="10" fill="currentColor" className="text-card" stroke="currentColor" strokeWidth="2" className="stroke-border" />
                  
                  {/* Window Header */}
                  <rect x="280" y="80" width="140" height="25" rx="10" fill="currentColor" className="text-secondary" />
                  <circle cx="295" cy="92" r="4" fill="#EF4444" />
                  <circle cx="310" cy="92" r="4" fill="#F59E0B" />
                  <circle cx="325" cy="92" r="4" fill="#22C55E" />
                  
                  {/* Bar Chart */}
                  <motion.rect
                    x="295"
                    y="140"
                    width="15"
                    height="25"
                    fill="currentColor"
                    className="text-primary/60"
                    animate={{ height: [25, 35, 25] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.rect
                    x="320"
                    y="130"
                    width="15"
                    height="35"
                    fill="currentColor"
                    className="text-primary/80"
                    animate={{ height: [35, 45, 35] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                  />
                  <motion.rect
                    x="345"
                    y="120"
                    width="15"
                    height="45"
                    fill="currentColor"
                    className="text-primary"
                    animate={{ height: [45, 55, 45] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                  />
                  <motion.rect
                    x="370"
                    y="125"
                    width="15"
                    height="40"
                    fill="currentColor"
                    className="text-primary/70"
                    animate={{ height: [40, 50, 40] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.9 }}
                  />
                  
                  {/* Trend Arrow */}
                  <motion.path
                    d="M290 115 L400 115"
                    stroke="currentColor"
                    className="text-muted-foreground"
                    strokeWidth="1"
                    strokeDasharray="4"
                  />
                  <motion.path
                    d="M380 75 L400 55 L405 75"
                    stroke="currentColor"
                    className="text-primary"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                </motion.g>

                {/* Floating Coins */}
                <motion.g
                  animate={{ 
                    y: [0, -15, 0],
                    rotate: [0, 10, 0]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <circle cx="350" cy="200" r="25" fill="currentColor" className="text-primary" />
                  <circle cx="350" cy="200" r="20" fill="currentColor" className="text-primary/80" />
                  <text x="350" y="207" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">$</text>
                </motion.g>

                <motion.g
                  animate={{ 
                    y: [0, -20, 0],
                    rotate: [0, -15, 0]
                  }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                >
                  <circle cx="400" cy="160" r="20" fill="currentColor" className="text-primary/80" />
                  <circle cx="400" cy="160" r="16" fill="currentColor" className="text-primary/60" />
                  <text x="400" y="166" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">$</text>
                </motion.g>

                {/* Plant */}
                <motion.g
                  animate={{ rotate: [-2, 2, -2] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  style={{ transformOrigin: "420px 380px" }}
                >
                  {/* Pot */}
                  <path
                    d="M400 350 L410 380 L430 380 L440 350 Z"
                    fill="#4A5568"
                  />
                  <ellipse cx="420" cy="350" rx="22" ry="8" fill="#2D3748" />
                  
                  {/* Stem */}
                  <motion.path
                    d="M420 350 Q420 300 420 280"
                    stroke="currentColor"
                    className="text-primary"
                    strokeWidth="3"
                    fill="none"
                    animate={{ d: ["M420 350 Q420 300 420 280", "M420 350 Q425 300 420 280", "M420 350 Q420 300 420 280"] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                  
                  {/* Leaves */}
                  <motion.ellipse
                    cx="410"
                    cy="290"
                    rx="12"
                    ry="6"
                    fill="currentColor"
                    className="text-primary/80"
                    transform="rotate(-30 410 290)"
                    animate={{ rotate: [-30, -35, -30] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  <motion.ellipse
                    cx="430"
                    cy="300"
                    rx="12"
                    ry="6"
                    fill="currentColor"
                    className="text-primary/80"
                    transform="rotate(30 430 300)"
                    animate={{ rotate: [30, 35, 30] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                  />
                  <motion.ellipse
                    cx="415"
                    cy="270"
                    rx="10"
                    ry="5"
                    fill="currentColor"
                    className="text-primary"
                    transform="rotate(-45 415 270)"
                    animate={{ rotate: [-45, -50, -45] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                  />
                  <motion.ellipse
                    cx="425"
                    cy="275"
                    rx="10"
                    ry="5"
                    fill="currentColor"
                    className="text-primary"
                    transform="rotate(45 425 275)"
                    animate={{ rotate: [45, 50, 45] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                  />
                </motion.g>

                {/* Small floating particles */}
                {[...Array(6)].map((_, i) => (
                  <motion.circle
                    key={i}
                    cx={300 + i * 30}
                    cy={100 + (i % 3) * 50}
                    r={3 + (i % 2) * 2}
                    fill="currentColor"
                    className="text-primary/30"
                    animate={{
                      y: [0, -20, 0],
                      opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{
                      duration: 3 + i * 0.5,
                      repeat: Infinity,
                      delay: i * 0.3
                    }}
                  />
                ))}
              </svg>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
