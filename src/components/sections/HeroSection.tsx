"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";

import { Reveal } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { Button } from "@/components/ui/Button";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.14]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -110]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <section
      ref={sectionRef}
      id="inicio"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-svh flex-col justify-end overflow-hidden bg-ink lg:justify-center"
    >
      <motion.div
        aria-hidden="true"
        style={
          reduceMotion
            ? { scale: 1 }
            : { y: imageY, scale: imageScale }
        }
        className="absolute inset-x-0 -inset-y-[20%] -z-20 will-change-transform"
      >
        <Image
          src="/images/andrea-hero.svg"
          alt="Imagen principal de la campaña sobre Andrea"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      <div
        aria-hidden="true"
        className="hero-scrim absolute inset-0 -z-10"
      />

      <motion.div
        style={
          reduceMotion
            ? { opacity: 1 }
            : { y: contentY, opacity: contentOpacity }
        }
        className="mx-auto w-full max-w-7xl px-5 pb-28 pt-32 sm:px-8 lg:pb-24 lg:pt-40"
      >
        <div className="max-w-3xl">
          <Reveal delay={0.1} y={18} amount={0}>
            <p className="eyebrow text-gold">
              Campaña de recaudación · Hope Motion
            </p>
          </Reveal>

          <h1
            id="hero-title"
            className="mt-6 font-display text-[2.75rem] font-semibold leading-[1.02] tracking-tight text-paper sm:text-6xl lg:text-[5.25rem]"
          >
            <TextReveal
              text="Ayudemos a Andrea a volver a caminar"
              delay={0.25}
              stagger={0.07}
            />
          </h1>

          <Reveal delay={0.75} y={22} amount={0}>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-paper/75 sm:text-lg">
              Cada aporte se convierte en un paso más. Acompaña a Andrea en su
              recuperación y en el sueño de volver a caminar sin muletas.
            </p>
          </Reveal>

          <Reveal delay={0.9} y={22} amount={0}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <Button href="#donar" size="lg" className="w-full sm:w-auto">
                Quiero ayudar
              </Button>
              <Button
                href="#historia"
                variant="lightOutline"
                size="lg"
                className="w-full sm:w-auto"
              >
                Conocer su historia
              </Button>
            </div>
          </Reveal>
        </div>
      </motion.div>

      <motion.div
        aria-hidden="true"
        style={reduceMotion ? { opacity: 1 } : { opacity: cueOpacity }}
        className="pointer-events-none absolute inset-x-0 bottom-6 hidden justify-center lg:flex"
      >
        <motion.div
          animate={reduceMotion ? undefined : { y: [0, 9, 0] }}
          transition={{ duration: 2.1, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-3 text-paper/60"
        >
          <span className="eyebrow">Desliza</span>
          <span className="h-10 w-px bg-gradient-to-b from-paper/60 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
