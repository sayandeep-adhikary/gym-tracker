"use client";

import { useCallback, useMemo } from "react";

import { useLocalStorage } from "@/hooks/use-local-storage";

export const FAVORITES_KEY = "gt:favorites";

/**
 * Persisted set of favorited exercises, keyed by exercise name (so the same
 * movement is favorited consistently wherever it appears). Backed by
 * localStorage and kept in sync across the app within the tab.
 */
export function useFavorites() {
  const [names, setNames, hydrated] = useLocalStorage<string[]>(
    FAVORITES_KEY,
    [],
  );

  const set = useMemo(() => new Set(names), [names]);

  const has = useCallback((name: string) => set.has(name), [set]);

  const toggle = useCallback(
    (name: string) => {
      setNames((prev) =>
        prev.includes(name)
          ? prev.filter((entry) => entry !== name)
          : [...prev, name],
      );
    },
    [setNames],
  );

  const remove = useCallback(
    (name: string) => {
      setNames((prev) => prev.filter((entry) => entry !== name));
    },
    [setNames],
  );

  const clear = useCallback(() => setNames([]), [setNames]);

  return {
    names,
    set,
    has,
    toggle,
    remove,
    clear,
    count: names.length,
    hydrated,
  };
}
