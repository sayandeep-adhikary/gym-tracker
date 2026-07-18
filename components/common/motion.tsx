"use client";

import { motion, type HTMLMotionProps, type Variants } from "framer-motion";

import { MOTION } from "@/lib/constants";

/**
 * Reusable Framer Motion primitives and shared variants.
 * Import these instead of re-declaring animations per component so the whole
 * app speaks one motion language.
 */

export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const fadeInUpVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export const staggerContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: MOTION.stagger, delayChildren: 0.05 },
  },
};

interface AnimateProps extends HTMLMotionProps<"div"> {
  delay?: number;
}

/** Fade content in on mount. */
export function FadeIn({ delay = 0, transition, ...props }: AnimateProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeInVariants}
      transition={{ duration: MOTION.base, ease: "easeOut", delay, ...transition }}
      {...props}
    />
  );
}

/** Fade + slide content up on mount. */
export function FadeInUp({ delay = 0, transition, ...props }: AnimateProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeInUpVariants}
      transition={{ duration: MOTION.base, ease: "easeOut", delay, ...transition }}
      {...props}
    />
  );
}

/** Wrap a group of `StaggerItem`s to reveal them in sequence. */
export function Stagger(props: HTMLMotionProps<"div">) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainerVariants}
      {...props}
    />
  );
}

/** A single item inside a `Stagger` container. */
export function StaggerItem({ transition, ...props }: HTMLMotionProps<"div">) {
  return (
    <motion.div
      variants={fadeInUpVariants}
      transition={{ duration: MOTION.base, ease: "easeOut", ...transition }}
      {...props}
    />
  );
}

interface RevealProps extends HTMLMotionProps<"div"> {
  delay?: number;
  /** Vertical offset (px) to slide up from. */
  y?: number;
  /** Only animate the first time it enters the viewport. */
  once?: boolean;
}

/** Reveals content with a fade + slide as it scrolls into view. */
export function Reveal({
  delay = 0,
  y = 24,
  once = true,
  transition,
  ...props
}: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration: MOTION.base, ease: "easeOut", delay, ...transition }}
      {...props}
    />
  );
}
