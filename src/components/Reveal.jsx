import { motion } from "framer-motion";

const easing = [0.22, 1, 0.36, 1];

export default function Reveal({
  children,
  className = "",
  delay = 0,
  y = 32,
  scale = 0.985,
  hover,
  style,
}) {
  const hoverState = hover
    ? {
        ...hover,
        transition: {
          type: "spring",
          stiffness: 240,
          damping: 20,
        },
      }
    : undefined;

  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y, scale }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={hoverState}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, delay, ease: easing }}
    >
      {children}
    </motion.div>
  );
}
