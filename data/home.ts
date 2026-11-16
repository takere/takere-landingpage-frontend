import type { Localized } from "@/i18n/config";

/** "What do we offer?" list on the home page; `icon` is a file in /img/icons. */
export const offers: { icon: string; label: Localized }[] = [
  { icon: "support", label: { pt: "Ferramenta para apoio ao tratamento", en: "Tool to support treatment" } },
  {
    icon: "hospital",
    label: { pt: "Acompanhamento remoto pela equipe de saúde", en: "Remote monitoring by the healthcare team" },
  },
  { icon: "user", label: { pt: "Ajuste individual", en: "Individual adjustment" } },
  { icon: "antenna", label: { pt: "Acesso remoto", en: "Remote access" } },
  {
    icon: "blocks",
    label: { pt: "Personalização do plano de cuidado em tempo real", en: "Personalization of the care plan in real time." },
  },
];
