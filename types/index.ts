import type { LucideIcon } from "lucide-react";

/**
 * =============================================================================
 *  Domain & UI types for Gym Tracker - Push Pull Legs
 * =============================================================================
 */

/** The three training days of a Push / Pull / Legs split. */
export type WorkoutSplit = "push" | "pull" | "legs";

/** Trainable muscle groups. */
export type MuscleGroup =
  | "chest"
  | "shoulders"
  | "rear-delts"
  | "triceps"
  | "back"
  | "lats"
  | "traps"
  | "biceps"
  | "forearms"
  | "quads"
  | "hamstrings"
  | "glutes"
  | "adductors"
  | "hip-flexors"
  | "calves"
  | "abs"
  | "obliques"
  | "core";

/** Weight unit preference. */
export type WeightUnit = "kg" | "lb";

/** A single navigation entry rendered in the header / bottom nav / sidebar. */
export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  disabled?: boolean;
  badge?: string;
}

/** Metadata describing a split day (used for cards, filters, theming). */
export interface SplitMeta {
  key: WorkoutSplit;
  label: string;
  description: string;
  muscles: MuscleGroup[];
}

/** Identifier for a weekly training plan (days trained per week). */
export type SplitPlanId = "5-day" | "6-day";

/** A selectable weekly training plan shown on the home screen. */
export interface SplitPlan {
  id: SplitPlanId;
  title: string;
  days: number;
  description: string;
  /** Ordered focus for each training day, e.g. ["Push", "Pull", "Legs", ...]. */
  schedule: string[];
  /** The workout templates this plan schedules, in order. */
  dayIds: WorkoutDayId[];
  icon: LucideIcon;
}

/** A catalogued exercise. */
export interface Exercise {
  id: string;
  name: string;
  split: WorkoutSplit;
  primaryMuscles: MuscleGroup[];
  secondaryMuscles?: MuscleGroup[];
  equipment?: string;
}

/** A single logged set. */
export interface WorkoutSet {
  id: string;
  weight: number;
  reps: number;
  rpe?: number;
  completed: boolean;
}

/** An exercise together with its logged sets within a session. */
export interface ExerciseEntry {
  exercise: Exercise;
  sets: WorkoutSet[];
  notes?: string;
}

/** A completed or in-progress workout session. */
export interface WorkoutSession {
  id: string;
  date: string;
  split: WorkoutSplit;
  title: string;
  entries: ExerciseEntry[];
  durationMinutes?: number;
}

/**
 * =============================================================================
 *  Workout templates (the training plan)
 * =============================================================================
 */

/** Equipment used to perform an exercise. */
export type Equipment =
  | "barbell"
  | "dumbbell"
  | "ez-bar"
  | "machine"
  | "cable"
  | "smith-machine"
  | "kettlebell"
  | "resistance-band"
  | "bodyweight";

/** Relative difficulty of an exercise. */
export type Difficulty = "beginner" | "intermediate" | "advanced";

/** Movement pattern used to drive an exercise's animated illustration. */
export type AnimationType =
  | "horizontal-press"
  | "vertical-press"
  | "horizontal-pull"
  | "vertical-pull"
  | "squat"
  | "hinge"
  | "lunge"
  | "curl"
  | "extension"
  | "lateral-raise"
  | "fly"
  | "calf-raise"
  | "core-flexion"
  | "core-rotation";

/** A prescribed exercise within a workout template. */
export interface WorkoutExercise {
  id: string;
  name: string;
  primaryMuscle: MuscleGroup;
  secondaryMuscles: MuscleGroup[];
  equipment: Equipment;
  sets: number;
  reps: string;
  rest: string;
  difficulty: Difficulty;
  animationType: AnimationType;
  tips: string[];
}

/** High-level focus of a workout day. */
export type WorkoutFocus = "push" | "pull" | "legs" | "upper" | "lower";

/** Stable identifier for each workout template. */
export type WorkoutDayId =
  | "push"
  | "pull"
  | "legs"
  | "upper"
  | "lower"
  | "push-a"
  | "push-b"
  | "pull-a"
  | "pull-b"
  | "legs-a"
  | "legs-b";

/** A workout template — an ordered list of prescribed exercises. */
export interface WorkoutDay {
  id: WorkoutDayId;
  name: string;
  focus: WorkoutFocus;
  description: string;
  exercises: WorkoutExercise[];
}

/** Generic props helper for components that accept a `className`. */
export interface WithClassName {
  className?: string;
}
