import { seedState } from '../utils/storage';
import { ROUTES, UNKNOWN_EXERCISE_QUERY } from '../utils/constants';
import { expect, test } from '../fixtures';

/**
 * 15. Empty states.
 * The friendly fallbacks shown when there's no data: no favorites, no completed
 * workouts, no search results, and an empty dashboard muscle-focus panel.
 */
test.describe('Empty states', () => {
  test.beforeEach(async ({ page }) => {
    // Start every empty-state test from a genuinely blank slate.
    await seedState(page, {
      favorites: [],
      workoutHistory: [],
      workoutProgress: {},
    });
  });

  test('no favorites shows the empty favorites state', async ({ page }) => {
    await page.goto(ROUTES.favorites);
    await expect(page.getByText('No favorites yet')).toBeVisible();
    await expect(page.getByRole('link', { name: /Browse exercises/i })).toBeVisible();
  });

  test('no completed workouts shows a zero streak and prompt', async ({ dashboardPage }) => {
    await dashboardPage.goto();
    await expect(dashboardPage.streakBadge).toContainText('0 day streak');
    await expect(dashboardPage.statCard('Total workouts')).toBeVisible();
  });

  test('no search results shows the "No exercises found" state', async ({ workoutPage }) => {
    await workoutPage.goto();
    await workoutPage.search(UNKNOWN_EXERCISE_QUERY);
    await expect(workoutPage.noResults).toBeVisible();
  });

  test('empty dashboard shows the muscle-focus prompt', async ({ dashboardPage }) => {
    await dashboardPage.goto();
    await expect(dashboardPage.emptyMuscleFocus).toBeVisible();
  });
});
