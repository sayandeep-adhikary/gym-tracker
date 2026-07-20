"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, LogIn, Mail, ShieldCheck } from "lucide-react";

import { Logo } from "@/components/common/logo";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { authErrorMessage, useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";

type Mode = "signin" | "signup";

const inputClass =
  "h-12 w-full rounded-xl border border-border bg-card px-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-primary/50 focus-visible:ring-2 focus-visible:ring-ring";

/** The dedicated sign-in / sign-up screen backing the `/login` route. */
export function LoginView() {
  const router = useRouter();
  const { user, loading, configured, signInWithEmail, signUpWithEmail, signInWithGoogle } =
    useAuth();

  const [mode, setMode] = useState<Mode>("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  // Once authenticated, leave the login screen.
  useEffect(() => {
    if (user) router.replace("/");
  }, [user, router]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setBusy(true);
    try {
      if (mode === "signup") {
        await signUpWithEmail(name, email, password);
      } else {
        await signInWithEmail(email, password);
      }
      router.replace("/");
    } catch (err) {
      setError(authErrorMessage(err));
    } finally {
      setBusy(false);
    }
  };

  const handleGoogle = async () => {
    setError(null);
    setBusy(true);
    try {
      await signInWithGoogle();
      router.replace("/");
    } catch (err) {
      setError(authErrorMessage(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[70] overflow-y-auto bg-background">
      <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col justify-center px-4 py-10">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to app
        </Link>

        <div className="mb-8 flex flex-col items-center gap-4 text-center">
          <Logo />
          <div>
            <h1 className="font-display text-2xl font-extrabold tracking-tight">
              {mode === "signin" ? "Welcome back" : "Create your account"}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Sync your workouts, streaks and favorites across devices.
            </p>
          </div>
        </div>

        <GlassCard className="p-6 sm:p-7">
          {!configured ? (
            <div className="flex flex-col items-center gap-3 py-6 text-center">
              <ShieldCheck className="size-8 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Sign-in isn&apos;t configured on this deployment yet. Your data
                is still saved privately on this device.
              </p>
            </div>
          ) : (
            <>
              <Button
                type="button"
                variant="outline"
                className="h-12 w-full"
                onClick={handleGoogle}
                disabled={busy}
              >
                <GoogleGlyph />
                Continue with Google
              </Button>

              <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
                <span className="h-px flex-1 bg-border" />
                or
                <span className="h-px flex-1 bg-border" />
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                {mode === "signup" ? (
                  <input
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Name"
                    autoComplete="name"
                    className={inputClass}
                  />
                ) : null}
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Email"
                  autoComplete="email"
                  className={inputClass}
                />
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Password"
                  autoComplete={
                    mode === "signup" ? "new-password" : "current-password"
                  }
                  className={inputClass}
                />

                {error ? (
                  <p className="text-sm text-destructive" role="alert">
                    {error}
                  </p>
                ) : null}

                <Button
                  type="submit"
                  className="h-12 w-full"
                  disabled={busy || loading}
                >
                  {mode === "signin" ? (
                    <>
                      <LogIn className="size-4" />
                      Sign in
                    </>
                  ) : (
                    <>
                      <Mail className="size-4" />
                      Create account
                    </>
                  )}
                </Button>
              </form>

              <p className="mt-5 text-center text-sm text-muted-foreground">
                {mode === "signin" ? "New here?" : "Already have an account?"}{" "}
                <button
                  type="button"
                  onClick={() => {
                    setMode(mode === "signin" ? "signup" : "signin");
                    setError(null);
                  }}
                  className={cn(
                    "font-semibold text-primary underline-offset-4 hover:underline",
                  )}
                >
                  {mode === "signin" ? "Create an account" : "Sign in"}
                </button>
              </p>
            </>
          )}
        </GlassCard>
      </div>
    </div>
  );
}

/** Inline multi-colour Google "G". */
function GoogleGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.76h3.56c2.08-1.92 3.28-4.74 3.28-8.09Z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.56-2.76c-.98.66-2.23 1.06-3.72 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.11a6.6 6.6 0 0 1 0-4.22V7.05H2.18a11 11 0 0 0 0 9.9l3.66-2.84Z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.05l3.66 2.84C6.71 7.3 9.14 5.38 12 5.38Z"
      />
    </svg>
  );
}
