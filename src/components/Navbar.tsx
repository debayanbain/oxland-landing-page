import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion, LayoutGroup } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type NavItem = { label: string; href: string };
const NAV: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];

const EASE = [0.22, 1, 0.36, 1] as const;
const SPRING = { type: "spring" as const, stiffness: 380, damping: 34, mass: 0.7 };

function Logo() {
  return (
    <a href="/" className="flex items-center gap-2.5">
      <img src="/oxland.svg" alt="Oxland" width={100} height={50}/>
    </a>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -32, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.05 }}
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-4"
      >
        <motion.nav
          layout
          transition={reduce ? { duration: 0 } : SPRING}
          style={
            scrolled
              ? {
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                  backgroundColor: "rgba(255, 255, 255, 0.25)",
                  borderColor: "rgba(117, 115, 114, 0.15)",
                  borderRadius: "40px",
                }
              : undefined
          }
        className={cn(
          "flex items-center justify-between",
          "transition-all duration-500",
          scrolled
            ? "mt-3 w-full max-w-[1100px] gap-4 border border-solid px-3.5 py-2"
            : "mt-0 w-full max-w-[1280px] gap-6 rounded-none border-0 border-transparent bg-transparent px-6 py-4 backdrop-blur-0"
        )}
        >
          <Logo />

          <LayoutGroup id="navbar-hover">
            <ul
              onMouseLeave={() => setHovered(null)}
              className="hidden items-center gap-0.5 lg:flex"
            >
              {NAV.map((item) => {
                const isHovered = hovered === item.label;
                return (
                  <li key={item.label} className="relative">
                    <a
                      href={item.href}
                      onMouseEnter={() => setHovered(item.label)}
                      onFocus={() => setHovered(item.label)}
                      className="relative z-10 inline-block rounded-full px-3.5 py-1.5 text-[13.5px] font-medium text-brand-navy/75 transition-colors hover:text-brand-navy"
                    >
                      {item.label}
                    </a>
                    <AnimatePresence>
                      {isHovered && !reduce && (
                        <motion.span
                          layoutId="navbar-pill"
                          transition={{ type: "spring", stiffness: 480, damping: 36, mass: 0.5 }}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 -z-0 rounded-full bg-white/70 shadow-[0_1px_0_rgba(255,255,255,0.7)_inset,0_4px_14px_-6px_rgba(11,20,55,0.18)]"
                          aria-hidden
                        />
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>
          </LayoutGroup>

          <div className="hidden items-center gap-1.5 lg:flex">
            <button
              type="button"
              onClick={() =>
                window.dispatchEvent(
                  new CustomEvent("oxland:open-contact", { detail: { reason: "demo" } })
                )
              }
              className="rounded-full px-3.5 py-1.5 text-[13.5px] font-medium text-brand-navy/75 transition-colors hover:text-brand-navy"
            >
              Book Now
            </button>
            <a
              href="https://app.oxland.in"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ size: "sm" }), "group")}
            >
              Sign in
              <ArrowRight
                size={14}
                className="ml-0.5 transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </a>
          </div>

          <button
            className="grid h-9 w-9 place-items-center rounded-full border border-white/50 bg-white/60 backdrop-blur-md lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <motion.span
              animate={{ rotate: open ? 90 : 0 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="grid place-items-center"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </motion.span>
          </button>
        </motion.nav>
      </motion.header>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* backdrop */}
            <motion.div
              className="absolute inset-0 bg-brand-navy/30 backdrop-blur-md"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            {/* panel */}
            <motion.div
              initial={{ y: -32, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -24, opacity: 0 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="absolute inset-x-4 top-[80px] overflow-hidden rounded-3xl border border-white/70 bg-white/95 shadow-float backdrop-blur-2xl"
            >
              <motion.ul
                initial="hidden"
                animate="show"
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.05, delayChildren: 0.08 } },
                }}
                className="flex flex-col gap-1 p-4"
              >
                {NAV.map((item) => (
                  <motion.li
                    key={item.label}
                    variants={{
                      hidden: { opacity: 0, y: 12, filter: "blur(6px)" },
                      show: {
                        opacity: 1,
                        y: 0,
                        filter: "blur(0px)",
                        transition: { duration: 0.45, ease: EASE },
                      },
                    }}
                  >
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between rounded-2xl px-4 py-3.5 text-base font-semibold text-brand-navy/85 transition-colors hover:bg-secondary"
                    >
                      <span>{item.label}</span>
                      <ArrowRight
                        size={16}
                        className="text-brand-navy/30 transition-transform group-hover:translate-x-0.5"
                      />
                    </a>
                  </motion.li>
                ))}
                <motion.li
                  variants={{
                    hidden: { opacity: 0, y: 12 },
                    show: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.45, ease: EASE },
                    },
                  }}
                  className="mt-3 flex gap-2 border-t border-border pt-4"
                >
                  <Button
                    variant="secondary"
                    size="sm"
                    className="flex-1 rounded-full"
                    onClick={() => {
                      setOpen(false);
                      window.dispatchEvent(
                        new CustomEvent("oxland:open-contact", { detail: { reason: "demo" } })
                      );
                    }}
                  >
                    Book Now
                  </Button>
                  <a
                    href="https://app.oxland.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                    className={cn(buttonVariants({ size: "sm" }), "flex-1")}
                  >
                    Sign in
                  </a>
                </motion.li>
              </motion.ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
