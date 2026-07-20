import { NAV_ITEMS, VIEWPORTS } from '../utils/constants';
import { expect, test } from '../fixtures';

/**
 * 13. Responsive testing.
 * Desktop / tablet / mobile: the right navigation surfaces, cards lay out and
 * the page scrolls. Touch interaction is exercised on the mobile project.
 */
test.describe('Responsive layout', () => {
  test('desktop uses the sidebar navigation', async ({ page, navigation }) => {
    await page.setViewportSize(VIEWPORTS.desktop);
    await page.goto('/');

    await expect(navigation.desktopSidebar).toBeVisible();
    await expect(navigation.mobileBottomNav).toBeHidden();
  });

  test('tablet keeps the sidebar (compact rail) visible', async ({ page, navigation }) => {
    await page.setViewportSize(VIEWPORTS.tablet);
    await page.goto('/');

    await expect(navigation.desktopSidebar).toBeVisible();
    await expect(navigation.mobileBottomNav).toBeHidden();
  });

  test('mobile uses the bottom tab bar and shows the FAB', async ({ page, navigation }) => {
    await page.setViewportSize(VIEWPORTS.mobile);
    await page.goto('/');

    await expect(navigation.mobileBottomNav).toBeVisible();
    await expect(navigation.desktopSidebar).toBeHidden();
    // The mobile floating action button links to the workouts page.
    await expect(page.getByRole('link', { name: 'Start a workout' })).toBeVisible();
  });

  test('cards render across every breakpoint', async ({ page, homePage }) => {
    for (const size of Object.values(VIEWPORTS)) {
      await page.setViewportSize(size);
      await homePage.goto();
      await expect(homePage.splitCard('5-Day Split')).toBeVisible();
      await expect(homePage.splitCard('6-Day Split')).toBeVisible();
    }
  });

  test('the page scrolls to reveal below-the-fold content on mobile', async ({ page, workoutPage }) => {
    await page.setViewportSize(VIEWPORTS.mobile);
    await workoutPage.goto();

    await workoutPage.searchInput.scrollIntoViewIfNeeded();
    await expect(workoutPage.searchInput).toBeInViewport();
  });

  test('touch tap navigation works on mobile', async ({ page, navigation }) => {
    await page.setViewportSize(VIEWPORTS.mobile);
    await page.goto('/');

    // `click` dispatches a tap on touch-enabled contexts.
    await navigation.navigateTo(NAV_ITEMS[3].title); // Favorites
    await expect(page).toHaveURL(/\/favorites$/);
  });
});
