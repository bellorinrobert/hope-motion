import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type ButtonVariant =
  | "primary"
  | "outline"
  | "ghost"
  | "light"
  | "lightOutline";
type ButtonSize = "sm" | "md" | "lg";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-clay text-white shadow-[0_18px_40px_-18px_rgba(192,90,56,0.9)] hover:bg-clay-dark",
  outline:
    "border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-paper",
  ghost: "text-ink hover:bg-ink/8",
  light: "bg-paper text-ink hover:bg-white",
  lightOutline:
    "border border-paper/40 text-paper hover:border-paper hover:bg-paper hover:text-ink",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-5 py-2.5 text-xs",
  md: "px-7 py-3.5 text-sm",
  lg: "px-9 py-4 text-base",
};

interface BaseButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  "aria-label"?: string;
}

type LinkButtonProps = BaseButtonProps & {
  href: string;
  external?: boolean;
  onClick?: undefined;
  type?: undefined;
};

type NativeButtonProps = BaseButtonProps & {
  href?: undefined;
  external?: false;
  onClick?: () => void;
  type?: "button" | "submit";
};

export type ButtonProps = LinkButtonProps | NativeButtonProps;

function classesFor(
  variant: ButtonVariant,
  size: ButtonSize,
  className?: string,
): string {
  return cn(
    "group inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight transition-all duration-300 ease-out-expo",
    "hover:-translate-y-0.5 active:translate-y-0",
    "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-clay",
    variantClasses[variant],
    sizeClasses[size],
    className,
  );
}

export function Button(props: ButtonProps) {
  const {
    children,
    variant = "primary",
    size = "md",
    className,
    "aria-label": ariaLabel,
  } = props;

  if (props.href !== undefined) {
    const isExternal = props.external ?? false;

    return (
      <Link
        href={props.href}
        aria-label={ariaLabel}
        className={classesFor(variant, size, className)}
        {...(isExternal
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={props.type ?? "button"}
      onClick={props.onClick}
      aria-label={ariaLabel}
      className={classesFor(variant, size, className)}
    >
      {children}
    </button>
  );
}
