import type { ReactNode } from "react";

import { PageTransition } from "@/components/common/page-transition";
import { BottomNav } from "@/components/layout/bottom-nav";
import { Header } from "@/components/layout/header";
import { PageContainer } from "@/components/layout/page-container";
import { Sidebar } from "@/components/layout/sidebar";

/**
 * The global application shell.
 *
 * A responsive flex layout: the sidebar is a flex child (collapsing on tablet),
 * so the main column reflows automatically as its width changes — no fixed
 * offsets to keep in sync. On mobile the sidebar is hidden and the bottom tab
 * bar takes over. Kept as a Server Component; interactive chrome is client-side.
 */
export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <Header />

        <main
          id="main-content"
          tabIndex={-1}
          className="flex-1 pb-28 pt-6 focus:outline-none md:pb-12"
        >
          <PageTransition>
            <PageContainer>{children}</PageContainer>
          </PageTransition>
        </main>
      </div>

      <BottomNav />
    </div>
  );
}
