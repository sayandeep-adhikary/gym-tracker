"use client";

import Link from "next/link";
import { Cloud, LogIn, LogOut } from "lucide-react";

import { Reveal } from "@/components/common/motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";

/** Initials fallback for users without a profile photo. */
function initials(name: string | null, email: string | null): string {
  const source = (name || email || "?").trim();
  const parts = source.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return ((parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "")).toUpperCase();
  }
  return source.slice(0, 2).toUpperCase();
}

/**
 * Settings account section: shows the signed-in user with a sign-out action, or
 * a prompt to sign in for cross-device cloud sync. Hidden entirely when Firebase
 * isn't configured (localStorage-only mode).
 */
export function AccountCard() {
  const { user, loading, configured, logout } = useAuth();

  if (!configured) return null;

  return (
    <Reveal>
      <div className="space-y-3">
        <h3 className="px-1 text-sm font-semibold text-muted-foreground">
          Account
        </h3>
        <Card className="p-5">
          {loading ? (
            <div className="h-12 animate-pulse rounded-xl bg-secondary/50" />
          ) : user ? (
            <div className="flex items-center gap-4">
              {user.photoURL ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={user.photoURL}
                  alt=""
                  className="size-12 shrink-0 rounded-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/15 text-sm font-bold text-primary">
                  {initials(user.displayName, user.email)}
                </span>
              )}
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium leading-tight">
                  {user.displayName ?? "Signed in"}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {user.email}
                </p>
                <p className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-primary">
                  <Cloud className="size-3.5" />
                  Syncing to the cloud
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="shrink-0"
                onClick={() => void logout()}
              >
                <LogOut className="size-4" />
                Sign out
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-secondary text-muted-foreground">
                <Cloud className="size-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-medium leading-tight">Sync across devices</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Sign in to back up your workouts, streaks and favorites.
                </p>
              </div>
              <Button asChild size="sm" className="shrink-0">
                <Link href="/login">
                  <LogIn className="size-4" />
                  Sign in
                </Link>
              </Button>
            </div>
          )}
        </Card>
      </div>
    </Reveal>
  );
}
