import * as React from "react";

import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type PrimaryButtonProps = Omit<ButtonProps, "variant">;

/**
 * The app's main call-to-action: a solid, glowing blue pill with a tactile
 * hover-lift micro-interaction. Supports `asChild` for rendering as a link.
 */
export const PrimaryButton = React.forwardRef<
  HTMLButtonElement,
  PrimaryButtonProps
>(({ className, size = "lg", ...props }, ref) => (
  <Button
    ref={ref}
    variant="default"
    size={size}
    className={cn(
      "rounded-full font-semibold shadow-glow transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-glow-lg active:translate-y-0",
      className,
    )}
    {...props}
  />
));
PrimaryButton.displayName = "PrimaryButton";
