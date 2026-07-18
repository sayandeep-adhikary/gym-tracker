"use client";

import { useCallback, useMemo } from "react";

import { useLocalStorage } from "@/hooks/use-local-storage";
import type { WorkoutDayId } from "@/types";

/** Persisted map of workout-day id → completed exercise ids. */
export type WorkoutProgress = Record<string, string[]>;

export const WORKOUT_PROGRESS_KEY = "gt:workout-progress";

/**
 * Tracks and persists which exercises are completed for a given workout day.
 * Backed by localStorage, so progress is restored when the user returns and
 * stays in sync across the app within the tab.
 */
export function useWorkoutProgress(dayId: WorkoutDayId) {
  const [store, setStore, hydrated] = useLocalStorage<WorkoutProgress>(
    WORKOUT_PROGRESS_KEY,
    {},
  );

  const completedIds = useMemo(
    () => new Set(store[dayId] ?? []),
    [store, dayId],
  );

  const toggle = useCallback(
    (exerciseId: string) => {
      setStore((prev) => {
        const next = new Set(prev[dayId] ?? []);
        if (next.has(exerciseId)) next.delete(exerciseId);
        else next.add(exerciseId);
        return { ...prev, [dayId]: Array.from(next) };
      });
    },
    [dayId, setStore],
  );

  const reset = useCallback(() => {
    setStore((prev) => ({ ...prev, [dayId]: [] }));
  }, [dayId, setStore]);

  return { completedIds, toggle, reset, hydrated };
}
