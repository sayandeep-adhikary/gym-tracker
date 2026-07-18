import Link from "next/link";
import { Dumbbell } from "lucide-react";

import { SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  href?: string;
  /** Hide the text wordmark and render the mark only (e.g. compact bars). */
  showWordmark?: boolean;
}

export function Logo({ className, href = "/", showWordmark = true }: LogoProps) {
  return (
    <Link
      href={href}
      aria-label={SITE.title}
      className={cn("group inline-flex items-center gap-2.5", className)}
    >
      <span className="relative flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-glow transition-transform duration-200 group-hover:scale-105">
        <Dumbbell className="size-5" strokeWidth={2.5} />
      </span>
      {showWordmark && (
        <span className="flex flex-col leading-none">
          <span className="font-display text-base font-bold tracking-tight">
            {SITE.name}
          </span>
          <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Push · Pull · Legs
          </span>
        </span>
      )}
    </Link>
  );
}
