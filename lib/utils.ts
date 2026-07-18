import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind class names conditionally while resolving conflicts.
 * The canonical shadcn/ui helper used across every component.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/** Format a weight value (stored in kilograms) for display. */
export function formatWeight(kg: number, unit: "kg" | "lb" = "kg"): string {
  const value = unit === "lb" ? kg * 2.20462 : kg;
  const rounded = Number.isInteger(value) ? value : Number(value.toFixed(1));
  return `${rounded} ${unit}`;
}

/** Human-friendly date formatting (e.g. "Jul 18, 2026"). */
export function formatDate(date: Date | string, locale = "en-US"): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString(locale, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/** Clamp a number between a lower and upper bound. */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Whether `href` is the active route for `pathname`. The home route ("/")
 * matches exactly; every other route also matches its nested paths.
 */
export function isActiveRoute(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
