"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

import { cn } from "@/lib/utils";

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  priority?: boolean;
  travel?: number;
  scaleFrom?: number;
  scaleTo?: number;
}

export function ParallaxImage({
  src,
  alt,
  className,
  imageClassName,
  sizes = "(max-width: 1024px) 100vw, 50vw",
  priority = false,
  travel = 7,
  scaleFrom = 1.08,
  scaleTo = 1,
}: ParallaxImageProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: frameRef,
    offset: ["start end", "end start"],
  });

  const yRaw = useTransform(
    scrollYProgress,
    [0, 1],
    [`${travel}%`, `-${travel}%`],
  );
  const scaleRaw = useTransform(scrollYProgress, [0, 1], [scaleFrom, scaleTo]);
  const y = useSpring(yRaw, { stiffness: 110, damping: 26, mass: 0.35 });

  return (
    <div
      ref={frameRef}
      className={cn("relative overflow-hidden bg-sand", className)}
    >
      <motion.div
        className="absolute inset-x-0 -inset-y-[10%] will-change-transform"
        style={
          reduceMotion ? { scale: scaleTo } : { y, scale: scaleRaw }
        }
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={cn("object-cover", imageClassName)}
        />
      </motion.div>
    </div>
  );
}
