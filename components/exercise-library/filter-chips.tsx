"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface FilterOption {
  value: string;
  label: string;
}

interface FilterChipsProps {
  options: readonly FilterOption[];
  value: string;
  onChange: (value: string) => void;
  /** Unique id so each chip group animates its own sliding active pill. */
  layoutId: string;
  className?: string;
}

/**
 * A horizontal row of filter chips. The active chip is marked by a pill that
 * springs between options via a shared Framer Motion `layoutId`.
 */
export function FilterChips({
  options,
  value,
  onChange,
  layoutId,
  className,
}: FilterChipsProps) {
  return (
    <div
      className={cn(
        "no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1",
        className,
      )}
    >
      {options.map((option) => {
        const active = option.value === value;

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            aria-pressed={active}
            className={cn(
              "relative shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              active
                ? "border-transparent text-primary-foreground"
                : "border-border text-muted-foreground hover:text-foreground",
            )}
          >
            {active ? (
              <motion.span
                layoutId={layoutId}
                className="absolute inset-0 rounded-full bg-primary shadow-glow"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            ) : null}
            <span className="relative z-10">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
