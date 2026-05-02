import React, { useEffect, useState } from "react";

interface EasterEggManagerProps {
  onJoker: () => void;
  onWhySoSerious: () => void;
  onKnight: () => void;
  onGotham: () => void;
  onYearOne: () => void;
  onVengeance: () => void;
}

export const EasterEggManager: React.FC<EasterEggManagerProps> = ({
  onJoker,
  onWhySoSerious,
  onKnight,
  onGotham,
  onYearOne,
  onVengeance,
}) => {
  const [input, setInput] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in an input
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      )
        return;

      const key = e.key.toUpperCase();
      // Only keep letters and spaces
      if (/^[A-Z\s]$/.test(key)) {
        setInput((prev) => {
          const next = (prev + key).slice(-20); // Keep last 20 chars
          return next;
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (input.includes("JOKER")) {
      onJoker();
      setInput("");
    } else if (input.includes("WHY SO SERIOUS")) {
      onWhySoSerious();
      setInput("");
    } else if (input.includes("KNIGHT")) {
      onKnight();
      setInput("");
    } else if (input.includes("GOTHAM")) {
      onGotham();
      setInput("");
    } else if (input.includes("YEAR ONE")) {
      onYearOne();
      setInput("");
    } else if (input.includes("I AM VENGEANCE")) {
      onVengeance();
      setInput("");
    }
  }, [
    input,
    onJoker,
    onWhySoSerious,
    onKnight,
    onGotham,
    onYearOne,
    onVengeance,
  ]);

  return null;
};
