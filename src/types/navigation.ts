export type NavigationId = "historia" | "objetivo" | "donar" | "preguntas";

export interface NavigationItem {
  id: NavigationId;
  label: string;
}

export const navigationItems: NavigationItem[] = [
  { id: "historia", label: "Historia" },
  { id: "objetivo", label: "Objetivo" },
  { id: "donar", label: "Donar" },
  { id: "preguntas", label: "Preguntas" },
];

export const navigationIds: NavigationId[] = navigationItems.map(
  (item) => item.id,
);
