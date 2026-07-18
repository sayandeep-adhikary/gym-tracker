"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

export type TimerStatus = "idle" | "running" | "paused" | "finished";

interface WorkoutTimerValue {
  status: TimerStatus;
  /** The selected rest duration, in seconds. */
  duration: number;
  remainingMs: number;
  remainingSeconds: number;
  /** Fraction of time remaining, 0–1 (drives the ring). */
  fraction: number;
  soundEnabled: boolean;
  /** Start a countdown (optionally with a new duration in seconds). */
  start: (seconds?: number) => void;
  pause: () => void;
  resume: () => void;
  /** Start / pause / resume depending on the current status. */
  toggle: () => void;
  reset: () => void;
  toggleSound: () => void;
}

const WorkoutTimerContext = createContext<WorkoutTimerValue | null>(null);

const DEFAULT_DURATION = 60;

/** Play a short ascending three-note chime via the Web Audio API. */
function playChime(ctx: AudioContext | null) {
  if (!ctx) return;
  try {
    if (ctx.state === "suspended") void ctx.resume();
    const now = ctx.currentTime;
    [660, 880, 1320].forEach((frequency, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = frequency;
      const at = now + index * 0.16;
      gain.gain.setValueAtTime(0.0001, at);
      gain.gain.exponentialRampToValueAtTime(0.3, at + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, at + 0.22);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(at);
      osc.stop(at + 0.24);
    });
  } catch {
    // Ignore audio errors (e.g. autoplay restrictions).
  }
}

/**
 * Holds the workout rest-timer state. Mounted at the layout level so the
 * countdown keeps running while the user navigates between pages. Emits a
 * sound chime and a device vibration when a rest finishes.
 */
export function WorkoutTimerProvider({ children }: { children: ReactNode }) {
  const [duration, setDuration] = useState(DEFAULT_DURATION);
  const [status, setStatus] = useState<TimerStatus>("idle");
  const [remainingMs, setRemainingMs] = useState(DEFAULT_DURATION * 1000);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const endTimeRef = useRef<number | null>(null);
  const audioRef = useRef<AudioContext | null>(null);
  const soundRef = useRef(soundEnabled);

  useEffect(() => {
    soundRef.current = soundEnabled;
  }, [soundEnabled]);

  // Lazily create / resume the audio context on a user gesture so the chime
  // is allowed to play when the timer later finishes.
  const ensureAudio = useCallback(() => {
    if (typeof window === "undefined") return;
    try {
      if (!audioRef.current) {
        const AudioCtor =
          window.AudioContext ??
          (
            window as unknown as {
              webkitAudioContext?: typeof AudioContext;
            }
          ).webkitAudioContext;
        if (AudioCtor) audioRef.current = new AudioCtor();
      }
      if (audioRef.current?.state === "suspended") {
        void audioRef.current.resume();
      }
    } catch {
      // Ignore — audio is a non-critical enhancement.
    }
  }, []);

  // Countdown loop — only active while running.
  useEffect(() => {
    if (status !== "running") return;
    const id = window.setInterval(() => {
      const end = endTimeRef.current;
      if (end == null) return;
      const ms = end - Date.now();
      if (ms <= 0) {
        endTimeRef.current = null;
        setRemainingMs(0);
        setStatus("finished");
      } else {
        setRemainingMs(ms);
      }
    }, 200);
    return () => window.clearInterval(id);
  }, [status]);

  // Notify once when a rest finishes.
  useEffect(() => {
    if (status !== "finished") return;
    if (soundRef.current) playChime(audioRef.current);
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate([180, 90, 180, 90, 260]);
    }
  }, [status]);

  const start = useCallback(
    (seconds?: number) => {
      ensureAudio();
      const secs = seconds ?? duration;
      setDuration(secs);
      endTimeRef.current = Date.now() + secs * 1000;
      setRemainingMs(secs * 1000);
      setStatus("running");
    },
    [duration, ensureAudio],
  );

  const pause = useCallback(() => {
    const end = endTimeRef.current;
    if (end != null) setRemainingMs(Math.max(0, end - Date.now()));
    endTimeRef.current = null;
    setStatus("paused");
  }, []);

  const resume = useCallback(() => {
    ensureAudio();
    endTimeRef.current = Date.now() + remainingMs;
    setStatus("running");
  }, [ensureAudio, remainingMs]);

  const toggle = useCallback(() => {
    if (status === "running") pause();
    else if (status === "paused") resume();
    else start();
  }, [status, pause, resume, start]);

  const reset = useCallback(() => {
    endTimeRef.current = null;
    setStatus("idle");
    setRemainingMs(duration * 1000);
  }, [duration]);

  const toggleSound = useCallback(() => {
    ensureAudio();
    setSoundEnabled((prev) => !prev);
  }, [ensureAudio]);

  const totalMs = duration * 1000;
  const value: WorkoutTimerValue = {
    status,
    duration,
    remainingMs,
    remainingSeconds: Math.ceil(remainingMs / 1000),
    fraction: totalMs > 0 ? Math.max(0, Math.min(1, remainingMs / totalMs)) : 0,
    soundEnabled,
    start,
    pause,
    resume,
    toggle,
    reset,
    toggleSound,
  };

  return (
    <WorkoutTimerContext.Provider value={value}>
      {children}
    </WorkoutTimerContext.Provider>
  );
}

export function useWorkoutTimer(): WorkoutTimerValue {
  const context = useContext(WorkoutTimerContext);
  if (!context) {
    throw new Error(
      "useWorkoutTimer must be used within a WorkoutTimerProvider",
    );
  }
  return context;
}
