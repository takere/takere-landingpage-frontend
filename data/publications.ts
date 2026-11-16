import type { Lang } from "@/i18n/config";

export type PublicationKind = "journal" | "conference" | "thesis";

export interface Publication {
  kind: PublicationKind;
  authors: string;
  title: string;
  /** Venue/citation details shown after the title. */
  venue: string;
  doi?: string;
}

export interface PublicationYear {
  year: string;
  items: Publication[];
}

const tcc = {
  pt: "Trabalho de Conclusão de Curso. (Graduação em Ciência da Computação) - Universidade Federal do Rio Grande do Sul. Orientador: Érika Fernandes Cota.",
  en: "Course Conclusion Paper. (Computer Science Graduation) - Federal University of Rio Grande do Sul. Advisor: Érika Fernandes Cota.",
};
const coadvisor = { pt: " Coorientador: William Niemiec.", en: " Co-advisor: William Niemiec." };

function thesis(lang: Lang, author: string, title: Record<Lang, string>, year: number, coadvised = true): Publication {
  return {
    kind: "thesis",
    authors: author,
    title: title[lang],
    venue: `${year}. ${tcc[lang]}${coadvised ? coadvisor[lang] : ""}`,
  };
}

export function publications(lang: Lang): PublicationYear[] {
  return [
    {
      year: "2026",
      items: [
        thesis(lang, "KROEFF, LUCCA FRANKE", {
          pt: "Uso de LLMs para Simplificação de Linguagem Técnica em Plataformas mHealth",
          en: "Use of LLMs for Simplifying Technical Language in mHealth Platforms",
        }, 2026),
        thesis(lang, "BRAGA, SOFIA DE MORAES SAUTER", {
          pt: "Um estudo exploratório do uso de Claude no desenvolvimento e avaliação de uma interface mobile mHealth",
          en: "An exploratory study of the use of Claude in the development and evaluation of a mobile mHealth interface",
        }, 2026),
        {
          kind: "conference",
          authors: "NIEMIEC, WILLIAM ; TAVARES, A. R. ; COTA, E.",
          title:
            "A Methodology for Generating Mobile Applications Through Large Language Models",
          venue:
            "In: IEEE/ACM 13th International Conference on Mobile Software Engineering and Systems (MOBILESoft), 2026, Rio de Janeiro. Proceedings. 2026.",
          doi: "10.1145/3795077.3795116",
        },
      ],
    },
    {
      year: "2025",
      items: [
        {
          kind: "journal",
          authors: "NIEMIEC, WILLIAM ; COTA, ÉRIKA",
          title:
            "Towards a component-based framework for mHealth apps: Bridging the gap between the nursing domain language and the computation domain",
          venue:
            "JOURNAL OF SYSTEMS AND SOFTWARE, v. 230, p. 112497, 2025.",
          doi: "10.1016/j.jss.2025.112497",
        },
        {
          kind: "conference",
          authors: "NIEMIEC, WILLIAM ; TAVARES, A. R. ; COTA, E.",
          title:
            "Leveraging Natural Language Processing for No-Code mHealth Development: A Component-Based Approach Using Nursing Taxonomies",
          venue:
            "In: IEEE International Symposium on Computer-Based Medical Systems (CBMS), 2025, Madri. Proceedings. Los Alamitos: IEEE Computer Society, 2025.",
          doi: "10.1109/CBMS65348.2025.00084",
        },
        {
          kind: "conference",
          authors: "PEIXOTO, M. E. V. O. ; NIEMIEC, WILLIAM ; GOZZI, J. V. ; TANAKA, A. K. S. R. ; COTA, E.",
          title:
            "Avaliando a qualidade de aplicativos de saúde através da metodologia uMARS e do uso de personas",
          venue:
            "In: Simpósio Brasileiro de Computação Aplicada à Saúde (SBCAS), 2025, Porto Alegre. Anais. Porto Alegre: Sociedade Brasileira de Computação, 2025.",
          doi: "10.5753/sbcas.2025.7206",
        },
        thesis(lang, "ZEBROWSKI, YASMIN KATERINE BEER", {
          pt: "Gamificação como estratégia para adesão ao tratamento de pacientes crônicos: design e prototipação",
          en: "Gamification Mechanisms as Motivational Factors for Adherence to Medical Treatments",
        }, 2025),
        thesis(lang, "BATISTA, MARLIZE RAMOS", {
          pt: "Avaliação do uso de agentes de IA na atividade de validação de planos de cuidado de saúde",
          en: "Evaluation of the use of AI agents in the validation activity of healthcare care plans",
        }, 2025),
        thesis(lang, "FEITEIRA, LEONARDO VIANNA", {
          pt: "Geração de componentes computacionais para aplicativos de saúde a partir de linguagem natural",
          en: "Generation of computational components for health applications from natural language",
        }, 2025),
        thesis(lang, "RAMOS, RICHARD LEAL", {
          pt: "Integração de Assistentes de Voz e Dispositivos Vestíveis em Planos de Cuidado Personalizados: uma Abordagem em mHealth para Apoio à Adesão de Pacientes",
          en: "Integration of Voice Assistants and Wearable Devices in Personalized Care Plans: An mHealth Approach to Support Patient Adherence",
        }, 2025),
      ],
    },
    {
      year: "2023",
      items: [
        thesis(lang, "SILVEIRA, RENATO ARAUJO", {
          pt: "Evolução da plataforma Takere visando maior proximidade com a linguagem de uma equipe de saúde",
          en: "Evolution of the Takere platform aiming for closer alignment with the language of a healthcare team",
        }, 2023),
        thesis(lang, "BORGES, RAFAEL FERNANDES", {
          pt: "Uso de BPMN para definição de planos de cuidado em saúde na plataforma Takere",
          en: "Use of BPMN for defining health care plans on the Takere platform",
        }, 2023, false),
      ],
    },
    {
      year: "2022",
      items: [
        thesis(lang, "NIEMIEC, WILLIAM", {
          pt: "Takere: a no-code platform for the development of mHealth applications based on care plans",
          en: "Takere: a no-code platform for the development of mHealth applications based on care plans",
        }, 2022, false),
      ],
    },
  ];
}
