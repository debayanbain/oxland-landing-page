"use client";
import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Share2, Linkedin, Facebook, Link2, Check, MessageCircle } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

type Props = {
  url: string;
  title: string;
  /** Which way the popover opens relative to the button. */
  position?: "top" | "bottom";
  /** Extra classes for the trigger button so it matches its surroundings. */
  className?: string;
};

export default function ShareMenu({ url, title, position = "bottom", className = "" }: Props) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click / Escape.
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const enc = encodeURIComponent;
  const shareText = `${title} — `;
  const links = [
    {
      label: "WhatsApp",
      icon: MessageCircle,
      color: "text-emerald-600 bg-emerald-50",
      href: `https://wa.me/?text=${enc(shareText + url)}`,
    },
    {
      label: "LinkedIn",
      icon: Linkedin,
      color: "text-[#0A66C2] bg-[#0A66C2]/10",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`,
    },
    {
      label: "Facebook",
      icon: Facebook,
      color: "text-[#1877F2] bg-[#1877F2]/10",
      href: `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`,
    },
    {
      label: "X (Twitter)",
      icon: XIcon,
      color: "text-brand-navy bg-brand-navy/[0.06]",
      href: `https://twitter.com/intent/tweet?text=${enc(title)}&url=${enc(url)}`,
    },
  ];

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // Fallback for older browsers / insecure contexts.
      const ta = document.createElement("textarea");
      ta.value = url;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
      } catch {
        /* no-op */
      }
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div ref={ref} className="relative inline-flex">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Share this piece"
        aria-expanded={open}
        className={className || "grid h-8 w-8 place-items-center rounded-full border border-brand-navy/10 bg-white text-brand-navy/60 transition-colors hover:bg-brand-navy/[0.04]"}
      >
        <Share2 size={13} strokeWidth={2.5} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: position === "top" ? 8 : -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: position === "top" ? 8 : -8, scale: 0.96 }}
            transition={{ duration: 0.2, ease: EASE }}
            className={`absolute right-0 z-50 w-48 rounded-2xl border border-brand-navy/10 bg-white p-2 shadow-float ${
              position === "top" ? "bottom-full mb-2" : "top-full mt-2"
            }`}
          >
            <p className="px-2 pb-1.5 pt-1 text-[10px] font-bold uppercase tracking-wider text-brand-navy/40">
              Share
            </p>
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2.5 rounded-xl px-2 py-2 text-[13px] font-semibold text-brand-navy transition-colors hover:bg-brand-navy/[0.04]"
              >
                <span className={`grid h-7 w-7 place-items-center rounded-lg ${l.color}`}>
                  <l.icon size={14} strokeWidth={2.25} />
                </span>
                {l.label}
              </a>
            ))}
            <button
              type="button"
              onClick={copy}
              className="mt-1 flex w-full items-center gap-2.5 rounded-xl border-t border-brand-navy/8 px-2 py-2 pt-2.5 text-[13px] font-semibold text-brand-navy transition-colors hover:bg-brand-navy/[0.04]"
            >
              <span className={`grid h-7 w-7 place-items-center rounded-lg ${copied ? "bg-emerald-50 text-emerald-600" : "bg-brand-indigo/10 text-brand-indigo"}`}>
                {copied ? <Check size={14} strokeWidth={2.5} /> : <Link2 size={14} strokeWidth={2.25} />}
              </span>
              {copied ? "Link copied!" : "Copy link"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function XIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
    </svg>
  );
}
