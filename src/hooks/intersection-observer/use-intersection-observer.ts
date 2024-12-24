"use client";

import { useEffect, useRef } from "react";

interface UseIntersectionObserverProps {
  onIntersect: () => void;
  threshold?: number;
  enabled?: boolean;
}

export default function useIntersectionObserver({
  onIntersect,
  threshold = 0.7,
  enabled = true,
}: UseIntersectionObserverProps) {
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onIntersect();
        }
      },
      { threshold }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [onIntersect, threshold, enabled]);

  return observerRef;
}
