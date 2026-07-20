import { expect, type Locator, type Page } from '@playwright/test';

import { NAV_ITEMS } from '../utils/constants';

/**
 * Page Object for the primary navigation.
 *
 * The app renders TWO navigations with the accessible name "Primary":
 *   - a desktop sidebar (inside <aside>, visible at md+), and
 *   - a mobile bottom tab bar (visible below md).
 * Exactly one is visible per viewport (the other is display:none via CSS), so
 * we target the *visible* one and let Playwright's visibility engine pick it.
 */
export class NavigationPage {
  readonly page: Page;

  readonly desktopSidebar: Locator;
  readonly mobileBottomNav: Locator;
  readonly newWorkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    // DOM order is stable: sidebar (inside <aside>) first, bottom nav last.
    this.desktopSidebar = page.locator('aside nav[aria-label="Primary"]');
    this.mobileBottomNav = page.locator('nav[aria-label="Primary"]').last();
    // Header "New workout" action (a link). Two responsive variants exist
    // (text on sm+, icon-only below sm); target whichever is visible.
    this.newWorkoutButton = page
      .getByRole('link', { name: 'New workout' })
      .filter({ visible: true });
  }

  /** The currently visible navigation (sidebar on desktop, tab bar on mobile). */
  get visibleNav(): Locator {
    return this.page.locator('nav[aria-label="Primary"]:visible');
  }

  /** A navigation link, scoped to whichever nav is currently visible. */
  navLink(title: string): Locator {
    return this.visibleNav.getByRole('link', { name: title, exact: true });
  }

  /** Click a nav destination by its title and wait for the URL to update. */
  async navigateTo(title: string): Promise<void> {
    const item = NAV_ITEMS.find((navItem) => navItem.title === title);
    if (!item) throw new Error(`Unknown nav item: ${title}`);
    await this.navLink(title).click();
    await this.page.waitForURL((url) => url.pathname === item.route);
  }

  /** Assert the given nav title is marked active (aria-current="page"). */
  async expectActive(title: string): Promise<void> {
    await expect(this.navLink(title)).toHaveAttribute('aria-current', 'page');
  }
}
