import { Accordion } from "@/components/ui/Accordion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqItems } from "@/features/donations/config/faq-items";

export function FAQSection() {
  return (
    <section
      id="preguntas"
      aria-labelledby="preguntas-title"
      className="relative bg-linen py-20 md:py-28 lg:py-36"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <SectionHeading
            id="preguntas-title"
            eyebrow="Preguntas frecuentes"
            title={
              <>
                Todo lo que necesitas{" "}
                <em className="font-normal italic text-clay">saber</em>
              </>
            }
            description="Resolvemos las dudas más comunes sobre los métodos de pago y la campaña."
          />

          <div>
            <Accordion items={faqItems} />
          </div>
        </div>
      </div>
    </section>
  );
}
