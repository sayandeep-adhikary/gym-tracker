import Link from "next/link";
import { Home } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="text-gradient-primary font-display text-7xl font-extrabold">
        404
      </p>
      <h1 className="mt-4 font-display text-2xl font-bold tracking-tight">
        Page not found
      </h1>
      <p className="mt-2 max-w-sm text-muted-foreground">
        This part of your training plan hasn&apos;t been built yet.
      </p>
      <Button asChild className="mt-6">
        <Link href="/">
          <Home />
          Back home
        </Link>
      </Button>
    </div>
  );
}
