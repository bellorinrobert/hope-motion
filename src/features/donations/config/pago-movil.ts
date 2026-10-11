import type { PagoMovilConfig, PagoMovilData } from "@/features/donations/types";

export const pagoMovilConfig: PagoMovilConfig = {
  enabled: false,
  data: {
    bank: "",
    phone: "",
    documentId: "",
    holderName: "",
  },
  whatsapp: {
    number: "",
    message:
      "Hola 👋 Realicé una donación a la campaña de Andrea por Pago Móvil. Te comparto el comprobante.",
  },
};

const requiredFields: Array<keyof PagoMovilData> = [
  "bank",
  "phone",
  "documentId",
  "holderName",
];

export function isPagoMovilConfigured(
  config: PagoMovilConfig = pagoMovilConfig,
): boolean {
  return (
    config.enabled &&
    requiredFields.every((field) => config.data[field].trim().length > 0)
  );
}

export function isWhatsAppConfigured(
  config: PagoMovilConfig = pagoMovilConfig,
): boolean {
  return config.whatsapp.number.replace(/\D/g, "").length >= 8;
}
