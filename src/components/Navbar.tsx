import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV = ["Product", "Solutions", "Industries", "Resources", "Pricing", "Contact"];

function Logo() {
  return (
    <a href="#" className="flex items-center gap-2.5">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-gradient text-white shadow-soft">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2C7.6 2 4 5.5 4 9.8c0 5.2 6.5 11.2 7.4 12a1 1 0 0 0 1.3 0c.9-.8 7.3-6.8 7.3-12C20 5.5 16.4 2 12 2Z"
            fill="white"
            fillOpacity="0.92"
          />
          <circle cx="12" cy="9.6" r="2.6" fill="#4F46E5" />
        </svg>
      </span>
      <span className="font-display text-xl font-bold tracking-tight text-brand-navy">
        Oxland
      </span>
    </a>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border/70 bg-white/75 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <nav className="container flex h-[72px] items-center justify-between">
        <Logo />

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase()}`}
                className="rounded-full px-4 py-2 text-sm font-medium text-brand-navy/70 transition-colors hover:bg-secondary hover:text-brand-navy"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2.5 lg:flex">
          <Button variant="ghost" size="sm">View Platform</Button>
          <Button size="sm">Book Demo</Button>
        </div>

        <button
          className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-white/70 lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-border bg-white/90 backdrop-blur-xl lg:hidden"
          >
            <div className="container flex flex-col gap-1 py-4">
              {NAV.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="rounded-xl px-4 py-3 text-sm font-medium text-brand-navy/80 hover:bg-secondary"
                  onClick={() => setOpen(false)}
                >
                  {item}
                </a>
              ))}
              <div className="mt-2 flex gap-2.5">
                <Button variant="secondary" size="sm" className="flex-1">View Platform</Button>
                <Button size="sm" className="flex-1">Book Demo</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
