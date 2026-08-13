"use client";
import { motion } from "framer-motion";
import {
  Calendar,
  Building2,
  Layers3,
  FileText,
  Handshake,
  Map,
  UploadCloud,
  LayoutDashboard,
  MapPin,
  Users,
  BarChart3,
  Scale,
  Infinity as InfinityIcon,
  Database,
  Bell,
  ContactRound,
  Puzzle,
  Plane,
  BrainCircuit,
  Mail,
  UserCog,
  MoreHorizontal,
  ShieldCheck,
  Check,
  ArrowRight,
} from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

type Feature = { icon: any; title: string; sub?: string };

// Ordered so a row-major 2-column grid groups the way the design intends.
const freeFeatures: Feature[] = [
  { icon: Layers3, title: "Up to 5 Projects / 300 Acres", sub: "Land Management" },
  { icon: MapPin, title: "Basic Geospatial Window" },
  { icon: FileText, title: "Land Records", sub: "Module Access" },
  { icon: Users, title: "Role Based User Access" },
  { icon: Handshake, title: "Land Acquisition", sub: "Module Access" },
  { icon: BarChart3, title: "Basic Reports" },
  { icon: Map, title: "Cadastral Data", sub: "Management" },
  { icon: Scale, title: "Basic Litigation Management" },
  { icon: UploadCloud, title: "Document Upload & Storage", sub: "Up to 200 MB" },
  { icon: LayoutDashboard, title: "Interactive Dashboard" },
];

const enterpriseFeatures: Feature[] = [
  { icon: InfinityIcon, title: "All features in Free version", sub: "With unlimited access & usage" },
  { icon: Plane, title: "Complementary Drone Survey & Mapping*" },
  { icon: Scale, title: "Full Legal & Litigation Management" },
  { icon: BrainCircuit, title: "Advanced Geo-AI & OCR Features" },
  { icon: Database, title: "Advanced Land Records & Cadastral Data Management" },
  { icon: BarChart3, title: "Advanced MIS & Reporting" },
  { icon: Bell, title: "Important Notifications & Alerts" },
  { icon: Mail, title: "Smart Notifications & Alerts" },
  { icon: ContactRound, title: "Active Directory Integrations" },
  { icon: UserCog, title: "Dedicated Success Manager" },
  { icon: Puzzle, title: "CRM / ERP Integrations" },
  { icon: MoreHorizontal, title: "… and many more" },
];

const openContact = (reason: string) => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("oxland:open-contact", { detail: { reason } })
    );
  }
};

function FeatureRow({
  icon: Icon,
  title,
  sub,
  dark = false,
  check = false,
}: Feature & { dark?: boolean; check?: boolean }) {
  return (
    <li className="flex items-center gap-2.5">
      {check && (
        <Check size={13} strokeWidth={3} className="shrink-0 text-brand-indigo" />
      )}
      <span
        className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg ${
          dark
            ? "bg-white/10 text-brand-lavender ring-1 ring-white/10"
            : "bg-brand-indigo/[0.08] text-brand-indigo"
        }`}
      >
        <Icon size={15} strokeWidth={2} />
      </span>
      <div className="min-w-0">
        <p className={`text-[12.5px] font-semibold leading-tight ${dark ? "text-white" : "text-brand-navy"}`}>
          {title}
        </p>
        {sub && (
          <p className={`text-[10.5px] leading-tight ${dark ? "text-white/45" : "text-brand-navy/45"}`}>
            {sub}
          </p>
        )}
      </div>
    </li>
  );
}

/* Compact decorative product graphic for the Free card header. */
function FreeGraphic() {
  return (
    <div className="relative hidden shrink-0 sm:block">
      <div className="w-40 rounded-2xl border border-brand-navy/10 bg-white p-2 shadow-soft">
        <div className="flex gap-2">
          {/* mini map */}
          <div className="relative h-[62px] w-[74px] overflow-hidden rounded-lg bg-gradient-to-br from-brand-indigo/15 via-brand-blue/10 to-brand-purple/15">
            <div className="absolute left-2 top-3 h-4 w-6 rounded-sm bg-emerald-400/40" />
            <div className="absolute bottom-2 right-2 h-5 w-7 rounded-sm bg-brand-indigo/25" />
            <svg viewBox="0 0 74 62" className="absolute inset-0 h-full w-full">
              <path d="M0 34 Q20 26 40 32 T74 28" fill="none" stroke="rgba(79,70,229,0.35)" strokeWidth="1.5" />
            </svg>
          </div>
          {/* donut + lines */}
          <div className="flex flex-1 flex-col justify-center gap-1.5">
            <svg viewBox="0 0 36 36" className="h-8 w-8 -rotate-90">
              <circle cx="18" cy="18" r="14" fill="none" stroke="#e6e9f5" strokeWidth="5" />
              <circle cx="18" cy="18" r="14" fill="none" stroke="#4F46E5" strokeWidth="5" strokeLinecap="round" strokeDasharray="60 88" />
            </svg>
            <span className="h-1.5 w-full rounded-full bg-brand-navy/10" />
            <span className="h-1.5 w-2/3 rounded-full bg-brand-navy/10" />
          </div>
        </div>
      </div>
      {/* 14 DAYS FREE badge */}
      <span className="absolute -bottom-3 -left-3 grid place-items-center rounded-xl bg-brand-indigo px-2.5 py-1.5 text-center text-white shadow-float">
        <span className="text-base font-extrabold leading-none">14</span>
        <span className="mt-0.5 text-[7px] font-bold uppercase tracking-widest">Days Free</span>
      </span>
    </div>
  );
}

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
            <div
              aria-hidden
              className="pricing-glow pointer-events-none absolute -inset-1 -z-10 rounded-[28px] opacity-25 blur-[26px] transition-opacity duration-500 group-hover:opacity-45"
            />

            <div className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-brand-navy/10 bg-white p-8 sm:p-10">
              {/* Header */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="inline-flex w-fit items-center gap-2 rounded-full bg-brand-indigo/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-brand-indigo">
                    <Calendar size={12} strokeWidth={2.5} />
                    14-Day Free Evaluation
                  </span>
                  <h3 className="mt-5 font-display text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl">
                    Try OxLand at no cost
                  </h3>
                  <p className="mt-3 font-display text-[15px] font-semibold leading-snug bg-gradient-to-r from-brand-indigo to-brand-purple bg-clip-text text-transparent">
                    Full access for 14 days.<br />Explore OxLand before you commit.
                  </p>
                  <div className="mt-4 h-0.5 w-10 rounded-full bg-brand-indigo/25" />
                </div>
                <FreeGraphic />
              </div>

              {/* Features */}
              <ul className="mt-8 grid grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2">
                {freeFeatures.map((f) => (
                  <FeatureRow key={f.title} {...f} check />
                ))}
              </ul>

              <div className="mt-auto pt-8">
                <div className="flex items-center gap-2.5 rounded-xl border border-brand-navy/10 bg-brand-navy/[0.02] px-4 py-3">
                  <ShieldCheck size={16} strokeWidth={2.25} className="shrink-0 text-brand-indigo" />
                  <span className="text-[12.5px] font-medium text-brand-navy/70">
                    14 days of full access. No credit card required.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => openContact("evaluation")}
                  className="group/btn mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-gradient px-6 py-3.5 text-sm font-semibold text-white shadow-soft transition-all hover:shadow-float"
                >
                  Start 14-Day Free Evaluation
                  <ArrowRight size={15} strokeWidth={2.5} className="transition-transform group-hover/btn:translate-x-0.5" />
                </button>
              </div>
            </div>

            <span aria-hidden className="pricing-beam absolute inset-0 rounded-3xl" />
          </motion.div>

          {/* -------------------- ENTERPRISE (dark card) -------------------- */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.08 }}
            className="group relative h-full rounded-3xl shadow-float"
          >
            <div
              aria-hidden
              className="pricing-glow pointer-events-none absolute -inset-1 -z-10 rounded-[28px] opacity-35 blur-[26px] transition-opacity duration-500 group-hover:opacity-60"
            />

            <div className="relative flex h-full flex-col overflow-hidden rounded-3xl bg-brand-navy p-8 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)] sm:p-10">
              {/* Ambient */}
              <div
                className="pointer-events-none absolute -top-24 -left-16 h-64 w-64 rounded-full blur-3xl opacity-55"
                style={{ background: "radial-gradient(closest-side, rgba(79,70,229,0.55), transparent 70%)" }}
              />
              <div
                className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full blur-3xl opacity-50"
                style={{ background: "radial-gradient(closest-side, rgba(124,58,237,0.55), transparent 70%)" }}
              />
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.05]"
                style={{ backgroundImage: "radial-gradient(circle, #a78bfa 1px, transparent 1px)", backgroundSize: "18px 18px" }}
              />

              <div className="relative flex h-full flex-col">
                <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-white/90 ring-1 ring-white/20 backdrop-blur-md">
                  <Building2 size={12} strokeWidth={2.5} className="text-brand-lavender" />
                  Built for Enterprises
                </span>
                <h3 className="mt-5 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                  OxLand Enterprise
                </h3>
                <p className="mt-3 font-display text-[15px] font-semibold bg-gradient-to-r from-brand-lavender via-white to-brand-lavender bg-clip-text text-transparent">
                  Unlimited power. Intelligent. Integrated. Enterprise ready.
                </p>
                <p className="mt-3 text-[13.5px] leading-relaxed text-white/65">
                  Get the complete OxLand experience with unlimited access, advanced intelligence, integrations and dedicated support tailored to your organization's needs.
                </p>

                {/* Features */}
                <ul className="mt-7 grid grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2">
                  {enterpriseFeatures.map((f) => (
                    <FeatureRow key={f.title} {...f} dark />
                  ))}
                </ul>

                <div className="mt-auto pt-8">
                  <div className="flex items-center gap-2.5 rounded-xl border border-white/15 bg-white/[0.06] px-4 py-3 backdrop-blur-md">
                    <ShieldCheck size={16} strokeWidth={2.25} className="shrink-0 text-brand-lavender" />
                    <span className="text-[12.5px] leading-snug text-white/75">
                      Enterprise pricing is based on project scale, users, integrations and required capabilities.
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => openContact("enterprise")}
                    className="group/btn mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3.5 text-sm font-semibold text-brand-navy shadow-soft transition-all hover:bg-white/90 hover:shadow-float"
                  >
                    Book Enterprise Demo
                    <ArrowRight size={15} strokeWidth={2.5} className="transition-transform group-hover/btn:translate-x-0.5" />
                  </button>
                </div>
              </div>
            </div>

            <span aria-hidden className="pricing-beam ent absolute inset-0 rounded-3xl" />
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
