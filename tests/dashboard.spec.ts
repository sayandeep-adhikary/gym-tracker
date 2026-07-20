import { seedState } from '../utils/storage';
import { expect, test } from '../fixtures';

/**
 * 10. Progress dashboard.
 * Dashboard loads, stat cards render, charts appear, streak shows, and stats
 * reflect seeded workout history.
 */
test.describe('Progress dashboard', () => {
  test('loads with its heading, stat cards and charts', async ({ dashboardPage }) => {
    await dashboardPage.goto();

    await expect(dashboardPage.heading).toBeVisible();
    await expect(dashboardPage.weeklyCompletion).toBeVisible();
    await expect(dashboardPage.statCard('Day streak')).toBeVisible();
    await expect(dashboardPage.statCard('Total workouts')).toBeVisible();
    await expect(dashboardPage.statCard('Monthly goal')).toBeVisible();
    await expect(dashboardPage.statCard('Top muscle group')).toBeVisible();
    await expect(dashboardPage.weeklyChart).toBeVisible();
    await expect(dashboardPage.muscleChart).toBeVisible();
  });

  test('shows a zero streak and empty muscle focus with no history', async ({ page, dashboardPage }) => {
    await seedState(page, { workoutHistory: [], favorites: [] });
    await dashboardPage.goto();

    await expect(dashboardPage.streakBadge).toContainText('0 day streak');
    await expect(dashboardPage.emptyMuscleFocus).toBeVisible();
  });

  test('reflects seeded workout history in the stats', async ({ page, dashboardPage }) => {
    const today = new Date();
    const iso = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    await seedState(page, {
      splitPlan: '5-day',
      workoutHistory: [{ date: iso, dayId: 'push' }],
    });

    await dashboardPage.goto();

    // One workout logged today → streak of at least 1 and muscle focus present.
    await expect(dashboardPage.streakBadge).toContainText(/[1-9]\d* day streak/);
    await expect(dashboardPage.muscleChart).toBeVisible();
    await expect(dashboardPage.emptyMuscleFocus).toBeHidden();
  });
});
