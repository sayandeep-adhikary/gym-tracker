import { readState, seedState } from '../utils/storage';
import { STORAGE_KEYS } from '../utils/constants';
import { expect, test } from '../fixtures';

/**
 * Exercise ids for the Push day of the 5-day split, in display order (see
 * `data/workouts.ts`). Used to seed partial progress deterministically.
 */
const PUSH_EXERCISE_IDS = [
  'push-barbell-bench-press',
  'push-overhead-press',
  'push-incline-dumbbell-press',
  'push-lateral-raise',
  'push-triceps-pushdown',
  'push-overhead-triceps-extension',
];

/**
 * 8. Workout progress.
 * Completing exercises inside the tracker, watching the progress readout climb,
 * reaching 100% completion, and confirming progress persists across a refresh.
 */
test.describe('Workout progress', () => {
  test.beforeEach(async ({ page }) => {
    // Only pin the split. NB: seeded values are injected on *every* load, so we
    // must not seed workoutProgress here or a reload would wipe real progress.
    await seedState(page, { splitPlan: '5-day' });
  });

  test('completing an exercise advances the progress readout', async ({ workoutPage }) => {
    await workoutPage.goto();
    await workoutPage.openDay('Push');

    await expect(workoutPage.progressReadout).toContainText(/^0\s*\//);
    await workoutPage.completionToggle(0).click();
    await expect(workoutPage.progressReadout).toContainText(/^1\s*\//);
  });

  test('completing every exercise reaches full completion and celebrates', async ({ workoutPage, page }) => {
    // The tracker restores completion from localStorage on mount, so we start
    // with every Push exercise already done except the last one. This mirrors a
    // user finishing their final set and avoids depending on many rapid,
    // animation-heavy taps in a single render pass.
    await seedState(page, {
      splitPlan: '5-day',
      workoutProgress: { push: PUSH_EXERCISE_IDS.slice(0, -1) },
    });

    await workoutPage.goto();
    await workoutPage.openDay('Push');

    // One exercise remains.
    await expect(workoutPage.progressReadout).toContainText(
      new RegExp(`^${PUSH_EXERCISE_IDS.length - 1}\\s*/`),
    );

    // Check off the final exercise (the only remaining "Mark as done" toggle).
    await workoutPage.completeRemainingExercise();

    // The readout hits 100% and the celebration overlay appears.
    await expect(workoutPage.progressReadout).toContainText(
      new RegExp(`^${PUSH_EXERCISE_IDS.length}\\s*/`),
    );
    await expect(page.getByText('Workout complete!')).toBeVisible();

    // The completed workout is logged to history.
    await expect
      .poll(async () => (await readState<unknown[]>(page, STORAGE_KEYS.workoutHistory)) ?? [])
      .not.toEqual([]);
  });

  test('a reset control appears after completing at least one exercise', async ({ workoutPage }) => {
    await workoutPage.goto();
    await workoutPage.openDay('Push');

    await expect(workoutPage.resetProgressButton).toBeHidden();
    await workoutPage.completionToggle(0).click();
    await expect(workoutPage.resetProgressButton).toBeVisible();

    await workoutPage.resetProgressButton.click();
    await expect(workoutPage.progressReadout).toContainText(/^0\s*\//);
  });

  test('progress persists to localStorage and survives a refresh', async ({ workoutPage, page }) => {
    await workoutPage.goto();
    await workoutPage.openDay('Push');
    await workoutPage.completionToggle(0).click();

    await expect
      .poll(async () => (await readState<Record<string, string[]>>(page, STORAGE_KEYS.workoutProgress)) ?? {})
      .toHaveProperty('push');

    await page.reload();
    await workoutPage.openDay('Push');
    await expect(workoutPage.progressReadout).toContainText(/^1\s*\//);
  });
});
