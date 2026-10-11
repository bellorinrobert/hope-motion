"use client";

import { AnimatePresence, motion } from "motion/react";
import { AlertCircle, Check, Copy } from "lucide-react";

import { cn } from "@/lib/utils";

interface CopyFieldProps {
  id: string;
  label: string;
  value: string;
  configured: boolean;
  activeKey: string | null;
  state: "idle" | "copied" | "error";
  onCopy: (key: string, value: string) => void;
}

export function CopyField({
  id,
  label,
  value,
  configured,
  activeKey,
  state,
  onCopy,
}: CopyFieldProps) {
  const isActive = activeKey === id;
  const copied = isActive && state === "copied";
  const failed = isActive && state === "error";

  return (
    <div
      className={cn(
        "flex items-center justify-between gap-3 rounded-2xl border bg-paper px-4 py-3.5 transition-colors duration-300",
        copied
          ? "border-sage/60 bg-sage/8"
          : failed
            ? "border-clay/50"
            : "border-ink/10",
      )}
    >
      <div className="min-w-0 flex-1">
        <p className="eyebrow text-muted">{label}</p>
        {configured ? (
          <p className="mt-1 truncate text-sm font-semibold tabular-nums text-ink sm:text-base">
            {value}
          </p>
        ) : (
          <p className="mt-1 text-sm font-medium text-muted">
            Datos por confirmar
          </p>
        )}
      </div>

      {configured ? (
        <button
          type="button"
          onClick={() => onCopy(id, value)}
          aria-label={`Copiar ${label}`}
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ease-out-expo",
            "hover:-translate-y-0.5",
            copied
              ? "border-sage/40 bg-sage text-white"
              : "border-ink/15 bg-linen text-ink hover:border-ink/40",
          )}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={copied ? "check" : failed ? "alert" : "copy"}
              initial={{ opacity: 0, scale: 0.6, rotate: -25 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="flex"
            >
              {copied ? (
                <Check size={17} strokeWidth={2.4} />
              ) : failed ? (
                <AlertCircle size={17} strokeWidth={2.2} />
              ) : (
                <Copy size={16} strokeWidth={2} />
              )}
            </motion.span>
          </AnimatePresence>
        </button>
      ) : null}

      <span role="status" aria-live="polite" className="sr-only">
        {copied ? `${label} copiado al portapapeles` : ""}
        {failed ? `No se pudo copiar ${label}` : ""}
      </span>
    </div>
  );
}
