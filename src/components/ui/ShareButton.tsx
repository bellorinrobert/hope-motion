"use client";

import { Share2 } from "lucide-react";
import { useState } from "react";

import { shareCampaign } from "@/lib/share";
import { cn } from "@/lib/utils";

interface ShareButtonProps {
  className?: string;
  label?: string;
}

export function ShareButton({ className, label = "Compartir campaña" }: ShareButtonProps) {
  const [status, setStatus] = useState<"idle" | "copied" | "shared" | "failed">(
    "idle",
  );

  async function handleClick() {
    const result = await shareCampaign();
    setStatus(result);

    if (result !== "failed") {
      window.setTimeout(() => setStatus("idle"), 2400);
    }
  }

  const feedback =
    status === "copied"
      ? "Enlace copiado"
      : status === "shared"
        ? "¡Compartido!"
        : status === "failed"
          ? "No se pudo compartir"
          : label;

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-live="polite"
      className={cn(
        "group inline-flex items-center justify-center gap-2 rounded-full border border-paper/25 px-6 py-3.5 text-sm font-semibold text-paper transition-all duration-300 ease-out-expo",
        "hover:-translate-y-0.5 hover:border-paper/60 hover:bg-paper hover:text-ink",
        status === "failed" && "border-clay/60",
        className,
      )}
    >
      <Share2 size={16} strokeWidth={2.1} />
      {feedback}
    </button>
  );
}
