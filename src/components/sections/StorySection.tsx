"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";

import { ParallaxImage } from "@/components/animations/ParallaxImage";
import { Reveal } from "@/components/animations/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface Chapter {
  id: string;
  index: string;
  title: string;
  text: string;
  image: string;
  alt: string;
}

const chapters: Chapter[] = [
  {
    id: "punto-de-partida",
    index: "01",
    title: "El punto de partida",
    text: "Toda historia de recuperación comienza con un mismo gesto: decidir seguir adelante. El de Andrea es una historia de ánimo, paciencia y pequeños avances que se suman cada día.",
    image: "/images/andrea-story-01.svg",
    alt: "Fotografía que representa el comienzo de la historia de Andrea",
  },
  {
    id: "acompanamiento",
    index: "02",
    title: "Un camino que se recorre acompañado",
    text: "Detrás de cada avance hay una red de personas: familia, amistades y vecinos que se organizan para que Andrea no recorra este trayecto en soledad. Ese acompañamiento también es parte de la recuperación.",
    image: "/images/andrea-story-02.svg",
    alt: "Fotografía que representa el acompañamiento durante la recuperación de Andrea",
  },
  {
    id: "siguiente-paso",
    index: "03",
    title: "El siguiente paso",
    text: "Hoy esa historia sigue en movimiento y puede continuar con tu apoyo. Aportar significa sumar un paso más acercándola a su meta: volver a caminar sin muletas.",
    image: "/images/andrea-story-03.svg",
    alt: "Fotografía que representa el objetivo de Andrea de volver a caminar sin muletas",
  },
];

export function StorySection() {
  const listRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 0.7", "end 0.65"],
  });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const next = Math.min(
      chapters.length - 1,
      Math.max(0, Math.floor(value * chapters.length)),
    );
    setActiveIndex(next);
  });

  return (
    <section
      id="historia"
      aria-labelledby="historia-title"
      className="relative bg-paper py-20 md:py-28 lg:py-36"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          id="historia-title"
          eyebrow="Mi historia"
          title={
            <>
              Volver a caminar {" "}
              <em className="font-normal italic text-clay"> sin </em>{" "}
              muletas.
            </>
          }
          description="Una narrativa contada paso a paso: el comienzo, el acompañamiento y la meta que hoy mueve a una comunidad entera."
        />

        <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-2 lg:gap-16">
          <div className="hidden lg:block">
            <div className="sticky top-28 h-[68vh] overflow-hidden rounded-[2rem] bg-sand shadow-[0_50px_90px_-60px_rgba(22,17,13,0.7)]">
              {chapters.map((chapter, index) => (
                <motion.div
                  key={chapter.id}
                  className="absolute inset-0"
                  initial={false}
                  animate={{
                    opacity: activeIndex === index ? 1 : 0,
                    scale: activeIndex === index ? 1 : 1.05,
                  }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.8,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <Image
                    src={chapter.image}
                    alt={chapter.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </motion.div>
              ))}

              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-ink/85 to-transparent p-6">
                <p className="display-italic text-lg text-paper">
                  {chapters[activeIndex]?.title ?? chapters[0]?.title}
                </p>
                <span className="eyebrow text-gold">
                  {chapters[activeIndex]?.index ?? chapters[0]?.index} / 03
                </span>
              </div>
            </div>
          </div>

          <div ref={listRef} className="space-y-16 md:space-y-24">
            {chapters.map((chapter, index) => (
              <article key={chapter.id} className="scroll-mt-28">
                <ParallaxImage
                  src={chapter.image}
                  alt={chapter.alt}
                  className="mb-8 aspect-4/5 rounded-[1.5rem] lg:hidden"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />

                <Reveal delay={0.05}>
                  <div className="flex items-center gap-4">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full border border-clay/35 font-display text-sm text-clay">
                      {chapter.index}
                    </span>
                    <span
                      aria-hidden="true"
                      className="h-px flex-1 bg-ink/12"
                    />
                    {activeIndex === index ? (
                      <span className="eyebrow hidden text-clay lg:inline">
                        leyendo
                      </span>
                    ) : null}
                  </div>
                </Reveal>

                <Reveal delay={0.12}>
                  <h3 className="mt-6 font-display text-3xl leading-tight text-ink sm:text-4xl">
                    {chapter.title}
                  </h3>
                </Reveal>

                <Reveal delay={0.2}>
                  <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
                    {chapter.text}
                  </p>
                </Reveal>
              </article>
            ))}

            <Reveal>
              <blockquote className="rounded-[1.5rem] border-l-2 border-clay bg-sand/70 px-6 py-7 sm:px-8">
                <p className="display-italic text-2xl leading-snug text-ink sm:text-3xl">
                  “Ningún avance es demasiado pequeño cuando se camina en
                  comunidad.”
                </p>
                <footer className="mt-4 text-sm text-muted">
                  Hope Motion
                </footer>
              </blockquote>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

