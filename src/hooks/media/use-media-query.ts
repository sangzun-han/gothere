"use client";

import { useState, useEffect } from "react";

/**
 * A custom hook to check if a media query matches.
 * @param query The media query to check (e.g., "(min-width: 768px)").
 * @returns A boolean indicating whether the media query matches.
 */
export default function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window === "undefined") {
      return false; // Default to false during SSR
    }
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);

    const handleChange = () => {
      setMatches(mediaQueryList.matches);
    };

    // Set initial value
    handleChange();

    // Add event listener
    mediaQueryList.addEventListener("change", handleChange);

    return () => {
      // Cleanup event listener on unmount
      mediaQueryList.removeEventListener("change", handleChange);
    };
  }, [query]);

  return matches;
}
