import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion, LayoutGroup } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV = ["Product", "Solutions", "Industries", "Resources", "Pricing", "Contact"];

const EASE = [0.22, 1, 0.36, 1] as const;
const SPRING = { type: "spring" as const, stiffness: 380, damping: 34, mass: 0.7 };

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
                const href = `#${item.toLowerCase()}`;
                const isHovered = hovered === item;
                return (
                  <li key={item} className="relative">
                    <a
                      href={href}
                      onMouseEnter={() => setHovered(item)}
                      onFocus={() => setHovered(item)}
                      className="relative z-10 inline-block rounded-full px-3.5 py-1.5 text-[13.5px] font-medium text-brand-navy/75 transition-colors hover:text-brand-navy"
                    >
                      {item}
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
            <a
              href="#preview"
              className="rounded-full px-3.5 py-1.5 text-[13.5px] font-medium text-brand-navy/75 transition-colors hover:text-brand-navy"
            >
              View Platform
            </a>
            <Button size="sm" className="group rounded-full">
              Book Demo
              <ArrowRight
                size={14}
                className="ml-0.5 transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </Button>
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
                    key={item}
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
                      href={`#${item.toLowerCase()}`}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between rounded-2xl px-4 py-3.5 text-base font-semibold text-brand-navy/85 transition-colors hover:bg-secondary"
                    >
                      <span>{item}</span>
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
                    onClick={() => setOpen(false)}
                  >
                    View Platform
                  </Button>
                  <Button size="sm" className="flex-1 rounded-full" onClick={() => setOpen(false)}>
                    Book Demo
                  </Button>
                </motion.li>
              </motion.ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
