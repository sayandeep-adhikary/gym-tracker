import type { Page } from '@playwright/test';

import { ALL_STORAGE_KEYS, STORAGE_KEYS } from './constants';

/**
 * Helpers for working with the app's `localStorage`-backed persistence.
 *
 * The app reads persisted state once on mount (see `hooks/use-local-storage.ts`),
 * so to seed data we inject it *before* the page loads via `addInitScript`.
 * To read/inspect after interactions we use `page.evaluate`.
 */

/** A partial snapshot of the app's persisted state. Values are pre-serialised objects. */
export interface SeededState {
  splitPlan?: '5-day' | '6-day';
  favorites?: string[];
  workoutProgress?: Record<string, string[]>;
  workoutHistory?: Array<{ date: string; dayId: string }>;
  streakReset?: string | null;
}

/**
 * Seed persisted state so it is present the moment the app boots.
 * Must be called *before* the first `page.goto`.
 */
export async function seedState(page: Page, state: SeededState): Promise<void> {
  const entries: Array<[string, unknown]> = [];
  if (state.splitPlan !== undefined) entries.push([STORAGE_KEYS.splitPlan, state.splitPlan]);
  if (state.favorites !== undefined) entries.push([STORAGE_KEYS.favorites, state.favorites]);
  if (state.workoutProgress !== undefined)
    entries.push([STORAGE_KEYS.workoutProgress, state.workoutProgress]);
  if (state.workoutHistory !== undefined)
    entries.push([STORAGE_KEYS.workoutHistory, state.workoutHistory]);
  if (state.streakReset !== undefined) entries.push([STORAGE_KEYS.streakReset, state.streakReset]);

  await page.addInitScript((pairs: Array<[string, unknown]>) => {
    for (const [key, value] of pairs) {
      window.localStorage.setItem(key, JSON.stringify(value));
    }
  }, entries);
}

/**
 * Inject a *raw* (already-string) value for a key before load. Useful for
 * testing how the app handles corrupt / malformed persisted data.
 */
export async function seedRaw(page: Page, key: string, rawValue: string): Promise<void> {
  await page.addInitScript(
    ([k, v]: [string, string]) => window.localStorage.setItem(k, v),
    [key, rawValue] as [string, string],
  );
}

/** Read and JSON-parse a persisted value from the running page. */
export async function readState<T = unknown>(page: Page, key: string): Promise<T | null> {
  return page.evaluate((k) => {
    const item = window.localStorage.getItem(k);
    return item === null ? null : (JSON.parse(item) as unknown);
  }, key) as Promise<T | null>;
}

/** Read the raw (unparsed) string for a key. */
export async function readRaw(page: Page, key: string): Promise<string | null> {
  return page.evaluate((k) => window.localStorage.getItem(k), key);
}

/** Clear every app storage key on the running page. */
export async function clearState(page: Page): Promise<void> {
  await page.evaluate((keys) => {
    for (const key of keys) window.localStorage.removeItem(key);
  }, ALL_STORAGE_KEYS as unknown as string[]);
}
