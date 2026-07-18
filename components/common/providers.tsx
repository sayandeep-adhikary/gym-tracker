"use client";

import * as React from "react";
import { MotionConfig } from "framer-motion";

import { ServiceWorkerRegister } from "@/components/common/service-worker-register";
import { FloatingActionButton } from "@/components/layout/floating-action-button";
import { FloatingTimer } from "@/components/timer/floating-timer";
import { WorkoutTimerProvider } from "@/components/timer/workout-timer-provider";

/**
 * App-wide client providers.
 *
 * `MotionConfig` centralises Framer Motion behaviour (honouring the user's
 * `prefers-reduced-motion` setting). `WorkoutTimerProvider` keeps the rest
 * timer running across page navigations, and `FloatingTimer` renders the
 * persistent floating widget above every page.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <WorkoutTimerProvider>
        {children}
        <FloatingActionButton />
        <FloatingTimer />
        <ServiceWorkerRegister />
      </WorkoutTimerProvider>
    </MotionConfig>
  );
}

