"use client";

import { Reveal } from "@/components/common/motion";
import { SplitPlanCard } from "@/components/home/split-plan-card";
import { SectionTitle } from "@/components/ui/section-title";
import { SPLIT_PLANS } from "@/data/split-plans";
import type { SplitPlanId } from "@/types";

interface SplitPlanSelectorProps {
  selected: SplitPlanId;
  onSelect: (id: SplitPlanId) => void;
}

/**
 * The "choose your weekly split" section. Renders the available plans and
 * reports the user's selection upward (persisted to localStorage by the parent).
 */
export function SplitPlanSelector({
  selected,
  onSelect,
}: SplitPlanSelectorProps) {
  return (
    <section className="space-y-6">
      <SectionTitle
        eyebrow="Choose your plan"
        title="Weekly split"
        description="Pick the training frequency that fits your week — your choice is saved automatically."
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {SPLIT_PLANS.map((plan, index) => (
          <Reveal key={plan.id} delay={index * 0.08} className="h-full">
            <SplitPlanCard
              plan={plan}
              selected={selected === plan.id}
              onSelect={onSelect}
            />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
