import { CalendarDays, CalendarRange } from "lucide-react";

import type { SplitPlan, SplitPlanId } from "@/types";

/**
 * The weekly training plans a user can choose from on the home screen.
 * `schedule` lists the focus for each training day of the week.
 */
export const SPLIT_PLANS: SplitPlan[] = [
  {
    id: "5-day",
    title: "5-Day Split",
    days: 5,
    description:
      "Push, Pull and Legs plus dedicated Upper and Lower days. Balanced volume with room to recover.",
    schedule: ["Push", "Pull", "Legs", "Upper", "Lower"],
    dayIds: ["push", "pull", "legs", "upper", "lower"],
    icon: CalendarDays,
  },
  {
    id: "6-day",
    title: "6-Day Split",
    days: 6,
    description:
      "Push, Pull and Legs run twice through the week. Maximum frequency for faster progress.",
    schedule: ["Push", "Pull", "Legs", "Push", "Pull", "Legs"],
    dayIds: ["push-a", "pull-a", "legs-a", "push-b", "pull-b", "legs-b"],
    icon: CalendarRange,
  },
];

/** Look up a plan by id, falling back to the first plan. */
export function getSplitPlan(id: SplitPlanId): SplitPlan {
  return SPLIT_PLANS.find((plan) => plan.id === id) ?? SPLIT_PLANS[0]!;
}
