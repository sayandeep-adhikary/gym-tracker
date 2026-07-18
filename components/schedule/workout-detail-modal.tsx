"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { FOCUS_THEME } from "@/components/schedule/focus-theme";
import { WorkoutTracker } from "@/components/workout/workout-tracker";
import { cn } from "@/lib/utils";
import type { WorkoutDay } from "@/types";

interface WorkoutDetailModalProps {
  day: WorkoutDay | null;
  dayIndex: number | null;
  onClose: () => void;
}

/**
 * A Framer Motion modal that "opens" a workout: the backdrop fades and the
 * panel springs up (a bottom sheet on mobile, a centered dialog on desktop).
 * The body is a {@link WorkoutTracker} with live progress and completion.
 * Rendered through a portal so it isn't clipped by the animated page container.
 */
export function WorkoutDetailModal({
  day,
  dayIndex,
  onClose,
}: WorkoutDetailModalProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Close on Escape and lock body scroll while the modal is open.
  useEffect(() => {
    if (!day) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [day, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {day ? (
        <motion.div
          key="workout-modal"
          className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div
            className="absolute inset-0 bg-background/70 backdrop-blur-md"
            onClick={onClose}
            aria-hidden
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${day.name} workout`}
            initial={{ opacity: 0, y: 48, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 48, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            className="relative z-10 flex max-h-[88vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-3xl border border-border bg-card shadow-soft-lg sm:rounded-3xl"
          >
            <div
              className={cn(
                "pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b to-transparent opacity-70",
                FOCUS_THEME[day.focus].wash,
              )}
              aria-hidden
            />

            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 z-30 flex size-9 items-center justify-center rounded-full bg-secondary text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <X className="size-5" />
            </button>

            <WorkoutTracker
              key={day.id}
              day={day}
              dayIndex={dayIndex}
              onClose={onClose}
            />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
