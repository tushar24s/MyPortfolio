import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

const springConfig = {
  stiffness: 220,
  damping: 18,
  mass: 0.5,
};

export default function Magnetic({
  as: Component = motion.div,
  children,
  className = "",
  strength = 20,
  style,
  onMouseMove,
  onMouseLeave,
  disabled = false,
  ...props
}) {
  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, springConfig);
  const y = useSpring(rawY, springConfig);

  function handleMouseMove(event) {
    if (!ref.current || disabled || prefersReducedMotion) {
      onMouseMove?.(event);
      return;
    }

    const rect = ref.current.getBoundingClientRect();
    const offsetX = event.clientX - (rect.left + rect.width / 2);
    const offsetY = event.clientY - (rect.top + rect.height / 2);

    rawX.set((offsetX / rect.width) * strength * 2);
    rawY.set((offsetY / rect.height) * strength * 2);
    onMouseMove?.(event);
  }

  function handleMouseLeave(event) {
    rawX.set(0);
    rawY.set(0);
    onMouseLeave?.(event);
  }

  return (
    <Component
      ref={ref}
      className={className}
      style={{ ...style, x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-magnetic="true"
      {...props}
    >
      {children}
    </Component>
  );
}
