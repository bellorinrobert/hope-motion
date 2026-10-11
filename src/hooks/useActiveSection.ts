"use client";

import { useEffect, useState } from "react";

const defaultOptions: IntersectionObserverInit = {
  rootMargin: "-45% 0px -50% 0px",
  threshold: 0,
};

export function useActiveSection(
  ids: string[],
  options: IntersectionObserverInit = defaultOptions,
): string | null {
  const [active, setActive] = useState<string | null>(null);
  const idKey = ids.join("|");

  useEffect(() => {
    const elements = idKey
      .split("|")
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) {
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

      if (visible[0]?.target.id) {
        setActive(visible[0].target.id);
      }
    }, options);

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [idKey, options]);

  return active;
}
