import * as React from "react";

import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type SecondaryButtonProps = Omit<ButtonProps, "variant">;

/**
 * Secondary action: a frosted, bordered pill that complements the primary
 * button without competing for attention. Supports `asChild`.
 */
export const SecondaryButton = React.forwardRef<
  HTMLButtonElement,
  SecondaryButtonProps
>(({ className, size = "lg", ...props }, ref) => (
  <Button
    ref={ref}
    variant="secondary"
    size={size}
    className={cn(
      "rounded-full border border-border/70 bg-secondary/50 font-semibold backdrop-blur-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-secondary active:translate-y-0",
      className,
    )}
    {...props}
  />
));
SecondaryButton.displayName = "SecondaryButton";
