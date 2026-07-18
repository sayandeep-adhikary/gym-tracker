"use client";

import { useMediaQuery } from "@/hooks/use-media-query";

/** Tailwind's `lg` breakpoint. Below this we render the mobile-first UI. */
const DESKTOP_BREAKPOINT = "(min-width: 1024px)";

/** Returns `true` when the viewport is at or above the desktop breakpoint. */
export function useIsDesktop(): boolean {
  return useMediaQuery(DESKTOP_BREAKPOINT);
}
