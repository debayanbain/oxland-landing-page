import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion, useSpring } from "framer-motion";
import type { ReactNode } from "react";

/**
 * ScrollScale — wraps a block so it scales-in + lifts as it enters the viewport,
 * then drifts gently while in view. Mirrors the Framer-template "showcase reveal".
 */
export default function ScrollScale({
  children,
  from = 0.88,
  to = 1,
  lift = 60,
  className,
}: {
  children: ReactNode;
  from?: number;
  to?: number;
  lift?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const rawScale = useTransform(scrollYProgress, [0, 0.45, 1], [from, to, to]);
  const rawY = useTransform(scrollYProgress, [0, 0.5, 1], [lift, 0, -lift * 0.5]);
  const rawOpacity = useTransform(scrollYProgress, [0, 0.25], [0.4, 1]);

  const scale = useSpring(rawScale, { stiffness: 110, damping: 26, mass: 0.4 });
  const y = useSpring(rawY, { stiffness: 110, damping: 26, mass: 0.4 });

  return (
    <div ref={ref} className={className}>
      <motion.div
        style={
          reduce
            ? undefined
            : { scale, y, opacity: rawOpacity, willChange: "transform, opacity" }
        }
      >
        {children}
      </motion.div>
    </div>
  );
}
