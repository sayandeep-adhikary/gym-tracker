import { collectConsoleErrors } from '../utils/console';
import { expect, test } from '../fixtures';

/**
 * 1. Landing page.
 * Verifies the app boots, the hero content renders, primary CTAs link
 * correctly, animated elements are present, and the console stays clean.
 */
test.describe('Landing page', () => {
  test('loads successfully with the correct document title', async ({ homePage, page }) => {
    await homePage.goto();
    await expect(page).toHaveTitle(/Gym Tracker/i);
  });

  test('shows the hero title and subtitle', async ({ homePage }) => {
    await homePage.goto();
    await expect(homePage.heroTitle).toBeVisible();
    await expect(homePage.heroTitle).toContainText('Push Pull Legs');
    await expect(homePage.heroTitle).toContainText('Workout Planner');
    await expect(homePage.heroSubtitle).toBeVisible();
  });

  test('renders the primary and secondary call-to-action buttons', async ({ homePage }) => {
    await homePage.goto();
    await expect(homePage.startWorkoutButton).toBeVisible();
    await expect(homePage.viewProgressButton).toBeVisible();
    await expect(homePage.startWorkoutButton).toHaveAttribute('href', '/workouts');
    await expect(homePage.viewProgressButton).toHaveAttribute('href', '/progress');
  });

  test('renders animated hero elements (badge + illustration)', async ({ homePage }) => {
    await homePage.goto();
    await expect(homePage.heroBadge).toBeVisible();
    await expect(homePage.heroIllustration).toBeVisible();
  });

  test('primary CTA navigates to the workouts page', async ({ homePage, page }) => {
    await homePage.goto();
    await homePage.startWorkoutButton.click();
    await expect(page).toHaveURL(/\/workouts$/);
  });

  test('loads without console errors', async ({ page, homePage }) => {
    const console = collectConsoleErrors(page);
    await homePage.goto();
    // Allow late async logs (animations / hydration) to settle.
    await page.waitForLoadState('networkidle');
    expect(console.errors, console.errors.join('\n')).toEqual([]);
  });
});
