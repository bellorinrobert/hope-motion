import Link from "next/link";
import { ArrowUpRight, Heart, MessageCircle } from "lucide-react";

import { ShareButton } from "@/components/ui/ShareButton";
import { buildWhatsAppUrl } from "@/lib/share";
import { siteConfig } from "@/lib/site-config";
import { navigationItems } from "@/types/navigation";

const hasContact = siteConfig.contactWhatsapp.replace(/\D/g, "").length >= 8;

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="border-b border-paper/10 py-16 md:py-20">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="eyebrow text-gold">Hope Motion</p>
              <p className="mt-5 font-display text-3xl leading-tight text-paper sm:text-4xl md:text-5xl">
                Compartir también es{" "}
                <em className="font-normal italic text-gold">ayudar</em>.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-paper/60 sm:text-base">
                Si no puedes donar, envía la campaña a tu red de contactos. Cada
                compartido acerca un paso más a Andrea.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <ShareButton />
              <a
                href={siteConfig.gofundmeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-clay px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 ease-out-expo hover:-translate-y-0.5 hover:bg-clay-dark"
              >
                Donar en GoFundMe
                <ArrowUpRight
                  size={16}
                  strokeWidth={2.2}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            </div>
          </div>
        </div>

        <div className="grid gap-10 py-14 md:grid-cols-3 md:gap-8">
          <div>
            <p className="font-display text-xl font-semibold text-paper">
              Hope<span className="text-clay"> Motion</span>
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-paper/55">
              Experiencias digitales con propósito: diseñamos historias que
              mueven a las personas a actuar.
            </p>
          </div>

          <nav aria-label="Navegación del pie de página">
            <p className="eyebrow text-paper/45">Navegación</p>
            <ul className="mt-5 space-y-3">
              {navigationItems.map((item) => (
                <li key={item.id}>
                  <Link
                    href={`#${item.id}`}
                    className="text-sm text-paper/70 transition-colors hover:text-gold"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="eyebrow text-paper/45">Contacto</p>
            <ul className="mt-5 space-y-3 text-sm text-paper/70">
              <li>
                <a
                  href={siteConfig.gofundmeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 transition-colors hover:text-gold"
                >
                  Campaña oficial GoFundMe
                  <ArrowUpRight size={14} strokeWidth={2.2} />
                </a>
              </li>
              {hasContact ? (
                <li>
                  <a
                    href={buildWhatsAppUrl(
                      siteConfig.contactWhatsapp,
                      "Hola 👋 Escribo por la campaña de Andrea.",
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 transition-colors hover:text-gold"
                  >
                    <MessageCircle size={15} strokeWidth={2} />
            Escribir por WhatsApp
                  </a>
                </li>
              ) : null}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-paper/10 py-8 text-xs text-paper/45 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-2">
            © {new Date().getFullYear()} Hope Motion. Hecho con
            <Heart size={13} className="text-clay" strokeWidth={2.2} />
            para Andrea.
          </p>
          <p className="max-w-xl leading-relaxed">
            El código está bajo licencia MIT. Las fotografías, testimonios y
            datos personales de la campaña no están cubiertos por esa licencia.
          </p>
        </div>
      </div>
    </footer>
  );
}
