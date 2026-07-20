"use client";

import { useCallback, useEffect, useState } from "react";

const SYNC_EVENT = "gt:local-storage";

/**
 * A typed, SSR-safe `localStorage`-backed state hook.
 *
 * Renders with `initialValue` on the server and first client paint (avoiding
 * hydration mismatches), then reads the persisted value after mount. Instances
 * sharing a `key` stay in sync within the tab (a custom event) and across tabs
 * (the native `storage` event). Returns a `[value, setValue, hydrated]` tuple.
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const read = () => {
      try {
        const item = window.localStorage.getItem(key);
        if (item !== null) setValue(JSON.parse(item) as T);
      } catch {
        // Ignore read/parse errors (e.g. private mode, malformed value).
      }
    };

    read();
    setHydrated(true);

    const onSync = (event: Event) => {
      if ((event as CustomEvent<{ key: string }>).detail?.key === key) read();
    };
    const onStorage = (event: StorageEvent) => {
      if (event.key === key) read();
    };

    window.addEventListener(SYNC_EVENT, onSync);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener(SYNC_EVENT, onSync);
      window.removeEventListener("storage", onStorage);
    };
  }, [key]);

  const setStoredValue = useCallback(
    (next: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const resolved = next instanceof Function ? next(prev) : next;
        // Persist and notify *after* this render commits. Dispatching the sync
        // event synchronously here would run other subscribers' `read()` (a
        // setState) while React is still rendering this component, which React
        // flags as "Cannot update a component while rendering a different one"
        // — and, in practice, corrupted rapid successive updates.
        queueMicrotask(() => {
          try {
            window.localStorage.setItem(key, JSON.stringify(resolved));
            window.dispatchEvent(new CustomEvent(SYNC_EVENT, { detail: { key } }));
          } catch {
            // Ignore write errors (e.g. storage disabled or full).
          }
        });
        return resolved;
      });
    },
    [key],
  );

  return [value, setStoredValue, hydrated] as const;
}
