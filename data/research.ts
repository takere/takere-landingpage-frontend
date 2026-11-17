import type { Localized } from "@/i18n/config";

export interface ResearchArea {
  /** Image file name in /assets/images/research (without extension). */
  key: string;
  label: Localized;
}

/** Research areas, in the order shown in the grid (row by row). */
export const researchAreas: ResearchArea[] = [
  {
    key: "language",
    label: {
      pt: "Adaptação/tradução da linguagem técnica para linguagem do paciente",
      en: "Adaptation/translation of technical language into patient-readable language.",
    },
  },
  { key: "security", label: { pt: "Cibersegurança + LGPD", en: "Cybersecurity + LGPD" } },
  { key: "metrics", label: { pt: "Coleta métricas de uso do paciente", en: "Collects patient usage metrics." } },
  { key: "records", label: { pt: "Compartilhamento do prontuário do paciente", en: "Sharing patient records" } },
  {
    key: "dashboard",
    label: {
      pt: "Dashboard dinâmico de pacientes baseado no seu tratamento",
      en: "Dynamic patient dashboard based on their treatment.",
    },
  },
  { key: "delegation", label: { pt: "Delegação de cuidado", en: "Delegation of care" } },
  {
    key: "offline",
    label: { pt: "Funcionamento offline de soluções mHealth", en: "Offline functionality of mHealth solutions" },
  },
  { key: "prescriptions", label: { pt: "Leitura de receitas por foto", en: "Reading prescriptions from photos" } },
  { key: "drugs", label: { pt: "Interações medicamentosas", en: "Drug interactions" } },
  {
    key: "conversational",
    label: {
      pt: "Interfaces conversacionais com modelos de linguagem natural",
      en: "Conversational interfaces with natural language models",
    },
  },
  { key: "ai", label: { pt: "Uso da IA em soluções mHealth", en: "The use of AI in mHealth solutions." } },
  {
    key: "fhir",
    label: {
      pt: "Protocolos HL7 / FHIR para interoperabilidade de dados de saúde",
      en: "HL7/FHIR protocols for health data interoperability",
    },
  },
  {
    key: "remote",
    label: { pt: "Como levar saúde digital para populações remotas", en: "How to bring digital health to remote populations" },
  },
];
