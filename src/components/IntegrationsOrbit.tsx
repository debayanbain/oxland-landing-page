import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CARDS = [
  {
    name: "FlowSync",
    brand: "orange",
    angle: 190,
    floatDelay: 0,
    type: "image",
    src: "/FlowSyncc.png"
  },
  {
    name: "PipeFlow",
    brand: "blue",
    angle: 225,
    floatDelay: -1.5,
    type: "svg",
    renderIcon: () => (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="13" stroke="#0C65FF" strokeWidth="7.5" strokeDasharray="62 20" strokeLinecap="round" transform="rotate(-120 20 20)" />
        <circle cx="20" cy="20" r="4.5" fill="#0C65FF" />
      </svg>
    )
  },
  {
    name: "LinkHive",
    brand: "indigo",
    angle: 145,
    floatDelay: -3.0,
    type: "image",
    src: "/LinkHive.png"
  },
  {
    name: "CoreSuite",
    brand: "cyan",
    angle: 315,
    floatDelay: -4.5,
    type: "svg",
    renderIcon: () => (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="12" stroke="#00A3FF" strokeWidth="6.5" strokeDasharray="45 30" strokeLinecap="round" />
        <circle cx="20" cy="20" r="12" stroke="#0057FF" strokeWidth="6.5" strokeDasharray="15 60" strokeLinecap="round" transform="rotate(120 20 20)" />
        <path d="M20 14A6 6 0 1 1 14 20" stroke="#0057FF" strokeWidth="3.5" strokeLinecap="round" />
      </svg>
    )
  },
  {
    name: "GrowMate",
    brand: "green",
    angle: 350,
    floatDelay: -2.0,
    type: "svg",
    renderIcon: () => (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="4" fill="#00C288" />
        <circle cx="20" cy="9" r="4" fill="#00C288" />
        <circle cx="20" cy="31" r="4" fill="#00C288" />
        <circle cx="9" cy="20" r="4" fill="#00C288" />
        <circle cx="31" cy="20" r="4" fill="#00C288" />
        <circle cx="12" cy="12" r="2.5" fill="#00C288" opacity="0.6" />
        <circle cx="28" cy="12" r="2.5" fill="#00C288" opacity="0.6" />
        <circle cx="12" cy="28" r="2.5" fill="#00C288" opacity="0.6" />
        <circle cx="28" cy="28" r="2.5" fill="#00C288" opacity="0.6" />
      </svg>
    )
  },
  {
    name: "WorkStream",
    brand: "emerald",
    angle: 45,
    floatDelay: -3.5,
    type: "svg",
    renderIcon: () => (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect x="7" y="7" width="12" height="12" rx="4.5" fill="#00C875" />
        <rect x="21" y="7" width="12" height="12" rx="4.5" fill="#00C875" />
        <rect x="7" y="21" width="12" height="12" rx="4.5" fill="#00C875" />
        <rect x="21" y="21" width="12" height="12" rx="4.5" fill="#00C875" />
      </svg>
    )
  }
];

const STATIC_DOTS = [
  { angle: 208, color: "text-[#ff5e29] bg-[#ff5e29]", delay: 0 },
  { angle: 170, color: "text-[#0c65ff] bg-[#0c65ff]", delay: -0.5 },
  { angle: 125, color: "text-[#0c65ff] bg-[#0c65ff]", delay: -1 },
  { angle: 345, color: "text-[#00c288] bg-[#00c288]", delay: -2 },
  { angle: 300, color: "text-[#7e22ce] bg-[#7e22ce]", delay: -2.5 },
  { angle: 60, color: "text-[#00a3ff] bg-[#00a3ff]", delay: -1.5 }
];

export default function IntegrationsOrbit() {
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax spring values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 150, damping: 22 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 22 });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 992);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Map to max 20px translation
    mouseX.set((x / rect.width) * 20);
    mouseY.set((y / rect.height) * 20);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  if (isMobile) {
    return (
      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 max-w-md mx-auto z-10 relative px-4">
        {CARDS.map((card) => (
          <div key={card.name} className="flex flex-col items-center">
            <div className="relative flex h-[76px] w-[76px] items-center justify-center rounded-2xl bg-white border border-slate-200/60 shadow-[0_8px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] transition-all duration-300">
              {card.type === "image" ? (
                <img src={card.src} alt={card.name} className="w-11 h-11 object-contain" />
              ) : (
                card.renderIcon?.()
              )}
            </div>
            <span className="mt-2 text-xs font-bold text-slate-800">{card.name}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[1050px] h-[550px] flex items-center justify-center overflow-visible"
    >
      {/* Parallax moving wrapper */}
      <motion.div
        style={{ x: springX, y: springY }}
        className="absolute inset-0 flex items-center justify-center overflow-visible select-none"
      >
        {/* Central visual info */}
        <div className="absolute z-10 max-w-[480px] text-center flex flex-col items-center pointer-events-auto">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1 text-xs font-extrabold tracking-wider text-brand-indigo bg-brand-indigo/5 uppercase">
            <span className="text-[10px]">✦</span> Integrations
          </div>
          <h2 className="mt-5 font-display text-4xl font-extrabold leading-tight tracking-tight text-brand-navy sm:text-[46px]">
            Integrate with the <span className="bg-gradient-to-r from-brand-indigo to-brand-purple bg-clip-text text-transparent">leading tools</span>
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-brand-navy/60 font-medium">
            Connect Oxland with the tools you already use.<br />
            Work smarter, automate more, and grow faster.
          </p>
          <div className="mt-8">
            <Magnetic strength={0.15}>
              <a
                href="#"
                className="inline-flex items-center gap-2.5 rounded-full bg-brand-gradient px-8 py-3.5 text-[15px] font-bold text-white shadow-[0_10px_25px_rgba(79,70,229,0.3)] hover:shadow-[0_16px_32px_rgba(79,70,229,0.4)] transition-all duration-300 hover:-translate-y-0.5 group"
              >
                Explore Integrations
                <svg
                  className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <path
                    d="M1.66669 12.3333L12.3334 1.66663M12.3334 1.66663H4.33335M12.3334 1.66663V9.66663"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </Magnetic>
          </div>
        </div>

        {/* Orbit Ellipse Track Lines & Animated Particles */}
        <div className="absolute inset-0 pointer-events-none z-20">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 1000 500" fill="none" shapeRendering="geometricPrecision">
            <defs>
              <radialGradient id="glow-blue" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#0C65FF" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#0C65FF" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="glow-green" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#00C288" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#00C288" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="glow-orange" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FF5E29" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#FF5E29" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="glow-purple" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#7E22CE" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#7E22CE" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Static dashed track - spins continuously in CSS */}
            <ellipse
              cx="500"
              cy="250"
              rx="460"
              ry="210"
              stroke="rgba(111, 66, 193, 0.15)"
              strokeWidth="2"
              strokeDasharray="6 8"
              className="orbit-track-dashed will-change-transform"
            />

            {/* Glowing comets moving along elliptical path using animateMotion */}
            <g className="will-change-transform transform-gpu">
              <animateMotion dur="28s" repeatCount="indefinite" path="M 40,250 a 460,210 0 1,0 920,0 a 460,210 0 1,0 -920,0" />
              <circle r="14" fill="url(#glow-blue)" opacity="0.6" style={{ filter: "blur(3px)" }} />
              <circle r="4.5" fill="#0C65FF" />
            </g>
            <g className="will-change-transform transform-gpu">
              <animateMotion dur="20s" begin="-7s" repeatCount="indefinite" path="M 40,250 a 460,210 0 1,0 920,0 a 460,210 0 1,0 -920,0" />
              <circle r="14" fill="url(#glow-green)" opacity="0.6" style={{ filter: "blur(3px)" }} />
              <circle r="4.5" fill="#00C288" />
            </g>
            <g className="will-change-transform transform-gpu">
              <animateMotion dur="35s" begin="-15s" repeatCount="indefinite" path="M 40,250 a 460,210 0 1,0 920,0 a 460,210 0 1,0 -920,0" />
              <circle r="14" fill="url(#glow-orange)" opacity="0.6" style={{ filter: "blur(3px)" }} />
              <circle r="4.5" fill="#FF5E29" />
            </g>
            <g className="will-change-transform transform-gpu">
              <animateMotion dur="24s" begin="-20s" repeatCount="indefinite" path="M 40,250 a 460,210 0 1,0 920,0 a 460,210 0 1,0 -920,0" />
              <circle r="14" fill="url(#glow-purple)" opacity="0.6" style={{ filter: "blur(3px)" }} />
              <circle r="4.5" fill="#7E22CE" />
            </g>
          </svg>
        </div>

        {/* Orbiting Static Glowing Dots */}
        {STATIC_DOTS.map((dot, index) => {
          const rad = (dot.angle * Math.PI) / 180;
          const leftPercent = 50 + Math.cos(rad) * 46; // rx = 46%
          const topPercent = 50 + Math.sin(rad) * 42; // ry = 42%
          return (
            <div
              key={`dot-${index}`}
              style={{
                left: `${leftPercent}%`,
                top: `${topPercent}%`,
                animationDelay: `${dot.delay}s`
              }}
              className={`absolute w-2 h-2 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10 shadow-[0_0_10px_currentColor] animate-[pulse_3s_infinite_ease-in-out] ${dot.color} will-change-transform transform-gpu`}
            />
          );
        })}

        {/* Orbit Integration Cards */}
        {CARDS.map((card) => {
          const rad = (card.angle * Math.PI) / 180;
          const leftPercent = 50 + Math.cos(rad) * 46; // rx = 46%
          const topPercent = 50 + Math.sin(rad) * 42; // ry = 42%
          
          let brandGlowColor = "hover:shadow-[0_16px_36px_rgba(79,70,229,0.35)] hover:border-brand-indigo/50";
          if (card.brand === "orange") brandGlowColor = "hover:shadow-[0_16px_36px_rgba(255,94,41,0.35)] hover:border-orange-500/50";
          if (card.brand === "blue") brandGlowColor = "hover:shadow-[0_16px_36px_rgba(12,101,255,0.35)] hover:border-blue-500/50";
          if (card.brand === "indigo") brandGlowColor = "hover:shadow-[0_16px_36px_rgba(67,83,255,0.35)] hover:border-indigo-500/50";
          if (card.brand === "cyan") brandGlowColor = "hover:shadow-[0_16px_36px_rgba(0,163,255,0.35)] hover:border-cyan-500/50";
          if (card.brand === "green") brandGlowColor = "hover:shadow-[0_16px_36px_rgba(0,194,136,0.35)] hover:border-emerald-500/50";
          if (card.brand === "emerald") brandGlowColor = "hover:shadow-[0_16px_36px_rgba(0,200,117,0.35)] hover:border-emerald-500/50";

          return (
            <div
              key={card.name}
              style={{
                left: `${leftPercent}%`,
                top: `${topPercent}%`,
              }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-30 select-none group pointer-events-none"
            >
              {/* Floating wrapper (only translates Y) */}
              <div
                style={{ animationDelay: `${card.floatDelay}s` }}
                className="animate-[float_8s_ease-in-out_infinite] pointer-events-auto will-change-transform"
              >
                {/* Scale/Shadow hover wrapper (only handles hover transitions) */}
                <div className="flex flex-col items-center transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110 will-change-transform transform-gpu">
                  <div className={`w-[86px] h-[86px] bg-white rounded-2xl flex items-center justify-center border border-slate-200/60 shadow-[0_12px_30px_rgba(0,0,0,0.04)] transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer ${brandGlowColor}`}>
                    {card.type === "image" ? (
                      <img src={card.src} alt={card.name} className="w-[50px] h-[50px] object-contain select-none" draggable="false" />
                    ) : (
                      card.renderIcon?.()
                    )}
                  </div>
                  <span className="mt-2.5 text-[13px] font-bold text-slate-800 transition-colors duration-300 group-hover:text-brand-purple select-none [text-shadow:0_2px_4px_rgba(255,255,255,0.8)]">
                    {card.name}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </motion.div>

      {/* Styled component keyframe animation imports */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translate3d(0, 0px, 0); }
          50% { transform: translate3d(0, -6px, 0); }
        }
        .orbit-track-dashed {
          animation: orbit-track-flow 35s linear infinite;
        }
        @keyframes orbit-track-flow {
          from { stroke-dashoffset: 0; }
          to { stroke-dashoffset: -140; }
        }
      `}</style>
    </div>
  );
}

// Magnetic sub-helper locally defined
function Magnetic({ children, strength = 0.2 }: { children: React.ReactElement; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 150, damping: 18 });
  const sy = useSpring(y, { stiffness: 150, damping: 18 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const mx = e.clientX - rect.left - rect.width / 2;
    const my = e.clientY - rect.top - rect.height / 2;
    x.set(mx * strength);
    y.set(my * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: sx, y: sy }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}
