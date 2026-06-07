import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

export default function LaptopShowcase() {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const rotateX = useTransform(scrollYProgress, [0.05, 0.45], [-90, 0]);
  const screenOpacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);
  const scale = useTransform(scrollYProgress, [0.0, 0.4], [0.92, 1]);
  const glow = useTransform(scrollYProgress, [0.1, 0.5], [0, 1]);

  return (
    <section
      id="preview"
      ref={ref}
      className="relative py-12 sm:py-16"
      style={{ minHeight: reduce ? undefined : "180vh" }}
    >
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-indigo/70">
            Live preview
          </span>
          <h2 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-brand-navy sm:text-5xl">
            See Oxland <span className="text-gradient">come to life</span>
          </h2>
          <p className="mt-4 text-lg text-brand-navy/60">
            Scroll to open the lid — a real glimpse of the LRMS dashboard your land team will work in every day.
          </p>
        </div>

        <div className={reduce ? "mt-14" : "sticky top-24 mt-14"}>
          <div className="relative mx-auto" style={{ perspective: 2200, maxWidth: 1200 }}>
            <motion.div
              aria-hidden
              className="pointer-events-none absolute -inset-24 rounded-[48px] bg-[radial-gradient(closest-side,rgba(124,58,237,0.22),transparent_70%)]"
              style={{ opacity: reduce ? 1 : glow }}
            />

            <motion.div
              className="relative"
              style={{
                transformStyle: "preserve-3d",
                scale: reduce ? 1 : scale,
              }}
            >
              <Lid rotateX={reduce ? 0 : rotateX} screenOpacity={reduce ? 1 : screenOpacity} reduce={!!reduce} />
              <Base />
            </motion.div>
          </div>
        </div>

        {!reduce && <div className="h-[80vh]" aria-hidden />}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* MacBook chassis                                                    */
/* ------------------------------------------------------------------ */

function Lid({
  rotateX,
  screenOpacity,
  reduce,
}: {
  rotateX: number | import("framer-motion").MotionValue<number>;
  screenOpacity: number | import("framer-motion").MotionValue<number>;
  reduce: boolean;
}) {
  return (
    <motion.div
      className="relative mx-auto"
      style={{
        transformOrigin: "50% 100%",
        transformStyle: "preserve-3d",
        rotateX,
        width: "100%",
        aspectRatio: "16 / 10",
      }}
    >
      {/* Aluminum lid back — silver gradient, very subtle */}
      <div className="relative h-full w-full rounded-[20px] bg-gradient-to-b from-[#dadce3] via-[#c4c7d0] to-[#a8acb6] p-[4px] shadow-[0_30px_80px_-30px_rgba(11,20,55,0.55),inset_0_1px_0_rgba(255,255,255,0.6)]">
        {/* Inner black display bezel */}
        <div className="relative h-full w-full overflow-hidden rounded-[16px] bg-[#0a0a0a] ring-1 ring-inset ring-white/5">
          {/* MacBook notch */}
          <div className="absolute left-1/2 top-0 z-30 h-[16px] w-[96px] -translate-x-1/2 rounded-b-[10px] bg-black">
            <div className="absolute left-1/2 top-1/2 h-[3px] w-[3px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#222] ring-[1.5px] ring-[#0a0a0a]" />
          </div>

          {/* Display content */}
          <motion.div
            className="absolute inset-[5px] top-[16px] overflow-hidden rounded-[10px] bg-[#f3eeff]"
            style={{ opacity: screenOpacity }}
          >
            {/* macOS desktop wallpaper hint behind the window */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#1a1147] via-[#2d1a6b] to-[#7c3aed]" />
            <BrowserWindow />
          </motion.div>

          {/* Subtle screen reflection */}
          {!reduce && (
            <div
              aria-hidden
              className="pointer-events-none absolute inset-[5px] top-[16px] rounded-[10px]"
              style={{
                background:
                  "linear-gradient(115deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0) 30%, rgba(255,255,255,0) 70%, rgba(255,255,255,0.06) 100%)",
              }}
            />
          )}
        </div>
      </div>
    </motion.div>
  );
}

function Base() {
  return (
    <div className="relative mx-auto" style={{ width: "103%", transform: "translateX(-1.5%)" }}>
      {/* Hinge strip directly under the lid */}
      <div className="mx-auto h-[4px] w-[97%] rounded-b-[2px] bg-gradient-to-b from-[#8b8f9a] to-[#5f636e] shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]" />
      {/* Keyboard deck edge */}
      <div className="relative mx-auto h-[12px] rounded-b-[12px] bg-gradient-to-b from-[#cfd2da] via-[#b3b7c1] to-[#8c909a] shadow-[0_30px_80px_-25px_rgba(11,20,55,0.65)]">
        {/* MacBook lid-opening cutout */}
        <div className="absolute left-1/2 top-0 h-[6px] w-[80px] -translate-x-1/2 rounded-b-full bg-[#7b7f8a]" />
        {/* Side speaker grills */}
        <div className="absolute left-3 top-1.5 h-[5px] w-[12%] rounded-sm bg-[radial-gradient(circle,#5a5e69_1px,transparent_1.2px)] [background-size:3px_3px] opacity-60" />
        <div className="absolute right-3 top-1.5 h-[5px] w-[12%] rounded-sm bg-[radial-gradient(circle,#5a5e69_1px,transparent_1.2px)] [background-size:3px_3px] opacity-60" />
      </div>
      {/* Ground shadow */}
      <div className="mx-auto mt-3 h-7 w-[76%] rounded-[100%] bg-brand-navy/25 blur-2xl" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* The browser window inside the screen                               */
/* ------------------------------------------------------------------ */

function BrowserWindow() {
  return (
    <div className="absolute inset-1.5 flex flex-col overflow-hidden rounded-[8px] bg-white shadow-[0_8px_24px_-8px_rgba(0,0,0,0.35)] ring-1 ring-black/10">
      {/* macOS window chrome */}
      <div className="flex items-center gap-2 border-b border-black/5 bg-gradient-to-b from-[#f1f1f4] to-[#e6e6ea] px-2 py-1.5">
        {/* Traffic lights */}
        <div className="flex items-center gap-[5px]">
          <span className="h-[9px] w-[9px] rounded-full bg-[#ff5f57] ring-[0.5px] ring-black/10" />
          <span className="h-[9px] w-[9px] rounded-full bg-[#febc2e] ring-[0.5px] ring-black/10" />
          <span className="h-[9px] w-[9px] rounded-full bg-[#28c840] ring-[0.5px] ring-black/10" />
        </div>
        {/* URL pill */}
        <div className="mx-auto flex max-w-[60%] items-center gap-1 rounded-md bg-white px-2 py-[2px] text-[9px] text-brand-navy/60 ring-1 ring-black/5">
          <span className="text-emerald-500">🔒</span>
          <span className="font-mono">app.oxland.in</span>
          <span className="text-brand-navy/30">/walkthrough</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="h-[8px] w-[8px] rounded-sm bg-brand-navy/10" />
          <span className="h-[8px] w-[8px] rounded-sm bg-brand-navy/10" />
        </div>
      </div>

      {/* Embedded walkthrough video */}
      <div className="relative flex-1 overflow-hidden bg-black">
        <iframe
          src="https://www.youtube.com/embed/jGXP2aehwPQ?autoplay=1&mute=1&loop=1&playlist=jGXP2aehwPQ&controls=1&modestbranding=1&rel=0"
          title="Oxland walkthrough"
          className="absolute inset-0 h-full w-full"
          frameBorder={0}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    </div>
  );
}

