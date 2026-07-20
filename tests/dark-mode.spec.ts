import { expect, test } from '../fixtures';

/**
 * 12. Dark theme.
 * The app ships a single, always-on dark theme. Verify the theme is applied,
 * the background is genuinely dark, and key surfaces remain visible/legible.
 */
test.describe('Dark theme', () => {
  test('applies the dark theme class on the document root', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('html')).toHaveClass(/dark/);
  });

  test('uses a dark background colour', async ({ page }) => {
    await page.goto('/');
    const backgroundColor = await page.evaluate(() => {
      return window.getComputedStyle(document.body).backgroundColor;
    });

    // Parse rgb(...) and assert the perceived brightness is low (dark).
    const match = backgroundColor.match(/\d+/g)?.map(Number) ?? [255, 255, 255];
    const [r, g, b] = match;
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    expect(brightness).toBeLessThan(60);
  });

  test('key UI surfaces remain visible against the dark background', async ({ page, homePage }) => {
    await homePage.goto();
    await expect(homePage.heroTitle).toBeVisible();
    await expect(homePage.startWorkoutButton).toBeVisible();
    await expect(homePage.splitCard('5-Day Split')).toBeVisible();
  });

  test('foreground text has a light colour for contrast', async ({ page, homePage }) => {
    await homePage.goto();
    const color = await homePage.heroTitle.evaluate((el) => window.getComputedStyle(el).color);
    const match = color.match(/\d+/g)?.map(Number) ?? [0, 0, 0];
    const [r, g, b] = match;
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    // Light-on-dark: the heading text should be bright.
    expect(brightness).toBeGreaterThan(150);
  });
});
