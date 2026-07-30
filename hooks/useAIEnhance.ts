/**
 * useAIEnhance — Client-side hook for AI career objective enhancement.
 *
 * Encapsulates cache, cooldown, loading state, and error handling.
 * Calls /api/enhance-objective — never touches providers directly.
 */

"use client";

import { useState, useRef, useCallback, useEffect } from "react";

const NORMAL_COOLDOWN_S = 12;
const PENALTY_COOLDOWN_S = 30;

interface UseAIEnhanceReturn {
  enhance: (objective: string, bypassCache?: boolean) => Promise<void>;
  enhancedText: string | null;
  isLoading: boolean;
  error: string | null;
  cooldownRemaining: number;
  clearResult: () => void;
}

export function useAIEnhance(): UseAIEnhanceReturn {
  const [enhancedText, setEnhancedText] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cooldownRemaining, setCooldownRemaining] = useState(0);

  // In-memory cache: lowercase-trimmed objective → enhanced text
  const cacheRef = useRef<Map<string, string>>(new Map());
  const cooldownEndRef = useRef<number>(0);
  const cooldownIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Tick down the cooldown display
  const startCooldownTimer = useCallback((seconds: number) => {
    const endTime = Date.now() + seconds * 1000;
    cooldownEndRef.current = endTime;

    // Clear existing interval
    if (cooldownIntervalRef.current) {
      clearInterval(cooldownIntervalRef.current);
    }

    setCooldownRemaining(seconds);

    cooldownIntervalRef.current = setInterval(() => {
      const remaining = Math.ceil((cooldownEndRef.current - Date.now()) / 1000);
      if (remaining <= 0) {
        setCooldownRemaining(0);
        if (cooldownIntervalRef.current) {
          clearInterval(cooldownIntervalRef.current);
          cooldownIntervalRef.current = null;
        }
      } else {
        setCooldownRemaining(remaining);
      }
    }, 500);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (cooldownIntervalRef.current) {
        clearInterval(cooldownIntervalRef.current);
      }
    };
  }, []);

  const enhance = useCallback(
    async (objective: string, bypassCache = false) => {
      const trimmed = objective.trim();

      // Validation
      if (!trimmed) {
        setError("Please enter a career objective first.");
        return;
      }

      // Check cache (case-insensitive key)
      const cacheKey = trimmed.toLowerCase();
      if (!bypassCache && cacheRef.current.has(cacheKey)) {
        setEnhancedText(cacheRef.current.get(cacheKey)!);
        setError(null);
        return;
      }

      // Check cooldown (skip for cache hits, which returned above)
      const now = Date.now();
      if (cooldownEndRef.current > now) {
        const remaining = Math.ceil((cooldownEndRef.current - now) / 1000);
        setError(`Please wait ${remaining} seconds...`);
        return;
      }

      // Prevent duplicate requests
      if (isLoading) return;

      setIsLoading(true);
      setError(null);
      setEnhancedText(null);

      try {
        const response = await fetch("/api/enhance-objective", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ objective: trimmed }),
        });

        const data = await response.json();

        if (!response.ok) {
          // All providers failed → penalty cooldown
          startCooldownTimer(PENALTY_COOLDOWN_S);
          setError(data.error || "AI is currently busy. Please try again shortly.");
          return;
        }

        const enhanced = data.enhanced as string;

        // Cache the result
        cacheRef.current.set(cacheKey, enhanced);

        setEnhancedText(enhanced);
        startCooldownTimer(NORMAL_COOLDOWN_S);
      } catch {
        startCooldownTimer(PENALTY_COOLDOWN_S);
        setError("Network error. Please check your connection and try again.");
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, startCooldownTimer]
  );

  const clearResult = useCallback(() => {
    setEnhancedText(null);
    setError(null);
  }, []);

  return {
    enhance,
    enhancedText,
    isLoading,
    error,
    cooldownRemaining,
    clearResult,
  };
}
