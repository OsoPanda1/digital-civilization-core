import { useState, useRef, useCallback } from "react";
import type { TAMVCrum, EcgPattern } from "@tamv/shared-types";
import { calculateEcgPattern } from "@tamv/shared-types";

interface UseTAMVTrackerOptions {
  maxHistory?: number;
  idGenerator?: () => string;
  intensitySource?: () => number;
}

export const useTAMVTracker = (
  currentModule: TAMVCrum["module"],
  options: UseTAMVTrackerOptions = {}
) => {
  const { maxHistory = 32, idGenerator, intensitySource } = options;
  const [history, setHistory] = useState<TAMVCrum[]>([]);
  const [navCount, setNavCount] = useState(0);
  const startTimeRef = useRef<number>(Date.now());

  const generateId = useCallback(
    () =>
      idGenerator
        ? idGenerator()
        : typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    [idGenerator]
  );

  const trackAction = useCallback(
    (action: TAMVCrum["action"], impactCredits = 0) => {
      const now = new Date();
      const duration = now.getTime() - startTimeRef.current;
      const pattern: EcgPattern = calculateEcgPattern(navCount, duration) as EcgPattern;
      
      const intensityRaw = typeof intensitySource === "function" ? intensitySource() : Math.random();
      const intensity = Math.min(1, Math.max(0, intensityRaw));

      const newCrum: TAMVCrum = {
        id: generateId(),
        timestamp: now,
        module: currentModule,
        action,
        impact: {
          credits: impactCredits,
          socialIndex: 0.1,
        },
        ecgContext: {
          pattern,
          intensity,
          sessionDuration: duration,
        },
        metadata: {},
      };

      setHistory((prev) => {
        const next = [...prev, newCrum];
        return next.length > maxHistory ? next.slice(-maxHistory) : next;
      });
      setNavCount((n) => n + 1);
    },
    [currentModule, generateId, intensitySource, maxHistory, navCount]
  );

  return { history, trackAction };
};
