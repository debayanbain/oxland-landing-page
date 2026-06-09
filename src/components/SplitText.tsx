import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.16, 0.84, 0.24, 1] as const;

type Part = { text: string; className?: string };

/**
 * SplitText — animates a heading word-by-word with a blur-clear, fade-up entrance.
 * Pass `parts` to color or style a phrase inside the heading (e.g. a gradient span).
 */
export default function SplitText({
  text,
  parts,
  className,
  delay = 0,
  stagger = 0.05,
  duration = 1.6,
  blur = 14,
  as: Tag = "h1",
  trigger = "mount",
}: {
  text?: string;
  parts?: Part[];
  className?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  blur?: number;
  as?: keyof JSX.IntrinsicElements;
  trigger?: "mount" | "in-view";
}) {
  const reduce = useReducedMotion();
  const segments: Part[] = parts ?? (text ? [{ text }] : []);

  const tokens: { word: string; className?: string }[] = [];
  segments.forEach((seg) => {
    seg.text.split(/(\s+)/).forEach((w) => {
      if (!w) return;
      tokens.push({ word: w, className: seg.className });
    });
  });

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduce ? 0 : stagger,
        delayChildren: delay,
      },
    },
  };

  const child = {
    hidden: { opacity: 0, filter: `blur(${blur}px)` },
    show: {
      opacity: 1,
      filter: "blur(0px)",
      transition: { duration, ease: EASE },
    },
  };

  const MotionTag = (motion as any).create
    ? (motion as any).create(Tag)
    : (motion as any)(Tag);
  const initial = reduce ? "show" : "hidden";
  const animateProps =
    trigger === "in-view"
      ? { whileInView: "show", viewport: { once: true, margin: "-80px" } as const }
      : { animate: "show" as const };

  return (
    <MotionTag
      className={className}
      variants={container}
      initial={initial}
      {...animateProps}
    >
      {tokens.map((t, i) => {
        if (/^\s+$/.test(t.word)) return <span key={i}>{t.word}</span>;
        return (
          <motion.span
            key={i}
            variants={child}
            style={{ display: "inline-block", willChange: "filter, opacity" }}
            className={t.className}
          >
            {t.word}
          </motion.span>
        );
      })}
    </MotionTag>
  );
}
