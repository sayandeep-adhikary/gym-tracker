/**
 * Shared constants mirrored from the application source so the tests have a
 * single, readable place to reference routes, storage keys and nav items.
 * Kept intentionally small — only what the specs actually assert against.
 */

/** Application routes (mirrors `lib/constants.ts` → ROUTES). */
export const ROUTES = {
  home: '/',
  workouts: '/workouts',
  progress: '/progress',
  favorites: '/favorites',
  settings: '/settings',
} as const;

export type RouteKey = keyof typeof ROUTES;

/** localStorage keys (mirrors `lib/storage-keys.ts`). */
export const STORAGE_KEYS = {
  splitPlan: 'gt:selected-split-plan',
  workoutProgress: 'gt:workout-progress',
  workoutHistory: 'gt:workout-history',
  favorites: 'gt:favorites',
  streakReset: 'gt:streak-reset',
} as const;

export const ALL_STORAGE_KEYS = Object.values(STORAGE_KEYS);

/** Primary navigation destinations (mirrors `data/navigation.ts`). */
export const NAV_ITEMS = [
  { title: 'Home', route: ROUTES.home },
  { title: 'Workouts', route: ROUTES.workouts },
  { title: 'Progress', route: ROUTES.progress },
  { title: 'Favorites', route: ROUTES.favorites },
  { title: 'Settings', route: ROUTES.settings },
] as const;

/** The two selectable weekly split plans. */
export const SPLIT_PLANS = {
  fiveDay: { id: '5-day', label: '5-Day Split', days: ['Push', 'Pull', 'Legs', 'Upper', 'Lower'] },
  sixDay: { id: '6-day', label: '6-Day Split', days: ['Push', 'Pull', 'Legs', 'Push', 'Pull', 'Legs'] },
} as const;

/** A guaranteed-to-exist exercise name, used for positive search assertions. */
export const KNOWN_EXERCISE = 'Barbell Bench Press';

/** A query that should never match any exercise. */
export const UNKNOWN_EXERCISE_QUERY = 'zzzqwxnotarealexercise';

/** Representative viewport sizes for responsive testing. */
export const VIEWPORTS = {
  mobile: { width: 390, height: 844 },
  tablet: { width: 820, height: 1180 },
  desktop: { width: 1440, height: 900 },
} as const;
