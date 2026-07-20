import { readState, seedState } from '../utils/storage';
import { KNOWN_EXERCISE, STORAGE_KEYS } from '../utils/constants';
import { expect, test } from '../fixtures';

/**
 * 11. Settings.
 * Opening settings, the destructive-action confirmation dialogs, cancelling vs
 * confirming, and the resulting localStorage updates.
 */
test.describe('Settings', () => {
  test('renders the data-management and backup actions', async ({ settingsPage }) => {
    await settingsPage.goto();

    await expect(settingsPage.heading).toBeVisible();
    await expect(settingsPage.resetHistoryButton).toBeVisible();
    await expect(settingsPage.resetStreakButton).toBeVisible();
    await expect(settingsPage.clearFavoritesButton).toBeVisible();
    await expect(settingsPage.exportButton).toBeVisible();
    await expect(settingsPage.importButton).toBeVisible();
  });

  test('a destructive action opens a confirmation dialog', async ({ settingsPage }) => {
    await settingsPage.goto();
    await settingsPage.resetHistoryButton.click();

    await expect(settingsPage.confirmDialog).toBeVisible();
    await expect(settingsPage.confirmDialog).toContainText('Reset workout history?');
  });

  test('cancelling a confirmation leaves data untouched', async ({ page, settingsPage }) => {
    await seedState(page, { favorites: [KNOWN_EXERCISE] });
    await settingsPage.goto();

    await settingsPage.clearFavoritesButton.click();
    await expect(settingsPage.confirmDialog).toBeVisible();
    await settingsPage.cancel();

    await expect(await readState(page, STORAGE_KEYS.favorites)).toEqual([KNOWN_EXERCISE]);
  });

  test('clearing favorites updates localStorage after confirming', async ({ page, settingsPage }) => {
    await seedState(page, { favorites: [KNOWN_EXERCISE] });
    await settingsPage.goto();

    await settingsPage.clearFavoritesButton.click();
    await settingsPage.confirm('Clear favorites');

    await expect
      .poll(async () => (await readState<string[]>(page, STORAGE_KEYS.favorites)) ?? [])
      .toEqual([]);
  });

  test('resetting workout history clears history and progress', async ({ page, settingsPage }) => {
    await seedState(page, {
      workoutHistory: [{ date: '2026-01-01', dayId: 'push' }],
      workoutProgress: { push: ['push-barbell-bench-press'] },
    });
    await settingsPage.goto();

    await settingsPage.resetHistoryButton.click();
    await settingsPage.confirm('Reset history');

    await expect
      .poll(async () => (await readState<unknown[]>(page, STORAGE_KEYS.workoutHistory)) ?? [])
      .toEqual([]);
    await expect
      .poll(async () => (await readState<Record<string, string[]>>(page, STORAGE_KEYS.workoutProgress)) ?? {})
      .toEqual({});
  });
});
