"use client";

import { Flame } from "lucide-react";
import { motion } from "framer-motion";

import { GlassCard } from "@/components/ui/glass-card";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useWorkoutHistory } from "@/hooks/use-workout-history";
import { STORAGE_KEYS } from "@/lib/storage-keys";
import { computeBestStreak, computeStreak, weekActivity } from "@/lib/streak";
import { cn } from "@/lib/utils";

/**
 * Shows the user's current workout streak and a seven-day activity strip that
 * springs into view one day at a time. All values are derived from the real,
 * persisted workout history and honour the "Reset streak" setting.
 */
export function StreakCard() {
  const { entries } = useWorkoutHistory();
  const [streakReset] = useLocalStorage<string | null>(
    STORAGE_KEYS.streakReset,
    null,
  );

  const dates = new Set(entries.map((entry) => entry.date));
  const currentStreak = computeStreak(dates, streakReset);
  const bestStreak = computeBestStreak(dates);
  const week = weekActivity(dates);

  return (
    <GlassCard className="flex h-full flex-col justify-between gap-6 p-6 sm:p-7">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <motion.span
            className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary"
            animate={{ scale: [1, 1.12, 1] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Flame className="size-7" />
          </motion.span>
          <div>
            <p className="font-display text-3xl font-extrabold leading-none tabular-nums">
              {currentStreak}
              <span className="ml-1 text-base font-semibold text-muted-foreground">
                {currentStreak === 1 ? "day" : "days"}
              </span>
            </p>
            <p className="mt-1 text-sm text-muted-foreground">Current streak</p>
          </div>
        </div>

        <div className="text-right">
          <p className="font-display text-lg font-bold tabular-nums">
            {bestStreak}
          </p>
          <p className="text-xs text-muted-foreground">Best</p>
        </div>
      </div>

      <div className="flex items-end justify-between gap-1.5 sm:gap-2">
        {week.map((day, index) => (
          <div key={index} className="flex flex-1 flex-col items-center gap-2">
            <motion.span
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 20,
                delay: index * 0.06,
              }}
              className={cn(
                "flex size-7 items-center justify-center rounded-full text-xs font-semibold sm:size-8",
                day.isToday && "ring-2 ring-primary/60 ring-offset-2 ring-offset-background",
                day.done
                  ? "bg-primary text-primary-foreground shadow-glow"
                  : "bg-secondary text-muted-foreground",
              )}
            >
              {day.done ? <Flame className="size-4" /> : day.label}
            </motion.span>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}

