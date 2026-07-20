import { expect, test } from '../fixtures';

/**
 * 9. Rest timer.
 * The persistent floating timer: opening the panel, starting a countdown from
 * a preset, verifying it counts down, pausing, and resetting.
 */
test.describe('Rest timer', () => {
  test.beforeEach(async ({ page, timer }) => {
    await page.goto('/');
    await timer.open();
  });

  test('opens into a control panel with presets', async ({ timer }) => {
    await expect(timer.panel).toBeVisible();
    await expect(timer.preset('30s')).toBeVisible();
    await expect(timer.preset('1:00')).toBeVisible();
    await expect(timer.statusLabel('Ready')).toBeVisible();
  });

  test('starting a preset begins a running countdown', async ({ timer }) => {
    await timer.startPreset('1:00');
    await expect(timer.statusLabel('Resting')).toBeVisible();

    const first = await timer.remainingSeconds();
    await expect.poll(async () => timer.remainingSeconds()).toBeLessThan(first);
  });

  test('pausing then resuming toggles the timer status', async ({ timer }) => {
    await timer.startPreset('2:00');
    await expect(timer.statusLabel('Resting')).toBeVisible();

    await timer.startPauseButton.click(); // Pause
    await expect(timer.statusLabel('Paused')).toBeVisible();

    await timer.startPauseButton.click(); // Resume
    await expect(timer.statusLabel('Resting')).toBeVisible();
  });

  test('resetting returns the timer to the ready state', async ({ timer }) => {
    await timer.startPreset('1:30');
    await expect(timer.statusLabel('Resting')).toBeVisible();

    await timer.resetButton.click();
    await expect(timer.statusLabel('Ready')).toBeVisible();
  });

  test('the timer keeps running while navigating between pages', async ({ timer, navigation }) => {
    await timer.startPreset('2:00');
    await expect(timer.statusLabel('Resting')).toBeVisible();

    await navigation.navigateTo('Progress');

    // Still running on the new page (the timer lives at the layout level).
    await expect(timer.statusLabel('Resting')).toBeVisible();
  });
});

/** Small, explicit wait used only to prove the paused timer is frozen. */
async function page_wait(ms: number): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, ms));
}
