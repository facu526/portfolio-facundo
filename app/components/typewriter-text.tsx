"use client";

import { useEffect, useState } from "react";

type TypewriterTextProps = {
  phrases: readonly string[];
  className?: string;
};

type AnimationPhase = "typing" | "holding" | "deleting" | "waiting";

export default function TypewriterText({
  phrases,
  className = "",
}: TypewriterTextProps) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [characterIndex, setCharacterIndex] = useState(0);
  const [phase, setPhase] = useState<AnimationPhase>("typing");
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const currentPhrase = phrases[phraseIndex] ?? "";
  const displayedText = currentPhrase.slice(0, characterIndex);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || phrases.length === 0) {
      return;
    }

    let delay = 68;
    let nextStep: () => void;

    if (phase === "typing" && characterIndex < currentPhrase.length) {
      nextStep = () => setCharacterIndex((current) => current + 1);
    } else if (phase === "typing") {
      delay = 0;
      nextStep = () => setPhase("holding");
    } else if (phase === "holding") {
      delay = 1800;
      nextStep = () => setPhase("deleting");
    } else if (phase === "deleting" && characterIndex > 0) {
      delay = 40;
      nextStep = () => setCharacterIndex((current) => current - 1);
    } else if (phase === "deleting") {
      delay = 0;
      nextStep = () => setPhase("waiting");
    } else {
      delay = 300;
      nextStep = () => {
        setPhraseIndex((current) => (current + 1) % phrases.length);
        setCharacterIndex(0);
        setPhase("typing");
      };
    }

    const timeout = window.setTimeout(nextStep, delay);
    return () => window.clearTimeout(timeout);
  }, [
    currentPhrase,
    characterIndex,
    phase,
    phrases.length,
    prefersReducedMotion,
  ]);

  const leadingText = displayedText.slice(0, -1);
  const finalCharacter = displayedText.slice(-1);

  return (
    <p className={`typewriter-text ${className}`} aria-label={phrases[0] ?? ""}>
      <span className="typewriter-static" aria-hidden="true">
        {phrases[0] ?? ""}
      </span>
      <span className="typewriter-animated" aria-hidden="true">
        {leadingText}
        <span className="whitespace-nowrap">
          {finalCharacter}
          <span className="typewriter-cursor" />
        </span>
      </span>
    </p>
  );
}
