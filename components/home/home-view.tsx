"use client";

import { Reveal } from "@/components/common/motion";
import { Hero } from "@/components/home/hero";
import { SplitPlanSelector } from "@/components/home/split-plan-selector";
import { StreakCard } from "@/components/home/streak-card";
import { TodayWorkoutCard } from "@/components/home/today-workout-card";
import { SectionTitle } from "@/components/ui/section-title";
import { getSplitPlan } from "@/data/split-plans";
import { useLocalStorage } from "@/hooks/use-local-storage";
import type { SplitPlanId } from "@/types";

/**
 * Home screen orchestrator. Owns the selected weekly-split state (persisted to
 * localStorage) and distributes it to the split selector and today's workout.
 */
export function HomeView() {
  const [selectedId, setSelectedId] = useLocalStorage<SplitPlanId>(
    "gt:selected-split-plan",
    "5-day",
  );
  const plan = getSplitPlan(selectedId);

  return (
    <div className="space-y-12 lg:space-y-16">
      <Hero />

      <SplitPlanSelector selected={selectedId} onSelect={setSelectedId} />

      <section className="space-y-6">
        <SectionTitle
          eyebrow="Your day"
          title="At a glance"
          description="Today's session and your current momentum."
        />
        <div className="grid gap-4 lg:grid-cols-2">
          <Reveal className="h-full">
            <TodayWorkoutCard plan={plan} />
          </Reveal>
          <Reveal delay={0.08} className="h-full">
            <StreakCard />
          </Reveal>
        </div>
      </section>
    </div>
  );
}
