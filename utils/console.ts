import type { ConsoleMessage, Page } from '@playwright/test';

/**
 * Collects genuine console errors and uncaught page exceptions so a test can
 * assert the app runs cleanly. Known, harmless development noise is filtered
 * out to keep the assertion meaningful rather than flaky.
 */

/** Substrings of messages that are safe to ignore (dev noise / third-party). */
const IGNORED_PATTERNS: readonly string[] = [
  'Download the React DevTools',
  'favicon',
  'manifest',
  'Service Worker',
  'ServiceWorker',
  'sw.js',
  '[Fast Refresh]',
];

function isIgnored(text: string): boolean {
  return IGNORED_PATTERNS.some((pattern) => text.includes(pattern));
}

export interface ConsoleErrorCollector {
  /** All captured error strings (console.error + uncaught exceptions). */
  readonly errors: string[];
}

/**
 * Start collecting console errors for a page. Call before navigation.
 * Returns a live object whose `errors` array fills as the page runs.
 */
export function collectConsoleErrors(page: Page): ConsoleErrorCollector {
  const errors: string[] = [];

  page.on('console', (message: ConsoleMessage) => {
    if (message.type() !== 'error') return;
    const text = message.text();
    if (!isIgnored(text)) errors.push(text);
  });

  page.on('pageerror', (error) => {
    const text = error.message;
    if (!isIgnored(text)) errors.push(text);
  });

  return { errors };
}
