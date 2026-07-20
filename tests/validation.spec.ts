import { readState, readRaw, seedRaw } from '../utils/storage';
import { ROUTES, STORAGE_KEYS } from '../utils/constants';
import { expect, test } from '../fixtures';

/**
 * 16 & 18. Validation and error handling.
 * Graceful handling of invalid routes and corrupt/invalid localStorage, plus
 * defensive UI states (default split when persisted value is malformed).
 */
test.describe('Validation & error handling', () => {
  test('an unknown route renders the 404 page, not a crash', async ({ page }) => {
    const response = await page.goto('/this-route-does-not-exist');
    // Next.js serves the custom not-found UI (200 for the streamed page).
    await expect(page.getByText('404')).toBeVisible();
    await expect(page.getByText('Page not found')).toBeVisible();
    // A recovery link back home is provided.
    await expect(page.getByRole('link', { name: /Back home/i })).toBeVisible();
    expect(response?.status()).toBeLessThan(500);
  });

  test('malformed split value falls back to the default without breaking', async ({ page, homePage }) => {
    // Corrupt JSON in the split key must not crash the app.
    await seedRaw(page, STORAGE_KEYS.splitPlan, '{ not valid json');
    await homePage.goto();

    await expect(homePage.heroTitle).toBeVisible();
    // Falls back to the default 5-Day split selection.
    await expect(homePage.splitCard('5-Day Split')).toHaveAttribute('aria-pressed', 'true');
  });

  test('corrupt favorites data does not break the favorites page', async ({ page }) => {
    await seedRaw(page, STORAGE_KEYS.favorites, 'not-an-array');
    await page.goto(ROUTES.favorites);

    // The page renders (empty state) rather than throwing.
    await expect(
      page.locator('#main-content').getByRole('heading', { name: 'Favorites', level: 2 }),
    ).toBeVisible();
    await expect(page.getByText('No favorites yet')).toBeVisible();
  });

  test('corrupt workout history still renders the dashboard', async ({ page, dashboardPage }) => {
    await seedRaw(page, STORAGE_KEYS.workoutHistory, '<<<broken>>>');
    await dashboardPage.goto();

    await expect(dashboardPage.heading).toBeVisible();
    await expect(dashboardPage.streakBadge).toBeVisible();
  });

  test('selecting a split writes a valid value that can be read back', async ({ page, homePage }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await homePage.goto();
    await homePage.selectSplit('6-Day Split');

    const raw = await readRaw(page, STORAGE_KEYS.splitPlan);
    expect(() => JSON.parse(raw ?? '')).not.toThrow();
    await expect(await readState(page, STORAGE_KEYS.splitPlan)).toBe('6-day');
  });

  test('the modal completion toggle is a real button (keyboard-operable)', async ({ page, workoutPage }) => {
    await seedRaw(page, STORAGE_KEYS.workoutProgress, JSON.stringify({}));
    await workoutPage.goto();
    await workoutPage.openDay('Push');

    const toggle = workoutPage.completionToggle(0);
    await toggle.focus();
    await page.keyboard.press('Enter');
    await expect(toggle).toHaveAttribute('aria-pressed', 'true');
  });
});
