import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import { Providers } from "@/components/common/providers";
import { AppShell } from "@/components/layout/app-shell";
import { SITE } from "@/lib/constants";
import { fontVariables } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.title,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    "gym",
    "workout tracker",
    "push pull legs",
    "PPL",
    "fitness",
    "strength training",
  ],
  authors: [{ name: SITE.name }],
  openGraph: {
    type: "website",
    title: SITE.title,
    description: SITE.description,
    siteName: SITE.name,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
  },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: SITE.themeColor,
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={cn("dark", fontVariables)}
      suppressHydrationWarning
    >
      <body className="min-h-dvh bg-background font-sans text-foreground antialiased">
        <Providers>
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
}
