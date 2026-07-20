import { NAV_ITEMS, VIEWPORTS } from '../utils/constants';
import { expect, test } from '../fixtures';

/**
 * 2. Navigation.
 * Desktop sidebar + mobile bottom tab bar, active-state marking, navigation
 * between every page, and browser back navigation.
 */
test.describe('Navigation', () => {
  test.describe('desktop sidebar', () => {
    test.use({ viewport: VIEWPORTS.desktop });

    test('sidebar is visible and the bottom nav is hidden', async ({ page, navigation }) => {
      await page.goto('/');
      await expect(navigation.desktopSidebar).toBeVisible();
      await expect(navigation.mobileBottomNav).toBeHidden();
    });

    test('navigates between all pages via the sidebar', async ({ page, navigation }) => {
      await page.goto('/');
      for (const item of NAV_ITEMS) {
        await navigation.navigateTo(item.title);
        await expect(page).toHaveURL(new RegExp(`${item.route.replace('/', '\\/')}$`));
        await navigation.expectActive(item.title);
      }
    });

    test('marks the current page as active', async ({ page, navigation }) => {
      await page.goto('/progress');
      await navigation.expectActive('Progress');
    });
  });

  test.describe('mobile bottom navigation', () => {
    test.use({ viewport: VIEWPORTS.mobile });

    test('bottom nav is visible and the sidebar is hidden', async ({ page, navigation }) => {
      await page.goto('/');
      await expect(navigation.mobileBottomNav).toBeVisible();
      await expect(navigation.desktopSidebar).toBeHidden();
    });

    test('navigates between all pages via the tab bar', async ({ page, navigation }) => {
      await page.goto('/');
      for (const item of NAV_ITEMS) {
        await navigation.navigateTo(item.title);
        await expect(page).toHaveURL(new RegExp(`${item.route.replace('/', '\\/')}$`));
      }
    });
  });

  test('supports browser back navigation', async ({ page, navigation }) => {
    await page.setViewportSize(VIEWPORTS.desktop);
    await page.goto('/');
    await navigation.navigateTo('Favorites');
    await expect(page).toHaveURL(/\/favorites$/);
    await page.goBack();
    await expect(page).toHaveURL(/\/$/);
    await navigation.expectActive('Home');
  });

  test('the header "New workout" action starts a workout', async ({ page, navigation }) => {
    await page.goto('/progress');
    await navigation.newWorkoutButton.click();
    await expect(page).toHaveURL(/\/workouts$/);
  });
});
