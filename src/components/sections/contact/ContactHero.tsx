"use client";
import { motion, useReducedMotion } from "framer-motion";
import {
  Sparkles,
  Clock,
  ShieldCheck,
  MessageCircle,
  Mail,
  Phone,
  ArrowDown,
  UserCircle2,
} from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const trustBadges = [
  { icon: Clock, label: "Reply within 4 hours" },
  { icon: ShieldCheck, label: "NDA on request" },
  { icon: Sparkles, label: "Live demo · 45 min" },
];

const availableAgents = [
  { code: "AK", palette: "bg-brand-indigo" },
  { code: "PR", palette: "bg-brand-purple" },
  { code: "SV", palette: "bg-brand-blue" },
  { code: "NM", palette: "bg-emerald-500" },
];

export default function ContactHero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden pt-32 pb-12 sm:pt-40 sm:pb-20">
      {/* Ambient */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-faint [background-size:44px_44px] opacity-40" />
        <div
          className="absolute -top-40 left-1/2 h-[560px] w-[820px] -translate-x-1/2 rounded-full opacity-60 blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, rgba(79,70,229,0.32), rgba(124,58,237,0.18) 50%, transparent 75%)",
          }}
        />
        <div
          className="absolute -left-24 top-40 h-[360px] w-[420px] rounded-full opacity-50 blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, rgba(47,91,255,0.28), transparent 70%)",
          }}
        />
        <img
          src="/cloud1.webp"
          alt=""
          aria-hidden
          width="1920"
          height="1080"
          loading="lazy"
          decoding="async"
          className="absolute -top-4 left-[5%] w-[280px] opacity-65 blur-[2px] select-none"
        />
        <img
          src="/cloud2.png"
          alt=""
          aria-hidden
          className="absolute top-32 right-[3%] w-[260px] opacity-55 blur-[1.5px] select-none"
        />
      </div>

      <div className="container relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_1fr]">
          {/* LEFT — copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="inline-flex items-center gap-2 rounded-full border border-brand-indigo/20 bg-brand-indigo/5 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-brand-indigo"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-brand-indigo animate-pulse-soft" />
              Contact us
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 22, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.08 }}
              className="mt-6 font-display text-5xl font-extrabold leading-[1.05] tracking-tight text-brand-navy sm:text-6xl lg:text-[64px]"
            >
              Let's build your{" "}
              <span className="bg-gradient-to-r from-brand-blue via-brand-indigo to-brand-purple bg-clip-text text-transparent">
                land operation, together.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
              className="mt-6 max-w-xl text-base leading-relaxed text-brand-navy/65 sm:text-lg"
            >
              Bring a real parcel set, a real corridor map, a real case file — a land-ops specialist will get back within four working hours with next steps and a tailored walkthrough.
            </motion.p>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.3 }}
              className="mt-8 flex flex-wrap gap-2.5"
            >
              {trustBadges.map((b) => (
                <div
                  key={b.label}
                  className="inline-flex items-center gap-2 rounded-full border border-brand-navy/10 bg-white/70 px-3.5 py-1.5 text-[12.5px] font-semibold text-brand-navy/75 backdrop-blur-sm shadow-[0_1px_0_rgba(255,255,255,0.7)_inset,0_2px_8px_-2px_rgba(11,20,55,0.08)]"
                >
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-brand-indigo/10 text-brand-indigo">
                    <b.icon size={11} strokeWidth={2.5} />
                  </span>
                  {b.label}
                </div>
              ))}
            </motion.div>

            {/* Quick actions */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.4 }}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <a
                href="#contact-form"
                className="group inline-flex items-center gap-2 rounded-xl bg-brand-gradient px-6 py-3 text-sm font-semibold text-white shadow-soft transition-all hover:shadow-float"
              >
                Send us a message
                <ArrowDown
                  size={14}
                  strokeWidth={2.5}
                  className="transition-transform group-hover:translate-y-0.5"
                />
              </a>
              <a
                href="tel:+919064696958"
                className="inline-flex items-center gap-2 rounded-xl border border-brand-navy/12 bg-white/70 px-5 py-3 text-sm font-semibold text-brand-navy backdrop-blur-sm hover:bg-white"
              >
                <Phone size={14} strokeWidth={2.5} className="text-brand-indigo" />
                +91 90646 96958
              </a>
            </motion.div>
          </div>

          {/* RIGHT — SaaS visual: live team availability card + floating chips */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.35 }}
              className="relative overflow-hidden rounded-[28px] border border-brand-navy/10 bg-white p-6 shadow-float"
            >
              {/* Card ambient */}
              <div
                className="pointer-events-none absolute -top-24 -right-16 h-56 w-56 rounded-full opacity-60 blur-3xl"
                style={{
                  background:
                    "radial-gradient(closest-side, rgba(79,70,229,0.35), transparent 70%)",
                }}
              />
              <div
                className="pointer-events-none absolute -bottom-20 -left-16 h-48 w-48 rounded-full opacity-50 blur-3xl"
                style={{
                  background:
                    "radial-gradient(closest-side, rgba(124,58,237,0.3), transparent 70%)",
                }}
              />

              <div className="relative">
                {/* Live indicator header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-brand-navy/50">
                    <span className="grid h-6 w-6 place-items-center rounded-lg bg-emerald-50 text-emerald-600">
                      <MessageCircle size={11} strokeWidth={2.5} />
                    </span>
                    Team availability
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse-soft" />
                    Online
                  </span>
                </div>

                <div className="mt-5">
                  <p className="font-display text-2xl font-extrabold text-brand-navy leading-tight">
                    Our team is here.
                  </p>
                  <p className="mt-1 text-sm text-brand-navy/60">
                    4 land-ops specialists available right now.
                  </p>
                </div>

                {/* Agent avatars */}
                <div className="mt-5 flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {availableAgents.map((a) => (
                      <div
                        key={a.code}
                        className={`grid h-9 w-9 place-items-center rounded-full ${a.palette} font-display text-[10px] font-extrabold text-white ring-2 ring-white shadow-soft`}
                      >
                        {a.code}
                      </div>
                    ))}
                    <motion.div
                      animate={reduce ? {} : { scale: [1, 1.06, 1] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      className="grid h-9 w-9 place-items-center rounded-full bg-brand-navy/8 text-[10px] font-bold text-brand-navy/60 ring-2 ring-white shadow-soft"
                    >
                      +8
                    </motion.div>
                  </div>
                  <div className="text-xs text-brand-navy/55">
                    <span className="font-semibold text-brand-navy">12 total</span> in queue
                  </div>
                </div>

                <div className="my-6 h-px bg-brand-navy/8" />

                {/* Response metrics */}
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-brand-navy/45">
                      Avg reply
                    </div>
                    <div className="mt-1 font-display text-2xl font-extrabold text-brand-navy tabular-nums">
                      2h 14m
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-brand-navy/45">
                      This week
                    </div>
                    <div className="mt-1 font-display text-2xl font-extrabold text-brand-indigo tabular-nums">
                      47
                    </div>
                    <div className="text-[10px] text-brand-navy/50">demos booked</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-brand-navy/45">
                      Satisfaction
                    </div>
                    <div className="mt-1 font-display text-2xl font-extrabold text-emerald-600 tabular-nums">
                      4.9<span className="text-sm text-brand-navy/40">/5</span>
                    </div>
                  </div>
                </div>

                {/* Ping list — live activity */}
                <div className="mt-6 rounded-2xl border border-brand-navy/8 bg-[#fafbff] p-4">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-brand-navy/50">
                    Just now
                  </div>
                  <ul className="mt-2.5 space-y-2 text-[12px] text-brand-navy/75">
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse-soft" />
                      Aparna replied to a demo request · Vedanta
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-indigo animate-pulse-soft" />
                      Sales call scheduled · NHAI corridor team
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-purple animate-pulse-soft" />
                      RFP response sent · Maharashtra Housing
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Floating chip — top */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.6 }}
              className="absolute -top-4 -right-3 hidden rounded-2xl border border-brand-navy/10 bg-white px-3 py-2 shadow-card sm:block"
            >
              <motion.div
                animate={reduce ? {} : { y: [0, -4, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="flex items-center gap-2"
              >
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-indigo/10 text-brand-indigo">
                  <Mail size={14} strokeWidth={2.5} />
                </span>
                <div>
                  <div className="text-[9px] font-bold uppercase tracking-wider text-brand-navy/50">
                    Email us
                  </div>
                  <div className="font-display text-xs font-extrabold text-brand-navy">
                    info@oxbowintellect.com
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Floating chip — bottom */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.75 }}
              className="absolute -bottom-4 -left-3 hidden rounded-2xl border border-brand-navy/10 bg-white px-3 py-2 shadow-card sm:block"
            >
              <motion.div
                animate={reduce ? {} : { y: [0, -5, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                className="flex items-center gap-2"
              >
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-purple/10 text-brand-purple">
                  <UserCircle2 size={14} strokeWidth={2.5} />
                </span>
                <div>
                  <div className="text-[9px] font-bold uppercase tracking-wider text-brand-navy/50">
                    Dedicated CSM
                  </div>
                  <div className="font-display text-xs font-extrabold text-brand-navy">
                    From day one
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
