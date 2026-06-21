"use client";
import { useState } from "react";
import { Check, ArrowUpRight, Sparkles, Shield } from "lucide-react";

const enterprise = {
  name: "Enterprise Plan",
  icon: <Sparkles size={22} className="text-brand-indigo" strokeWidth={2} />,
  monthlyPrice: 39,
  yearlyPrice: 29,
  description:
    "Perfect for solo founders and small teams who are building their customer base from.",
  cta: "Upgrade to Pro",
  features: [
    "Up to 1000 contacts",
    "Unlimited storage",
    "Advance analytics",
    "Enhanced analytics tools",
    "Custom branding options",
    "Dedicated account support",
  ],
  popular: false,
};

const pro = {
  name: "Pro Plan",
  icon: <Shield size={22} className="text-brand-indigo" strokeWidth={2} />,
  monthlyPrice: 29,
  yearlyPrice: 19,
  description:
    "Perfect for solo founders and small teams who are building their customer base from.",
  cta: "Upgrade to Pro",
  features: [
    "Up to 500 contacts",
    "Up to 200 GB Storage",
    "Advance analytics",
    "Advanced reporting features",
    "Customizable dashboards",
    "AI-driven insights",
  ],
  popular: true,
};

export default function PricingSection() {
  const [yearly, setYearly] = useState(false);

  return (
    <>
      <style>{`
        @keyframes svgDrawBorder {
          to { stroke-dashoffset: 0; }
        }
        @keyframes svgTravelGlow {
          to { stroke-dashoffset: -2000; }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes svgDrawBorder { from { stroke-dashoffset: 0; } to { stroke-dashoffset: 0; } }
          @keyframes svgTravelGlow { to { stroke-dashoffset: 0; } }
        }
      `}</style>
      <section id="pricing" className="relative py-16 sm:py-20">
        <div className="container">
          {/* Header */}
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-indigo/20 bg-brand-indigo/5 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-brand-indigo">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-indigo" />
              Pricing Plans
            </div>
            <h2 className="font-display text-4xl font-extrabold tracking-tight text-brand-navy sm:text-5xl">
              Flexible Pricing Plans
            </h2>
            <p className="mt-4 text-base text-brand-navy/60">
              Choose a plan that fits your needs with flexible pricing and options
              for every stage of growth.
            </p>

            {/* Toggle */}
            <div className="mt-8 inline-flex items-center rounded-full bg-[#f0f2fb] p-1 shadow-inner">
              <button
                onClick={() => setYearly(false)}
                className={`rounded-full px-6 py-2 text-sm font-semibold transition-all duration-200 ${
                  !yearly
                    ? "bg-brand-indigo text-white shadow-soft"
                    : "text-brand-navy/60 hover:text-brand-navy"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setYearly(true)}
                className={`rounded-full px-6 py-2 text-sm font-semibold transition-all duration-200 ${
                  yearly
                    ? "bg-brand-indigo text-white shadow-soft"
                    : "text-brand-navy/60 hover:text-brand-navy"
                }`}
              >
                Yearly
              </button>
            </div>
          </div>

          {/* Cards */}
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 max-w-4xl mx-auto">
            {[enterprise, pro].map((plan, i) => {
              const price = yearly ? plan.yearlyPrice : plan.monthlyPrice;
              return (
                <div key={plan.name} className="relative">
                  {/* SVG sits outside overflow-hidden so blur glow isn't clipped */}
                  <svg
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 h-full w-full"
                    style={{ overflow: "visible" }}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <linearGradient
                        id={`trace-grad-${i}`}
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="#6366f1" />
                        <stop offset="100%" stopColor="#a855f7" />
                      </linearGradient>
                    </defs>

                    {/* Border trace — draws clockwise on mount */}
                    <rect
                      x="0"
                      y="0"
                      width="100%"
                      height="100%"
                      rx="23"
                      fill="none"
                      stroke={`url(#trace-grad-${i})`}
                      strokeWidth={plan.popular ? "2" : "1.5"}
                      style={{
                        strokeDasharray: 2000,
                        strokeDashoffset: 2000,
                        animation: `svgDrawBorder 2s cubic-bezier(0.4,0,0.2,1) ${i * 0.35}s forwards`,
                      }}
                    />

                    {/* Traveling glow orb — popular card only */}
                    {plan.popular && (
                      <rect
                        x="0"
                        y="0"
                        width="100%"
                        height="100%"
                        rx="23"
                        fill="none"
                        stroke="#a78bfa"
                        strokeWidth="5"
                        strokeLinecap="round"
                        style={{
                          strokeDasharray: "80 1920",
                          strokeDashoffset: 0,
                          animation: "svgTravelGlow 3s linear infinite",
                          filter: "blur(5px)",
                          opacity: 0.85,
                        }}
                      />
                    )}
                  </svg>

                  <div
                    className={`relative overflow-hidden rounded-3xl p-8 transition-all duration-300 ${
                      plan.popular
                        ? "border-2 border-brand-indigo/40 bg-white shadow-float"
                        : "border border-brand-navy/10 bg-white shadow-card"
                    }`}
                  >
                    {/* Popular ribbon */}
                    {plan.popular && (
                      <div className="absolute right-0 top-0 overflow-hidden w-24 h-24">
                        <div className="absolute top-[18px] right-[-28px] w-[110px] rotate-45 bg-gradient-to-r from-brand-indigo to-brand-purple py-1.5 text-center text-[10px] font-extrabold uppercase tracking-widest text-white shadow-sm">
                          Popular
                        </div>
                      </div>
                    )}

                    {/* Decorative dot grid for popular */}
                    {plan.popular && (
                      <div
                        className="pointer-events-none absolute inset-0 opacity-[0.04]"
                        style={{
                          backgroundImage:
                            "radial-gradient(circle, #6366f1 1px, transparent 1px)",
                          backgroundSize: "18px 18px",
                        }}
                      />
                    )}

                    {/* Icon + name */}
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-indigo/8 shadow-[0_2px_8px_rgba(79,70,229,0.12)]">
                        {plan.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-extrabold text-brand-navy">
                          {plan.name}
                        </h3>
                        <div className="mt-0.5 h-0.5 w-8 rounded-full bg-gradient-to-r from-brand-indigo to-brand-purple" />
                      </div>
                    </div>

                    {/* Description */}
                    <p className="mt-4 text-sm leading-relaxed text-brand-navy/60">
                      {plan.description}
                    </p>

                    <div className="my-6 h-px bg-brand-navy/6" />

                    {/* CTA + Price row */}
                    <div className="flex items-center justify-between gap-4">
                      <button
                        className={`inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${
                          plan.popular
                            ? "bg-gradient-to-r from-brand-indigo to-brand-purple text-white shadow-soft hover:shadow-float"
                            : "border border-brand-indigo/30 text-brand-indigo hover:bg-brand-indigo/5"
                        }`}
                      >
                        {plan.cta}
                        <ArrowUpRight size={14} strokeWidth={2.5} />
                      </button>

                      <div className="flex items-start leading-none">
                        <span className="mt-1 text-base font-semibold text-brand-navy/50">
                          $
                        </span>
                        <span className="text-5xl font-extrabold tracking-tight text-brand-navy">
                          {price}
                        </span>
                        <span className="mt-auto mb-1 ml-1 text-sm text-brand-navy/50">
                          /month
                        </span>
                      </div>
                    </div>

                    <div className="my-6 h-px bg-brand-navy/6" />

                    {/* Features — 2 columns */}
                    <ul className="grid grid-cols-2 gap-x-4 gap-y-3">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm text-brand-navy/80">
                          <span
                            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                              plan.popular
                                ? "bg-brand-indigo text-white"
                                : "bg-brand-indigo/10 text-brand-indigo"
                            }`}
                          >
                            <Check size={11} strokeWidth={3} />
                          </span>
                          {f}
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
