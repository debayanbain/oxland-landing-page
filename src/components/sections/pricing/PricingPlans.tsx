"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowUpRight, Sparkles, Shield, Building2, Minus } from "lucide-react";

type Plan = {
  name: string;
  tagline: string;
  icon: React.ReactNode;
  monthlyPrice: number | "Custom";
  yearlyPrice: number | "Custom";
  unit: string;
  description: string;
  cta: string;
  features: { label: string; included: boolean }[];
  popular: boolean;
};

const PLANS: Plan[] = [
  {
    name: "Starter",
    tagline: "For a single project team",
    icon: <Sparkles size={22} className="text-brand-indigo" strokeWidth={2} />,
    monthlyPrice: 24999,
    yearlyPrice: 19999,
    unit: "/month",
    description:
      "Everything a 5–10 person team needs to run their first acquisition project end to end.",
    cta: "Start free pilot",
    features: [
      { label: "Up to 2,500 parcels", included: true },
      { label: "1 active project", included: true },
      { label: "5 user seats", included: true },
      { label: "GIS + cadastre import", included: true },
      { label: "Basic litigation tracker", included: true },
      { label: "Document repository (20 GB)", included: true },
      { label: "Email support", included: true },
      { label: "Audit-grade exports", included: false },
    ],
    popular: false,
  },
  {
    name: "Growth",
    tagline: "Most chosen by infra & real-estate teams",
    icon: <Shield size={22} className="text-brand-indigo" strokeWidth={2} />,
    monthlyPrice: 64999,
    yearlyPrice: 51999,
    unit: "/month",
    description:
      "Multi-project orchestration with full litigation, R&R, OCR and drone modules unlocked.",
    cta: "Get a guided demo",
    features: [
      { label: "Up to 25,000 parcels", included: true },
      { label: "Unlimited projects", included: true },
      { label: "25 user seats", included: true },
      { label: "Full GIS layer engine", included: true },
      { label: "Litigation + DSR workflows", included: true },
      { label: "OCR (100K pages / month)", included: true },
      { label: "R&R + compensation ledger", included: true },
      { label: "Drone + IoT integrations", included: true },
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    tagline: "For PSUs, state nodal agencies & 1000+ parcel rollouts",
    icon: <Building2 size={22} className="text-brand-indigo" strokeWidth={2} />,
    monthlyPrice: "Custom",
    yearlyPrice: "Custom",
    unit: "",
    description:
      "On-prem or sovereign cloud, custom integrations, dedicated CSM and 24×7 NOC support.",
    cta: "Talk to sales",
    features: [
      { label: "Unlimited parcels & projects", included: true },
      { label: "Unlimited seats + SSO/SCIM", included: true },
      { label: "On-prem / sovereign cloud", included: true },
      { label: "Custom GIS layer onboarding", included: true },
      { label: "Dedicated CSM + NOC", included: true },
      { label: "Custom SLAs & DPAs", included: true },
      { label: "White-label & API access", included: true },
      { label: "Compliance audit support", included: true },
    ],
    popular: false,
  },
];

const fmtINR = (n: number) =>
  new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(n);

export default function PricingPlans() {
  const [yearly, setYearly] = useState(true);

  return (
    <>
      <style>{`
        @keyframes svgDrawBorder { to { stroke-dashoffset: 0; } }
        @keyframes svgTravelGlow { to { stroke-dashoffset: -2400; } }
        @media (prefers-reduced-motion: reduce) {
          @keyframes svgDrawBorder { from { stroke-dashoffset: 0; } to { stroke-dashoffset: 0; } }
          @keyframes svgTravelGlow { to { stroke-dashoffset: 0; } }
        }
      `}</style>
      <section id="plans" className="relative py-12 sm:py-16">
        <div className="container">
          {/* Toggle */}
          <div className="flex flex-col items-center">
            <div className="relative inline-flex items-center rounded-full bg-[#f0f2fb] p-1 shadow-inner">
              <button
                onClick={() => setYearly(false)}
                className={`relative z-10 rounded-full px-6 py-2 text-sm font-semibold transition-colors duration-200 ${
                  !yearly ? "text-white" : "text-brand-navy/60 hover:text-brand-navy"
                }`}
              >
                {!yearly && (
                  <motion.span
                    layoutId="pricing-toggle-pill"
                    transition={{ type: "spring", stiffness: 400, damping: 34 }}
                    className="absolute inset-0 -z-10 rounded-full bg-brand-gradient shadow-soft"
                    aria-hidden
                  />
                )}
                Monthly
              </button>
              <button
                onClick={() => setYearly(true)}
                className={`relative z-10 inline-flex items-center gap-2 rounded-full px-6 py-2 text-sm font-semibold transition-colors duration-200 ${
                  yearly ? "text-white" : "text-brand-navy/60 hover:text-brand-navy"
                }`}
              >
                {yearly && (
                  <motion.span
                    layoutId="pricing-toggle-pill"
                    transition={{ type: "spring", stiffness: 400, damping: 34 }}
                    className="absolute inset-0 -z-10 rounded-full bg-brand-gradient shadow-soft"
                    aria-hidden
                  />
                )}
                Yearly
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider transition-colors ${
                    yearly ? "bg-white/20 text-white" : "bg-brand-indigo/10 text-brand-indigo"
                  }`}
                >
                  Save 20%
                </span>
              </button>
            </div>
            <p className="mt-3 text-xs text-brand-navy/55">
              All prices in INR. GST applicable as per Indian tax law.
            </p>
          </div>

          {/* Cards */}
          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3 max-w-7xl mx-auto">
            {PLANS.map((plan, i) => {
              const price = yearly ? plan.yearlyPrice : plan.monthlyPrice;
              const isCustom = price === "Custom";
              return (
                <div key={plan.name} className={`relative ${plan.popular ? "lg:-mt-4" : ""}`}>
                  <svg
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 h-full w-full"
                    style={{ overflow: "visible" }}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <linearGradient id={`plan-grad-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#2F5BFF" />
                        <stop offset="50%" stopColor="#6366f1" />
                        <stop offset="100%" stopColor="#a855f7" />
                      </linearGradient>
                    </defs>
                    <rect
                      x="0"
                      y="0"
                      width="100%"
                      height="100%"
                      rx="24"
                      fill="none"
                      stroke={`url(#plan-grad-${i})`}
                      strokeWidth={plan.popular ? "2.25" : "1.5"}
                      style={{
                        strokeDasharray: 2400,
                        strokeDashoffset: 2400,
                        animation: `svgDrawBorder 2.2s cubic-bezier(0.4,0,0.2,1) ${i * 0.22}s forwards`,
                      }}
                    />
                    {plan.popular && (
                      <rect
                        x="0"
                        y="0"
                        width="100%"
                        height="100%"
                        rx="24"
                        fill="none"
                        stroke="#a78bfa"
                        strokeWidth="5"
                        strokeLinecap="round"
                        style={{
                          strokeDasharray: "90 2310",
                          strokeDashoffset: 0,
                          animation: "svgTravelGlow 3.4s linear infinite",
                          filter: "blur(5px)",
                          opacity: 0.85,
                        }}
                      />
                    )}
                  </svg>

                  <div
                    className={`relative overflow-hidden rounded-3xl p-8 transition-all duration-300 h-full flex flex-col ${
                      plan.popular
                        ? "border-2 border-brand-indigo/40 bg-white shadow-float"
                        : "border border-brand-navy/10 bg-white shadow-card"
                    }`}
                  >
                    {plan.popular && (
                      <>
                        <div className="absolute right-0 top-0 overflow-hidden w-28 h-28">
                          <div className="absolute top-[22px] right-[-32px] w-[130px] rotate-45 bg-gradient-to-r from-brand-indigo to-brand-purple py-1.5 text-center text-[10px] font-extrabold uppercase tracking-widest text-white shadow-sm">
                            Most popular
                          </div>
                        </div>
                        <div
                          className="pointer-events-none absolute inset-0 opacity-[0.05]"
                          style={{
                            backgroundImage:
                              "radial-gradient(circle, #6366f1 1px, transparent 1px)",
                            backgroundSize: "18px 18px",
                          }}
                        />
                      </>
                    )}

                    {/* Icon + name */}
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-indigo/8 shadow-[0_2px_8px_rgba(79,70,229,0.12)]">
                        {plan.icon}
                      </div>
                      <div>
                        <h3 className="font-display text-2xl font-extrabold text-brand-navy leading-tight">
                          {plan.name}
                        </h3>
                        <div className="mt-1 h-0.5 w-10 rounded-full bg-gradient-to-r from-brand-indigo to-brand-purple" />
                      </div>
                    </div>

                    <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-brand-indigo/80">
                      {plan.tagline}
                    </p>

                    {/* Price */}
                    <div className="mt-6 min-h-[72px]">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={`${plan.name}-${yearly}`}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.25 }}
                          className="flex items-baseline gap-1"
                        >
                          {isCustom ? (
                            <span className="font-display text-5xl font-extrabold tracking-tight text-brand-navy">
                              Let's talk
                            </span>
                          ) : (
                            <>
                              <span className="text-2xl font-semibold text-brand-navy/55">₹</span>
                              <span className="font-display text-5xl font-extrabold tracking-tight text-brand-navy">
                                {fmtINR(price as number)}
                              </span>
                              <span className="ml-1 text-sm text-brand-navy/50">{plan.unit}</span>
                            </>
                          )}
                        </motion.div>
                      </AnimatePresence>
                      {!isCustom && yearly && (
                        <p className="mt-1 text-xs font-semibold text-brand-indigo">
                          billed annually · 20% off
                        </p>
                      )}
                      {!isCustom && !yearly && (
                        <p className="mt-1 text-xs text-brand-navy/50">billed monthly</p>
                      )}
                    </div>

                    {/* Description */}
                    <p className="mt-2 text-sm leading-relaxed text-brand-navy/65">
                      {plan.description}
                    </p>

                    {/* CTA */}
                    <button
                      className={`mt-7 inline-flex items-center justify-center gap-1.5 rounded-full px-5 py-3 text-sm font-semibold transition-all duration-200 ${
                        plan.popular
                          ? "bg-gradient-to-r from-brand-indigo to-brand-purple text-white shadow-soft hover:shadow-float"
                          : "border border-brand-indigo/30 text-brand-indigo hover:bg-brand-indigo/5"
                      }`}
                    >
                      {plan.cta}
                      <ArrowUpRight size={14} strokeWidth={2.5} />
                    </button>

                    <div className="my-7 h-px bg-brand-navy/6" />

                    {/* Features */}
                    <ul className="space-y-3 flex-1">
                      {plan.features.map((f) => (
                        <li
                          key={f.label}
                          className={`flex items-start gap-2.5 text-sm ${
                            f.included ? "text-brand-navy/80" : "text-brand-navy/35 line-through"
                          }`}
                        >
                          <span
                            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full mt-0.5 ${
                              f.included
                                ? plan.popular
                                  ? "bg-brand-indigo text-white"
                                  : "bg-brand-indigo/10 text-brand-indigo"
                                : "bg-brand-navy/8 text-brand-navy/40"
                            }`}
                          >
                            {f.included ? (
                              <Check size={11} strokeWidth={3} />
                            ) : (
                              <Minus size={11} strokeWidth={3} />
                            )}
                          </span>
                          <span>{f.label}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
