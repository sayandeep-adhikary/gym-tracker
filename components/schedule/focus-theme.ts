import type { WorkoutFocus } from "@/types";

interface FocusTheme {
  /** Icon-chip background + text color. */
  chip: string;
  /** Foreground text color. */
  text: string;
  /** Pill/badge classes. */
  badge: string;
  /** Gradient `from-*` color for the card / header wash. */
  wash: string;
  /** Hover border color for interactive cards. */
  ring: string;
}

/**
 * Per-focus color treatment. Class strings are written out in full so Tailwind
 * can detect them (no dynamic string concatenation).
 */
export const FOCUS_THEME: Record<WorkoutFocus, FocusTheme> = {
  push: {
    chip: "bg-push/15 text-push",
    text: "text-push",
    badge: "bg-push/15 text-push",
    wash: "from-push/20",
    ring: "hover:border-push/40",
  },
  pull: {
    chip: "bg-pull/15 text-pull",
    text: "text-pull",
    badge: "bg-pull/15 text-pull",
    wash: "from-pull/20",
    ring: "hover:border-pull/40",
  },
  legs: {
    chip: "bg-legs/15 text-legs",
    text: "text-legs",
    badge: "bg-legs/15 text-legs",
    wash: "from-legs/20",
    ring: "hover:border-legs/40",
  },
  upper: {
    chip: "bg-primary/15 text-primary",
    text: "text-primary",
    badge: "bg-primary/15 text-primary",
    wash: "from-primary/20",
    ring: "hover:border-primary/40",
  },
  lower: {
    chip: "bg-accent/15 text-accent",
    text: "text-accent",
    badge: "bg-accent/15 text-accent",
    wash: "from-accent/20",
    ring: "hover:border-accent/40",
  },
};
