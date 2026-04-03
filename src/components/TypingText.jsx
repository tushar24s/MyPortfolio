import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

export default function TypingText({
  words,
  typingSpeed = 90,
  deletingSpeed = 45,
  pause = 1300,
}) {
  const prefersReducedMotion = useReducedMotion();
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!words?.length) {
      return undefined;
    }

    if (prefersReducedMotion) {
      setText(words[0]);
      return undefined;
    }

    const currentWord = words[wordIndex % words.length];
    const isWordComplete = text === currentWord;
    const isWordEmpty = text === "";
    const timeout = window.setTimeout(
      () => {
        if (!isDeleting && !isWordComplete) {
          setText(currentWord.slice(0, text.length + 1));
          return;
        }

        if (!isDeleting && isWordComplete) {
          setIsDeleting(true);
          return;
        }

        if (isDeleting && !isWordEmpty) {
          setText(currentWord.slice(0, text.length - 1));
          return;
        }

        setIsDeleting(false);
        setWordIndex((current) => (current + 1) % words.length);
      },
      !isDeleting && isWordComplete
        ? pause
        : isDeleting
          ? deletingSpeed
          : typingSpeed,
    );

    return () => window.clearTimeout(timeout);
  }, [
    deletingSpeed,
    isDeleting,
    pause,
    prefersReducedMotion,
    text,
    typingSpeed,
    wordIndex,
    words,
  ]);

  return (
    <span className="typing-text" aria-label={words.join(", ")}>
      {text}
      <span className="typing-caret" aria-hidden="true" />
    </span>
  );
}
