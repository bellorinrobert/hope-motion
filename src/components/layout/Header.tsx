"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useScrolled } from "@/hooks/useScrolled";
import { cn } from "@/lib/utils";
import { navigationIds, navigationItems } from "@/types/navigation";

export function Header() {
  const scrolled = useScrolled(64);
  const [menuOpen, setMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const activeSection = useActiveSection(navigationIds);

  const tone = scrolled ? "dark" : "light";

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-out-expo",
        scrolled
          ? "border-b border-ink/10 bg-paper/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 md:h-20">
        <a
          href="#contenido"
          className={cn(
            "font-display text-lg font-semibold tracking-tight transition-colors md:text-xl",
            tone === "dark" ? "text-ink" : "text-paper",
          )}
        >
          Hope
          <span className="text-clay"> Motion</span>
        </a>

        <nav aria-label="Navegación principal" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navigationItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                      tone === "dark"
                        ? "text-ink/70 hover:text-ink"
                        : "text-paper/75 hover:text-paper",
                    )}
                  >
                    {item.label}
                    {isActive ? (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute inset-x-3 -bottom-0.5 h-px bg-clay"
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      />
                    ) : null}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Button
            href="#donar"
            size="sm"
            className={cn(
              "hidden sm:inline-flex",
              scrolled ? "" : "shadow-none ring-1 ring-paper/40",
            )}
            variant={scrolled ? "primary" : "light"}
          >
            Quiero ayudar
          </Button>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="menu-movil"
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-full border transition-colors md:hidden",
              tone === "dark"
                ? "border-ink/20 text-ink"
                : "border-paper/35 text-paper",
            )}
          >
            <span className="sr-only">{menuOpen ? "Cerrar" : "Abrir"}</span>
            <span aria-hidden="true" className="text-base leading-none">
              {menuOpen ? "✕" : "☰"}
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            id="menu-movil"
            key="mobile-menu"
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="border-t border-ink/10 bg-paper md:hidden"
          >
            <ul className="px-5 py-4">
              {navigationItems.map((item, index) => (
                <motion.li
                  key={item.id}
                  initial={reduceMotion ? { opacity: 1 } : { opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * index + 0.05, duration: 0.4 }}
                  className="border-b border-ink/5 last:border-0"
                >
                  <a
                    href={`#${item.id}`}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-between py-4 font-display text-2xl text-ink"
                  >
                    {item.label}
                    <span aria-hidden="true" className="text-sm text-clay">
                      0{index + 1}
                    </span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
