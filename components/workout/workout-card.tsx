"use client";

import { ChevronRight, Clock, Dumbbell, Flame } from "lucide-react";
import { motion } from "framer-motion";

import { Badge } from "@/components/ui/badge";
import { ProgressRing } from "@/components/ui/progress-ring";
import { cn } from "@/lib/utils";
import type { WorkoutSplit } from "@/types";

interface WorkoutCardProps {
  title: string;
  split: WorkoutSplit;
  exerciseCount: number;
  durationMinutes?: number;
  volumeKg?: number;
  /** Completion 0–100; renders a progress ring when provided. */
  progress?: number;
  /** Human label such as "Today" or "Mon". */
  schedule?: string;
  className?: string;
  onClick?: () => void;
}

/** Category color wash gradients (literal classes so Tailwind can detect them). */
const SPLIT_WASH: Record<WorkoutSplit, string> = {
  push: "from-push/20",
  pull: "from-pull/20",
  legs: "from-legs/20",
};

const SPLIT_BADGE: Record<WorkoutSplit, "push" | "pull" | "legs"> = {
  push: "push",
  pull: "pull",
  legs: "legs",
};

/**
 * A glassy summary card for a workout session/day, with a category color wash,
 * key stats and an optional completion ring. Lifts on hover when interactive.
 */
export function WorkoutCard({
  title,
  split,
  exerciseCount,
  durationMinutes,
  volumeKg,
  progress,
  schedule,
  className,
  onClick,
}: WorkoutCardProps) {
  const interactive = typeof onClick === "function";

  return (
    <motion.div
      whileHover={{ y: -4 }}
      whileTap={interactive ? { scale: 0.99 } : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      onClick={onClick}
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
      className={cn(
        "glass-card group relative overflow-hidden rounded-2xl p-6",
        interactive &&
          "cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br to-transparent opacity-70",
          SPLIT_WASH[split],
        )}
        aria-hidden
      />

      <div className="flex items-start justify-between gap-4">
        <div className="space-y-3">
          <Badge variant={SPLIT_BADGE[split]} className="capitalize">
            {split}
          </Badge>
          <div>
            {schedule ? (
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {schedule}
              </p>
            ) : null}
            <h3 className="font-display text-xl font-bold tracking-tight">
              {title}
            </h3>
          </div>
        </div>

        {typeof progress === "number" ? (
          <ProgressRing value={progress} size={64} strokeWidth={6} />
        ) : (
          <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-secondary text-foreground">
            <Dumbbell className="size-5" />
          </span>
        )}
      </div>

      <div className="mt-6 flex items-center gap-4 text-xs text-muted-foreground sm:text-sm">
        <span className="inline-flex items-center gap-1.5">
          <Dumbbell className="size-4" />
          {exerciseCount} exercises
        </span>
        {typeof durationMinutes === "number" ? (
          <span className="inline-flex items-center gap-1.5">
            <Clock className="size-4" />
            {durationMinutes} min
          </span>
        ) : null}
        {typeof volumeKg === "number" ? (
          <span className="hidden items-center gap-1.5 sm:inline-flex">
            <Flame className="size-4" />
            {volumeKg.toLocaleString()} kg
          </span>
        ) : null}
        {interactive ? (
          <ChevronRight className="ml-auto size-5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-foreground" />
        ) : null}
      </div>
    </motion.div>
  );
}
