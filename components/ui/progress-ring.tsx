"use client";

import * as React from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface ProgressRingProps {
  /** Completion percentage, 0–100. */
  value: number;
  /** Diameter in pixels. */
  size?: number;
  strokeWidth?: number;
  className?: string;
  /** Show the numeric percentage in the centre when no children are provided. */
  showValue?: boolean;
  children?: React.ReactNode;
}

/**
 * An animated circular progress indicator with a primary→accent gradient
 * stroke. Smoothly animates the arc on mount and whenever `value` changes.
 */
export function ProgressRing({
  value,
  size = 120,
  strokeWidth = 10,
  className,
  showValue = true,
  children,
}: ProgressRingProps) {
  const clamped = Math.min(100, Math.max(0, value));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (clamped / 100) * circumference;
  const gradientId = `progress-ring-${React.useId().replace(/:/g, "")}`;
  const center = size / 2;

  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center",
        className,
      )}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90"
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" />
            <stop offset="100%" stopColor="hsl(var(--accent))" />
          </linearGradient>
        </defs>
        <circle
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
          className="fill-none stroke-secondary"
        />
        <motion.circle
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          stroke={`url(#${gradientId})`}
          className="fill-none"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {children ??
          (showValue ? (
            <span className="font-display text-2xl font-bold tabular-nums">
              {Math.round(clamped)}
              <span className="text-sm font-medium text-muted-foreground">
                %
              </span>
            </span>
          ) : null)}
      </div>
    </div>
  );
}
