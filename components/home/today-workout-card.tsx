"use client";

import Link from "next/link";
import { ArrowRight, CalendarDays, Clock, Dumbbell } from "lucide-react";

import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { PrimaryButton } from "@/components/ui/primary-button";
import { ProgressRing } from "@/components/ui/progress-ring";
import { useMounted } from "@/hooks/use-mounted";
import { ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { SplitPlan } from "@/types";

const WEEKDAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

/** Focus label → themed text color. */
const FOCUS_COLOR: Record<string, string> = {
  Push: "text-push",
  Pull: "text-pull",
  Legs: "text-legs",
};

interface TodayWorkoutCardProps {
  plan: SplitPlan;
}

/**
 * Surfaces the training focus for the current day based on the selected plan.
 */
export function TodayWorkoutCard({ plan }: TodayWorkoutCardProps) {
  const mounted = useMounted();
  const dayIndex = mounted ? new Date().getDay() : 0;
  const focus =
    plan.schedule[dayIndex % plan.schedule.length] ?? plan.schedule[0] ?? "Rest";
  const weekday = mounted ? (WEEKDAYS[dayIndex] ?? "Today") : "Today";

  return (
    <GlassCard className="flex h-full flex-col gap-6 p-6 sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <Badge variant="secondary" className="gap-1.5">
            <CalendarDays className="size-3.5" />
            {weekday}
          </Badge>
          <h3 className="font-display text-2xl font-bold tracking-tight">
            Today&apos;s Workout
          </h3>
          <p className="text-sm text-muted-foreground">
            {plan.title} ·{" "}
            <span className={cn("font-semibold", FOCUS_COLOR[focus] ?? "text-primary")}>
              {focus} day
            </span>
          </p>
        </div>

        <ProgressRing value={0} size={76} strokeWidth={7}>
          <span className="text-xs font-medium text-muted-foreground">Ready</span>
        </ProgressRing>
      </div>

      <div className="flex items-center gap-5 text-sm text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <Dumbbell className="size-4" />~6 exercises
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Clock className="size-4" />~50 min
        </span>
      </div>

      <PrimaryButton asChild size="default" className="mt-auto w-full sm:w-fit">
        <Link href={ROUTES.workouts}>
          Start workout
          <ArrowRight />
        </Link>
      </PrimaryButton>
    </GlassCard>
  );
}
