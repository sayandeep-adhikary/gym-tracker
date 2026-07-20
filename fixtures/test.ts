import { test as base, expect } from '@playwright/test';

import { DashboardPage } from '../page-objects/DashboardPage';
import { HomePage } from '../page-objects/HomePage';
import { NavigationPage } from '../page-objects/NavigationPage';
import { SettingsPage } from '../page-objects/SettingsPage';
import { TimerPanel } from '../page-objects/TimerPanel';
import { WorkoutPage } from '../page-objects/WorkoutPage';

/**
 * Central test fixtures.
 *
 * Every spec imports `test` / `expect` from here so the Page Objects are
 * available as first-class fixtures (constructed lazily per test) without any
 * boilerplate. This keeps specs focused on behaviour, not wiring.
 */
interface AppFixtures {
  homePage: HomePage;
  navigation: NavigationPage;
  workoutPage: WorkoutPage;
  dashboardPage: DashboardPage;
  settingsPage: SettingsPage;
  timer: TimerPanel;
}

export const test = base.extend<AppFixtures>({
  // Neutralise the Next.js dev-tools overlay (`<nextjs-portal>`), which renders
  // bottom-left in `next dev` and otherwise intercepts pointer events over the
  // mobile bottom-nav / floating controls. This is test-only and does not touch
  // the application itself. (In a production build the overlay is absent.)
  page: async ({ page }, use) => {
    await page.addInitScript(() => {
      const inject = () => {
        if (!document.documentElement) return;
        if (document.querySelector('style[data-test-overlay-fix]')) return;
        const style = document.createElement('style');
        style.setAttribute('data-test-overlay-fix', 'true');
        style.textContent = 'nextjs-portal { pointer-events: none !important; }';
        document.documentElement.appendChild(style);
      };
      // `documentElement` may not exist yet at document-start; retry on ready.
      inject();
      document.addEventListener('DOMContentLoaded', inject);
    });
    await use(page);
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  navigation: async ({ page }, use) => {
    await use(new NavigationPage(page));
  },
  workoutPage: async ({ page }, use) => {
    await use(new WorkoutPage(page));
  },
  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },
  settingsPage: async ({ page }, use) => {
    await use(new SettingsPage(page));
  },
  timer: async ({ page }, use) => {
    await use(new TimerPanel(page));
  },
});

export { expect };
