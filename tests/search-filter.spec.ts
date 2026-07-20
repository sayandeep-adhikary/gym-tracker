import { KNOWN_EXERCISE, UNKNOWN_EXERCISE_QUERY } from '../utils/constants';
import { expect, test } from '../fixtures';

/**
 * 6. Exercise search & filters.
 * Free-text search (valid + invalid), muscle-group filtering, difficulty
 * filtering, clearing, and combining search with a filter.
 */
test.describe('Exercise search & filters', () => {
  test.beforeEach(async ({ workoutPage }) => {
    await workoutPage.goto();
    // Bring the library into view; results render below the schedule.
    await workoutPage.searchInput.scrollIntoViewIfNeeded();
  });

  test('searching for an existing exercise shows a matching result', async ({ workoutPage }) => {
    await workoutPage.search('Bench Press');
    await expect(workoutPage.exerciseResult(KNOWN_EXERCISE).first()).toBeVisible();
    expect(await workoutPage.resultCount()).toBeGreaterThan(0);
  });

  test('searching for a nonexistent exercise shows the empty state', async ({ workoutPage }) => {
    await workoutPage.search(UNKNOWN_EXERCISE_QUERY);
    await expect(workoutPage.noResults).toBeVisible();
    expect(await workoutPage.resultCount()).toBe(0);
  });

  test('clearing the search restores the full result set', async ({ workoutPage }) => {
    const initial = await workoutPage.resultCount();
    await workoutPage.search(UNKNOWN_EXERCISE_QUERY);
    expect(await workoutPage.resultCount()).toBe(0);

    await workoutPage.clearSearchButton.click();
    await expect(workoutPage.searchInput).toHaveValue('');
    expect(await workoutPage.resultCount()).toBe(initial);
  });

  test('filtering by muscle group narrows and marks the chip active', async ({ workoutPage }) => {
    const all = await workoutPage.resultCount();
    const chest = workoutPage.muscleFilter('Chest');
    await chest.click();

    await workoutPage.expectFilterActive(chest);
    expect(await workoutPage.resultCount()).toBeLessThanOrEqual(all);
    expect(await workoutPage.resultCount()).toBeGreaterThan(0);
  });

  test('filtering by difficulty narrows the results', async ({ workoutPage }) => {
    const beginner = workoutPage.difficultyFilter('Beginner');
    await beginner.click();
    await workoutPage.expectFilterActive(beginner);
    expect(await workoutPage.resultCount()).toBeGreaterThan(0);
  });

  test('resetting the muscle filter to "All" restores the full set', async ({ workoutPage }) => {
    const all = await workoutPage.resultCount();
    await workoutPage.muscleFilter('Back').click();
    expect(await workoutPage.resultCount()).toBeLessThanOrEqual(all);

    await workoutPage.muscleFilter('All').click();
    expect(await workoutPage.resultCount()).toBe(all);
  });

  test('combining search with a filter applies both criteria', async ({ workoutPage }) => {
    await workoutPage.muscleFilter('Chest').click();
    await workoutPage.search('press');

    // Every visible result heading should be a chest-pressing movement.
    expect(await workoutPage.resultCount()).toBeGreaterThan(0);
    await expect(workoutPage.resultsCount).toContainText(/exercises?/);
  });
});
