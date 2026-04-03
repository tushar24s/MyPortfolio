import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

const spring = {
  stiffness: 280,
  damping: 26,
  mass: 0.55,
};

export default function CustomCursor() {
  const prefersReducedMotion = useReducedMotion();
  const [isFinePointer, setIsFinePointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const smoothX = useSpring(x, spring);
  const smoothY = useSpring(y, spring);

  useEffect(() => {
    if (typeof window === "undefined" || prefersReducedMotion) {
      setIsFinePointer(false);
      return undefined;
    }

    const mediaQuery = window.matchMedia("(pointer: fine)");
    const updatePointer = () => setIsFinePointer(mediaQuery.matches);

    updatePointer();
    mediaQuery.addEventListener("change", updatePointer);

    return () => mediaQuery.removeEventListener("change", updatePointer);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!isFinePointer || prefersReducedMotion) {
      setIsVisible(false);
      return undefined;
    }

    function handleMove(event) {
      x.set(event.clientX);
      y.set(event.clientY);
      setIsVisible(true);
    }

    function handleLeave(event) {
      if (!event.relatedTarget) {
        setIsVisible(false);
      }
    }

    function handlePointerOver(event) {
      const target = event.target instanceof Element ? event.target : null;
      const interactiveTarget = target?.closest(
        "[data-magnetic='true'], a, button, input, textarea, label",
      );
      setIsActive(Boolean(interactiveTarget));
    }

    function handlePointerDown() {
      setIsPressed(true);
    }

    function handlePointerUp() {
      setIsPressed(false);
    }

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseout", handleLeave);
    window.addEventListener("mouseover", handlePointerOver);
    window.addEventListener("mousedown", handlePointerDown);
    window.addEventListener("mouseup", handlePointerUp);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseout", handleLeave);
      window.removeEventListener("mouseover", handlePointerOver);
      window.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("mouseup", handlePointerUp);
    };
  }, [isFinePointer, prefersReducedMotion, x, y]);

  if (!isFinePointer || prefersReducedMotion) {
    return null;
  }

  return (
    <>
      <motion.div
        className={`cursor-glow${isVisible ? " is-visible" : ""}${isActive ? " is-active" : ""}${isPressed ? " is-pressed" : ""}`}
        style={{
          left: smoothX,
          top: smoothY,
        }}
      />
      <motion.div
        className={`cursor-core${isVisible ? " is-visible" : ""}${isActive ? " is-active" : ""}${isPressed ? " is-pressed" : ""}`}
        style={{
          left: smoothX,
          top: smoothY,
        }}
      />
    </>
  );
}
