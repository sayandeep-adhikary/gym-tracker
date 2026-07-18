import { ALL_STORAGE_KEYS } from "@/lib/storage-keys";

/**
 * Must match the sync event dispatched by `useLocalStorage` so imported data
 * updates every mounted hook instance live (without a page reload).
 */
const LOCAL_STORAGE_EVENT = "gt:local-storage";

interface BackupFile {
  app: "gym-tracker";
  version: number;
  exportedAt: string;
  data: Record<string, unknown>;
}

/** Collect all app data from localStorage into a backup object. */
export function createBackup(): BackupFile {
  const data: Record<string, unknown> = {};
  for (const key of ALL_STORAGE_KEYS) {
    const raw = window.localStorage.getItem(key);
    if (raw === null) continue;
    try {
      data[key] = JSON.parse(raw);
    } catch {
      data[key] = raw;
    }
  }
  return {
    app: "gym-tracker",
    version: 1,
    exportedAt: new Date().toISOString(),
    data,
  };
}

/** Download the current app data as a JSON file. */
export function downloadBackup(): void {
  const backup = createBackup();
  const blob = new Blob([JSON.stringify(backup, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `gym-tracker-backup-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

/**
 * Restore app data from a backup JSON string. Only known keys are written
 * (arbitrary keys are ignored), and each write is broadcast so the UI updates
 * live. Returns `false` if the file isn't a valid backup.
 */
export function applyBackup(json: string): boolean {
  let parsed: unknown;
  try {
    parsed = JSON.parse(json);
  } catch {
    return false;
  }

  if (!parsed || typeof parsed !== "object") return false;
  const backup = parsed as Partial<BackupFile>;
  if (backup.app !== "gym-tracker" || !backup.data || typeof backup.data !== "object") {
    return false;
  }

  const data = backup.data as Record<string, unknown>;
  for (const key of ALL_STORAGE_KEYS) {
    if (!(key in data)) continue;
    try {
      window.localStorage.setItem(key, JSON.stringify(data[key]));
      window.dispatchEvent(new CustomEvent(LOCAL_STORAGE_EVENT, { detail: { key } }));
    } catch {
      // Ignore individual write failures.
    }
  }
  return true;
}
