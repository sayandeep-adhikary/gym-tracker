import type { Locator, Page } from '@playwright/test';

import { ROUTES } from '../utils/constants';

/**
 * Page Object for the Progress dashboard (`/progress`).
 * Surfaces the streak/stat cards and the two summary charts.
 */
export class DashboardPage {
  readonly page: Page;

  readonly heading: Locator;
  readonly weeklyCompletion: Locator;
  readonly streakBadge: Locator;
  readonly weeklyChart: Locator;
  readonly muscleChart: Locator;
  readonly emptyMuscleFocus: Locator;

  constructor(page: Page) {
    this.page = page;
    // The header also shows an <h1> page title; the in-page SectionTitle is an
    // <h2> inside #main-content, so scope to that to keep the locator unique.
    this.heading = page
      .locator('#main-content')
      .getByRole('heading', { name: 'Progress', level: 2 });
    this.weeklyCompletion = page.getByRole('heading', { name: 'Weekly completion' });
    // The hero badge reads "<n> day streak"; the stat-card label is just
    // "Day streak". Match the numeric badge to keep this unambiguous.
    this.streakBadge = page.getByText(/\d+ day streak/i);
    // Chart titles are styled CardTitles (not heading landmarks) → match text.
    this.weeklyChart = page.getByText('This week', { exact: true });
    this.muscleChart = page.getByText('Muscle focus', { exact: true });
    this.emptyMuscleFocus = page.getByText(
      'Train or favorite exercises to see your muscle focus.',
    );
  }

  async goto(): Promise<void> {
    await this.page.goto(ROUTES.progress);
    await this.heading.waitFor();
  }

  /** A statistic card matched by its label (e.g. "Total workouts"). */
  statCard(label: string): Locator {
    return this.page.getByText(label, { exact: true });
  }
}
