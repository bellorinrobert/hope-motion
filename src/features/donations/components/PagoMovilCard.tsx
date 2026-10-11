"use client";

import { Info, MessageCircle } from "lucide-react";

import { CopyField } from "@/features/donations/components/CopyField";
import {
  isPagoMovilConfigured,
  isWhatsAppConfigured,
  pagoMovilConfig,
} from "@/features/donations/config/pago-movil";
import type { PagoMovilFieldKey } from "@/features/donations/types";
import { useClipboard } from "@/hooks/useClipboard";
import { buildWhatsAppUrl } from "@/lib/share";

const fields: Array<{ key: PagoMovilFieldKey; label: string }> = [
  { key: "bank", label: "Banco" },
  { key: "phone", label: "Número telefónico" },
  { key: "documentId", label: "Cédula del titular" },
  { key: "holderName", label: "Nombre del titular" },
];

export function PagoMovilCard() {
  const { activeKey, state, copy } = useClipboard();
  const configured = isPagoMovilConfigured();
  const whatsappReady = isWhatsAppConfigured() && configured;

  const whatsappUrl = buildWhatsAppUrl(
    pagoMovilConfig.whatsapp.number,
    pagoMovilConfig.whatsapp.message,
  );

  return (
    <article
      id="pago-movil"
      className="relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-ink/10 bg-linen p-6 shadow-[0_30px_60px_-45px_rgba(22,17,13,0.5)] sm:p-8"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="eyebrow text-clay">Venezuela</p>
          <h3 className="mt-3 font-display text-3xl leading-tight text-ink">
            Pago Móvil
          </h3>
        </div>
        <span className="rounded-full border border-ink/15 bg-paper px-3 py-1 text-xs font-semibold text-muted">
          Transferencia local
        </span>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
        Copia los datos, realiza la transferencia desde tu aplicación bancaria y
        envíanos el comprobante.
      </p>

      <div className="mt-6 grid gap-3">
        {fields.map((field) => (
          <CopyField
            key={field.key}
            id={field.key}
            label={field.label}
            value={pagoMovilConfig.data[field.key]}
            configured={configured}
            activeKey={activeKey}
            state={state}
            onCopy={copy}
          />
        ))}
      </div>

      {!configured ? (
        <div className="mt-5 flex gap-3 rounded-2xl border border-gold/40 bg-gold/10 px-4 py-3.5 text-sm leading-relaxed text-ink-soft">
          <Info size={18} className="mt-0.5 shrink-0 text-gold" />
          <p>
            Estamos por habilitar los datos de Pago Móvil. Mientras tanto, la
            campaña oficial de GoFundMe está disponible para donar.
          </p>
        </div>
      ) : null}

      <div className="mt-auto pt-6">
        {whatsappReady ? (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex w-full items-center justify-center gap-2 rounded-full bg-ink px-6 py-4 text-sm font-semibold text-paper transition-all duration-300 ease-out-expo hover:-translate-y-0.5 hover:bg-ink-soft"
          >
            <MessageCircle size={17} strokeWidth={2.2} />
            Enviar comprobante por WhatsApp
          </a>
        ) : (
          <div
            aria-disabled="true"
            className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-full border border-dashed border-ink/25 px-6 py-4 text-sm font-semibold text-muted"
          >
            <MessageCircle size={17} strokeWidth={2.2} />
            Comprobante por WhatsApp (próximamente)
          </div>
        )}
      </div>
    </article>
  );
}
