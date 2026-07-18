import { Inter, Sora, JetBrains_Mono } from "next/font/google";

/**
 * Application typography. Fonts are loaded via `next/font` for zero layout
 * shift and self-hosting, and exposed as CSS variables consumed by Tailwind
 * (see `fontFamily` in `tailwind.config.ts`).
 */

export const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const fontDisplay = Sora({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

export const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

/** Combined font variables to spread onto the root `<html>` element. */
export const fontVariables = `${fontSans.variable} ${fontDisplay.variable} ${fontMono.variable}`;
