"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dumbbell } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { ROUTES } from "@/lib/constants";
import { isActiveRoute } from "@/lib/utils";

/**
 * A mobile-only floating action button for the primary action — starting a
 * workout. Sits bottom-left (opposite the floating timer) above the tab bar,
 * and hides itself on the Workouts page it links to. On desktop the sidebar
 * provides navigation, so the FAB is hidden.
 */
export function FloatingActionButton() {
  const pathname = usePathname();
  const onWorkouts = isActiveRoute(pathname, ROUTES.workouts);

  return (
    <AnimatePresence>
      {!onWorkouts ? (
        <motion.div
          key="fab"
          initial={{ opacity: 0, scale: 0.6, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 8 }}
          transition={{ type: "spring", stiffness: 400, damping: 26 }}
          className="fixed bottom-24 left-4 z-[60] md:hidden"
        >
          <Link
            href={ROUTES.workouts}
            aria-label="Start a workout"
            className="flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-glow-lg transition-transform hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <Dumbbell className="size-6" />
          </Link>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
