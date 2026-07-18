"use client";

import { useEffect, useState } from "react";
import {
  ChevronDown,
  Pause,
  Play,
  RotateCcw,
  Timer,
  Volume2,
  VolumeX,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { TimerRing } from "@/components/timer/timer-ring";
import {
  useWorkoutTimer,
  type TimerStatus,
} from "@/components/timer/workout-timer-provider";
import { cn } from "@/lib/utils";

/** Rest presets, in seconds. */
const PRESETS = [30, 45, 60, 90, 120];

function formatTime(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

function formatPreset(seconds: number): string {
  return seconds < 60 ? `${seconds}s` : formatTime(seconds);
}

function statusLabel(status: TimerStatus): string {
  switch (status) {
    case "finished":
      return "Rest complete";
    case "paused":
      return "Paused";
    case "running":
      return "Resting";
    default:
      return "Ready";
  }
}

/**
 * A persistent, floating rest timer. It lives at the layout level, so the
 * countdown keeps running as the user moves between pages. Collapses to a
 * compact ring and expands into a full control panel.
 */
export function FloatingTimer() {
  const timer = useWorkoutTimer();
  const [expanded, setExpanded] = useState(false);

  const active = timer.status !== "idle";
  const running = timer.status === "running";
  const finished = timer.status === "finished";
  const showPresets = timer.status === "idle" || finished;

  // Pop the panel open when a rest finishes so the alert is seen.
  useEffect(() => {
    if (timer.status === "finished") setExpanded(true);
  }, [timer.status]);

  return (
    <div className="fixed bottom-24 right-4 z-[60] md:bottom-6 md:right-6">
      <AnimatePresence mode="wait" initial={false}>
        {expanded ? (
          <motion.div
            key="expanded"
            initial={{ opacity: 0, scale: 0.85, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 12 }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
            className="glass w-[min(20rem,calc(100vw-2rem))] origin-bottom-right rounded-3xl p-5 shadow-glass"
            role="dialog"
            aria-label="Rest timer"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Timer className="size-4 text-primary" />
                Rest timer
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={timer.toggleSound}
                  aria-label={timer.soundEnabled ? "Mute sound" : "Unmute sound"}
                  className="flex size-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {timer.soundEnabled ? (
                    <Volume2 className="size-4" />
                  ) : (
                    <VolumeX className="size-4" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setExpanded(false)}
                  aria-label="Collapse timer"
                  className="flex size-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <ChevronDown className="size-4" />
                </button>
              </div>
            </div>

            <div className="my-5 flex justify-center">
              <TimerRing
                fraction={timer.fraction}
                size={168}
                strokeWidth={12}
                animated={!finished}
              >
                <div className="text-center">
                  <p
                    className={cn(
                      "font-display text-4xl font-extrabold tabular-nums",
                      finished && "text-gradient-primary",
                    )}
                  >
                    {formatTime(timer.remainingSeconds)}
                  </p>
                  <p className="mt-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {statusLabel(timer.status)}
                  </p>
                </div>
              </TimerRing>
            </div>

            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={timer.reset}
                aria-label="Reset timer"
                className="flex size-11 items-center justify-center rounded-full bg-secondary text-foreground transition-transform hover:bg-muted active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <RotateCcw className="size-5" />
              </button>
              <button
                type="button"
                onClick={timer.toggle}
                aria-label={running ? "Pause timer" : "Start timer"}
                className="flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-glow transition-transform hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {running ? (
                  <Pause className="size-6" />
                ) : (
                  <Play className="size-6 translate-x-0.5" />
                )}
              </button>
            </div>

            <AnimatePresence initial={false}>
              {showPresets ? (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="grid grid-cols-5 gap-2 pt-5">
                    {PRESETS.map((seconds) => (
                      <button
                        key={seconds}
                        type="button"
                        onClick={() => timer.start(seconds)}
                        className="rounded-full border border-border py-2 text-xs font-semibold text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        {formatPreset(seconds)}
                      </button>
                    ))}
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.button
            key="collapsed"
            type="button"
            onClick={() => setExpanded(true)}
            aria-label="Open rest timer"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ type: "spring", stiffness: 400, damping: 26 }}
            className={cn(
              "glass flex size-16 origin-bottom-right items-center justify-center rounded-full shadow-glass transition-transform hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              finished && "animate-pulse-ring",
            )}
          >
            {active ? (
              <TimerRing fraction={timer.fraction} size={56} strokeWidth={5}>
                <span
                  className={cn(
                    "font-display text-[11px] font-bold tabular-nums",
                    finished ? "text-primary" : "text-foreground",
                  )}
                >
                  {finished ? "Done" : formatTime(timer.remainingSeconds)}
                </span>
              </TimerRing>
            ) : (
              <Timer className="size-6 text-primary" />
            )}
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
