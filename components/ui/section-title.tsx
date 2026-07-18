import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface SectionTitleProps {
  /** Small uppercase kicker shown above the title. */
  eyebrow?: string;
  title: string;
  description?: string;
  /** Optional trailing element, e.g. a "View all" action. */
  action?: ReactNode;
  className?: string;
}

/**
 * A modern section header: optional eyebrow, gradient title, description and a
 * trailing action, with generous vertical rhythm.
 */
export function SectionTitle({
  eyebrow,
  title,
  description,
  action,
  className,
}: SectionTitleProps) {
  return (
    <div className={cn("flex items-end justify-between gap-4", className)}>
      <div className="space-y-1.5">
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="text-gradient font-display text-2xl font-bold tracking-tight sm:text-3xl">
          {title}
        </h2>
        {description ? (
          <p className="max-w-prose text-sm text-muted-foreground sm:text-base">
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
