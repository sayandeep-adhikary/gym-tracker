import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * A frosted glassmorphism surface (translucent, blurred, with a soft inner
 * highlight). Mirrors the `Card` contract — compose `CardHeader`, `CardContent`
 * etc. inside it, or add your own padding for a standalone container.
 */
const GlassCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("glass-card rounded-2xl", className)} {...props} />
));
GlassCard.displayName = "GlassCard";

export { GlassCard };
