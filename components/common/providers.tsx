"use client";

import * as React from "react";
import { MotionConfig } from "framer-motion";

import { CloudSync } from "@/components/common/cloud-sync";
import { ServiceWorkerRegister } from "@/components/common/service-worker-register";
import { FloatingActionButton } from "@/components/layout/floating-action-button";
import { FloatingTimer } from "@/components/timer/floating-timer";
import { WorkoutTimerProvider } from "@/components/timer/workout-timer-provider";
import { AuthProvider } from "@/hooks/use-auth";

/**
 * App-wide client providers.
 *
 * `AuthProvider` exposes Firebase auth state; `CloudSync` mirrors localStorage
 * to the signed-in user's Firestore document (both no-op without Firebase
 * config). `MotionConfig` centralises Framer Motion behaviour (honouring the
 * user's `prefers-reduced-motion` setting). `WorkoutTimerProvider` keeps the
 * rest timer running across page navigations, and `FloatingTimer` renders the
 * persistent floating widget above every page.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <MotionConfig reducedMotion="user">
        <WorkoutTimerProvider>
          {children}
          <FloatingActionButton />
          <FloatingTimer />
          <ServiceWorkerRegister />
          <CloudSync />
        </WorkoutTimerProvider>
      </MotionConfig>
    </AuthProvider>
  );
}


