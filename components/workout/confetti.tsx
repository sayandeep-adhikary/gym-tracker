"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

const COLORS = [
  "#3B82F6",
  "#60A5FA",
  "#22C55E",
  "#F59E0B",
  "#EF4444",
  "#A855F7",
];

interface ConfettiProps {
  count?: number;
}

/**
 * A lightweight, dependency-free confetti burst built with Framer Motion.
 * Particles fan out from the top and fall, playing once when mounted.
 */
export function Confetti({ count = 90 }: ConfettiProps) {
  const pieces = useMemo(
    () =>
      Array.from({ length: count }, (_, index) => ({
        id: index,
        x: (Math.random() - 0.5) * 360,
        drift: (Math.random() - 0.5) * 120,
        rotate: Math.random() * 720 - 360,
        delay: Math.random() * 0.25,
        duration: 1.8 + Math.random() * 1.4,
        color: COLORS[index % COLORS.length] ?? "#3B82F6",
        width: 6 + Math.random() * 6,
        height: 8 + Math.random() * 8,
      })),
    [count],
  );

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      {pieces.map((piece) => (
        <motion.span
          key={piece.id}
          className="absolute left-1/2 top-4"
          style={{
            width: piece.width,
            height: piece.height,
            backgroundColor: piece.color,
            borderRadius: 2,
          }}
          initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
          animate={{
            x: piece.x + piece.drift,
            y: 540,
            opacity: [1, 1, 0],
            rotate: piece.rotate,
          }}
          transition={{
            duration: piece.duration,
            delay: piece.delay,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}
