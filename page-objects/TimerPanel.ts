import type { Locator, Page } from '@playwright/test';

/**
 * Page Object for the persistent floating Rest Timer.
 *
 * The timer is global (rendered by the layout) and lives bottom-right on every
 * page. It starts collapsed (a round button) and expands into a control panel
 * with presets and start/pause/reset controls.
 */
export class TimerPanel {
  readonly page: Page;

  readonly openButton: Locator;
  readonly collapseButton: Locator;
  readonly panel: Locator;
  readonly startPauseButton: Locator;
  readonly resetButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.openButton = page.getByRole('button', { name: 'Open rest timer' });
    this.collapseButton = page.getByRole('button', { name: 'Collapse timer' });
    this.panel = page.getByRole('dialog', { name: 'Rest timer' });
    this.startPauseButton = this.panel.getByRole('button', { name: /Start timer|Pause timer/ });
    this.resetButton = this.panel.getByRole('button', { name: 'Reset timer' });
  }

  /** Expand the collapsed timer into its full control panel. */
  async open(): Promise<void> {
    await this.openButton.click();
    await this.panel.waitFor();
  }

  /** A rest-duration preset button (e.g. "30s", "1:00"). */
  preset(label: string): Locator {
    return this.panel.getByRole('button', { name: label, exact: true });
  }

  /** Start a rest countdown from a preset. */
  async startPreset(label: string): Promise<void> {
    await this.preset(label).click();
  }

  /** The large numeric countdown display (e.g. "0:58"). */
  get timeDisplay(): Locator {
    return this.panel.locator('p.font-display').first();
  }

  /** The current status label ("Ready" / "Resting" / "Paused" / "Rest complete"). */
  statusLabel(text: string): Locator {
    return this.panel.getByText(text, { exact: true });
  }

  /** Read the countdown as a total number of seconds. */
  async remainingSeconds(): Promise<number> {
    const raw = (await this.timeDisplay.textContent())?.trim() ?? '0:00';
    const [minutes, seconds] = raw.split(':').map((part) => Number.parseInt(part, 10));
    return (minutes || 0) * 60 + (seconds || 0);
  }
}
