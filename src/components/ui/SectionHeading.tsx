import type { ReactNode } from "react";

import { Reveal } from "@/components/animations/Reveal";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
  id?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  id,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <Reveal y={16}>
          <p className="eyebrow text-clay">{eyebrow}</p>
        </Reveal>
      ) : null}
      <Reveal delay={0.06} y={24}>
        <h2
          id={id}
          className="mt-4 font-display text-4xl leading-[1.05] tracking-tight text-ink sm:text-5xl md:text-6xl"
        >
          {title}
        </h2>
      </Reveal>
      {description ? (
        <Reveal delay={0.14} y={20}>
          <p className="mt-6 text-base leading-relaxed text-muted sm:text-lg">
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
