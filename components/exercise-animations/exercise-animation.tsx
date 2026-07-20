"use client";

import { memo } from "react";
import {
  Activity,
  Dumbbell,
  Footprints,
  PersonStanding,
  RotateCw,
  Weight,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import type { AnimationType } from "@/types";

/** Maps every exercise movement pattern to a crisp Lucide icon. */
const ICONS: Record<AnimationType, LucideIcon> = {
  "horizontal-press": Dumbbell,
  "vertical-press": Dumbbell,
  "horizontal-pull": Dumbbell,
  "vertical-pull": Dumbbell,
  squat: PersonStanding,
  hinge: Weight,
  lunge: Footprints,
  curl: Dumbbell,
  extension: Dumbbell,
  "lateral-raise": Dumbbell,
  fly: Dumbbell,
  "calf-raise": PersonStanding,
  "core-flexion": Activity,
  "core-rotation": RotateCw,
};

interface ExerciseAnimationProps {
  /** The movement pattern to illustrate. */
  type: AnimationType;
  className?: string;
}

/**
 * Renders a crisp, static icon for a given movement pattern. Inherits its color
 * from the surrounding text color (defaults to primary). Kept named
 * `ExerciseAnimation` for backwards compatibility with existing call sites.
 */
export const ExerciseAnimation = memo(function ExerciseAnimation({
  type,
  className,
}: ExerciseAnimationProps) {
  const Icon = ICONS[type] ?? Dumbbell;
  return <Icon className={cn("text-primary", className)} aria-hidden />;
});

