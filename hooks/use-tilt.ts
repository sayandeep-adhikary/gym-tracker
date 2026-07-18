"use client";

import type { MouseEvent } from "react";
import {
  useMotionValue,
  useSpring,
  useTransform,
  type MotionStyle,
} from "framer-motion";

/**
 * A subtle 3D tilt-on-hover effect. Spread the returned handlers and `style`
 * onto a `motion` element to make it lean toward the cursor.
 *
 * ```tsx
 * const tilt = useTilt();
 * <motion.div style={tilt.style} {...tilt.handlers} />
 * ```
 */
export function useTilt(maxDegrees = 7) {
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const config = { stiffness: 250, damping: 20 } as const;

  const rotateX = useSpring(
    useTransform(pointerY, [-0.5, 0.5], [maxDegrees, -maxDegrees]),
    config,
  );
  const rotateY = useSpring(
    useTransform(pointerX, [-0.5, 0.5], [-maxDegrees, maxDegrees]),
    config,
  );

  const onMouseMove = (event: MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const onMouseLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  const style: MotionStyle = {
    rotateX,
    rotateY,
    transformPerspective: 800,
  };

  return { style, handlers: { onMouseMove, onMouseLeave } };
}
