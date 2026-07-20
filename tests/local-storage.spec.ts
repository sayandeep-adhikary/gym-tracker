import { readState, seedState } from '../utils/storage';
import { KNOWN_EXERCISE, ROUTES, STORAGE_KEYS } from '../utils/constants';
import { expect, test } from '../fixtures';

/**
 * 14. Local storage.
 * Confirms each slice of app state (split, favorites, progress, streak reset)
 * is persisted under the expected key and restored on reload.
 */
test.describe('Local storage persistence', () => {
  test('selected split persists under its key', async ({ page, homePage }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await homePage.goto();
    await homePage.selectSplit('6-Day Split');

    await expect(await readState(page, STORAGE_KEYS.splitPlan)).toBe('6-day');
    await page.reload();
    await expect(await readState(page, STORAGE_KEYS.splitPlan)).toBe('6-day');
  });

  test('favorites persist and are restored on reload', async ({ page }) => {
    await seedState(page, { favorites: [KNOWN_EXERCISE] });
    await page.goto(ROUTES.favorites);
    await expect(page.getByRole('heading', { name: KNOWN_EXERCISE, level: 3 })).toBeVisible();

    await page.reload();
    await expect(await readState<string[]>(page, STORAGE_KEYS.favorites)).toEqual([KNOWN_EXERCISE]);
  });

  test('workout progress is written under its key', async ({ page, workoutPage }) => {
    await seedState(page, { splitPlan: '5-day', workoutProgress: {} });
    await workoutPage.goto();
    await workoutPage.openDay('Push');
    await workoutPage.completionToggle(0).click();

    await expect
      .poll(async () => (await readState<Record<string, string[]>>(page, STORAGE_KEYS.workoutProgress)) ?? {})
      .toHaveProperty('push');
  });

  test('a seeded streak-reset value is honoured', async ({ page, dashboardPage }) => {
    // A future reset date zeroes the streak even with history present.
    await seedState(page, {
      workoutHistory: [{ date: '2026-01-01', dayId: 'push' }],
      streakReset: '2999-01-01',
    });
    await dashboardPage.goto();

    await expect(await readState(page, STORAGE_KEYS.streakReset)).toBe('2999-01-01');
    await expect(dashboardPage.streakBadge).toContainText('0 day streak');
  });

  test('settings persist across navigation (favorites survive a page change)', async ({ page, navigation }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await seedState(page, { favorites: [KNOWN_EXERCISE] });
    await page.goto(ROUTES.favorites);
    await expect(page.getByRole('heading', { name: KNOWN_EXERCISE, level: 3 })).toBeVisible();

    await navigation.navigateTo('Settings');
    await navigation.navigateTo('Favorites');
    await expect(page.getByRole('heading', { name: KNOWN_EXERCISE, level: 3 })).toBeVisible();
  });
});
