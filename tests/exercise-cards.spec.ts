import { seedState } from '../utils/storage';
import { SPLIT_PLANS } from '../utils/constants';
import { expect, test } from '../fixtures';

/**
 * 5. Exercise cards.
 * Verifies each exercise card exposes its core data (name, sets, reps, rest,
 * difficulty badge) and that its favorite + completion toggles interact.
 */
test.describe('Exercise cards', () => {
  test.beforeEach(async ({ page }) => {
    await seedState(page, { splitPlan: '5-day', favorites: [] });
  });

  /** The exercise-library section on the Workouts page (static cards). */
  const library = (page: import('@playwright/test').Page) =>
    page.locator('section').filter({ hasText: 'Exercise library' });

  test('shows the exercise name, difficulty and sets/reps/rest stats', async ({ workoutPage, page }) => {
    await workoutPage.goto();
    // Open a workout day so the fully-populated cards (with stats) are shown.
    await workoutPage.openDay('Push');

    const card = workoutPage.modal
      .locator('div.group')
      .filter({ has: page.getByRole('heading', { name: 'Barbell Bench Press', level: 3 }) })
      .first();

    await expect(card.getByRole('heading', { name: 'Barbell Bench Press' })).toBeVisible();
    await expect(card.getByText('Sets', { exact: true })).toBeVisible();
    await expect(card.getByText('Reps', { exact: true })).toBeVisible();
    await expect(card.getByText('Rest', { exact: true })).toBeVisible();
    // Difficulty badge (one of the three levels).
    await expect(card.getByText(/^(beginner|intermediate|advanced)$/i)).toBeVisible();
  });

  test('exposes favorite and completion controls', async ({ workoutPage }) => {
    await workoutPage.goto();
    await workoutPage.openDay('Push');

    await expect(
      workoutPage.modal.getByRole('button', { name: /Add to favorites/i }).first(),
    ).toBeVisible();
    await expect(
      workoutPage.modal.getByRole('button', { name: /Mark as done/i }).first(),
    ).toBeVisible();
  });

  test('toggling the completion checkbox updates its pressed state', async ({ workoutPage }) => {
    await workoutPage.goto();
    await workoutPage.openDay('Push');

    const toggle = workoutPage.completionToggle(0);
    await expect(toggle).toHaveAttribute('aria-pressed', 'false');
    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-pressed', 'true');
    // Undo via the tracker's Reset control (deterministic vs. re-tapping an
    // element mid-animation).
    await workoutPage.resetProgressButton.click();
    await expect(toggle).toHaveAttribute('aria-pressed', 'false');
  });

  test('toggling the favorite heart updates its pressed state', async ({ workoutPage, page }) => {
    await workoutPage.goto();

    const card = library(page).locator('div.group').first();
    const addButton = card.getByRole('button', { name: /Add to favorites/i });

    await expect(addButton).toHaveAttribute('aria-pressed', 'false');
    await addButton.click();
    await expect(
      card.getByRole('button', { name: /Remove from favorites/i }),
    ).toHaveAttribute('aria-pressed', 'true');
  });

  test('renders a card for every known training day name', async ({ workoutPage }) => {
    await workoutPage.goto();
    for (const day of [...new Set(SPLIT_PLANS.fiveDay.days)]) {
      await expect(workoutPage.dayCard(day)).toBeVisible();
    }
  });
});
