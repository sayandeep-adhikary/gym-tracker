"use client";

import { useMemo } from "react";
import dynamic from "next/dynamic";
import {
  CalendarCheck,
  Dumbbell,
  Flame,
  Target,
  type LucideIcon,
} from "lucide-react";

import { Reveal } from "@/components/common/motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProgressRing } from "@/components/ui/progress-ring";
import { SectionTitle } from "@/components/ui/section-title";
import { Skeleton } from "@/components/ui/skeleton";
import { getMuscleCategory } from "@/data/muscle-groups";
import { getSplitPlan } from "@/data/split-plans";
import { UNIQUE_EXERCISES, WORKOUTS } from "@/data/workouts";
import { useFavorites } from "@/hooks/use-favorites";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useWorkoutHistory } from "@/hooks/use-workout-history";
import { STORAGE_KEYS } from "@/lib/storage-keys";
import { computeStreak, startOfWeek, toISODate, WEEK_LABELS } from "@/lib/streak";
import { cn } from "@/lib/utils";
import type { MuscleGroup, SplitPlanId } from "@/types";

const WeeklyActivityChart = dynamic(
  () =>
    import("@/components/charts/weekly-activity-chart").then(
      (mod) => mod.WeeklyActivityChart,
    ),
  { ssr: false, loading: () => <Skeleton className="h-28 w-full" /> },
);

const MuscleDistributionChart = dynamic(
  () =>
    import("@/components/charts/muscle-distribution-chart").then(
      (mod) => mod.MuscleDistributionChart,
    ),
  { ssr: false, loading: () => <Skeleton className="h-40 w-full" /> },
);

function StatCard({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  accent: string;
}) {
  return (
    <Card>
      <CardContent className="flex items-center gap-3 p-4 sm:p-5">
        <span
          className={cn(
            "flex size-11 shrink-0 items-center justify-center rounded-xl",
            accent,
          )}
        >
          <Icon className="size-5" />
        </span>
        <div className="min-w-0">
          <p className="truncate font-display text-xl font-bold leading-none tabular-nums">
            {value}
          </p>
          <p className="mt-1 truncate text-xs text-muted-foreground">{label}</p>
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * The progress dashboard. Computes streak, weekly / monthly completion, total
 * workouts, muscle focus and completion percentage from the persisted workout
 * history, and presents them in animated, responsive cards and charts.
 */
export function ProgressDashboard() {
  const history = useWorkoutHistory();
  const favorites = useFavorites();
  const [planId] = useLocalStorage<SplitPlanId>("gt:selected-split-plan", "5-day");
  const [streakReset] = useLocalStorage<string | null>(
    STORAGE_KEYS.streakReset,
    null,
  );

  const plan = getSplitPlan(planId);
  const entries = history.entries;
  const favoriteNames = favorites.names;

  const stats = useMemo(() => {
    const dates = new Set(entries.map((entry) => entry.date));
    const totalWorkouts = entries.length;
    const streak = computeStreak(dates, streakReset);

    const weekStart = startOfWeek(new Date());
    const todayIso = toISODate(new Date());
    const weekly = Array.from({ length: 7 }, (_, index) => {
      const date = new Date(weekStart);
      date.setDate(weekStart.getDate() + index);
      const iso = toISODate(date);
      return {
        label: WEEK_LABELS[index] ?? "",
        isToday: iso === todayIso,
        count: entries.filter((entry) => entry.date === iso).length,
      };
    });
    const weekWorkouts = weekly.reduce((sum, day) => sum + day.count, 0);

    const now = new Date();
    const monthWorkouts = entries.filter((entry) => {
      const [year, month] = entry.date.split("-").map(Number);
      return year === now.getFullYear() && month === now.getMonth() + 1;
    }).length;

    // Muscle distribution — from trained sessions, falling back to favorites.
    const counts = new Map<string, { label: string; value: number }>();
    const tally = (muscle: MuscleGroup) => {
      const category = getMuscleCategory(muscle);
      if (!category) return;
      const current = counts.get(category.key) ?? {
        label: category.label,
        value: 0,
      };
      current.value += 1;
      counts.set(category.key, current);
    };

    if (totalWorkouts > 0) {
      for (const entry of entries) {
        for (const exercise of WORKOUTS[entry.dayId].exercises) {
          tally(exercise.primaryMuscle);
        }
      }
    } else if (favoriteNames.length > 0) {
      const favoriteSet = new Set(favoriteNames);
      for (const exercise of UNIQUE_EXERCISES) {
        if (favoriteSet.has(exercise.name)) tally(exercise.primaryMuscle);
      }
    }

    const distribution = [...counts.values()].sort((a, b) => b.value - a.value);

    return {
      totalWorkouts,
      streak,
      weekly,
      weekWorkouts,
      monthWorkouts,
      distribution,
      favoriteMuscle: distribution[0]?.label ?? null,
    };
  }, [entries, favoriteNames, streakReset]);

  const weeklyGoal = plan.days;
  const monthlyGoal = plan.days * 4;
  const weeklyPercent =
    weeklyGoal > 0
      ? Math.min(100, Math.round((stats.weekWorkouts / weeklyGoal) * 100))
      : 0;
  const monthlyPercent =
    monthlyGoal > 0
      ? Math.min(100, Math.round((stats.monthWorkouts / monthlyGoal) * 100))
      : 0;

  if (!history.hydrated) {
    return (
      <div className="space-y-8">
        <SectionTitle eyebrow="Analyze" title="Progress" />
        <Skeleton className="h-44 rounded-2xl" />
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-20 rounded-2xl" />
          ))}
        </div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Skeleton className="h-64 rounded-2xl" />
          <Skeleton className="h-64 rounded-2xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <SectionTitle
        eyebrow="Analyze"
        title="Progress"
        description="Your training at a glance — streaks, consistency and muscle focus."
      />

      {/* Hero — weekly completion ring */}
      <Reveal>
        <Card className="overflow-hidden">
          <CardContent className="flex flex-col items-center gap-6 p-6 text-center sm:flex-row sm:p-8 sm:text-left">
            <ProgressRing value={weeklyPercent} size={132} strokeWidth={12}>
              <div className="text-center">
                <p className="font-display text-3xl font-extrabold tabular-nums">
                  {weeklyPercent}
                  <span className="text-lg text-muted-foreground">%</span>
                </p>
                <p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                  this week
                </p>
              </div>
            </ProgressRing>
            <div className="flex-1">
              <h3 className="font-display text-xl font-bold tracking-tight">
                Weekly completion
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {stats.totalWorkouts > 0
                  ? `You've completed ${stats.weekWorkouts} of ${weeklyGoal} planned workouts this week.`
                  : "Complete a workout to start tracking your progress here."}
              </p>
              <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-sm font-semibold text-primary">
                <Flame className="size-4" />
                {stats.streak} day streak
              </div>
            </div>
          </CardContent>
        </Card>
      </Reveal>

      {/* Stat cards */}
      <Reveal delay={0.05}>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard
            icon={Flame}
            label="Day streak"
            value={`${stats.streak}`}
            accent="bg-warning/15 text-warning"
          />
          <StatCard
            icon={Dumbbell}
            label="Total workouts"
            value={`${stats.totalWorkouts}`}
            accent="bg-primary/15 text-primary"
          />
          <StatCard
            icon={CalendarCheck}
            label="Monthly goal"
            value={`${monthlyPercent}%`}
            accent="bg-accent/15 text-accent"
          />
          <StatCard
            icon={Target}
            label="Top muscle group"
            value={stats.favoriteMuscle ?? "—"}
            accent="bg-push/15 text-push"
          />
        </div>
      </Reveal>

      {/* Charts */}
      <Reveal delay={0.1}>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>This week</CardTitle>
            </CardHeader>
            <CardContent>
              <WeeklyActivityChart data={stats.weekly} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Muscle focus</CardTitle>
            </CardHeader>
            <CardContent>
              {stats.distribution.length > 0 ? (
                <MuscleDistributionChart data={stats.distribution} />
              ) : (
                <p className="py-8 text-center text-sm text-muted-foreground">
                  Train or favorite exercises to see your muscle focus.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </Reveal>
    </div>
  );
}
