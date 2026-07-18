"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

import { Logo } from "@/components/common/logo";
import { NAV_ITEMS } from "@/data/navigation";
import { SITE } from "@/lib/constants";
import { cn, isActiveRoute } from "@/lib/utils";

const SPRING = { type: "spring", stiffness: 400, damping: 32 } as const;

/**
 * Left navigation rail.
 *
 * Responsive width: hidden on mobile (the bottom tab bar takes over), a compact
 * icon-only rail on tablets (`md`), and a full labelled sidebar on desktop
 * (`lg`). Width animates via a CSS transition; labels remain in the a11y tree
 * (visually hidden on the rail) and show as tooltips on hover.
 */
export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 z-30 hidden h-dvh shrink-0 flex-col self-start border-r border-border bg-card/30 backdrop-blur-sm transition-[width] duration-300 ease-out md:flex md:w-20 lg:w-64">
      <div className="flex h-16 items-center justify-center px-3 lg:justify-start lg:px-6">
        <Logo showWordmark={false} className="lg:hidden" />
        <Logo className="hidden lg:inline-flex" />
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4" aria-label="Primary">
        {NAV_ITEMS.map((item) => {
          const active = isActiveRoute(pathname, item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              title={item.title}
              aria-current={active ? "page" : undefined}
              className={cn(
                "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors md:justify-center md:gap-0 lg:justify-start lg:gap-3",
                active
                  ? "text-primary"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground",
              )}
            >
              {active ? (
                <motion.span
                  layoutId="sidebar-active"
                  className="absolute inset-0 -z-10 rounded-xl bg-primary/10"
                  transition={SPRING}
                />
              ) : null}
              <Icon className="size-5 shrink-0 transition-transform group-hover:scale-110" />
              <span className="sr-only lg:not-sr-only">{item.title}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border p-4">
        <p className="hidden text-xs leading-relaxed text-muted-foreground lg:block">
          <span className="font-medium text-foreground">{SITE.name}</span>
          <br />v0.1.0 · Push Pull Legs
        </p>
      </div>
    </aside>
  );
}
