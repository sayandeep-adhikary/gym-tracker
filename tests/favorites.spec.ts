import { readState, seedState } from '../utils/storage';
import { KNOWN_EXERCISE, ROUTES, STORAGE_KEYS } from '../utils/constants';
import { expect, test } from '../fixtures';

/**
 * 7. Favorites.
 * Adding / removing favorites, persistence across refresh, the favorites page
 * listing, and the empty state.
 */
test.describe('Favorites', () => {
  test('empty favorites page shows an empty state with a browse CTA', async ({ page }) => {
    await seedState(page, { favorites: [] });
    await page.goto(ROUTES.favorites);

    await expect(page.getByText('No favorites yet')).toBeVisible();
    await expect(page.getByRole('link', { name: /Browse exercises/i })).toBeVisible();
  });

  test('a seeded favorite is listed on the favorites page', async ({ page }) => {
    await seedState(page, { favorites: [KNOWN_EXERCISE] });
    await page.goto(ROUTES.favorites);

    await expect(page.getByRole('heading', { name: KNOWN_EXERCISE, level: 3 })).toBeVisible();
    await expect(page.getByText(/1 saved/)).toBeVisible();
  });

  test('adding a favorite from the library persists it to localStorage', async ({ workoutPage, page }) => {
    await seedState(page, { favorites: [] });
    await workoutPage.goto();

    const card = page
      .locator('section')
      .filter({ hasText: 'Exercise library' })
      .locator('div.group')
      .first();
    const name = (await card.getByRole('heading', { level: 3 }).textContent())?.trim();

    await card.getByRole('button', { name: /Add to favorites/i }).click();

    await expect
      .poll(async () => (await readState<string[]>(page, STORAGE_KEYS.favorites)) ?? [])
      .toContain(name);
  });

  test('removing a favorite from the favorites page empties the list', async ({ page }) => {
    await seedState(page, { favorites: [KNOWN_EXERCISE] });
    await page.goto(ROUTES.favorites);

    await page.getByRole('button', { name: /Remove from favorites/i }).click();

    await expect(page.getByText('No favorites yet')).toBeVisible();
    await expect
      .poll(async () => (await readState<string[]>(page, STORAGE_KEYS.favorites)) ?? [])
      .toEqual([]);
  });

  test('favorites persist across a page refresh', async ({ page }) => {
    await seedState(page, { favorites: [KNOWN_EXERCISE] });
    await page.goto(ROUTES.favorites);
    await expect(page.getByRole('heading', { name: KNOWN_EXERCISE, level: 3 })).toBeVisible();

    await page.reload();
    await expect(page.getByRole('heading', { name: KNOWN_EXERCISE, level: 3 })).toBeVisible();
  });
});
