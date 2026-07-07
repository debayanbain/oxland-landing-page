"use client";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  TrendingUp,
  Bell,
  MapPinned,
  Gavel,
  Activity,
} from "lucide-react";
import CountUp from "@/components/CountUp.tsx";

const EASE = [0.22, 1, 0.36, 1] as const;

const tickerItems = [
  { tone: "indigo", text: "Parcel KA-441 — owner meeting confirmed", time: "2m" },
  { tone: "warning", text: "Litigation LC-089 — order uploaded", time: "1h" },
  { tone: "success", text: "Survey complete · 28 parcels", time: "3h" },
];

const toneDot: Record<string, string> = {
  indigo: "bg-brand-indigo",
  warning: "bg-warning",
  success: "bg-success",
};

const bars = [
  { label: "Identified", value: 92 },
  { label: "Negotiation", value: 64 },
  { label: "Award", value: 38 },
  { label: "Closed", value: 22 },
];

export default function FeaturesCta() {
  const reduce = useReducedMotion();

  return (
    <section className="relative py-20 sm:py-28">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="relative overflow-hidden rounded-[40px] border border-brand-navy/10 shadow-float"
          style={{
            background:
              "linear-gradient(135deg, #f7f8ff 0%, #eef0fc 60%, #f4e8ff 100%)",
          }}
        >
          <div className="pointer-events-none absolute -top-32 -left-20 h-[420px] w-[420px] rounded-full blur-3xl opacity-60" style={{ background: "radial-gradient(closest-side, rgba(79,70,229,0.32), transparent 70%)" }} />
          <div className="pointer-events-none absolute -bottom-32 -right-20 h-[420px] w-[420px] rounded-full blur-3xl opacity-60" style={{ background: "radial-gradient(closest-side, rgba(124,58,237,0.32), transparent 70%)" }} />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(79,70,229,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(79,70,229,0.4) 1px, transparent 1px)",
              backgroundSize: "44px 44px",
            }}
          />

          <div className="relative grid items-center gap-12 px-8 py-16 lg:grid-cols-[1.15fr_1fr] lg:px-16 lg:py-20">
            {/* Copy */}
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-brand-indigo ring-1 ring-brand-indigo/20 backdrop-blur-md">
                <Sparkles size={11} />
                The whole platform · one walkthrough
              </span>

              <h2 className="mt-6 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-brand-navy sm:text-5xl lg:text-[56px]">
                See Oxland run on{" "}
                <span className="bg-gradient-to-r from-brand-blue via-brand-indigo to-brand-purple bg-clip-text text-transparent">
                  your project.
                </span>
              </h2>

              <p className="mt-5 max-w-xl text-base leading-relaxed text-brand-navy/65 sm:text-lg">
                Bring a real parcel set, a real case file, a real corridor map — we'll load it into a sandbox and walk you through every pillar with your data. 45 minutes. No slides.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() =>
                    window.dispatchEvent(
                      new CustomEvent("oxland:open-contact", {
                        detail: { reason: "demo" },
                      })
                    )
                  }
                  className="group inline-flex items-center gap-2 rounded-xl bg-brand-gradient px-6 py-3.5 text-sm font-semibold text-white shadow-soft transition-all hover:shadow-float"
                >
                  Book a sandbox walkthrough
                  <ArrowRight
                    size={15}
                    strokeWidth={2.5}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </button>
                <a
                  href="/pricing"
                  className="inline-flex items-center gap-2 rounded-xl border border-brand-navy/12 bg-white px-5 py-3.5 text-sm font-semibold text-brand-navy/80 hover:bg-brand-navy/5"
                >
                  See pricing
                </a>
              </div>
            </div>

            {/* Cinematic dashboard mock */}
            <div className="relative">
              {/* Perspective wrapper */}
              <div
                className="relative h-[440px] sm:h-[480px]"
                style={{ perspective: "1400px" }}
              >
                {/* Floating sub-card — back left (Map) */}
                <motion.div
                  initial={{ opacity: 0, y: 20, rotateY: -8 }}
                  whileInView={{ opacity: 1, y: 0, rotateY: -8 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
                  className="absolute left-0 top-2 w-[58%] origin-bottom-right rounded-2xl border border-brand-navy/10 bg-white p-4 shadow-card"
                  style={{ transformStyle: "preserve-3d", transform: "rotateY(-8deg) translateZ(-30px)" }}
                >
                  <motion.div
                    animate={reduce ? {} : { y: [0, -6, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-brand-navy/55">
                      <span className="flex items-center gap-1.5">
                        <MapPinned size={11} className="text-brand-indigo" />
                        GIS preview
                      </span>
                      <span className="text-brand-navy/35">23.2°N · 77.4°E</span>
                    </div>

                    {/* Mini map */}
                    <div
                      className="relative mt-3 h-32 overflow-hidden rounded-xl bg-gradient-to-br from-[#f5f7ff] to-[#eef0fc]"
                      style={{
                        backgroundImage:
                          "linear-gradient(rgba(79,70,229,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(79,70,229,0.08) 1px, transparent 1px)",
                        backgroundSize: "20px 20px",
                      }}
                    >
                      <svg viewBox="0 0 200 130" className="absolute inset-0 h-full w-full">
                        <defs>
                          <linearGradient id="cta-parcel" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.35" />
                            <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.25" />
                          </linearGradient>
                        </defs>
                        <polygon points="50,30 95,28 100,75 55,78" fill="url(#cta-parcel)" stroke="#4F46E5" strokeWidth="1.5" />
                        <polygon points="100,28 145,32 142,76 100,75" fill="url(#cta-parcel)" stroke="#4F46E5" strokeWidth="1.5" />
                        <polygon points="55,78 100,75 105,108 60,110" fill="rgba(167,139,250,0.25)" stroke="#7C3AED" strokeWidth="1.2" />
                        <polygon points="100,75 142,76 148,108 105,108" fill="url(#cta-parcel)" stroke="#4F46E5" strokeWidth="1.5" />
                        <circle cx="120" cy="92" r="3" fill="#4F46E5">
                          <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite" />
                        </circle>
                      </svg>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-wider text-brand-navy/45">Parcels</div>
                        <div className="font-display text-base font-extrabold text-brand-navy tabular-nums">
                          <CountUp client:visible to={142} />
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-wider text-brand-navy/45">Acquired</div>
                        <div className="font-display text-base font-extrabold text-brand-indigo tabular-nums">68 ha</div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Floating sub-card — back right (Alerts) */}
                <motion.div
                  initial={{ opacity: 0, y: 20, rotateY: 8 }}
                  whileInView={{ opacity: 1, y: 0, rotateY: 8 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease: EASE, delay: 0.25 }}
                  className="absolute right-0 top-0 w-[54%] origin-bottom-left rounded-2xl border border-brand-navy/10 bg-white p-4 shadow-card"
                  style={{ transformStyle: "preserve-3d", transform: "rotateY(8deg) translateZ(-30px)" }}
                >
                  <motion.div
                    animate={reduce ? {} : { y: [0, -8, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                  >
                    <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-brand-navy/55">
                      <span className="flex items-center gap-1.5">
                        <Bell size={11} className="text-brand-purple" />
                        Live activity
                      </span>
                      <span className="rounded-full bg-success/10 px-1.5 py-0.5 text-[9px] font-bold text-success">3 new</span>
                    </div>

                    <ul className="mt-3 space-y-2.5">
                      {tickerItems.map((t, i) => (
                        <motion.li
                          key={t.text}
                          initial={{ opacity: 0, x: 6 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, ease: EASE, delay: 0.5 + i * 0.15 }}
                          className="flex items-start gap-2"
                        >
                          <span className={`mt-1 h-1.5 w-1.5 shrink-0 rounded-full ${toneDot[t.tone]} animate-pulse-soft`} />
                          <div className="flex-1">
                            <div className="text-[11px] font-semibold leading-snug text-brand-navy">
                              {t.text}
                            </div>
                            <div className="text-[10px] text-brand-navy/45">{t.time} ago</div>
                          </div>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </motion.div>

                {/* Foreground dashboard card */}
                <motion.div
                  initial={{ opacity: 0, y: 28, scale: 0.96 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
                  className="absolute left-[14%] right-[14%] bottom-0 rounded-3xl border border-brand-navy/10 bg-white p-5 shadow-float"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-brand-navy/55">
                        <span className="grid h-5 w-5 place-items-center rounded-md bg-brand-indigo/10 text-brand-indigo">
                          <Activity size={11} strokeWidth={2.5} />
                        </span>
                        Acquisition pipeline
                      </div>
                      <div className="mt-1 font-display text-sm font-extrabold text-brand-navy">
                        Bhopal-Sehore · Phase 2
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-success/10 px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-success">
                      <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse-soft" />
                      Live
                    </span>
                  </div>

                  {/* Mini bar chart */}
                  <div className="mt-4 flex items-end justify-between gap-2 px-1">
                    {bars.map((b, i) => (
                      <div key={b.label} className="flex flex-1 flex-col items-center gap-1">
                        <div className="relative flex h-20 w-full items-end overflow-hidden rounded-md bg-brand-navy/5">
                          <motion.div
                            initial={{ height: 0 }}
                            whileInView={{ height: `${b.value}%` }}
                            viewport={{ once: true, margin: "-15%" }}
                            transition={{ duration: 1.1, ease: EASE, delay: 0.4 + i * 0.12 }}
                            className="w-full rounded-md bg-gradient-to-t from-brand-indigo to-brand-purple shadow-[0_2px_8px_rgba(79,70,229,0.35)]"
                          >
                            <motion.span
                              animate={{ x: ["-100%", "200%"] }}
                              transition={{ duration: 2.4, repeat: Infinity, ease: "linear", delay: 0.4 + i * 0.12 + 1 }}
                              className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                            />
                          </motion.div>
                        </div>
                        <div className="text-[9px] font-bold uppercase tracking-wider text-brand-navy/45">
                          {b.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* KPI row */}
                  <div className="mt-4 grid grid-cols-3 gap-2 border-t border-brand-navy/8 pt-4">
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-brand-navy/45">Awards</div>
                      <div className="font-display text-base font-extrabold text-brand-navy">
                        ₹<CountUp client:visible to={24.6} decimals={1} separator={false} /> Cr
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-brand-navy/45">Families</div>
                      <div className="font-display text-base font-extrabold text-brand-navy">
                        <CountUp client:visible to={218} />
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-brand-navy/45">Cycle</div>
                      <div className="font-display text-base font-extrabold text-brand-indigo">11.4mo</div>
                    </div>
                  </div>
                </motion.div>

                {/* Tiny floating chip — case */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.7 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: EASE, delay: 0.7 }}
                  className="absolute right-4 bottom-32"
                >
                  <motion.div
                    animate={reduce ? {} : { y: [0, -6, 0] }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
                    className="flex items-center gap-2 rounded-2xl border border-brand-navy/10 bg-white px-3 py-2 shadow-card"
                  >
                    <span className="grid h-7 w-7 place-items-center rounded-lg bg-brand-purple/10 text-brand-purple">
                      <Gavel size={12} strokeWidth={2.5} />
                    </span>
                    <div>
                      <div className="text-[9px] font-bold uppercase tracking-wider text-brand-navy/45">Cases</div>
                      <div className="font-display text-xs font-extrabold text-brand-navy">
                        <CountUp client:visible to={86} /> active
                      </div>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Tiny floating chip — ROI */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.7 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: EASE, delay: 0.85 }}
                  className="absolute left-2 bottom-44"
                >
                  <motion.div
                    animate={reduce ? {} : { y: [0, -8, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="flex items-center gap-2 rounded-2xl border border-brand-indigo/25 bg-gradient-to-br from-brand-indigo to-brand-purple px-3 py-2 shadow-float text-white"
                  >
                    <TrendingUp size={14} strokeWidth={2.5} />
                    <div>
                      <div className="text-[9px] font-bold uppercase tracking-wider text-white/80">Faster</div>
                      <div className="font-display text-xs font-extrabold">
                        <CountUp client:visible to={62} suffix="%" /> cycles
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
