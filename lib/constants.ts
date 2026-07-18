/** Static, app-wide configuration and route constants. */

export const SITE = {
  name: "Gym Tracker",
  shortName: "PPL",
  title: "Gym Tracker — Push Pull Legs",
  description:
    "A premium, mobile-first workout tracker built around the Push / Pull / Legs training split.",
  url: "https://gym-tracker.local",
  locale: "en-US",
  themeColor: "#0a0d14",
  version: "0.1.0",
} as const;

export const ROUTES = {
  home: "/",
  workouts: "/workouts",
  progress: "/progress",
  favorites: "/favorites",
  settings: "/settings",
} as const;

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES];

/** Shared animation timings (seconds) for a consistent motion language. */
export const MOTION = {
  fast: 0.2,
  base: 0.35,
  slow: 0.6,
  stagger: 0.06,
} as const;
