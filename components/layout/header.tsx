"use client";

import { Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Logo } from "@/components/common/logo";
import { PageContainer } from "@/components/layout/page-container";
import { Button } from "@/components/ui/button";
import { NAV_ITEMS } from "@/data/navigation";
import { useScroll } from "@/hooks/use-scroll";
import { SITE } from "@/lib/constants";
import { cn, isActiveRoute } from "@/lib/utils";

/**
 * Sticky top app bar. Shows the logo on mobile and the current page title on
 * desktop (where the sidebar already carries the brand). Frosts on scroll.
 */
export function Header() {
  const scrolled = useScroll();
  const pathname = usePathname();
  const current = NAV_ITEMS.find((item) => isActiveRoute(pathname, item.href));

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-300",
        scrolled
          ? "glass shadow-card"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <PageContainer className="flex h-16 items-center justify-between gap-4">
        <Logo className="md:hidden" />
        <h1 className="hidden truncate font-display text-lg font-semibold tracking-tight md:block">
          {current?.title ?? SITE.name}
        </h1>

        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link href="/workouts">
              <Plus />
              New workout
            </Link>
          </Button>
          <Button asChild size="icon" className="sm:hidden" aria-label="New workout">
            <Link href="/workouts">
              <Plus />
            </Link>
          </Button>
        </div>
      </PageContainer>
    </header>
  );
}
