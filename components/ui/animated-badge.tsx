"use client";

import type { ReactNode } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const animatedBadgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold backdrop-blur-sm",
  {
    variants: {
      variant: {
        primary: "border-primary/25 bg-primary/10 text-primary",
        accent: "border-accent/25 bg-accent/10 text-accent",
        success: "border-success/25 bg-success/10 text-success",
        warning: "border-warning/25 bg-warning/10 text-warning",
        muted: "border-border bg-secondary/60 text-muted-foreground",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
);

interface AnimatedBadgeProps
  extends Omit<HTMLMotionProps<"div">, "children">,
    VariantProps<typeof animatedBadgeVariants> {
  /** Render a pulsing status dot before the label. */
  pulse?: boolean;
  children?: ReactNode;
}

/**
 * A badge that springs in on mount, with an optional pulsing status dot.
 */
export function AnimatedBadge({
  className,
  variant,
  pulse = false,
  children,
  ...props
}: AnimatedBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 4 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn(animatedBadgeVariants({ variant }), className)}
      {...props}
    >
      {pulse ? (
        <span className="relative flex size-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-60" />
          <span className="relative inline-flex size-1.5 rounded-full bg-current" />
        </span>
      ) : null}
      {children}
    </motion.div>
  );
}
