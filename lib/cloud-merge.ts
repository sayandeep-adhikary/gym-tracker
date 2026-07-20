import { STORAGE_KEYS } from "@/lib/storage-keys";

/**
 * Bridges the app's localStorage slices to fields on the per-user Firestore
 * document (`users/{uid}`). Pure, dependency-free merge logic so it can be unit
 * tested and reused by the sync bridge without pulling in Firebase.
 */

/** Firestore field name → localStorage key. */
export const FIELD_TO_KEY = {
  splitPlan: STORAGE_KEYS.splitPlan,
  workoutProgress: STORAGE_KEYS.workoutProgress,
  workoutHistory: STORAGE_KEYS.workoutHistory,
  favorites: STORAGE_KEYS.favorites,
  streakReset: STORAGE_KEYS.streakReset,
} as const;

export type CloudField = keyof typeof FIELD_TO_KEY;

export const CLOUD_FIELDS = Object.keys(FIELD_TO_KEY) as CloudField[];

type HistoryEntry = { date: string; dayId: string };

function uniqueStrings(values: unknown): string[] {
  return Array.from(new Set(Array.isArray(values) ? (values as string[]) : []));
}

/**
 * Merge a local and remote value for a single field. Collections union so no
 * data is lost across devices; scalars take the cloud value on load, with the
 * streak-reset date resolving to whichever is later.
 */
export function mergeField(
  field: CloudField,
  local: unknown,
  remote: unknown,
): unknown {
  switch (field) {
    case "favorites":
      return uniqueStrings([
        ...uniqueStrings(local),
        ...uniqueStrings(remote),
      ]);

    case "workoutHistory": {
      const seen = new Set<string>();
      const merged: HistoryEntry[] = [];
      for (const entry of [
        ...(Array.isArray(local) ? (local as HistoryEntry[]) : []),
        ...(Array.isArray(remote) ? (remote as HistoryEntry[]) : []),
      ]) {
        if (!entry || typeof entry.date !== "string") continue;
        const id = `${entry.date}|${entry.dayId}`;
        if (seen.has(id)) continue;
        seen.add(id);
        merged.push(entry);
      }
      return merged;
    }

    case "workoutProgress": {
      const localMap = (local && typeof local === "object" ? local : {}) as Record<string, string[]>;
      const remoteMap = (remote && typeof remote === "object" ? remote : {}) as Record<string, string[]>;
      const out: Record<string, string[]> = {};
      for (const key of new Set([...Object.keys(localMap), ...Object.keys(remoteMap)])) {
        out[key] = uniqueStrings([...(remoteMap[key] ?? []), ...(localMap[key] ?? [])]);
      }
      return out;
    }

    case "streakReset": {
      const a = typeof local === "string" ? local : null;
      const b = typeof remote === "string" ? remote : null;
      if (a && b) return a > b ? a : b;
      return a ?? b ?? null;
    }

    case "splitPlan":
    default:
      // Cloud value wins on load so a saved plan follows the user to a new
      // device; falls back to the local choice when the cloud has none.
      return remote ?? local ?? null;
  }
}
