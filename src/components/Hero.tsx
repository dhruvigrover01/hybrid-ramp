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

          {/* Right Content - Animated Crypto Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:flex items-center justify-center"
          >
            <div className="relative w-full max-w-lg h-[500px]">
              <svg
                viewBox="0 0 500 500"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
              >
                {/* Background Cloud Left */}
                <motion.g
                  animate={{ x: [-5, 5, -5] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ellipse cx="80" cy="280" rx="35" ry="15" fill="currentColor" className="text-muted-foreground/20" />
                  <ellipse cx="65" cy="275" rx="20" ry="12" fill="currentColor" className="text-muted-foreground/20" />
                  <ellipse cx="95" cy="275" rx="25" ry="12" fill="currentColor" className="text-muted-foreground/20" />
                </motion.g>

                {/* Background Cloud Right */}
                <motion.g
                  animate={{ x: [5, -5, 5] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ellipse cx="380" cy="150" rx="40" ry="18" fill="currentColor" className="text-muted-foreground/15" />
                  <ellipse cx="360" cy="145" rx="25" ry="14" fill="currentColor" className="text-muted-foreground/15" />
                  <ellipse cx="400" cy="145" rx="30" ry="14" fill="currentColor" className="text-muted-foreground/15" />
                </motion.g>

                {/* Floating Dollar Coin - Top Left */}
                <motion.g
                  animate={{ 
                    y: [0, -15, 0],
                    rotate: [0, 5, 0]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <circle cx="100" cy="120" r="35" fill="currentColor" className="text-primary/20" />
                  <circle cx="100" cy="120" r="30" fill="currentColor" className="text-primary/30" stroke="currentColor" strokeWidth="2" className="stroke-primary/40" />
                  <text x="100" y="128" textAnchor="middle" fill="currentColor" className="fill-primary/50" fontSize="24" fontWeight="bold">$</text>
                </motion.g>

                {/* Floating Dollar Coin - Right Side */}
                <motion.g
                  animate={{ 
                    y: [0, -20, 0],
                    rotate: [0, -8, 0]
                  }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                >
                  <circle cx="400" cy="280" r="45" fill="currentColor" className="text-primary/15" />
                  <circle cx="400" cy="280" r="38" fill="currentColor" className="text-primary/25" stroke="currentColor" strokeWidth="3" className="stroke-primary/35" />
                  <text x="400" y="292" textAnchor="middle" fill="currentColor" className="fill-primary/45" fontSize="32" fontWeight="bold">$</text>
                </motion.g>

                {/* Stacked Coins */}
                <motion.g
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  {/* Coin Stack Base */}
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <g key={i}>
                      {/* Coin Side */}
                      <rect 
                        x="80" 
                        y={380 - i * 22} 
                        width="80" 
                        height="20" 
                        rx="3"
                        fill="currentColor" 
                        className="text-primary/80"
                      />
                      {/* Coin Top */}
                      <ellipse 
                        cx="120" 
                        cy={380 - i * 22} 
                        rx="40" 
                        ry="10" 
                        fill="currentColor" 
                        className="text-primary"
                      />
                      {/* Coin Shine */}
                      <ellipse 
                        cx="120" 
                        cy={378 - i * 22} 
                        rx="30" 
                        ry="6" 
                        fill="currentColor" 
                        className="text-primary/60"
                      />
                      {/* Coin Lines */}
                      <rect 
                        x="85" 
                        y={385 - i * 22} 
                        width="70" 
                        height="2" 
                        fill="currentColor" 
                        className="text-primary/40"
                      />
                      <rect 
                        x="85" 
                        y={391 - i * 22} 
                        width="70" 
                        height="2" 
                        fill="currentColor" 
                        className="text-primary/40"
                      />
                    </g>
                  ))}
                  
                  {/* Tilted Coin on Top */}
                  <motion.g
                    animate={{ rotate: [-15, -10, -15] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    style={{ transformOrigin: "100px 250px" }}
                  >
                    <ellipse 
                      cx="100" 
                      cy="250" 
                      rx="40" 
                      ry="12" 
                      fill="currentColor" 
                      className="text-primary"
                      transform="rotate(-25 100 250)"
                    />
                    <rect 
                      x="62" 
                      y="245" 
                      width="76" 
                      height="18" 
                      rx="3"
                      fill="currentColor" 
                      className="text-primary/80"
                      transform="rotate(-25 100 250)"
                    />
                  </motion.g>
                </motion.g>

                {/* Woman Figure */}
                <motion.g
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  {/* Shadow */}
                  <ellipse cx="270" cy="450" rx="60" ry="12" fill="currentColor" className="text-foreground/10" />
                  
                  {/* Legs */}
                  <path d="M240 380 L235 440 L250 445 L255 385" fill="#1a3a2f" />
                  <path d="M280 380 L290 440 L305 440 L295 380" fill="#1a3a2f" />
                  
                  {/* Shoes */}
                  <ellipse cx="242" cy="447" rx="18" ry="8" fill="#c4a7e7" />
                  <ellipse cx="298" cy="443" rx="18" ry="8" fill="#c4a7e7" />
                  
                  {/* Body/Shirt */}
                  <path 
                    d="M230 280 C220 290 215 320 220 380 L300 380 C305 320 300 290 290 280 Z" 
                    fill="currentColor" 
                    className="text-primary"
                  />
                  
                  {/* Collar */}
                  <path 
                    d="M250 275 L260 295 L270 275" 
                    fill="white" 
                  />
                  
                  {/* Left Arm */}
                  <motion.g
                    animate={{ rotate: [-3, 3, -3] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    style={{ transformOrigin: "230px 290px" }}
                  >
                    <path 
                      d="M230 290 C210 300 200 320 210 340 L225 335 C220 320 225 305 240 298" 
                      fill="currentColor" 
                      className="text-primary"
                    />
                    {/* Left Hand */}
                    <circle cx="212" cy="342" r="12" fill="#f4c4a0" />
                    
                    {/* Phone in hand */}
                    <rect x="200" y="320" width="25" height="45" rx="4" fill="#1a1a2e" />
                    <rect x="203" y="325" width="19" height="35" rx="2" fill="#2d2d44" />
                  </motion.g>
                  
                  {/* Right Arm */}
                  <motion.g
                    animate={{ rotate: [2, -2, 2] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    style={{ transformOrigin: "290px 290px" }}
                  >
                    <path 
                      d="M290 290 C310 300 315 310 310 330 L295 328 C298 315 295 305 285 298" 
                      fill="currentColor" 
                      className="text-primary"
                    />
                    {/* Right Hand */}
                    <circle cx="307" cy="332" r="10" fill="#f4c4a0" />
                  </motion.g>
                  
                  {/* Neck */}
                  <rect x="250" y="250" width="20" height="30" fill="#f4c4a0" />
                  
                  {/* Head */}
                  <ellipse cx="260" cy="220" rx="40" ry="45" fill="#f4c4a0" />
                  
                  {/* Hair */}
                  <path 
                    d="M220 210 C215 180 230 160 260 160 C290 160 305 180 300 210 C300 200 290 185 260 185 C230 185 220 200 220 210 Z" 
                    fill="#1a1a2e"
                  />
                  {/* Hair ponytail */}
                  <motion.path 
                    d="M300 200 C320 210 330 240 325 280 C322 260 315 235 305 215"
                    fill="#1a1a2e"
                    animate={{ 
                      d: [
                        "M300 200 C320 210 330 240 325 280 C322 260 315 235 305 215",
                        "M300 200 C325 215 335 245 330 285 C327 265 318 238 305 215",
                        "M300 200 C320 210 330 240 325 280 C322 260 315 235 305 215"
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  />
                  
                  {/* Face - Eyes (closed/happy) */}
                  <path d="M242 215 Q247 210 252 215" stroke="#1a1a2e" strokeWidth="2" fill="none" strokeLinecap="round" />
                  <path d="M268 215 Q273 210 278 215" stroke="#1a1a2e" strokeWidth="2" fill="none" strokeLinecap="round" />
                  
                  {/* Smile */}
                  <motion.path 
                    d="M250 235 Q260 245 270 235" 
                    stroke="#1a1a2e" 
                    strokeWidth="2" 
                    fill="none" 
                    strokeLinecap="round"
                    animate={{
                      d: [
                        "M250 235 Q260 245 270 235",
                        "M250 236 Q260 248 270 236",
                        "M250 235 Q260 245 270 235"
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  
                  {/* Blush */}
                  <ellipse cx="238" cy="228" rx="8" ry="5" fill="#f5a5a5" opacity="0.4" />
                  <ellipse cx="282" cy="228" rx="8" ry="5" fill="#f5a5a5" opacity="0.4" />
                </motion.g>

                {/* Plant */}
                <motion.g
                  animate={{ rotate: [-2, 2, -2] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  style={{ transformOrigin: "430px 450px" }}
                >
                  {/* Pot */}
                  <path d="M410 420 L415 455 L445 455 L450 420 Z" fill="currentColor" className="text-primary/90" />
                  <ellipse cx="430" cy="420" rx="22" ry="8" fill="currentColor" className="text-primary" />
                  
                  {/* Stems */}
                  <motion.path 
                    d="M425 420 Q420 380 430 360" 
                    stroke="currentColor" 
                    className="stroke-primary/80" 
                    strokeWidth="3" 
                    fill="none"
                    animate={{ d: ["M425 420 Q420 380 430 360", "M425 420 Q418 380 428 360", "M425 420 Q420 380 430 360"] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                  <motion.path 
                    d="M435 420 Q445 390 440 365" 
                    stroke="currentColor" 
                    className="stroke-primary/80" 
                    strokeWidth="3" 
                    fill="none"
                    animate={{ d: ["M435 420 Q445 390 440 365", "M435 420 Q448 390 443 365", "M435 420 Q445 390 440 365"] }}
                    transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                  />
                  
                  {/* Leaves */}
                  <motion.ellipse 
                    cx="430" cy="355" rx="15" ry="8" 
                    fill="currentColor" 
                    className="text-primary/70"
                    animate={{ rotate: [-10, 10, -10] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    style={{ transformOrigin: "430px 360px" }}
                  />
                  <motion.ellipse 
                    cx="445" cy="365" rx="12" ry="7" 
                    fill="currentColor" 
                    className="text-primary/60"
                    transform="rotate(30 445 365)"
                    animate={{ rotate: [25, 35, 25] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 0.3 }}
                    style={{ transformOrigin: "445px 370px" }}
                  />
                  <motion.ellipse 
                    cx="420" cy="370" rx="10" ry="6" 
                    fill="currentColor" 
                    className="text-primary/50"
                    transform="rotate(-20 420 370)"
                    animate={{ rotate: [-25, -15, -25] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 0.6 }}
                    style={{ transformOrigin: "420px 375px" }}
                  />
                  
                  {/* Flower buds */}
                  <motion.circle 
                    cx="428" cy="350" r="5" 
                    fill="currentColor" 
                    className="text-primary/40"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.circle 
                    cx="442" cy="358" r="4" 
                    fill="currentColor" 
                    className="text-primary/30"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  />
                </motion.g>

                {/* Floating sparkles/particles */}
                {[
                  { cx: 180, cy: 150, delay: 0 },
                  { cx: 350, cy: 200, delay: 0.5 },
                  { cx: 150, cy: 350, delay: 1 },
                  { cx: 450, cy: 350, delay: 1.5 },
                  { cx: 320, cy: 100, delay: 2 },
                ].map((particle, i) => (
                  <motion.circle
                    key={i}
                    cx={particle.cx}
                    cy={particle.cy}
                    r="4"
                    fill="currentColor"
                    className="text-primary/40"
                    animate={{
                      y: [0, -15, 0],
                      opacity: [0.4, 0.8, 0.4],
                      scale: [1, 1.5, 1]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: particle.delay
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
