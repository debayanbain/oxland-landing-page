"use client";
import { motion } from "framer-motion";
import { Check, ArrowUpRight, Sparkles, Building2, MessageSquare } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const freeEvaluation = {
  eyebrow: "Free Evaluation Workspace",
  title: "Try OxLand at no cost",
  subtitle: "See OxLand before you spend a rupee.",
  description:
    "Good for teams who want to check digital land records, GIS maps and land work — before they buy.",
  features: [
    "14 days of free access",
    "Up to 100 acres per project",
    "Up to 100 MB of storage",
    "One evaluation project",
    "Land register and plot view",
    "GIS map viewer",
    "Document storage",
    "Basic dashboard and reports",
    "Role-based user access",
    "Email support",
  ],
  footnote: "No credit card needed.",
  ctaLabel: "Start Free Evaluation",
  ctaReason: "evaluation",
};

const enterprise = {
  eyebrow: "For big land banks and public agencies",
  title: "OxLand Enterprise",
  subtitle: "Built for large, multi-site land work.",
  description:
    "We set up each Enterprise plan to fit your team, your rules and how much land you manage.",
  features: [
    "Unlimited projects",
    "Unlimited land parcels",
    "Unlimited document storage",
    "Land acquisition workflow",
    "Case and dispute tracking",
    "GIS and map data",
    "Drone and survey data",
    "Smart document scanning",
    "API and system links",
    "Cloud or on-site setup",
    "A dedicated success manager",
    "Data move and staff training",
  ],
  footnote:
    "Price depends on project size, setup type and the tools you need.",
  ctaLabel: "Book Enterprise Demo",
  ctaReason: "enterprise",
};

const openContact = (reason: string) => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("oxland:open-contact", { detail: { reason } })
    );
  }
};

export default function PricingPlans() {
  return (
    <section id="plans" className="relative pt-4 pb-12 sm:pt-6 sm:pb-16">
        <div className="container">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-2">
            {/* -------------------- FREE EVALUATION -------------------- */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: EASE }}
              className="group relative h-full rounded-3xl shadow-card"
            >
              {/* Ambient bloom */}
              <div
                aria-hidden
                className="pricing-glow pointer-events-none absolute -inset-1 -z-10 rounded-[28px] opacity-40 transition-opacity duration-500 group-hover:opacity-70"
              />

              {/* Card */}
              <div className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-brand-navy/[0.06] bg-white p-8 sm:p-10">
                {/* Eyebrow */}
                <span className="inline-flex w-fit items-center gap-2 rounded-full bg-brand-indigo/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-brand-indigo">
                  <span className="grid h-4 w-4 place-items-center rounded-full bg-brand-indigo text-white">
                    <Sparkles size={9} strokeWidth={2.75} />
                  </span>
                  {freeEvaluation.eyebrow}
                </span>

                <h3 className="mt-5 font-display text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl">
                  {freeEvaluation.title}
                </h3>
                <p className="mt-2 font-display text-base font-semibold bg-gradient-to-r from-brand-indigo to-brand-purple bg-clip-text text-transparent">
                  {freeEvaluation.subtitle}
                </p>
                <p className="mt-3 text-[15px] leading-relaxed text-brand-navy/65">
                  {freeEvaluation.description}
                </p>

                {/* Features */}
                <ul className="mt-7 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
                  {freeEvaluation.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-[13.5px] text-brand-navy/85">
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-indigo/10 text-brand-indigo">
                        <Check size={11} strokeWidth={3} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-8">
                  <p className="text-xs font-semibold text-brand-indigo">
                    {freeEvaluation.footnote}
                  </p>
                  <button
                    type="button"
                    onClick={() => openContact(freeEvaluation.ctaReason)}
                    className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-navy px-6 py-3.5 text-sm font-semibold text-white shadow-soft transition-all hover:bg-brand-navy/90 hover:shadow-float"
                  >
                    {freeEvaluation.ctaLabel}
                    <ArrowUpRight size={14} strokeWidth={2.5} />
                  </button>
                </div>
              </div>

              {/* Animated gradient border (drawn on top of the card edge) */}
              <span aria-hidden className="pricing-ring pointer-events-none absolute inset-0 rounded-3xl" />
            </motion.div>

            {/* -------------------- ENTERPRISE (dark card) -------------------- */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.08 }}
              className="group relative h-full rounded-3xl shadow-float"
            >
              {/* Ambient bloom */}
              <div
                aria-hidden
                className="pricing-glow pointer-events-none absolute -inset-1 -z-10 rounded-[28px] opacity-55 transition-opacity duration-500 group-hover:opacity-90"
              />

              {/* Card */}
              <div className="relative flex h-full flex-col overflow-hidden rounded-3xl bg-brand-navy p-8 sm:p-10">
                {/* Ambient */}
                <div
                  className="pointer-events-none absolute -top-24 -left-16 h-64 w-64 rounded-full blur-3xl opacity-55"
                  style={{
                    background:
                      "radial-gradient(closest-side, rgba(79,70,229,0.55), transparent 70%)",
                  }}
                />
                <div
                  className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full blur-3xl opacity-50"
                  style={{
                    background:
                      "radial-gradient(closest-side, rgba(124,58,237,0.55), transparent 70%)",
                  }}
                />
                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.05]"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle, #a78bfa 1px, transparent 1px)",
                    backgroundSize: "18px 18px",
                  }}
                />

                <div className="relative flex h-full flex-col">
                  {/* Eyebrow */}
                  <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-white/90 ring-1 ring-white/20 backdrop-blur-md">
                    <span className="grid h-4 w-4 place-items-center rounded-full bg-brand-lavender text-brand-navy">
                      <Building2 size={9} strokeWidth={2.75} />
                    </span>
                    {enterprise.eyebrow}
                  </span>

                  <h3 className="mt-5 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                    {enterprise.title}
                  </h3>
                  <p className="mt-2 font-display text-base font-semibold bg-gradient-to-r from-brand-lavender via-white to-brand-lavender bg-clip-text text-transparent">
                    {enterprise.subtitle}
                  </p>
                  <p className="mt-3 text-[15px] leading-relaxed text-white/70">
                    {enterprise.description}
                  </p>

                  {/* Features */}
                  <ul className="mt-7 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
                    {enterprise.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-[13.5px] text-white/85">
                        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-lavender text-brand-navy">
                          <Check size={11} strokeWidth={3} />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-8">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/[0.06] px-3 py-2 text-xs text-white/75 backdrop-blur-md">
                      <MessageSquare size={12} strokeWidth={2.5} className="text-brand-lavender" />
                      <span className="leading-snug">{enterprise.footnote}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => openContact(enterprise.ctaReason)}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3.5 text-sm font-semibold text-brand-navy shadow-soft transition-all hover:bg-white/90 hover:shadow-float"
                    >
                      {enterprise.ctaLabel}
                      <ArrowUpRight size={14} strokeWidth={2.5} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Animated gradient border (drawn on top of the card edge) */}
              <span aria-hidden className="pricing-ring ent pointer-events-none absolute inset-0 rounded-3xl" />
            </motion.div>
          </div>

          {/* Trust footnote */}
          <p className="mt-10 text-center text-xs font-semibold uppercase tracking-widest text-brand-navy/45">
            Trusted by teams who manage large land operations
          </p>
        </div>
    </section>
  );
}
