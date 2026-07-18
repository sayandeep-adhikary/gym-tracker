"use client";

import { motion, type Variants } from "framer-motion";

import { cn } from "@/lib/utils";

/** Entrance stagger for the dumbbell parts. */
const group: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
};

const part: Variants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 240, damping: 16 },
  },
};

/** Symmetric dumbbell geometry: rounded bars as [x, y, w, h, rx]. */
const BARS = [
  { x: 96, y: 70, w: 48, h: 20, rx: 10 }, // handle
  { x: 78, y: 58, w: 16, h: 44, rx: 8 }, // left inner plate
  { x: 58, y: 48, w: 18, h: 64, rx: 9 }, // left outer plate
  { x: 46, y: 64, w: 12, h: 32, rx: 6 }, // left end cap
  { x: 146, y: 58, w: 16, h: 44, rx: 8 }, // right inner plate
  { x: 164, y: 48, w: 18, h: 64, rx: 9 }, // right outer plate
  { x: 182, y: 64, w: 12, h: 32, rx: 6 }, // right end cap
];

/**
 * A premium animated dumbbell illustration.
 *
 * The parts spring in on mount, then the whole piece gently floats and sways
 * while a soft brand glow pulses behind it. Continuous motion is disabled for
 * users who prefer reduced motion (via the app-wide MotionConfig).
 */
export function AnimatedDumbbell({ className }: { className?: string }) {
  return (
    <motion.div
      className={cn("relative isolate", className)}
      animate={{ y: [0, -10, 0], rotate: [-2.5, 2.5, -2.5] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
    >
      <motion.div
        aria-hidden
        className="absolute inset-0 -z-10 rounded-[45%] bg-primary/25 blur-3xl"
        animate={{ opacity: [0.35, 0.65, 0.35], scale: [0.9, 1.08, 0.9] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.svg
        viewBox="0 0 240 160"
        fill="none"
        className="h-auto w-full"
        role="img"
        aria-label="Animated dumbbell"
        variants={group}
        initial="hidden"
        animate="visible"
      >
        <defs>
          <linearGradient id="dumbbell-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(var(--accent))" />
            <stop offset="100%" stopColor="hsl(var(--primary))" />
          </linearGradient>
        </defs>

        {BARS.map((b) => (
          <motion.rect
            key={`${b.x}-${b.y}`}
            x={b.x}
            y={b.y}
            width={b.w}
            height={b.h}
            rx={b.rx}
            fill="url(#dumbbell-fill)"
            variants={part}
          />
        ))}
      </motion.svg>
    </motion.div>
  );
}
