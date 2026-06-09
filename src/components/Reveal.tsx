import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type Variant = "fade-up" | "fade" | "blur-up" | "scale" | "slide-left" | "slide-right";

const EASE = [0.22, 1, 0.36, 1] as const;

function variantStates(variant: Variant, y: number) {
  switch (variant) {
    case "fade":
      return { hidden: { opacity: 0 }, show: { opacity: 1 } };
    case "blur-up":
      return {
        hidden: { opacity: 0, y, filter: "blur(12px)" },
        show: { opacity: 1, y: 0, filter: "blur(0px)" },
      };
    case "scale":
      return { hidden: { opacity: 0, scale: 0.92 }, show: { opacity: 1, scale: 1 } };
    case "slide-left":
      return { hidden: { opacity: 0, x: -40 }, show: { opacity: 1, x: 0 } };
    case "slide-right":
      return { hidden: { opacity: 0, x: 40 }, show: { opacity: 1, x: 0 } };
    case "fade-up":
    default:
      return { hidden: { opacity: 0, y }, show: { opacity: 1, y: 0 } };
  }
}

export default function Reveal({
  children,
  delay = 0,
  y = 28,
  duration = 0.8,
  variant = "fade-up",
  once = true,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  duration?: number;
  variant?: Variant;
  once?: boolean;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const states = variantStates(variant, y);
  return (
    <motion.div
      initial={reduce ? "show" : "hidden"}
      whileInView="show"
      viewport={{ once, margin: "-80px" }}
      variants={states}
      transition={{ duration, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * RevealGroup — staggers its direct motion children when they enter the viewport.
 * Use with <RevealItem> children, or pass plain elements which inherit the variants.
 */
export function RevealGroup({
  children,
  delay = 0,
  stagger = 0.08,
  once = true,
  className,
}: {
  children: ReactNode;
  delay?: number;
  stagger?: number;
  once?: boolean;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? "show" : "hidden"}
      whileInView="show"
      viewport={{ once, margin: "-80px" }}
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: reduce ? 0 : stagger, delayChildren: delay },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  y = 24,
  variant = "fade-up",
  duration = 0.7,
  className,
}: {
  children: ReactNode;
  y?: number;
  variant?: Variant;
  duration?: number;
  className?: string;
}) {
  const states = variantStates(variant, y);
  return (
    <motion.div
      variants={states}
      transition={{ duration, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
