"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";

function initials(name: string | null, email: string | null): string {
  const source = (name || email || "?").trim();
  const parts = source.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return ((parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "")).toUpperCase();
  }
  return source.slice(0, 2).toUpperCase();
}

/**
 * Header auth control: the user's avatar (linking to Settings) when signed in,
 * a "Sign in" link when signed out, and nothing when Firebase isn't configured.
 */
export function HeaderAuth() {
  const { user, configured, loading } = useAuth();

  if (!configured) return null;

  if (loading) {
    return <div className="size-9 animate-pulse rounded-full bg-secondary/60" />;
  }

  if (!user) {
    return (
      <Button asChild variant="ghost" size="sm">
        <Link href="/login">Sign in</Link>
      </Button>
    );
  }

  return (
    <Link
      href="/settings"
      aria-label="Account"
      title={user.email ?? "Account"}
      className="flex size-9 items-center justify-center overflow-hidden rounded-full bg-primary/15 text-xs font-bold text-primary transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {user.photoURL ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={user.photoURL}
          alt=""
          className="size-full object-cover"
          referrerPolicy="no-referrer"
        />
      ) : (
        initials(user.displayName, user.email)
      )}
    </Link>
  );
}
