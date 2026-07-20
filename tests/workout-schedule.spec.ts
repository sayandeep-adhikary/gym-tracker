import { readState, seedState } from '../utils/storage';
import { SPLIT_PLANS, STORAGE_KEYS, VIEWPORTS } from '../utils/constants';
import { expect, test } from '../fixtures';

/**
 * 3. Workout split selection.
 * Selecting the 5-Day / 6-Day plans on the home screen, verifying the schedule
 * updates, and confirming the choice persists to localStorage across reloads.
 */
test.describe('Workout split selection', () => {
  // Use a desktop viewport so both split cards are laid out side-by-side.
  test.use({ viewport: VIEWPORTS.desktop });

  test('defaults to the 5-Day split', async ({ homePage }) => {
    await homePage.goto();
    await expect(homePage.splitCard('5-Day Split')).toHaveAttribute('aria-pressed', 'true');
  });

  test('selecting the 6-Day split marks it active and persists it', async ({ homePage, page }) => {
    await homePage.goto();
    await homePage.selectSplit('6-Day Split');

    await expect(homePage.splitCard('6-Day Split')).toHaveAttribute('aria-pressed', 'true');
    await expect(homePage.splitCard('5-Day Split')).toHaveAttribute('aria-pressed', 'false');
    await expect(await readState(page, STORAGE_KEYS.splitPlan)).toBe('6-day');
  });

  test('the schedule reflects the selected split', async ({ homePage, workoutPage }) => {
    await homePage.goto();

    await homePage.selectSplit('5-Day Split');
    await workoutPage.goto();
    await expect(workoutPage.scheduleHeading).toHaveText('5-Day Split');
    await expect(workoutPage.dayCards).toHaveCount(5);

    await homePage.goto();
    await homePage.selectSplit('6-Day Split');
    await workoutPage.goto();
    await expect(workoutPage.scheduleHeading).toHaveText('6-Day Split');
    await expect(workoutPage.dayCards).toHaveCount(6);
  });

  test('the selected split survives a page refresh', async ({ homePage, page }) => {
    await homePage.goto();
    await homePage.selectSplit('6-Day Split');

    await page.reload();

    await expect(homePage.splitCard('6-Day Split')).toHaveAttribute('aria-pressed', 'true');
  });
});

/**
 * 4. Workout schedule.
 * Opening each training day, verifying the exercise list renders inside the
 * modal, and confirming the open/close animations don't break interaction.
 */
test.describe('Workout schedule', () => {
  test.beforeEach(async ({ page }) => {
    // Pin the 5-Day split so the expected day set is deterministic.
    await seedState(page, { splitPlan: '5-day' });
  });

  test('renders one card per training day', async ({ workoutPage }) => {
    await workoutPage.goto();
    await expect(workoutPage.dayCards).toHaveCount(5);
  });

  test('each day card shows its exercise/set summary', async ({ workoutPage }) => {
    await workoutPage.goto();
    const pushCard = workoutPage.dayCard('Push');
    await expect(pushCard).toContainText(/\d+ exercises/);
    await expect(pushCard).toContainText(/\d+ sets/);
  });

  test('opening a day reveals its exercise list in the modal', async ({ workoutPage }) => {
    await workoutPage.goto();
    await workoutPage.openDay('Push');

    await expect(workoutPage.modal).toBeVisible();
    await expect(workoutPage.modal.getByRole('heading', { name: 'Push', level: 2 })).toBeVisible();
    // The tracker lists every exercise as an h3 card heading.
    await expect(workoutPage.modalExerciseCards.first()).toBeVisible();
    const count = await workoutPage.modalExerciseCards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('opens and closes each unique day without breaking interaction', async ({ workoutPage }) => {
    await workoutPage.goto();
    for (const day of [...new Set(SPLIT_PLANS.fiveDay.days)]) {
      await workoutPage.openDay(day);
      await expect(workoutPage.modal).toBeVisible();
      await workoutPage.closeModal();
      await expect(workoutPage.modal).toBeHidden();
    }
  });

  test('closes the modal with the Escape key', async ({ page, workoutPage }) => {
    await workoutPage.goto();
    await workoutPage.openDay('Legs');
    await page.keyboard.press('Escape');
    await expect(workoutPage.modal).toBeHidden();
  });
});
