import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  description?: string;
  /** Optional trailing element, e.g. a "View all" button. */
  action?: ReactNode;
  className?: string;
}

export function SectionHeading({
  title,
  description,
  action,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("flex items-end justify-between gap-4", className)}>
      <div className="space-y-1">
        <h2 className="text-gradient font-display text-xl font-semibold tracking-tight">
          {title}
        </h2>
        {description ? (
          <p className="text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
