"use client";

import { memo } from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface MuscleDatum {
  label: string;
  value: number;
}

interface MuscleDistributionChartProps {
  data: MuscleDatum[];
  className?: string;
}

const CHART_COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

/**
 * Horizontal bars showing how training is distributed across muscle groups.
 * Bars fill to their share as they scroll into view.
 */
export const MuscleDistributionChart = memo(function MuscleDistributionChart({
  data,
  className,
}: MuscleDistributionChartProps) {
  const total = data.reduce((sum, datum) => sum + datum.value, 0) || 1;

  return (
    <div className={cn("space-y-3.5", className)}>
      {data.map((datum, index) => {
        const percent = Math.round((datum.value / total) * 100);

        return (
          <div key={datum.label}>
            <div className="mb-1.5 flex items-center justify-between text-xs">
              <span className="font-medium">{datum.label}</span>
              <span className="tabular-nums text-muted-foreground">
                {percent}%
              </span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-secondary">
              <motion.div
                className="h-full rounded-full"
                style={{
                  backgroundColor:
                    CHART_COLORS[index % CHART_COLORS.length] ??
                    "hsl(var(--primary))",
                }}
                initial={{ width: 0 }}
                whileInView={{ width: `${percent}%` }}
                viewport={{ once: true }}
                transition={{
                  type: "spring",
                  stiffness: 120,
                  damping: 20,
                  delay: index * 0.06,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
});
