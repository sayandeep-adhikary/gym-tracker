"use client";

import { Check } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { useTilt } from "@/hooks/use-tilt";
import { cn } from "@/lib/utils";
import type { SplitPlan } from "@/types";

const SPRING = { type: "spring", stiffness: 400, damping: 26 } as const;

interface SplitPlanCardProps {
  plan: SplitPlan;
  selected: boolean;
  onSelect: (id: SplitPlan["id"]) => void;
}

/**
 * A selectable weekly-split card. Lifts on hover, dips on tap, and shows a
 * ring, glow and check badge when selected.
 */
export function SplitPlanCard({ plan, selected, onSelect }: SplitPlanCardProps) {
  const Icon = plan.icon;
  const tilt = useTilt();

  return (
    <motion.button
      type="button"
      onClick={() => onSelect(plan.id)}
      aria-pressed={selected}
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.97 }}
      transition={SPRING}
      style={tilt.style}
      onMouseMove={tilt.handlers.onMouseMove}
      onMouseLeave={tilt.handlers.onMouseLeave}
      className={cn(
        "group relative flex h-full flex-col gap-5 rounded-2xl border bg-[hsl(var(--glass)/0.55)] p-6 text-left outline-none backdrop-blur-xl transition-[border-color,box-shadow] duration-300 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:p-7",
        selected
          ? "border-primary shadow-glow"
          : "border-white/10 shadow-soft hover:border-primary/40 hover:shadow-glow-accent",
      )}
    >
      <AnimatePresence>
        {selected ? (
          <motion.span
            key="check"
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.4 }}
            transition={SPRING}
            className="absolute right-5 top-5 flex size-7 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-glow"
          >
            <Check className="size-4" strokeWidth={3} />
          </motion.span>
        ) : null}
      </AnimatePresence>

      <div className="flex items-center gap-4">
        <span
          className={cn(
            "flex size-14 shrink-0 items-center justify-center rounded-2xl transition-colors",
            selected
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-foreground group-hover:text-primary",
          )}
        >
          <Icon className="size-7" />
        </span>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            {plan.days} days / week
          </p>
          <h3 className="font-display text-xl font-bold tracking-tight">
            {plan.title}
          </h3>
        </div>
      </div>

      <p className="text-sm leading-relaxed text-muted-foreground">
        {plan.description}
      </p>

      <div className="mt-auto flex flex-wrap gap-1.5">
        {plan.schedule.map((day, index) => (
          <span
            key={`${day}-${index}`}
            className="rounded-md bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground"
          >
            {day}
          </span>
        ))}
      </div>
    </motion.button>
  );
}
