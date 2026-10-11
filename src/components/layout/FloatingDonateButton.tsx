"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

import { useScrolled } from "@/hooks/useScrolled";

interface FloatingDonateButtonProps {
  targetId?: string;
  label?: string;
}

export function FloatingDonateButton({
  targetId = "donar",
  label = "Quiero ayudar",
}: FloatingDonateButtonProps) {
  const scrolled = useScrolled(420);
  const reduceMotion = useReducedMotion();
  const [targetVisible, setTargetVisible] = useState(false);

  useEffect(() => {
    const target = document.getElementById(targetId);
    if (!target) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        setTargetVisible(entries[0]?.isIntersecting ?? false);
      },
      { threshold: 0.2 },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [targetId]);

  const visible = scrolled && !targetVisible;

  return (
    <AnimatePresence>
      {visible ? (
        <motion.a
          key="floating-donate"
          href={`#${targetId}`}
          initial={reduceMotion ? { opacity: 1 } : { y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={reduceMotion ? { opacity: 0 } : { y: 90, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-4 bottom-4 z-50 flex items-center justify-center gap-2 rounded-full bg-clay px-6 py-4 text-center text-sm font-semibold text-white shadow-[0_22px_45px_-20px_rgba(192,90,56,0.95)] transition-colors hover:bg-clay-dark lg:hidden"
        >
          {label}
          <span aria-hidden="true">→</span>
        </motion.a>
      ) : null}
    </AnimatePresence>
  );
}
