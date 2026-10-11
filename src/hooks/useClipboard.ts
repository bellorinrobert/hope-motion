"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type CopyState = "idle" | "copied" | "error";

interface UseClipboardResult {
  activeKey: string | null;
  state: CopyState;
  copy: (key: string, value: string) => Promise<void>;
  reset: () => void;
}

export function useClipboard(resetDelay = 2200): UseClipboardResult {
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [state, setState] = useState<CopyState>("idle");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clear = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const reset = useCallback(() => {
    clear();
    setActiveKey(null);
    setState("idle");
  }, [clear]);

  const fallbackCopy = useCallback((value: string) => {
    const textarea = document.createElement("textarea");
    textarea.value = value;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    const succeeded = document.execCommand("copy");
    document.body.removeChild(textarea);
    return succeeded;
  }, []);

  const copy = useCallback(
    async (key: string, value: string) => {
      clear();
      let succeeded = false;

      try {
        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(value);
          succeeded = true;
        } else {
          succeeded = fallbackCopy(value);
        }
      } catch {
        succeeded = fallbackCopy(value);
      }

      if (!succeeded) {
        setActiveKey(key);
        setState("error");
      } else {
        setActiveKey(key);
        setState("copied");
      }

      timerRef.current = setTimeout(() => {
        setActiveKey(null);
        setState("idle");
      }, resetDelay);
    },
    [clear, fallbackCopy, resetDelay],
  );

  useEffect(() => clear, [clear]);

  return { activeKey, state, copy, reset };
}
