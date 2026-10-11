import { BadgeCheck, Clock3, Footprints, HeartHandshake, Route } from "lucide-react";

import { ParallaxImage } from "@/components/animations/ParallaxImage";
import { Reveal } from "@/components/animations/Reveal";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { goalItems } from "@/features/donations/config/goal-items";
import type { GoalItem } from "@/features/donations/types";
import { siteConfig } from "@/lib/site-config";

const iconById: Record<
  GoalItem["id"],
  typeof HeartHandshake
> = {
  recuperacion: HeartHandshake,
  movilidad: Footprints,
  logistica: Route,
};

function GoalCard({ item }: { item: GoalItem }) {
  const Icon = iconById[item.id] ?? HeartHandshake;

  return (
    <Card className="h-full">
      <div className="flex items-start justify-between gap-4">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-clay/12 text-clay">
          <Icon size={22} strokeWidth={1.9} />
        </span>
        <span
          className={
            item.verified
              ? "inline-flex items-center gap-1.5 rounded-full bg-sage/15 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-wider text-sage"
              : "inline-flex items-center gap-1.5 rounded-full bg-gold/15 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-wider text-ink-soft"
          }
        >
          {item.verified ? (
            <BadgeCheck size={13} strokeWidth={2.2} />
          ) : (
            <Clock3 size={13} strokeWidth={2.2} />
          )}
          {item.verified ? "Verificado" : "Por confirmar"}
        </span>
      </div>

      <h3 className="mt-6 font-display text-2xl leading-snug text-ink">
        {item.title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
        {item.description}
      </p>
      <p className="mt-6 border-t border-ink/10 pt-4 text-xs font-semibold uppercase tracking-[0.18em] text-muted">
        {item.detail}
      </p>
    </Card>
  );
}

export function GoalSection() {
  return (
    <section
      id="objetivo"
      aria-labelledby="objetivo-title"
      className="relative bg-sand/55 py-20 md:py-28 lg:py-36"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          id="objetivo-title"
          eyebrow="El objetivo"
          title={
            <>
              ¿Para qué{" "}
              <em className="font-normal italic text-clay">se recauda</em>?
            </>
          }
          description="La meta es acompañar a Andrea en su recuperación y en el camino de volver a caminar sin muletas. Cada necesidad de la campaña se publica con transparencia en su página oficial."
        />

        <ul className="mt-12 grid gap-5 md:mt-16 md:grid-cols-3">
          {goalItems.map((item, index) => (
            <li key={item.id}>
              <Reveal delay={index * 0.1} y={32}>
                <GoalCard item={item} />
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal delay={0.1} className="mt-14">
          <figure className="relative overflow-hidden rounded-[2rem]">
            <ParallaxImage
              src="/images/step-band.svg"
              alt="Imagen de la campaña que representa el paso a paso de la recaudación"
              className="h-[46vh] min-h-[300px] w-full"
              sizes="(max-width: 1024px) 100vw, 1200px"
            />
            <figcaption className="pointer-events-none absolute inset-0 flex flex-col justify-center bg-gradient-to-r from-ink/85 via-ink/55 to-transparent px-7 sm:px-14">
              <p className="display-italic text-2xl leading-snug text-paper sm:text-4xl">
                Transparencia en cada paso
              </p>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-paper/70 sm:text-base">
                Los avances, montos y actualizaciones oficiales se comparten en
                la campaña de GoFundMe.
              </p>
            </figcaption>
          </figure>
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          <a
            href={siteConfig.gofundmeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-ink underline decoration-clay decoration-2 underline-offset-8 transition-colors hover:text-clay"
          >
            Ver la campaña oficial en GoFundMe
            <span
              aria-hidden="true"
              className="transition-transform duration-300 ease-out-expo group-hover:translate-x-1"
            >
              →
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
