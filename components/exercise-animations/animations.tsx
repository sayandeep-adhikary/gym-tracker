"use client";

import type { ReactNode } from "react";
import { motion, type Transition } from "framer-motion";

/**
 * Hand-built, looping exercise illustrations (no GIFs). Each is a minimal
 * stick-figure SVG animated with Framer Motion. All motion is transform- or
 * attribute-based and loops forever; it pauses for users who prefer reduced
 * motion via the app-wide MotionConfig.
 *
 * Figures draw with `currentColor`, so set the text color on a parent.
 */

/** A forever-looping ease-in-out transition. */
const loop = (duration = 1.4): Transition => ({
  duration,
  repeat: Infinity,
  ease: "easeInOut",
});

/** Shared SVG canvas: a 120×120 stage with consistent stroke styling. */
function Stage({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      className="h-full w-full"
      role="presentation"
      aria-hidden
    >
      <g
        stroke="currentColor"
        strokeWidth={4.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        {children}
      </g>
    </svg>
  );
}

const GROUND = (
  <line
    x1="28"
    y1="104"
    x2="92"
    y2="104"
    strokeWidth={3}
    className="text-border"
  />
);

/* ── Press ─────────────────────────────────────────────────────────────── */

/** Bench Press — the barbell moves up and down. */
export function BenchPress() {
  return (
    <Stage>
      <line x1="34" y1="88" x2="88" y2="88" strokeWidth={3} className="text-border" />
      <line x1="40" y1="88" x2="40" y2="104" strokeWidth={3} className="text-border" />
      <line x1="82" y1="88" x2="82" y2="104" strokeWidth={3} className="text-border" />
      <circle cx="82" cy="80" r="7" fill="currentColor" stroke="none" />
      <line x1="76" y1="84" x2="52" y2="84" />
      <line x1="52" y1="84" x2="46" y2="96" />
      <line x1="46" y1="96" x2="54" y2="104" />
      <motion.line x1="60" y1="84" x2="60" y2="72" animate={{ y2: [72, 58, 72] }} transition={loop(1.3)} />
      <motion.line x1="70" y1="84" x2="70" y2="72" animate={{ y2: [72, 58, 72] }} transition={loop(1.3)} />
      <motion.g animate={{ y: [0, -14, 0] }} transition={loop(1.3)}>
        <line x1="50" y1="72" x2="80" y2="72" />
        <circle cx="50" cy="72" r="5" fill="currentColor" stroke="none" />
        <circle cx="80" cy="72" r="5" fill="currentColor" stroke="none" />
      </motion.g>
    </Stage>
  );
}

/** Overhead Press — the barbell presses overhead. */
export function OverheadPress() {
  return (
    <Stage>
      {GROUND}
      <circle cx="60" cy="42" r="7" fill="currentColor" stroke="none" />
      <line x1="60" y1="49" x2="60" y2="78" />
      <line x1="60" y1="78" x2="50" y2="102" />
      <line x1="60" y1="78" x2="70" y2="102" />
      <motion.line x1="52" y1="54" x2="52" y2="50" animate={{ y2: [50, 34, 50] }} transition={loop(1.3)} />
      <motion.line x1="68" y1="54" x2="68" y2="50" animate={{ y2: [50, 34, 50] }} transition={loop(1.3)} />
      <motion.g animate={{ y: [0, -16, 0] }} transition={loop(1.3)}>
        <line x1="44" y1="50" x2="76" y2="50" />
        <circle cx="44" cy="50" r="5" fill="currentColor" stroke="none" />
        <circle cx="76" cy="50" r="5" fill="currentColor" stroke="none" />
      </motion.g>
    </Stage>
  );
}

/* ── Pull ──────────────────────────────────────────────────────────────── */

/** Row / Face Pull — the cable is pulled toward the body. */
export function HorizontalPull() {
  return (
    <Stage>
      {GROUND}
      <circle cx="44" cy="44" r="7" fill="currentColor" stroke="none" />
      <line x1="44" y1="51" x2="44" y2="80" />
      <line x1="44" y1="80" x2="36" y2="104" />
      <line x1="44" y1="80" x2="52" y2="104" />
      <line x1="102" y1="28" x2="102" y2="62" strokeWidth={3} className="text-border" />
      <motion.line x1="102" y1="46" x2="84" y2="46" animate={{ x2: [84, 56, 84] }} transition={loop(1.4)} />
      <motion.line x1="44" y1="54" x2="84" y2="46" animate={{ x2: [84, 56, 84] }} transition={loop(1.4)} />
      <motion.circle cx="84" cy="46" r="4" fill="currentColor" stroke="none" animate={{ cx: [84, 56, 84] }} transition={loop(1.4)} />
    </Stage>
  );
}

/** Pull-Up — the body moves vertically under a fixed bar. */
export function PullUp() {
  return (
    <Stage>
      <line x1="26" y1="20" x2="94" y2="20" strokeWidth={4} className="text-border" />
      <motion.line x1="52" y1="20" x2="52" y2="36" animate={{ y2: [36, 18, 36] }} transition={loop(1.5)} />
      <motion.line x1="68" y1="20" x2="68" y2="36" animate={{ y2: [36, 18, 36] }} transition={loop(1.5)} />
      <motion.g animate={{ y: [0, -18, 0] }} transition={loop(1.5)}>
        <circle cx="60" cy="44" r="7" fill="currentColor" stroke="none" />
        <line x1="60" y1="51" x2="60" y2="78" />
        <line x1="60" y1="78" x2="52" y2="96" />
        <line x1="60" y1="78" x2="68" y2="96" />
      </motion.g>
    </Stage>
  );
}

/* ── Legs ──────────────────────────────────────────────────────────────── */

/** Squat — the body squats down and stands up. */
export function Squat() {
  return (
    <Stage>
      {GROUND}
      <motion.g animate={{ y: [0, 16, 0] }} transition={loop(1.5)}>
        <circle cx="60" cy="32" r="7" fill="currentColor" stroke="none" />
        <line x1="60" y1="39" x2="60" y2="64" />
        <line x1="44" y1="44" x2="76" y2="44" />
        <circle cx="44" cy="44" r="4.5" fill="currentColor" stroke="none" />
        <circle cx="76" cy="44" r="4.5" fill="currentColor" stroke="none" />
      </motion.g>
      <motion.line x1="60" y1="64" x2="50" y2="84" animate={{ y1: [64, 80, 64], x2: [50, 44, 50], y2: [84, 88, 84] }} transition={loop(1.5)} />
      <motion.line x1="50" y1="84" x2="52" y2="104" animate={{ x1: [50, 44, 50], y1: [84, 88, 84] }} transition={loop(1.5)} />
      <motion.line x1="60" y1="64" x2="70" y2="84" animate={{ y1: [64, 80, 64], x2: [70, 76, 70], y2: [84, 88, 84] }} transition={loop(1.5)} />
      <motion.line x1="70" y1="84" x2="68" y2="104" animate={{ x1: [70, 76, 70], y1: [84, 88, 84] }} transition={loop(1.5)} />
    </Stage>
  );
}

/** Hinge (Deadlift / RDL) — the torso hinges at the hips. */
export function Hinge() {
  return (
    <Stage>
      {GROUND}
      <line x1="60" y1="72" x2="52" y2="104" />
      <line x1="60" y1="72" x2="68" y2="104" />
      <motion.g style={{ transformOrigin: "60px 72px" }} animate={{ rotate: [2, 74, 2] }} transition={loop(1.7)}>
        <circle cx="60" cy="40" r="7" fill="currentColor" stroke="none" />
        <line x1="60" y1="47" x2="60" y2="72" />
        <line x1="60" y1="54" x2="60" y2="68" />
        <line x1="46" y1="68" x2="74" y2="68" />
        <circle cx="46" cy="68" r="4.5" fill="currentColor" stroke="none" />
        <circle cx="74" cy="68" r="4.5" fill="currentColor" stroke="none" />
      </motion.g>
    </Stage>
  );
}

/** Lunge — the body dips into a split stance. */
export function Lunge() {
  return (
    <Stage>
      {GROUND}
      <motion.g animate={{ y: [0, 12, 0] }} transition={loop(1.5)}>
        <circle cx="58" cy="34" r="7" fill="currentColor" stroke="none" />
        <line x1="58" y1="41" x2="58" y2="68" />
        <line x1="58" y1="48" x2="48" y2="64" />
        <line x1="58" y1="48" x2="68" y2="64" />
      </motion.g>
      <motion.line x1="58" y1="68" x2="42" y2="86" animate={{ y1: [68, 80, 68] }} transition={loop(1.5)} />
      <line x1="42" y1="86" x2="42" y2="104" />
      <motion.line x1="58" y1="68" x2="76" y2="90" animate={{ y1: [68, 80, 68] }} transition={loop(1.5)} />
      <line x1="76" y1="90" x2="82" y2="104" />
    </Stage>
  );
}

/** Calf Raise — the heel raises onto the toes. */
export function CalfRaise() {
  return (
    <Stage>
      {GROUND}
      <motion.g animate={{ y: [0, -10, 0] }} transition={loop(1.1)}>
        <circle cx="58" cy="36" r="7" fill="currentColor" stroke="none" />
        <line x1="58" y1="43" x2="58" y2="72" />
        <line x1="58" y1="52" x2="48" y2="66" />
        <line x1="58" y1="52" x2="68" y2="66" />
        <line x1="58" y1="72" x2="58" y2="96" />
      </motion.g>
      <motion.line x1="58" y1="96" x2="72" y2="104" animate={{ y1: [96, 86, 96] }} transition={loop(1.1)} />
    </Stage>
  );
}

/* ── Arms ──────────────────────────────────────────────────────────────── */

/** Biceps Curl — the forearms curl the weights up. */
export function Curl() {
  return (
    <Stage>
      {GROUND}
      <circle cx="60" cy="32" r="7" fill="currentColor" stroke="none" />
      <line x1="60" y1="39" x2="60" y2="72" />
      <line x1="60" y1="72" x2="52" y2="102" />
      <line x1="60" y1="72" x2="68" y2="102" />
      <line x1="60" y1="46" x2="50" y2="68" />
      <line x1="60" y1="46" x2="70" y2="68" />
      <motion.line x1="50" y1="68" x2="52" y2="90" animate={{ x2: [52, 56, 52], y2: [90, 50, 90] }} transition={loop(1.2)} />
      <motion.line x1="70" y1="68" x2="68" y2="90" animate={{ x2: [68, 64, 68], y2: [90, 50, 90] }} transition={loop(1.2)} />
      <motion.circle cx="52" cy="90" r="4.5" fill="currentColor" stroke="none" animate={{ cx: [52, 56, 52], cy: [90, 50, 90] }} transition={loop(1.2)} />
      <motion.circle cx="68" cy="90" r="4.5" fill="currentColor" stroke="none" animate={{ cx: [68, 64, 68], cy: [90, 50, 90] }} transition={loop(1.2)} />
    </Stage>
  );
}

/** Triceps / Pushdown — the forearms extend down against a bar. */
export function Extension() {
  return (
    <Stage>
      {GROUND}
      <circle cx="60" cy="30" r="7" fill="currentColor" stroke="none" />
      <line x1="60" y1="37" x2="60" y2="72" />
      <line x1="60" y1="72" x2="52" y2="102" />
      <line x1="60" y1="72" x2="68" y2="102" />
      <line x1="60" y1="46" x2="54" y2="66" />
      <line x1="60" y1="46" x2="66" y2="66" />
      <motion.line x1="54" y1="66" x2="53" y2="82" animate={{ y2: [82, 96, 82] }} transition={loop(1.1)} />
      <motion.line x1="66" y1="66" x2="67" y2="82" animate={{ y2: [82, 96, 82] }} transition={loop(1.1)} />
      <motion.line x1="53" y1="82" x2="67" y2="82" animate={{ y1: [82, 96, 82], y2: [82, 96, 82] }} transition={loop(1.1)} />
    </Stage>
  );
}

/** Lateral Raise — the arms raise out to the sides. */
export function LateralRaise() {
  return (
    <Stage>
      {GROUND}
      <circle cx="60" cy="32" r="7" fill="currentColor" stroke="none" />
      <line x1="60" y1="39" x2="60" y2="72" />
      <line x1="60" y1="72" x2="52" y2="102" />
      <line x1="60" y1="72" x2="68" y2="102" />
      <motion.line x1="60" y1="46" x2="44" y2="70" animate={{ x2: [44, 34, 44], y2: [70, 46, 70] }} transition={loop(1.4)} />
      <motion.line x1="60" y1="46" x2="76" y2="70" animate={{ x2: [76, 86, 76], y2: [70, 46, 70] }} transition={loop(1.4)} />
      <motion.circle cx="44" cy="70" r="4.5" fill="currentColor" stroke="none" animate={{ cx: [44, 34, 44], cy: [70, 46, 70] }} transition={loop(1.4)} />
      <motion.circle cx="76" cy="70" r="4.5" fill="currentColor" stroke="none" animate={{ cx: [76, 86, 76], cy: [70, 46, 70] }} transition={loop(1.4)} />
    </Stage>
  );
}

/** Chest Fly — the arms sweep together and apart. */
export function Fly() {
  return (
    <Stage>
      {GROUND}
      <circle cx="60" cy="32" r="7" fill="currentColor" stroke="none" />
      <line x1="60" y1="39" x2="60" y2="72" />
      <line x1="60" y1="72" x2="52" y2="102" />
      <line x1="60" y1="72" x2="68" y2="102" />
      <motion.line x1="60" y1="48" x2="38" y2="52" animate={{ x2: [38, 54, 38], y2: [52, 60, 52] }} transition={loop(1.3)} />
      <motion.line x1="60" y1="48" x2="82" y2="52" animate={{ x2: [82, 66, 82], y2: [52, 60, 52] }} transition={loop(1.3)} />
      <motion.circle cx="38" cy="52" r="4.5" fill="currentColor" stroke="none" animate={{ cx: [38, 54, 38], cy: [52, 60, 52] }} transition={loop(1.3)} />
      <motion.circle cx="82" cy="52" r="4.5" fill="currentColor" stroke="none" animate={{ cx: [82, 66, 82], cy: [52, 60, 52] }} transition={loop(1.3)} />
    </Stage>
  );
}

/* ── Core ──────────────────────────────────────────────────────────────── */

/** Leg Raise — the legs lift toward the torso. */
export function CoreFlexion() {
  return (
    <Stage>
      <line x1="24" y1="88" x2="80" y2="88" strokeWidth={3} className="text-border" />
      <circle cx="32" cy="80" r="7" fill="currentColor" stroke="none" />
      <line x1="38" y1="82" x2="66" y2="82" />
      <line x1="48" y1="82" x2="44" y2="70" />
      <motion.line x1="66" y1="82" x2="92" y2="82" animate={{ x2: [92, 72, 92], y2: [82, 46, 82] }} transition={loop(1.5)} />
    </Stage>
  );
}

/** Rotation — the torso twists side to side. */
export function CoreRotation() {
  return (
    <Stage>
      {GROUND}
      <line x1="60" y1="72" x2="52" y2="104" />
      <line x1="60" y1="72" x2="68" y2="104" />
      <motion.g style={{ transformOrigin: "60px 72px" }} animate={{ rotate: [-16, 16, -16] }} transition={loop(1.6)}>
        <circle cx="60" cy="40" r="7" fill="currentColor" stroke="none" />
        <line x1="60" y1="47" x2="60" y2="72" />
        <line x1="60" y1="54" x2="42" y2="60" />
        <line x1="60" y1="54" x2="78" y2="60" />
        <circle cx="60" cy="58" r="4.5" fill="currentColor" stroke="none" />
      </motion.g>
    </Stage>
  );
}
