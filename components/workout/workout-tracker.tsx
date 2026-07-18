"use client";

import { useEffect, useRef, useState } from "react";
import { RotateCcw, Trophy } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { Stagger, StaggerItem } from "@/components/common/motion";
import { FOCUS_THEME } from "@/components/schedule/focus-theme";
import { Badge } from "@/components/ui/badge";
import { PrimaryButton } from "@/components/ui/primary-button";
import { ProgressRing } from "@/components/ui/progress-ring";
import { SecondaryButton } from "@/components/ui/secondary-button";
import { Confetti } from "@/components/workout/confetti";
import { ExerciseCard } from "@/components/workout/exercise-card";
import { useWorkoutHistory } from "@/hooks/use-workout-history";
import { useWorkoutProgress } from "@/hooks/use-workout-progress";
import { cn } from "@/lib/utils";
import type { WorkoutDay } from "@/types";

interface WorkoutTrackerProps {
  day: WorkoutDay;
  dayIndex: number | null;
  onClose: () => void;
}

/**
 * The body of the workout modal: an animated progress ring, per-exercise
 * completion checkboxes (persisted to localStorage), and a confetti celebration
 * once every exercise is done.
 */
export function WorkoutTracker({ day, dayIndex, onClose }: WorkoutTrackerProps) {
  const { completedIds, toggle, reset, hydrated } = useWorkoutProgress(day.id);
  const history = useWorkoutHistory();

  const total = day.exercises.length;
  const done = completedIds.size;
  const percent = total > 0 ? Math.round((done / total) * 100) : 0;
  const allDone = total > 0 && done >= total;

  const [celebrating, setCelebrating] = useState(false);
  const initialized = useRef(false);
  const prevAllDone = useRef(false);

  // Celebrate only when the user *completes* the last exercise — not when a
  // already-finished workout is re-opened.
  useEffect(() => {
    if (!hydrated) return;
    if (!initialized.current) {
      initialized.current = true;
      prevAllDone.current = allDone;
      return;
    }
    if (allDone && !prevAllDone.current) {
      setCelebrating(true);
      history.log(day.id);
    }
    prevAllDone.current = allDone;
  }, [hydrated, allDone, day.id, history.log]);

  const theme = FOCUS_THEME[day.focus];

  return (
    <div className="relative flex min-h-0 flex-1 flex-col">
      {/* Header + progress */}
      <div className="shrink-0 space-y-4 p-6 sm:p-7">
        <div className="space-y-2 pr-10">
          <div className="flex flex-wrap items-center gap-2">
            {dayIndex !== null ? (
              <Badge variant="secondary">Day {dayIndex + 1}</Badge>
            ) : null}
            <span
              className={cn(
                "rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize",
                theme.badge,
              )}
            >
              {day.focus}
            </span>
          </div>
          <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
            {day.name}
          </h2>
        </div>

        <div className="flex items-center gap-4 rounded-2xl border border-border bg-secondary/40 p-3 pr-4">
          <ProgressRing value={percent} size={60} strokeWidth={6} />
          <div className="min-w-0 flex-1">
            <p className="font-display text-lg font-bold leading-none tabular-nums">
              {done} <span className="text-muted-foreground">/ {total}</span>
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              exercises complete
            </p>
          </div>
          {done > 0 ? (
            <button
              type="button"
              onClick={reset}
              className="flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <RotateCcw className="size-3.5" />
              Reset
            </button>
          ) : null}
        </div>
      </div>

      {/* Exercises */}
      <div className="min-h-0 flex-1 overflow-y-auto px-6 pb-6 sm:px-7 sm:pb-7">
        <Stagger className="space-y-3">
          {day.exercises.map((exercise, exerciseIndex) => (
            <StaggerItem key={exercise.id}>
              <ExerciseCard
                index={exerciseIndex + 1}
                exercise={exercise}
                completed={completedIds.has(exercise.id)}
                onCompletedChange={() => toggle(exercise.id)}
              />
            </StaggerItem>
          ))}
        </Stagger>
      </div>

      {/* Celebration */}
      <AnimatePresence>
        {celebrating ? (
          <motion.div
            key="celebration"
            className="absolute inset-0 z-20 flex items-center justify-center overflow-hidden bg-card/90 p-6 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Confetti />
            <div className="relative z-10 flex flex-col items-center gap-4 text-center">
              <motion.div
                initial={{ scale: 0, rotate: -25 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 15,
                  delay: 0.1,
                }}
                className="flex size-20 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-glow-lg"
              >
                <Trophy className="size-10" />
              </motion.div>
              <div className="space-y-1">
                <h3 className="text-gradient-primary font-display text-2xl font-extrabold">
                  Workout complete!
                </h3>
                <p className="text-sm text-muted-foreground">
                  You finished all {total} exercises. Great work.
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <SecondaryButton size="default" onClick={() => setCelebrating(false)}>
                  Review
                </SecondaryButton>
                <PrimaryButton size="default" onClick={onClose}>
                  Done
                </PrimaryButton>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
