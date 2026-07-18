import type { MuscleGroup } from "@/types";

export interface MuscleCategory {
  key: string;
  label: string;
  muscles: MuscleGroup[];
}

/**
 * Broad, user-facing muscle groups and the specific muscles each contains.
 * Used for filtering and for the progress dashboard's muscle-focus chart.
 */
export const MUSCLE_CATEGORIES: MuscleCategory[] = [
  { key: "chest", label: "Chest", muscles: ["chest"] },
  { key: "back", label: "Back", muscles: ["back", "lats", "traps"] },
  { key: "shoulders", label: "Shoulders", muscles: ["shoulders", "rear-delts"] },
  { key: "biceps", label: "Biceps", muscles: ["biceps", "forearms"] },
  { key: "triceps", label: "Triceps", muscles: ["triceps"] },
  {
    key: "legs",
    label: "Legs",
    muscles: ["quads", "hamstrings", "glutes", "calves", "adductors", "hip-flexors"],
  },
  { key: "core", label: "Core", muscles: ["core", "abs", "obliques"] },
];

/** Find the broad category a specific muscle belongs to. */
export function getMuscleCategory(muscle: MuscleGroup): MuscleCategory | undefined {
  return MUSCLE_CATEGORIES.find((category) => category.muscles.includes(muscle));
}
