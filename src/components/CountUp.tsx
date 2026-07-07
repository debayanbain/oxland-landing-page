"use client";
import { useEffect, useRef, useState } from "react";
import { animate, useMotionValue, useTransform, motion, useInView } from "framer-motion";

type Props = {
  to: number;
  from?: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  separator?: boolean;
};

export default function CountUp({
  to,
  from = 0,
  duration = 1.6,
  decimals = 0,
  prefix = "",
  suffix = "",
  className,
  separator = true,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const mv = useMotionValue(from);
  const display = useTransform(mv, (v) => {
    const fixed = v.toFixed(decimals);
    const out = separator
      ? new Intl.NumberFormat("en-IN", {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        }).format(Number(fixed))
      : fixed;
    return `${prefix}${out}${suffix}`;
  });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
    });
    return controls.stop;
  }, [inView, to, duration, mv]);

  return (
    <motion.span ref={ref} className={className}>
      {display}
    </motion.span>
  );
}
