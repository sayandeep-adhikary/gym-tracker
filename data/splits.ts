import type { SplitMeta } from "@/types";

/**
 * Static metadata for the three Push / Pull / Legs training days.
 * Consumed by dashboard cards, filters and (later) workout screens.
 */
export const SPLITS: SplitMeta[] = [
  {
    key: "push",
    label: "Push",
    description: "Chest, shoulders & triceps",
    muscles: ["chest", "shoulders", "triceps"],
  },
  {
    key: "pull",
    label: "Pull",
    description: "Back, biceps & forearms",
    muscles: ["back", "biceps", "forearms"],
  },
  {
    key: "legs",
    label: "Legs",
    description: "Quads, hamstrings, glutes & calves",
    muscles: ["quads", "hamstrings", "glutes", "calves"],
  },
];

/** Convenience lookup by split key. */
export const SPLIT_BY_KEY = Object.fromEntries(
  SPLITS.map((split) => [split.key, split]),
) as Record<SplitMeta["key"], SplitMeta>;
