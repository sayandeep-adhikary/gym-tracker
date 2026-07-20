"use client";

import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type ReactNode,
} from "react";
import {
  Check,
  Download,
  Flame,
  Heart,
  Info,
  RotateCcw,
  Upload,
  X,
  type LucideIcon,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { Reveal } from "@/components/common/motion";
import { ConfirmDialog } from "@/components/settings/confirm-dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SectionTitle } from "@/components/ui/section-title";
import { useFavorites } from "@/hooks/use-favorites";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useWorkoutHistory } from "@/hooks/use-workout-history";
import { applyBackup, downloadBackup } from "@/lib/backup";
import { SITE } from "@/lib/constants";
import { STORAGE_KEYS } from "@/lib/storage-keys";
import { cn } from "@/lib/utils";

function todayISO(): string {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

type PendingKind = "history" | "streak" | "favorites";

function SettingRow({
  icon: Icon,
  iconClass,
  title,
  description,
  children,
}: {
  icon: LucideIcon;
  iconClass: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div className="flex items-center gap-4 p-4">
      <span
        className={cn(
          "flex size-10 shrink-0 items-center justify-center rounded-xl",
          iconClass,
        )}
      >
        <Icon className="size-5" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="font-medium leading-tight">{title}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

/**
 * The Settings screen: manage and back up your data, with confirmation dialogs
 * for destructive actions.
 */
export function SettingsView() {
  const history = useWorkoutHistory();
  const favorites = useFavorites();
  const [, setProgress] = useLocalStorage<Record<string, string[]>>(
    STORAGE_KEYS.workoutProgress,
    {},
  );
  const [, setStreakReset] = useLocalStorage<string | null>(
    STORAGE_KEYS.streakReset,
    null,
  );

  const [pending, setPending] = useState<PendingKind | null>(null);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!feedback) return;
    const id = window.setTimeout(() => setFeedback(null), 4000);
    return () => window.clearTimeout(id);
  }, [feedback]);

  const confirms: Record<
    PendingKind,
    { title: string; description: string; confirmLabel: string; run: () => void }
  > = {
    history: {
      title: "Reset workout history?",
      description:
        "This permanently deletes your completed-workout log and in-progress checkmarks. Your streak and stats reset to zero.",
      confirmLabel: "Reset history",
      run: () => {
        history.clear();
        setProgress({});
      },
    },
    streak: {
      title: "Reset your streak?",
      description:
        "Your current streak is set back to zero. Your workout history and stats are kept.",
      confirmLabel: "Reset streak",
      run: () => setStreakReset(todayISO()),
    },
    favorites: {
      title: "Clear all favorites?",
      description:
        "This removes every exercise you've favorited. This can't be undone.",
      confirmLabel: "Clear favorites",
      run: () => favorites.clear(),
    },
  };

  const active = pending ? confirms[pending] : null;

  const handleImport = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    try {
      const text = await file.text();
      const ok = applyBackup(text);
      setFeedback(
        ok
          ? { type: "success", message: "Workout data imported successfully." }
          : {
              type: "error",
              message: "That file isn't a valid Gym Tracker backup.",
            },
      );
    } catch {
      setFeedback({ type: "error", message: "Couldn't read that file." });
    }
  };

  return (
    <div className="space-y-8">
      <SectionTitle
        eyebrow="Preferences"
        title="Settings"
        description="Manage your data, back it up, and learn about the app."
      />

      {/* Your data */}
      <Reveal>
        <div className="space-y-3">
          <h3 className="px-1 text-sm font-semibold text-muted-foreground">
            Your data
          </h3>
          <Card className="divide-y divide-border overflow-hidden">
            <SettingRow
              icon={RotateCcw}
              iconClass="bg-destructive/15 text-destructive"
              title="Reset workout history"
              description={`${history.entries.length} ${history.entries.length === 1 ? "workout" : "workouts"} logged`}
            >
              <Button variant="outline" size="sm" onClick={() => setPending("history")}>
                Reset
              </Button>
            </SettingRow>
            <SettingRow
              icon={Flame}
              iconClass="bg-warning/15 text-warning"
              title="Reset streak"
              description="Set your current streak back to zero"
            >
              <Button variant="outline" size="sm" onClick={() => setPending("streak")}>
                Reset
              </Button>
            </SettingRow>
            <SettingRow
              icon={Heart}
              iconClass="bg-push/15 text-push"
              title="Clear favorites"
              description={`${favorites.count} favorited`}
            >
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPending("favorites")}
              >
                Clear
              </Button>
            </SettingRow>
          </Card>
        </div>
      </Reveal>

      {/* Backup */}
      <Reveal delay={0.05}>
        <div className="space-y-3">
          <h3 className="px-1 text-sm font-semibold text-muted-foreground">
            Backup
          </h3>
          <Card className="divide-y divide-border overflow-hidden">
            <SettingRow
              icon={Download}
              iconClass="bg-primary/15 text-primary"
              title="Export workout data"
              description="Download a JSON backup of everything"
            >
              <Button variant="secondary" size="sm" onClick={downloadBackup}>
                Export
              </Button>
            </SettingRow>
            <SettingRow
              icon={Upload}
              iconClass="bg-accent/15 text-accent"
              title="Import workout data"
              description="Restore from a backup file"
            >
              <Button
                variant="secondary"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
              >
                Import
              </Button>
            </SettingRow>
          </Card>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/json,.json"
            className="hidden"
            onChange={handleImport}
          />
          <AnimatePresence>
            {feedback ? (
              <motion.div
                key="feedback"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className={cn(
                  "flex items-center gap-2 rounded-xl border px-4 py-3 text-sm",
                  feedback.type === "success"
                    ? "border-success/30 bg-success/10 text-success"
                    : "border-destructive/30 bg-destructive/10 text-destructive",
                )}
              >
                {feedback.type === "success" ? (
                  <Check className="size-4 shrink-0" />
                ) : (
                  <X className="size-4 shrink-0" />
                )}
                {feedback.message}
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </Reveal>

      {/* About */}
      <Reveal delay={0.1}>
        <div className="space-y-3">
          <h3 className="px-1 text-sm font-semibold text-muted-foreground">
            About
          </h3>
          <Card className="overflow-hidden">
            <div className="flex items-center gap-4 p-5">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-glow">
                <Info className="size-6" />
              </span>
              <div>
                <p className="font-display text-lg font-bold">{SITE.name}</p>
                <p className="text-sm text-muted-foreground">
                  Push · Pull · Legs · v{SITE.version}
                </p>
              </div>
            </div>
            <div className="border-t border-border p-5 text-sm text-muted-foreground">
              {SITE.description} All of your data is stored privately on your
              device — no account, no servers.
            </div>
            <div className="border-t border-border p-5 text-sm text-muted-foreground">
              Designed &amp; built by{" "}
              <span className="font-semibold text-foreground">
                Sayandeep Adhikary
              </span>
              .
            </div>
          </Card>
        </div>
      </Reveal>

      <ConfirmDialog
        open={pending !== null}
        title={active?.title ?? ""}
        description={active?.description}
        confirmLabel={active?.confirmLabel}
        destructive
        onConfirm={() => active?.run()}
        onClose={() => setPending(null)}
      />
    </div>
  );
}
