import type { FAQItem } from "@/features/donations/types";

export const faqItems: FAQItem[] = [
  {
    id: "donar",
    question: "¿Dónde puedo donar?",
    answer:
      "Hay dos caminos: Pago Móvil (Venezuela) y la campaña oficial de GoFundMe para donaciones internacionales. Ambos están en la sección “Donar”.",
  },
  {
    id: "pago-movil",
    question: "¿Cómo funciona Pago Móvil?",
    answer:
      "Copia el banco, el número telefónico, la cédula del titular y el nombre del titular, realiza la transferencia desde tu aplicación bancaria y envía el comprobante por WhatsApp.",
  },
  {
    id: "internacional",
    question: "¿Puedo donar desde otro país?",
    answer:
      "Sí. La campaña de GoFundMe acepta donaciones internacionales con tarjeta y muestra la recaudación en tiempo real.",
  },
  {
    id: "comprobante",
    question: "¿Recibiré un comprobante?",
    answer:
      "Al donar por Pago Móvil puedes enviarnos tu comprobante por WhatsApp para dar seguimiento. GoFundMe emite su propio comprobante de donación.",
  },
  {
    id: "seguridad",
    question: "¿Es seguro donar?",
    answer:
      "Sí. Las donaciones se realizan directamente a los canales oficiales de la campaña. Este sitio no solicita datos de tarjetas ni almacena comprobantes de pago.",
  },
  {
    id: "actualizaciones",
    question: "¿Cómo me entero de los avances?",
    answer:
      "La campaña de GoFundMe publica actualizaciones oficiales. También puedes compartir tu comprobante por WhatsApp para mantenerte en contacto.",
  },
  {
    id: "compartir",
    question: "¿Puedo ayudar sin donar?",
    answer:
      "Por supuesto. Compartir la campaña con tu red de contactos multiplica su alcance y también es una forma enorme de ayudar.",
  },
];
