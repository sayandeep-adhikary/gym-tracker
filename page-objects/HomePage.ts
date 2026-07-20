import type { Locator, Page } from '@playwright/test';

import { ROUTES } from '../utils/constants';

/**
 * Page Object for the Home / landing screen (`/`).
 *
 * Owns the hero, the weekly-split selector and the "at a glance" cards. All
 * locators use accessible, user-facing queries (roles / labels / text) so they
 * stay stable as styling and animations change.
 */

export class HomePage {
  readonly page: Page;

  readonly heroTitle: Locator;
  readonly heroSubtitle: Locator;
  readonly heroBadge: Locator;
  readonly startWorkoutButton: Locator;
  readonly viewProgressButton: Locator;
  readonly heroIllustration: Locator;
  readonly splitSectionHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    // The header also renders an <h1> (page title) on desktop, so scope the
    // hero heading by its distinctive text to keep the locator unambiguous.
    this.heroTitle = page.getByRole('heading', { level: 1, name: /Workout Planner/i });
    this.heroSubtitle = page.getByText('Train Smarter');
    this.heroBadge = page
      .locator('#main-content')
      .getByText('Push · Pull · Legs', { exact: true });
    this.startWorkoutButton = page.getByRole('link', { name: /start today'?s workout/i });
    this.viewProgressButton = page.getByRole('link', { name: /view progress/i });
    // The animated dumbbell illustration lives in the hero as an inline SVG.
    this.heroIllustration = page.locator('#main-content section').first().locator('svg').last();
    this.splitSectionHeading = page.getByRole('heading', { name: 'Weekly split' });
  }

  /** Navigate to the home page and wait for the hero to render. */
  async goto(): Promise<void> {
    await this.page.goto(ROUTES.home);
    await this.heroTitle.waitFor();
  }

  /** The selectable card for a given split plan. */
  splitCard(label: string): Locator {
    return this.page.getByRole('button', { name: new RegExp(label, 'i') });
  }

  /** Select a weekly split plan by its visible label (e.g. "5-Day Split"). */
  async selectSplit(label: string): Promise<void> {
    await this.splitCard(label).click();
  }
}
