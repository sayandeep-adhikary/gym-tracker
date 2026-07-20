import { expect, type Locator, type Page } from '@playwright/test';

import { ROUTES } from '../utils/constants';

/**
 * Page Object for the Workouts screen (`/workouts`).
 *
 * Covers three areas that live on this page:
 *   1. the weekly schedule (day cards → workout detail modal / tracker),
 *   2. the per-exercise cards (favorite + completion toggles), and
 *   3. the exercise library search + filters.
 */
export class WorkoutPage {
  readonly page: Page;

  readonly scheduleHeading: Locator;

  // Search & filters
  readonly searchInput: Locator;
  readonly clearSearchButton: Locator;
  readonly resultsCount: Locator;
  readonly noResults: Locator;

  constructor(page: Page) {
    this.page = page;
    this.scheduleHeading = page.getByRole('heading', { name: /-Day Split$/ });
    this.searchInput = page.getByRole('textbox', { name: 'Search exercises' });
    this.clearSearchButton = page.getByRole('button', { name: 'Clear search' });
    this.resultsCount = page.locator('p[aria-live="polite"]');
    this.noResults = page.getByText('No exercises found');
  }

  async goto(): Promise<void> {
    await this.page.goto(ROUTES.workouts);
    await this.scheduleHeading.waitFor();
  }

  // --- Weekly schedule ------------------------------------------------------

  /** All schedule day cards (each carries the "Open workout" affordance). */
  get dayCards(): Locator {
    return this.page.getByRole('button', { name: /Open workout/i });
  }

  /** A single schedule day card matched by its day name (e.g. "Push"). */
  dayCard(dayName: string): Locator {
    return this.dayCards.filter({ hasText: dayName }).first();
  }

  /** Open a workout day's detail modal. */
  async openDay(dayName: string): Promise<void> {
    await this.dayCard(dayName).click();
    await this.modal.waitFor();
  }

  // --- Workout detail modal / tracker --------------------------------------

  get modal(): Locator {
    return this.page.getByRole('dialog', { name: /workout$/i });
  }

  get closeModalButton(): Locator {
    return this.modal.getByRole('button', { name: 'Close' });
  }

  get resetProgressButton(): Locator {
    return this.modal.getByRole('button', { name: 'Reset' });
  }

  /**
   * The "N / M" completion count inside the modal (rendered separately from the
   * "exercises complete" label), e.g. "0 / 5".
   */
  get progressReadout(): Locator {
    return this.modal.getByText(/^\d+\s*\/\s*\d+$/);
  }

  async closeModal(): Promise<void> {
    await this.closeModalButton.click();
    await this.modal.waitFor({ state: 'hidden' });
  }

  /** All exercise cards rendered inside the open modal. */
  get modalExerciseCards(): Locator {
    return this.modal.getByRole('heading', { level: 3 });
  }

  /** The completion toggle for the Nth exercise (0-based) in the modal. */
  completionToggle(index: number): Locator {
    return this.modal
      .getByRole('button', { name: /Mark as (not )?done/i })
      .nth(index);
  }

  /**
   * Check off the single remaining exercise in the open tracker.
   *
   * The exercise cards are heavily animated (hover/tap springs), which makes a
   * synthesised pointer click land unreliably, so we invoke the button's own
   * click handler directly on the one outstanding "Mark as done" control.
   */
  async completeRemainingExercise(): Promise<void> {
    await this.modal
      .getByRole('button', { name: 'Mark as done', exact: true })
      .last()
      .evaluate((el) => (el as HTMLButtonElement).click());
  }

  // --- Exercise search & filters -------------------------------------------

  async search(query: string): Promise<void> {
    await this.searchInput.fill(query);
  }

  /** A muscle-group filter chip (e.g. "Chest"). */
  muscleFilter(label: string): Locator {
    return this.page.getByRole('button', { name: label, exact: true });
  }

  /** A difficulty filter chip (e.g. "Beginner", "All levels"). */
  difficultyFilter(label: string): Locator {
    return this.page.getByRole('button', { name: label, exact: true });
  }

  /** The number reported by the results counter (parsed from its text). */
  async resultCount(): Promise<number> {
    const text = (await this.resultsCount.textContent()) ?? '';
    return Number.parseInt(text.trim(), 10);
  }

  /** Exercise result cards in the library grid (heading name of each card). */
  exerciseResult(name: string): Locator {
    return this.page.getByRole('heading', { level: 3, name });
  }

  /** Assert a filter chip is pressed/active. */
  async expectFilterActive(chip: Locator): Promise<void> {
    await expect(chip).toHaveAttribute('aria-pressed', 'true');
  }
}
