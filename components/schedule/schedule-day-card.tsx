"use client";

import { ArrowRight, Dumbbell } from "lucide-react";
import { motion } from "framer-motion";

import { FOCUS_THEME } from "@/components/schedule/focus-theme";
import { ProgressRing } from "@/components/ui/progress-ring";
import { estimateDurationMinutes, totalSets } from "@/data/workouts";
import { useTilt } from "@/hooks/use-tilt";
import { cn } from "@/lib/utils";
import type { WorkoutDay } from "@/types";

interface ScheduleDayCardProps {
  day: WorkoutDay;
  /** Zero-based position in the week (rendered as "Day N"). */
  index: number;
  /** How many of the day's exercises are marked complete. */
  completedCount?: number;
  onOpen: () => void;
}

/**
 * A single day in the weekly schedule. Lifts on hover, dips on tap, and opens
 * the full workout when clicked. Shows a progress ring once any exercise is done.
 */
export function ScheduleDayCard({
  day,
  index,
  completedCount = 0,
  onOpen,
}: ScheduleDayCardProps) {
  const theme = FOCUS_THEME[day.focus];
  const total = day.exercises.length;
  const percent = total > 0 ? (completedCount / total) * 100 : 0;
  const tilt = useTilt();

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 26 }}
      style={tilt.style}
      onMouseMove={tilt.handlers.onMouseMove}
      onMouseLeave={tilt.handlers.onMouseLeave}
      className={cn(
        "group relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 text-left shadow-soft outline-none transition-[border-color,box-shadow] duration-300 hover:shadow-glow-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        theme.ring,
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br to-transparent opacity-60",
          theme.wash,
        )}
        aria-hidden
      />
      <span
        className="pointer-events-none absolute -right-3 -top-5 select-none font-display text-8xl font-black text-foreground/[0.04]"
        aria-hidden
      >
        {index + 1}
      </span>

      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-4">
          <span
            className={cn(
              "flex size-12 shrink-0 items-center justify-center rounded-xl",
              theme.chip,
            )}
          >
            <Dumbbell className="size-6" />
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Day {index + 1}
            </p>
            <h3 className="font-display text-xl font-bold tracking-tight">
              {day.name}
            </h3>
          </div>
        </div>
        {completedCount > 0 ? (
          <ProgressRing value={percent} size={44} strokeWidth={5}>
            <span className="text-[9px] font-bold tabular-nums text-foreground">
              {completedCount}/{total}
            </span>
          </ProgressRing>
        ) : null}
      </div>

      <p className="mt-4 line-clamp-2 text-sm text-muted-foreground">
        {day.description}
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
        <span>{day.exercises.length} exercises</span>
        <span aria-hidden>·</span>
        <span>{totalSets(day)} sets</span>
        <span aria-hidden>·</span>
        <span>~{estimateDurationMinutes(day)} min</span>
      </div>

      <div className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100">
        Open workout
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
      </div>
    </motion.button>
  );
}
