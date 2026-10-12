import type { PagoMovilConfig, PagoMovilData } from "@/features/donations/types";

export const pagoMovilConfig: PagoMovilConfig = {
  enabled: true,
  data: {
    bank: "Mercantil",
    phone: "04245095229",
    documentId: "18411408",
    holderName: "Monica Palacios",
  },
  whatsapp: {
    number: "+584245095229",
    message:
      "¡Hola! A pesar que un granito de arena sea pequeño, sumado al de varias personas ayudan a cumplir sueños gigantescos. Aquí va mi granito de arena para apoyar la campaña de Andrea, junto al comprobante de mi Pago Móvil. ¡Vamos por más!",
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
