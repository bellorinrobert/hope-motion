import { Reveal } from "@/components/animations/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GofundmeCard } from "@/features/donations/components/GofundmeCard";
import { PagoMovilCard } from "@/features/donations/components/PagoMovilCard";

export function DonationSection() {
  return (
    <section
      id="donar"
      aria-labelledby="donar-title"
      className="relative overflow-hidden bg-paper py-20 md:py-28 lg:py-36"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-gold/12 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-clay/12 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          id="donar-title"
          align="center"
          eyebrow="Cómo ayudar"
          title={
            <>
              Dos formas de{" "}
              <em className="font-normal italic text-clay">sumar un paso</em>
            </>
          }
          description="Elige el canal que mejor te quede. Ambos llegan directamente a la campaña oficial de Andrea."
        />

        <div className="mx-auto mt-12 grid max-w-6xl gap-6 md:mt-16 lg:grid-cols-2">
          <Reveal delay={0.05} y={36}>
            <PagoMovilCard />
          </Reveal>
          <Reveal delay={0.15} y={36}>
            <GofundmeCard />
          </Reveal>
        </div>

        <Reveal delay={0.2} className="mx-auto mt-10 max-w-3xl">
          <p className="text-center text-xs leading-relaxed text-muted sm:text-sm">
            Este sitio no solicita datos de tarjetas ni almacena comprobantes de
            pago. Toda la información oficial de la campaña se publica en
            GoFundMe.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
