"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

import { NAV_ITEMS } from "@/data/navigation";
import { cn, isActiveRoute } from "@/lib/utils";

const SPRING = { type: "spring", stiffness: 500, damping: 24 } as const;

/**
 * Mobile bottom tab bar (hidden at `md+`, where the sidebar takes over).
 * The active icon springs up and scales, with a shared pill that slides
 * between tabs and a tactile press. Respects the bottom safe-area inset.
 */
export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Primary"
      className="glass fixed inset-x-0 bottom-0 z-40 md:hidden"
    >
      <ul className="mx-auto flex max-w-md items-stretch justify-around px-2 pb-[env(safe-area-inset-bottom)]">
        {NAV_ITEMS.map((item) => {
          const active = isActiveRoute(pathname, item.href);
          const Icon = item.icon;

          return (
            <li key={item.href} className="flex-1">
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex flex-col items-center gap-1 py-2 text-[11px] font-medium transition-colors",
                  active ? "text-primary" : "text-muted-foreground",
                )}
              >
                <motion.span
                  className="relative flex size-9 items-center justify-center rounded-2xl"
                  initial={false}
                  animate={{ y: active ? -2 : 0 }}
                  whileTap={{ scale: 0.82 }}
                  transition={SPRING}
                >
                  {active ? (
                    <motion.span
                      layoutId="bottomnav-pill"
                      className="absolute inset-0 -z-10 rounded-2xl bg-primary/15"
                      transition={SPRING}
                    />
                  ) : null}
                  <motion.span
                    className="flex"
                    initial={false}
                    animate={{ scale: active ? 1.15 : 1 }}
                    transition={SPRING}
                  >
                    <Icon className="size-5" />
                  </motion.span>
                </motion.span>
                <span>{item.title}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
