"use client";

import { memo, type ComponentType } from "react";

import {
  BenchPress,
  CalfRaise,
  CoreFlexion,
  CoreRotation,
  Curl,
  Extension,
  Fly,
  Hinge,
  HorizontalPull,
  LateralRaise,
  Lunge,
  OverheadPress,
  PullUp,
  Squat,
} from "@/components/exercise-animations/animations";
import { cn } from "@/lib/utils";
import type { AnimationType } from "@/types";

/** Maps every exercise movement pattern to its animated illustration. */
const ANIMATIONS: Record<AnimationType, ComponentType> = {
  "horizontal-press": BenchPress,
  "vertical-press": OverheadPress,
  "horizontal-pull": HorizontalPull,
  "vertical-pull": PullUp,
  squat: Squat,
  hinge: Hinge,
  lunge: Lunge,
  curl: Curl,
  extension: Extension,
  "lateral-raise": LateralRaise,
  fly: Fly,
  "calf-raise": CalfRaise,
  "core-flexion": CoreFlexion,
  "core-rotation": CoreRotation,
};

interface ExerciseAnimationProps {
  /** The movement pattern to illustrate. */
  type: AnimationType;
  className?: string;
}

/**
 * Renders a looping, animated SVG illustration for a given movement pattern.
 * Inherits its color from the surrounding text color (defaults to primary).
 */
export const ExerciseAnimation = memo(function ExerciseAnimation({
  type,
  className,
}: ExerciseAnimationProps) {
  const Animation = ANIMATIONS[type];
  return (
    <span className={cn("inline-flex text-primary", className)}>
      <Animation />
    </span>
  );
});
