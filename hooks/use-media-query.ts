"use client";

import { useEffect, useState } from "react";

/**
 * Subscribe to a CSS media query and return whether it currently matches.
 * SSR-safe: returns `false` on the server and during the first client render.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);

    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}
