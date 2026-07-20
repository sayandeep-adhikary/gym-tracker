"use client";

import { useState } from "react";
import { Check, Heart } from "lucide-react";
import { motion } from "framer-motion";

import { ExerciseAnimation } from "@/components/exercise-animations/exercise-animation";
import { AnimatedBadge } from "@/components/ui/animated-badge";
import { useFavorites } from "@/hooks/use-favorites";
import { cn } from "@/lib/utils";
import type { Difficulty, WorkoutExercise } from "@/types";

/** Difficulty → animated-badge treatment. */
const DIFFICULTY_BADGE: Record<
  Difficulty,
  { variant: "success" | "accent" | "warning"; pulse: boolean }
> = {
  beginner: { variant: "success", pulse: false },
  intermediate: { variant: "accent", pulse: false },
  advanced: { variant: "warning", pulse: true },
};

interface ExerciseCardProps {
  exercise: WorkoutExercise;
  /** Optional 1-based position shown as a small index chip. */
  index?: number;
  /** Controlled favorite state; omit to let the card manage it internally. */
  favorite?: boolean;
  onFavoriteChange?: (favorite: boolean) => void;
  /** Controlled completion state; omit to let the card manage it internally. */
  completed?: boolean;
  onCompletedChange?: (completed: boolean) => void;
  className?: string;
}

/** A single stat cell (Sets / Reps / Rest). */
function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-lg bg-secondary/50 px-2 py-2 text-center">
      <p className="font-display text-sm font-bold leading-none tabular-nums">
        {value}
      </p>
      <p className="mt-1 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
    </div>
  );
}

/**
 * A reusable, glassy exercise card. Displays the exercise name, primary muscle,
 * sets / reps / rest, an animated difficulty badge, plus favorite and
 * completion toggles. Works either controlled or uncontrolled, and animates on
 * hover, tap and state changes.
 */
export function ExerciseCard({
  exercise,
  index,
  favorite,
  onFavoriteChange,
  completed,
  onCompletedChange,
  className,
}: ExerciseCardProps) {
  const favorites = useFavorites();
  const [doneInternal, setDoneInternal] = useState(false);

  const isFav = favorite ?? favorites.has(exercise.name);
  const isDone = completed ?? doneInternal;

  const toggleFav = () => {
    const next = !isFav;
    if (favorite === undefined) favorites.toggle(exercise.name);
    onFavoriteChange?.(next);
  };

  const toggleDone = () => {
    const next = !isDone;
    if (completed === undefined) setDoneInternal(next);
    onCompletedChange?.(next);
  };

  const badge = DIFFICULTY_BADGE[exercise.difficulty];

  return (
    <motion.div
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: "spring", stiffness: 400, damping: 26 }}
      className={cn(
        "group relative isolate rounded-2xl border bg-[hsl(var(--glass)/0.6)] p-5 shadow-soft backdrop-blur-xl transition-[border-color,box-shadow] duration-300 hover:shadow-glow-accent",
        isDone ? "border-primary/40" : "border-white/10 hover:border-primary/30",
        className,
      )}
    >
      {/* Subtle glow — always faintly on, brighter on hover. */}
      <div
        className="pointer-events-none absolute -inset-1 -z-10 rounded-[20px] bg-gradient-to-br from-primary/20 via-transparent to-accent/20 opacity-30 blur-lg transition-opacity duration-300 group-hover:opacity-80"
        aria-hidden
      />

      <div className="flex items-start gap-4">
        <div className="relative shrink-0">
          <div className="flex size-14 items-center justify-center rounded-xl bg-secondary/70 text-primary">
            <ExerciseAnimation type={exercise.animationType} className="size-12" />
          </div>
          {index !== undefined ? (
            <span className="absolute -left-1.5 -top-1.5 flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold tabular-nums text-primary-foreground shadow-glow">
              {index}
            </span>
          ) : null}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3
                className={cn(
                  "line-clamp-2 font-semibold leading-tight transition-colors",
                  isDone && "text-muted-foreground line-through",
                )}
              >
                {exercise.name}
              </h3>
              <p className="mt-1 text-xs capitalize text-muted-foreground">
                {exercise.primaryMuscle.replaceAll("-", " ")}
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-1">
              {/* Favorite */}
              <button
                type="button"
                onClick={toggleFav}
                aria-pressed={isFav}
                aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
                className="flex size-8 items-center justify-center rounded-full transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <motion.span
                  initial={false}
                  animate={isFav ? { scale: [1, 1.35, 1] } : { scale: 1 }}
                  whileTap={{ scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  className="flex"
                >
                  <Heart
                    className={cn(
                      "size-5 transition-colors",
                      isFav
                        ? "fill-destructive text-destructive"
                        : "text-muted-foreground",
                    )}
                  />
                </motion.span>
              </button>

              {/* Completion checkbox */}
              <button
                type="button"
                onClick={toggleDone}
                aria-pressed={isDone}
                aria-label={isDone ? "Mark as not done" : "Mark as done"}
                className={cn(
                  "flex size-8 items-center justify-center rounded-full border-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  isDone
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-transparent hover:border-primary/50",
                )}
              >
                <motion.span
                  initial={false}
                  animate={{ scale: isDone ? 1 : 0, opacity: isDone ? 1 : 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 25 }}
                  className="flex"
                >
                  <Check className="size-4" strokeWidth={3} />
                </motion.span>
              </button>
            </div>
          </div>

          <div className="mt-3">
            <AnimatedBadge
              variant={badge.variant}
              pulse={badge.pulse}
              className="capitalize"
            >
              {exercise.difficulty}
            </AnimatedBadge>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2">
            <Stat label="Sets" value={exercise.sets} />
            <Stat label="Reps" value={exercise.reps} />
            <Stat label="Rest" value={exercise.rest} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
