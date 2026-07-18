/** Central registry of the localStorage keys the app uses. */
export const STORAGE_KEYS = {
  splitPlan: "gt:selected-split-plan",
  workoutProgress: "gt:workout-progress",
  workoutHistory: "gt:workout-history",
  favorites: "gt:favorites",
  streakReset: "gt:streak-reset",
} as const;

export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];

export const ALL_STORAGE_KEYS: StorageKey[] = Object.values(STORAGE_KEYS);
