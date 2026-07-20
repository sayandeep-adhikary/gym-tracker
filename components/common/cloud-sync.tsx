"use client";

import { useEffect, useRef } from "react";
import {
  doc,
  onSnapshot,
  serverTimestamp,
  setDoc,
  type DocumentData,
  type DocumentSnapshot,
} from "firebase/firestore";

import { useAuth } from "@/hooks/use-auth";
import { CLOUD_FIELDS, FIELD_TO_KEY } from "@/lib/cloud-merge";
import { mergeField } from "@/lib/cloud-merge";
import { db } from "@/lib/firebase";

/** Must match the event name dispatched by `useLocalStorage`. */
const SYNC_EVENT = "gt:local-storage";
const DEBOUNCE_MS = 700;

const KEY_SET = new Set<string>(Object.values(FIELD_TO_KEY));

function readLocal(key: string): unknown {
  try {
    const raw = window.localStorage.getItem(key);
    return raw == null ? null : JSON.parse(raw);
  } catch {
    return null;
  }
}

function writeLocal(key: string, value: unknown): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new CustomEvent(SYNC_EVENT, { detail: { key } }));
  } catch {
    // Ignore write failures (storage disabled/full).
  }
}

/**
 * Real-time bridge between localStorage (the offline-first source of truth) and
 * the signed-in user's Firestore document.
 *
 * - Subscribes to `users/{uid}` and merges any remote changes into localStorage
 *   (which refreshes every `useLocalStorage` consumer via the sync event).
 * - Watches local changes and debounces a write back to Firestore.
 * - Does nothing when signed out or when Firebase isn't configured, so the app
 *   keeps working entirely offline.
 */
export function CloudSync() {
  const { user } = useAuth();
  const applyingRemote = useRef(false);
  const debounceTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!user || !db) return;

    const ref = doc(db, "users", user.uid);
    let pushedInitial = false;

    const pushAll = () => {
      const payload: Record<string, unknown> = {};
      for (const field of CLOUD_FIELDS) {
        payload[field] = readLocal(FIELD_TO_KEY[field]);
      }
      void setDoc(
        ref,
        { ...payload, updatedAt: serverTimestamp() },
        { merge: true },
      );
    };

    const unsubscribe = onSnapshot(
      ref,
      (snapshot: DocumentSnapshot<DocumentData>) => {
        const remote = (snapshot.data() ?? {}) as Record<string, unknown>;

        // Apply remote → local. The guard stops these writes from echoing back.
        applyingRemote.current = true;
        for (const field of CLOUD_FIELDS) {
          const key = FIELD_TO_KEY[field];
          const localValue = readLocal(key);
          const merged = mergeField(field, localValue, remote[field] ?? null);
          if (JSON.stringify(merged) !== JSON.stringify(localValue)) {
            writeLocal(key, merged);
          }
        }
        applyingRemote.current = false;

        // First snapshot after (re)connecting: push the merged result so any
        // local-only data (e.g. workouts logged while signed out) reaches the
        // cloud.
        if (!pushedInitial) {
          pushedInitial = true;
          pushAll();
        }
      },
    );

    const onLocalChange = (event: Event) => {
      if (applyingRemote.current) return;
      const key = (event as CustomEvent<{ key?: string }>).detail?.key;
      if (!key || !KEY_SET.has(key)) return;
      window.clearTimeout(debounceTimer.current);
      debounceTimer.current = window.setTimeout(pushAll, DEBOUNCE_MS);
    };

    window.addEventListener(SYNC_EVENT, onLocalChange);

    return () => {
      unsubscribe();
      window.removeEventListener(SYNC_EVENT, onLocalChange);
      window.clearTimeout(debounceTimer.current);
    };
  }, [user]);

  return null;
}
