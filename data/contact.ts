import type { Localized } from "@/i18n/config";

export const CONTACT_EMAIL = "contato.takere@gmail.com";

export interface ContactPerson {
  email: string;
  topic: Localized;
  who: Localized;
}

export const contacts: ContactPerson[] = [
  {
    email: "erika@inf.ufrgs.br",
    topic: { pt: "Para se juntar à nossa pesquisa:", en: "To join our research:" },
    who: {
      pt: "Coordenadora e Professora Associada, Érika F. Cota:",
      en: "Coordinator and Associate Professor, Érika F. Cota:",
    },
  },
  {
    email: "william.niemiec@inf.ufrgs.br",
    topic: {
      pt: "Para questões relativas ao site ou a tecnologias utilizadas:",
      en: "For questions regarding the website or technologies used:",
    },
    who: {
      pt: "Coordenador e Doutorando em Computação, William Niemiec:",
      en: "Coordinator and PhD student in Computing, William Niemiec:",
    },
  },
  {
    email: "dmatos@hcpa.edu.br",
    topic: { pt: "Para questões relacionadas a pesquisas no HCPA:", en: "For questions related to research at HCPA:" },
    who: {
      pt: "Coordenador e Farmacêutico Clínico, Douglas N. Matos:",
      en: "Coordinator and Clinical Pharmacist, Douglas N. Matos:",
    },
  },
];

export const addressLines: Localized<string[]> = {
  pt: [
    "Instituto de Informática",
    "Sala: 204 - Prédio 43413",
    "Universidade Federal do Rio Grande do Sul",
    "Av. Bento Gonçalves, 9500 - Agronomia,",
    "Porto Alegre - RS, 91509-900, Brazil",
  ],
  en: [
    "Institute of Informatics",
    "Room: 204 - Building 43413",
    "Federal University of Rio Grande do Sul",
    "Av. Bento Gonçalves, 9500 - Agronomy,",
    "Porto Alegre - RS, 91509-900, Brazil",
  ],
};

export const MAP_EMBED_URL =
  "https://maps.google.com/maps?q=Instituto+de+Inform%C3%A1tica+UFRGS,+Av.+Bento+Gon%C3%A7alves+9500,+Porto+Alegre&z=16&output=embed";
