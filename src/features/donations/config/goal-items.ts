import type { GoalItem } from "@/features/donations/types";

export const goalItems: GoalItem[] = [
  {
    id: "recuperacion",
    title: "Recuperación y acompañamiento",
    description:
      "Todo lo necesario para sostener el proceso de recuperación de Andrea y acompañarla en cada nueva etapa del camino.",
    detail: "Monto por confirmar",
    verified: false,
  },
  {
    id: "movilidad",
    title: "Movilidad y apoyo diario",
    description:
      "Elementos que facilitan la movilidad y la vida cotidiana mientras Andrea avanza hacia caminar sin muletas.",
    detail: "Monto por confirmar",
    verified: false,
  },
  {
    id: "logistica",
    title: "Traslados y logística",
    description:
      "Transporte y gastos asociados a las citas y actividades que forman parte del proceso.",
    detail: "Monto por confirmar",
    verified: false,
  },
];
