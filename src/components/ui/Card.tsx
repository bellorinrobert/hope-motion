import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface CardProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "li";
}

export function Card({ children, className, as = "div" }: CardProps) {
  const Component = as;

  return (
    <Component
      className={cn(
        "relative overflow-hidden rounded-[1.75rem] border border-ink/10 bg-linen p-7",
        "shadow-[0_30px_60px_-45px_rgba(22,17,13,0.5)]",
        "transition-all duration-500 ease-out-expo hover:-translate-y-1.5 hover:border-ink/20 hover:shadow-[0_40px_70px_-40px_rgba(22,17,13,0.55)]",
        className,
      )}
    >
      {children}
    </Component>
  );
}
