"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { FadeInUp } from "@/components/common/motion";
import { AnimatedDumbbell } from "@/components/home/animated-dumbbell";
import { AnimatedBadge } from "@/components/ui/animated-badge";
import { PrimaryButton } from "@/components/ui/primary-button";
import { SecondaryButton } from "@/components/ui/secondary-button";
import { ROUTES } from "@/lib/constants";

/**
 * Landing hero: animated title, subtitle and a floating dumbbell illustration.
 */
export function Hero() {
  return (
    <section className="relative isolate overflow-hidden rounded-3xl border border-border bg-card/30 p-6 sm:p-10 lg:p-14">
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-grid-dark opacity-[0.12] [background-size:34px_34px] [-webkit-mask-image:radial-gradient(80%_70%_at_50%_0%,black,transparent)] [mask-image:radial-gradient(80%_70%_at_50%_0%,black,transparent)]"
        aria-hidden
      />

      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
        <div>
          <AnimatedBadge variant="primary" pulse>
            Push · Pull · Legs
          </AnimatedBadge>

          <FadeInUp delay={0.08}>
            <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Push Pull Legs{" "}
              <span className="text-gradient-animated">Workout Planner</span>
            </h1>
          </FadeInUp>

          <FadeInUp delay={0.16}>
            <p className="mt-5 max-w-md text-lg text-muted-foreground sm:text-xl">
              Stay Consistent.{" "}
              <span className="font-semibold text-foreground">
                Train Smarter.
              </span>
            </p>
          </FadeInUp>

          <FadeInUp delay={0.24}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <PrimaryButton asChild>
                <Link href={ROUTES.workouts}>
                  Start today&apos;s workout
                  <ArrowRight />
                </Link>
              </PrimaryButton>
              <SecondaryButton asChild>
                <Link href={ROUTES.progress}>View progress</Link>
              </SecondaryButton>
            </div>
          </FadeInUp>
        </div>

        <div className="flex justify-center lg:justify-end">
          <AnimatedDumbbell className="w-56 sm:w-72 lg:w-80" />
        </div>
      </div>
    </section>
  );
}
