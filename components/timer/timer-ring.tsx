"use client";

import { useId, type ReactNode } from "react";

import { cn } from "@/lib/utils";

interface TimerRingProps {
  /** Fraction of time remaining, 0–1. */
  fraction: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  children?: ReactNode;
  /** Smooth the depletion between ticks (disable for instant snaps). */
  animated?: boolean;
}

/**
 * A circular countdown indicator. The arc depletes as `fraction` falls, with a
 * primary→accent gradient stroke and a CSS transition for smooth motion
 * between the timer's ticks.
 */
export function TimerRing({
  fraction,
  size = 120,
  strokeWidth = 8,
  className,
  children,
  animated = true,
}: TimerRingProps) {
  const gradientId = `timer-ring-${useId().replace(/:/g, "")}`;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.max(0, Math.min(1, fraction));
  const offset = circumference * (1 - clamped);
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
        <circle
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
          stroke={`url(#${gradientId})`}
          strokeLinecap="round"
          className="fill-none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={
            animated
              ? { transition: "stroke-dashoffset 0.25s linear" }
              : undefined
          }
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}
