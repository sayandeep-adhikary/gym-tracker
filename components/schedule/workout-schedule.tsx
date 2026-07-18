"use client";

import { useState } from "react";

import { Stagger, StaggerItem } from "@/components/common/motion";
import { ScheduleDayCard } from "@/components/schedule/schedule-day-card";
import { WorkoutDetailModal } from "@/components/schedule/workout-detail-modal";
import { SectionTitle } from "@/components/ui/section-title";
import { Skeleton } from "@/components/ui/skeleton";
import { getSplitPlan } from "@/data/split-plans";
import { WORKOUTS } from "@/data/workouts";
import { useLocalStorage } from "@/hooks/use-local-storage";
import {
  WORKOUT_PROGRESS_KEY,
  type WorkoutProgress,
} from "@/hooks/use-workout-progress";
import type { SplitPlanId } from "@/types";

/**
 * The weekly workout schedule. Reads the split the user chose on the home
 * screen (persisted in localStorage) and lays out each training day as an
 * animated card; tapping a card opens that workout in a modal.
 */
export function WorkoutSchedule() {
  const [planId, , hydrated] = useLocalStorage<SplitPlanId>(
    "gt:selected-split-plan",
    "5-day",
  );
  const [progress] = useLocalStorage<WorkoutProgress>(WORKOUT_PROGRESS_KEY, {});
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const plan = getSplitPlan(planId);
  const days = plan.dayIds.map((id) => WORKOUTS[id]);
  const activeDay = activeIndex !== null ? (days[activeIndex] ?? null) : null;

  return (
    <div className="space-y-8">
      <SectionTitle
        eyebrow="Your schedule"
        title={plan.title}
        description="Tap any day to see the full workout. You can change your split on the Home screen."
      />

      {!hydrated ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: plan.days }).map((_, index) => (
            <Skeleton key={index} className="h-44 rounded-2xl" />
          ))}
        </div>
      ) : (
        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {days.map((day, index) => (
            <StaggerItem key={day.id} className="h-full">
              <ScheduleDayCard
                day={day}
                index={index}
                completedCount={progress[day.id]?.length ?? 0}
                onOpen={() => setActiveIndex(index)}
              />
            </StaggerItem>
          ))}
        </Stagger>
      )}

      <WorkoutDetailModal
        day={activeDay}
        dayIndex={activeIndex}
        onClose={() => setActiveIndex(null)}
      />
    </div>
  );
}
