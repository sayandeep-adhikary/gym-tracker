"use client";

import { useCallback } from "react";

import { useLocalStorage } from "@/hooks/use-local-storage";
import type { WorkoutDayId } from "@/types";

/** A single completed-workout record. */
export interface WorkoutLogEntry {
  /** Local calendar date, `YYYY-MM-DD`. */
  date: string;
  dayId: WorkoutDayId;
}

export const WORKOUT_HISTORY_KEY = "gt:workout-history";

function todayISO(): string {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

/**
 * A persisted log of completed workouts (with dates), powering the progress
 * dashboard's streak, weekly and monthly stats. Backed by localStorage.
 */
export function useWorkoutHistory() {
  const [entries, setEntries, hydrated] = useLocalStorage<WorkoutLogEntry[]>(
    WORKOUT_HISTORY_KEY,
    [],
  );

  const log = useCallback(
    (dayId: WorkoutDayId) => {
      const date = todayISO();
      setEntries((prev) =>
        prev.some((entry) => entry.date === date && entry.dayId === dayId)
          ? prev
          : [...prev, { date, dayId }],
      );
    },
    [setEntries],
  );

  const clear = useCallback(() => setEntries([]), [setEntries]);

  return { entries, log, clear, hydrated };
}
