export interface PagoMovilData {
  bank: string;
  phone: string;
  documentId: string;
  holderName: string;
}

export interface PagoMovilConfig {
  enabled: boolean;
  data: PagoMovilData;
  whatsapp: {
    number: string;
    message: string;
  };
}

export type PagoMovilFieldKey = keyof PagoMovilData;

export interface GoalItem {
  id: string;
  title: string;
  description: string;
  detail: string;
  verified: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}
