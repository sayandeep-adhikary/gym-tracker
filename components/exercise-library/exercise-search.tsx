"use client";

import { useMemo, useState } from "react";
import { Search, SearchX, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { EmptyState } from "@/components/common/empty-state";
import { FilterChips } from "@/components/exercise-library/filter-chips";
import { SectionTitle } from "@/components/ui/section-title";
import { ExerciseCard } from "@/components/workout/exercise-card";
import { UNIQUE_EXERCISES } from "@/data/workouts";
import type { Difficulty, MuscleGroup } from "@/types";

interface MuscleFilter {
  value: string;
  label: string;
  /** Muscle groups this filter matches, or `null` for "all". */
  muscles: MuscleGroup[] | null;
}

const MUSCLE_FILTERS: MuscleFilter[] = [
  { value: "all", label: "All", muscles: null },
  { value: "chest", label: "Chest", muscles: ["chest"] },
  { value: "back", label: "Back", muscles: ["back", "lats", "traps"] },
  { value: "shoulders", label: "Shoulders", muscles: ["shoulders", "rear-delts"] },
  { value: "biceps", label: "Biceps", muscles: ["biceps"] },
  { value: "triceps", label: "Triceps", muscles: ["triceps"] },
  {
    value: "legs",
    label: "Legs",
    muscles: ["quads", "hamstrings", "glutes", "calves", "adductors", "hip-flexors"],
  },
  { value: "core", label: "Core", muscles: ["core", "abs", "obliques"] },
];

const DIFFICULTY_FILTERS: FilterOption[] = [
  { value: "all", label: "All levels" },
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
];

type FilterOption = { value: string; label: string };

/**
 * An instant, client-side exercise search (no backend). Filters the full
 * exercise database by free-text query, muscle group and difficulty. Filters
 * and results animate as the criteria change.
 */
export function ExerciseSearch() {
  const [query, setQuery] = useState("");
  const [muscle, setMuscle] = useState("all");
  const [difficulty, setDifficulty] = useState<Difficulty | "all">("all");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const activeMuscle = MUSCLE_FILTERS.find((filter) => filter.value === muscle);

    return UNIQUE_EXERCISES.filter((exercise) => {
      if (difficulty !== "all" && exercise.difficulty !== difficulty) return false;

      if (
        activeMuscle?.muscles &&
        !activeMuscle.muscles.includes(exercise.primaryMuscle)
      ) {
        return false;
      }

      if (q) {
        const haystack =
          `${exercise.name} ${exercise.primaryMuscle} ${exercise.equipment}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }

      return true;
    });
  }, [query, muscle, difficulty]);

  return (
    <section className="space-y-6">
      <SectionTitle
        eyebrow="Browse"
        title="Exercise library"
        description="Search the full exercise database and filter by muscle or difficulty."
      />

      {/* Search */}
      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search exercises, muscles or equipment…"
          aria-label="Search exercises"
          spellCheck={false}
          className="h-12 w-full rounded-2xl border border-border bg-card pl-12 pr-11 text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-primary/50 focus-visible:ring-2 focus-visible:ring-ring"
        />
        <AnimatePresence>
          {query ? (
            <motion.button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="absolute right-3 top-1/2 flex size-7 -translate-y-1/2 items-center justify-center rounded-full bg-secondary text-muted-foreground transition-colors hover:text-foreground"
            >
              <X className="size-4" />
            </motion.button>
          ) : null}
        </AnimatePresence>
      </div>

      {/* Filters */}
      <div className="space-y-3">
        <FilterChips
          options={MUSCLE_FILTERS}
          value={muscle}
          onChange={setMuscle}
          layoutId="muscle-filter"
        />
        <FilterChips
          options={DIFFICULTY_FILTERS}
          value={difficulty}
          onChange={(value) => setDifficulty(value as Difficulty | "all")}
          layoutId="difficulty-filter"
        />
      </div>

      <p className="text-sm text-muted-foreground" aria-live="polite">
        {results.length} {results.length === 1 ? "exercise" : "exercises"}
      </p>

      {/* Results */}
      {results.length === 0 ? (
        <EmptyState
          icon={SearchX}
          title="No exercises found"
          description="Try a different search term or clear your filters."
        />
      ) : (
        <motion.div layout className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {results.map((exercise) => (
              <motion.div
                key={exercise.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              >
                <ExerciseCard exercise={exercise} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </section>
  );
}
