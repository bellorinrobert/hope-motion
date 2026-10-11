import { ArrowUpRight, Check, Globe, ShieldCheck, Sparkles } from "lucide-react";

import { siteConfig } from "@/lib/site-config";

const benefits = [
  "Donaciones internacionales con tarjeta",
  "Pagos procesados por GoFundMe",
  "Actualizaciones oficiales de la campaña",
];

export function GofundmeCard() {
  return (
    <article className="relative flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-ink p-6 text-paper shadow-[0_40px_80px_-50px_rgba(22,17,13,0.9)] sm:p-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-clay/35 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-28 -left-16 h-56 w-56 rounded-full bg-gold/25 blur-3xl"
      />

      <div className="relative flex items-start justify-between gap-4">
        <div>
          <p className="eyebrow text-gold">Internacional</p>
          <h3 className="mt-3 font-display text-3xl leading-tight text-paper">
            GoFundMe
          </h3>
        </div>
        <span className="flex items-center gap-1.5 rounded-full border border-paper/20 bg-paper/10 px-3 py-1 text-xs font-semibold text-paper/85">
          <Sparkles size={13} strokeWidth={2.2} />
          Campaña oficial
        </span>
      </div>

      <p className="relative mt-4 text-sm leading-relaxed text-paper/70 sm:text-base">
        Aporta desde cualquier lugar del mundo y sigue el avance de la
        recaudación en tiempo real.
      </p>

      <ul className="relative mt-6 space-y-3">
        {benefits.map((benefit) => (
          <li key={benefit} className="flex items-start gap-3 text-sm text-paper/85">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-paper/10 text-gold">
              <Check size={13} strokeWidth={2.6} />
            </span>
            {benefit}
          </li>
        ))}
      </ul>

      <div className="relative mt-auto pt-8">
        <a
          href={siteConfig.gofundmeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex w-full items-center justify-between gap-3 rounded-full bg-clay px-6 py-4 text-sm font-semibold text-white transition-all duration-300 ease-out-expo hover:-translate-y-0.5 hover:bg-clay-dark"
        >
          <span className="flex items-center gap-2">
            <Globe size={17} strokeWidth={2.2} />
            Donar en GoFundMe
          </span>
          <ArrowUpRight
            size={18}
            strokeWidth={2.2}
            className="transition-transform duration-300 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </a>
        <p className="relative mt-4 flex items-center gap-2 text-xs text-paper/55">
          <ShieldCheck size={14} strokeWidth={2} />
          Enlace verificado hacia la campaña oficial
        </p>
      </div>
    </article>
  );
}
