import type { Locator, Page } from '@playwright/test';

import { ROUTES } from '../utils/constants';


/**
 * Page Object for the Settings screen (`/settings`).
 *
 * The destructive actions (reset history / reset streak / clear favorites)
 * share generic button labels ("Reset" / "Clear"), so we scope each button to
 * its owning row via the row's title text. Confirmations use an alertdialog.
 */
export class SettingsPage {
  readonly page: Page;

  readonly heading: Locator;
  readonly exportButton: Locator;
  readonly importButton: Locator;
  readonly confirmDialog: Locator;

  constructor(page: Page) {
    this.page = page;
    // Scope to #main-content (the header renders a duplicate <h1> page title).
    this.heading = page
      .locator('#main-content')
      .getByRole('heading', { name: 'Settings', level: 2 });
    this.exportButton = this.rowButton('Export workout data');
    this.importButton = this.rowButton('Import workout data');
    this.confirmDialog = page.getByRole('alertdialog');
  }

  async goto(): Promise<void> {
    await this.page.goto(ROUTES.settings);
    await this.heading.waitFor();
  }

  /** The action button belonging to a settings row identified by its title. */
  rowButton(title: string): Locator {
    return this.page
      .getByText(title, { exact: true })
      .locator('xpath=ancestor::div[contains(@class,"items-center")][1]')
      .getByRole('button');
  }

  get resetHistoryButton(): Locator {
    return this.rowButton('Reset workout history');
  }

  get resetStreakButton(): Locator {
    return this.rowButton('Reset streak');
  }

  get clearFavoritesButton(): Locator {
    return this.rowButton('Clear favorites');
  }

  /** Confirm the currently open dialog using its confirm button label. */
  async confirm(confirmLabel: string): Promise<void> {
    await this.confirmDialog.getByRole('button', { name: confirmLabel }).click();
    await this.confirmDialog.waitFor({ state: 'hidden' });
  }

  /** Cancel / dismiss the currently open dialog. */
  async cancel(): Promise<void> {
    await this.confirmDialog.getByRole('button', { name: 'Cancel' }).click();
    await this.confirmDialog.waitFor({ state: 'hidden' });
  }
}
