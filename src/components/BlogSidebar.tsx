"use client";
import { motion } from "framer-motion";
import {
  Instagram,
  Linkedin,
  Facebook,
  Twitter,
  ArrowRight,
  ArrowUpRight,
  Compass,
  IndianRupee,
  MessageSquare,
  Sparkles,
  Building2,
  Calendar,
  Newspaper,
} from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

interface Author {
  name: string;
  role: string;
  initials: string;
  bio: string;
  socials: {
    instagram?: string;
    linkedin?: string;
    facebook?: string;
    twitter?: string;
  };
}

interface Props {
  author: Author;
}

export default function BlogSidebar({ author }: Props) {
  const openContact = (reason: string) => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("oxland:open-contact", { detail: { reason } })
      );
    }
  };

  return (
    <aside className="space-y-5">
      {/* --------- Author card --------- */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: EASE }}
        className="relative overflow-hidden rounded-2xl border border-brand-navy/10 bg-white p-5 shadow-card"
      >
        <div className="pointer-events-none absolute -top-20 -right-16 h-40 w-40 rounded-full opacity-40 blur-3xl" style={{ background: "radial-gradient(closest-side, rgba(124,58,237,0.3), transparent 70%)" }} />
        <div className="relative">
          <div className="text-[10px] font-bold uppercase tracking-widest text-brand-navy/45">
            About the author
          </div>
          <div className="mt-3 flex items-center gap-3">
            <div className="grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-brand-indigo to-brand-purple font-display text-base font-extrabold text-white shadow-soft ring-2 ring-white">
              {author.initials}
            </div>
            <div>
              <div className="font-display text-base font-extrabold text-brand-navy leading-tight">
                {author.name}
              </div>
              <div className="text-[11px] text-brand-navy/55">{author.role}</div>
            </div>
          </div>
          <p className="mt-4 text-[13px] leading-relaxed text-brand-navy/65">
            {author.bio}
          </p>
          <div className="mt-4 flex items-center gap-1.5">
            {author.socials.linkedin && (
              <a
                href={author.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="grid h-8 w-8 place-items-center rounded-lg border border-brand-navy/10 text-brand-navy/60 transition-all hover:border-blue-500/50 hover:bg-blue-50 hover:text-blue-600"
              >
                <Linkedin size={13} strokeWidth={2.25} />
              </a>
            )}
            {author.socials.instagram && (
              <a
                href={author.socials.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="grid h-8 w-8 place-items-center rounded-lg border border-brand-navy/10 text-brand-navy/60 transition-all hover:border-pink-500/50 hover:bg-pink-50 hover:text-pink-600"
              >
                <Instagram size={13} strokeWidth={2.25} />
              </a>
            )}
            {author.socials.facebook && (
              <a
                href={author.socials.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="grid h-8 w-8 place-items-center rounded-lg border border-brand-navy/10 text-brand-navy/60 transition-all hover:border-blue-600/50 hover:bg-blue-50 hover:text-blue-700"
              >
                <Facebook size={13} strokeWidth={2.25} />
              </a>
            )}
            {author.socials.twitter && (
              <a
                href={author.socials.twitter}
                target="_blank"
                rel="noreferrer"
                aria-label="X / Twitter"
                className="grid h-8 w-8 place-items-center rounded-lg border border-brand-navy/10 text-brand-navy/60 transition-all hover:border-brand-navy/50 hover:bg-brand-navy/[0.06] hover:text-brand-navy"
              >
                <Twitter size={13} strokeWidth={2.25} />
              </a>
            )}
          </div>
        </div>
      </motion.div>

      {/* --------- Company LinkedIn --------- */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: EASE, delay: 0.08 }}
        className="relative overflow-hidden rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-50 via-white to-blue-50 p-5 shadow-card"
      >
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-blue-600 text-white shadow-soft">
            <Linkedin size={18} strokeWidth={2.5} />
          </span>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-blue-700/70">
              Follow us
            </div>
            <div className="font-display text-sm font-extrabold text-brand-navy leading-tight">
              Oxland on LinkedIn
            </div>
          </div>
        </div>
        <p className="mt-3 text-[12.5px] leading-relaxed text-brand-navy/65">
          Product updates, hiring calls and the occasional deep-read from our team — 4,200+ Indian land-ops folk already follow along.
        </p>
        <a
          href="https://www.linkedin.com/company/oxland"
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-full border border-blue-500/30 bg-white px-4 py-2 text-xs font-bold text-blue-600 transition-colors hover:bg-blue-50"
        >
          Follow the page
          <ArrowUpRight size={12} strokeWidth={2.5} />
        </a>
      </motion.div>

      {/* --------- Contact / Book demo CTA --------- */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: EASE, delay: 0.16 }}
        className="relative overflow-hidden rounded-2xl bg-brand-navy p-5 shadow-float"
      >
        <div className="pointer-events-none absolute -top-20 -right-10 h-40 w-40 rounded-full blur-3xl opacity-55" style={{ background: "radial-gradient(closest-side, rgba(79,70,229,0.55), transparent 70%)" }} />
        <div className="pointer-events-none absolute -bottom-20 -left-10 h-40 w-40 rounded-full blur-3xl opacity-45" style={{ background: "radial-gradient(closest-side, rgba(124,58,237,0.55), transparent 70%)" }} />

        <div className="relative">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-white/90 ring-1 ring-white/15 backdrop-blur-md">
            <Sparkles size={10} />
            Ready to talk?
          </div>
          <h3 className="mt-3 font-display text-lg font-extrabold leading-tight text-white">
            See Oxland run on{" "}
            <span className="bg-gradient-to-r from-brand-lavender via-white to-brand-lavender bg-clip-text text-transparent">
              your project.
            </span>
          </h3>
          <p className="mt-2 text-[12px] leading-relaxed text-white/70">
            45-minute walkthrough with your parcel data. No slides.
          </p>
          <button
            type="button"
            onClick={() => openContact("demo")}
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-4 py-2.5 text-xs font-bold text-brand-navy shadow-soft transition-all hover:bg-white/90"
          >
            <Calendar size={13} strokeWidth={2.5} />
            Book a demo
            <ArrowRight size={12} strokeWidth={2.5} />
          </button>
          <a
            href="/contact"
            className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2.5 text-xs font-bold text-white backdrop-blur-md hover:bg-white/10"
          >
            <MessageSquare size={13} strokeWidth={2.5} />
            Contact us
          </a>
        </div>
      </motion.div>

      {/* --------- Explore card --------- */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: EASE, delay: 0.24 }}
        className="relative overflow-hidden rounded-2xl border border-brand-navy/10 bg-white p-5 shadow-card"
      >
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-brand-navy/45">
          <Compass size={12} strokeWidth={2.5} className="text-brand-indigo" />
          Explore
        </div>
        <ul className="mt-4 space-y-2">
          {[
            { href: "/features", label: "Features", icon: Sparkles, palette: "text-brand-indigo bg-brand-indigo/10" },
            { href: "/about", label: "About Us", icon: Building2, palette: "text-brand-purple bg-brand-purple/10" },
            { href: "/pricing", label: "Pricing", icon: IndianRupee, palette: "text-emerald-600 bg-emerald-50" },
            { href: "/contact", label: "Contact Us", icon: MessageSquare, palette: "text-brand-blue bg-brand-blue/10" },
            { href: "/blog", label: "All articles", icon: Newspaper, palette: "text-rose-600 bg-rose-50" },
          ].map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="group flex items-center justify-between gap-3 rounded-xl border border-transparent bg-white/60 p-2.5 transition-all hover:border-brand-navy/8 hover:bg-brand-navy/[0.02]"
              >
                <div className="flex items-center gap-2.5">
                  <span className={`grid h-8 w-8 place-items-center rounded-lg ${item.palette}`}>
                    <item.icon size={13} strokeWidth={2.5} />
                  </span>
                  <span className="text-[13px] font-bold text-brand-navy">
                    {item.label}
                  </span>
                </div>
                <span className="grid h-6 w-6 place-items-center rounded-full text-brand-navy/30 transition-all group-hover:bg-brand-indigo group-hover:text-white">
                  <ArrowUpRight size={12} strokeWidth={2.5} />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </motion.div>
    </aside>
  );
}
