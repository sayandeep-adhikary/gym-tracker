"use client";

import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { AlertTriangle } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description?: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  destructive?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

/**
 * A reusable, accessible confirmation dialog. Springs in over a blurred
 * backdrop, closes on Escape / backdrop click, and is portaled to the body so
 * it renders above everything.
 */
export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  destructive = false,
  onConfirm,
  onClose,
}: ConfirmDialogProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          key="confirm-dialog"
          className="fixed inset-0 z-[70] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div
            className="absolute inset-0 bg-background/70 backdrop-blur-md"
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            role="alertdialog"
            aria-modal="true"
            aria-label={title}
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: "spring", stiffness: 340, damping: 28 }}
            className="relative z-10 w-full max-w-sm rounded-3xl border border-border bg-card p-6 text-center shadow-soft-lg"
          >
            <div
              className={cn(
                "mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl",
                destructive
                  ? "bg-destructive/15 text-destructive"
                  : "bg-primary/15 text-primary",
              )}
            >
              <AlertTriangle className="size-7" />
            </div>
            <h2 className="font-display text-xl font-bold tracking-tight">
              {title}
            </h2>
            {description ? (
              <p className="mt-2 text-sm text-muted-foreground">{description}</p>
            ) : null}
            <div className="mt-6 flex gap-3">
              <Button variant="secondary" className="flex-1" onClick={onClose}>
                {cancelLabel}
              </Button>
              <Button
                variant={destructive ? "destructive" : "default"}
                className="flex-1"
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
              >
                {confirmLabel}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
