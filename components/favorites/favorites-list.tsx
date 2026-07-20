"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { EmptyState } from "@/components/common/empty-state";
import { AnimatedBadge } from "@/components/ui/animated-badge";
import { PrimaryButton } from "@/components/ui/primary-button";
import { SectionTitle } from "@/components/ui/section-title";
import { Skeleton } from "@/components/ui/skeleton";
import { ExerciseCard } from "@/components/workout/exercise-card";
import { UNIQUE_EXERCISES } from "@/data/workouts";
import { useFavorites } from "@/hooks/use-favorites";
import { ROUTES } from "@/lib/constants";

/**
 * The Favorites page. Lists every favorited exercise in animated cards; tapping
 * a card's heart removes it, animating the card out.
 */
export function FavoritesList() {
  const favorites = useFavorites();
  const items = UNIQUE_EXERCISES.filter((exercise) =>
    favorites.has(exercise.name),
  );

  return (
    <div className="space-y-6">
      <SectionTitle
        eyebrow="Saved"
        title="Favorites"
        description="Quick access to the exercises you love. Tap a heart to remove one."
        action={
          favorites.count > 0 ? (
            <AnimatedBadge key={favorites.count} variant="primary">
              {favorites.count} saved
            </AnimatedBadge>
          ) : undefined
        }
      />

      {!favorites.hydrated ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-40 rounded-2xl" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          <EmptyState
            icon={Heart}
            title="No favorites yet"
            description="Tap the heart on any exercise to save it here for quick access."
            action={
              <PrimaryButton asChild>
                <Link href={ROUTES.workouts}>Browse exercises</Link>
              </PrimaryButton>
            }
          />
        </motion.div>
      ) : (
        <motion.div layout className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {items.map((exercise) => (
              <motion.div
                key={exercise.name}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              >
                <ExerciseCard exercise={exercise} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
