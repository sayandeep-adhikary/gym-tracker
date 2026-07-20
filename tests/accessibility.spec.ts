import { NAV_ITEMS, VIEWPORTS } from '../utils/constants';
import { expect, test } from '../fixtures';

/**
 * 17. Accessibility.
 * Keyboard navigation, a sensible tab order, ARIA labelling on interactive
 * controls, an accessible search input, and the skip-to-content affordance.
 * These are lightweight, framework-agnostic a11y checks (no axe dependency).
 */
test.describe('Accessibility', () => {
  test('a skip-to-content link is the first focusable element', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Tab');
    const skipLink = page.getByRole('link', { name: /Skip to content/i });
    await expect(skipLink).toBeFocused();
  });

  test('the main landmark and the hero H1 are present', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('main#main-content')).toBeVisible();
    await expect(
      page.getByRole('heading', { level: 1, name: /Workout Planner/i }),
    ).toBeVisible();
  });

  test('the primary navigation is a labelled landmark', async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.desktop);
    await page.goto('/');
    await expect(page.getByRole('navigation', { name: 'Primary' }).first()).toBeVisible();
  });

  test('the search input has an accessible name', async ({ workoutPage }) => {
    await workoutPage.goto();
    await expect(workoutPage.searchInput).toBeVisible();
    await expect(workoutPage.searchInput).toHaveAttribute('aria-label', 'Search exercises');
  });

  test('icon-only controls expose accessible labels', async ({ page, workoutPage }) => {
    await workoutPage.goto();
    await workoutPage.openDay('Push');

    await expect(workoutPage.modal.getByRole('button', { name: 'Close' })).toBeVisible();
    await expect(
      workoutPage.modal.getByRole('button', { name: /Add to favorites/i }).first(),
    ).toBeVisible();
    await expect(
      workoutPage.modal.getByRole('button', { name: /Mark as done/i }).first(),
    ).toBeVisible();
  });

  test('navigation links are keyboard operable', async ({ page, navigation }) => {
    await page.setViewportSize(VIEWPORTS.desktop);
    await page.goto('/');

    const link = navigation.navLink('Workouts');
    await link.focus();
    await expect(link).toBeFocused();
    await link.press('Enter');
    await expect(page).toHaveURL(/\/workouts$/);
  });

  test('every primary nav link has an accessible name', async ({ page, navigation }) => {
    await page.setViewportSize(VIEWPORTS.desktop);
    await page.goto('/');
    for (const item of NAV_ITEMS) {
      await expect(navigation.navLink(item.title)).toBeVisible();
    }
  });

  test('the settings confirmation is an accessible alertdialog', async ({ settingsPage }) => {
    await settingsPage.goto();
    await settingsPage.resetStreakButton.click();

    await expect(settingsPage.confirmDialog).toBeVisible();
    await expect(settingsPage.confirmDialog).toHaveAttribute('aria-modal', 'true');
  });
});
