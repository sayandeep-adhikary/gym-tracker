"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

import { MOTION } from "@/lib/constants";

/**
 * Animates route content on navigation. The motion element is keyed by
 * pathname, so each navigation remounts it and replays the enter animation,
 * always settling at its visible state.
 *
 * NB: we deliberately avoid `AnimatePresence` + `exit` here. Under the Next.js
 * App Router the incoming route's children are swapped in before an exit cycle
 * can complete, which leaves the entering element stuck at its exit keyframe
 * (blank page). A key-based enter-only transition sidesteps that entirely.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Skip the enter animation on the very first render so the server-rendered
  // markup (fully visible) matches client hydration — otherwise Framer Motion
  // would apply the `initial` (opacity 0) state and trigger a hydration
  // mismatch. Subsequent navigations remount the keyed element and animate in.
  const hasNavigated = React.useRef(false);
  React.useEffect(() => {
    hasNavigated.current = true;
  }, []);

  return (
    <motion.div
      key={pathname}
      initial={hasNavigated.current ? { opacity: 0, y: 8 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: MOTION.fast, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
