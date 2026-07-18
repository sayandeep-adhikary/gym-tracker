"use client";

import { memo } from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface WeeklyActivityDatum {
  label: string;
  count: number;
  isToday: boolean;
}

interface WeeklyActivityChartProps {
  data: WeeklyActivityDatum[];
  className?: string;
}

/**
 * A seven-day bar chart of workouts. Bars grow from the baseline as they
 * scroll into view; today's bar is highlighted.
 */
export const WeeklyActivityChart = memo(function WeeklyActivityChart({
  data,
  className,
}: WeeklyActivityChartProps) {
  const max = Math.max(1, ...data.map((datum) => datum.count));

  return (
    <div className={cn("flex items-end justify-between gap-2", className)}>
      {data.map((datum, index) => {
        const height = datum.count > 0 ? Math.max(10, (datum.count / max) * 100) : 6;

        return (
          <div key={index} className="flex flex-1 flex-col items-center gap-2">
            <div className="flex h-28 w-full items-end">
              <motion.div
                className={cn(
                  "w-full origin-bottom rounded-lg",
                  datum.count > 0
                    ? datum.isToday
                      ? "bg-primary shadow-glow"
                      : "bg-primary/45"
                    : "bg-secondary",
                )}
                style={{ height: `${height}%` }}
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{
                  type: "spring",
                  stiffness: 220,
                  damping: 22,
                  delay: index * 0.05,
                }}
              />
            </div>
            <span
              className={cn(
                "text-[11px] font-medium",
                datum.isToday ? "text-primary" : "text-muted-foreground",
              )}
            >
              {datum.label}
            </span>
          </div>
        );
      })}
    </div>
  );
});
