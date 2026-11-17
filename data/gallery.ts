import type { Localized } from "@/i18n/config";

export interface GalleryPhoto {
  src: string;
  alt: Localized;
  /** ISO date (YYYY-MM-DD) the photo was taken; shown as a chip on the photo. */
  date: string;
  width: number;
  height: number;
}

/** `file` is named `DD-MM-YYYY-description.webp`; the date is read from it. */
const photo = (file: string, width: number, height: number, alt: Localized): GalleryPhoto => {
  const [, d, m, y] = /^(\d{2})-(\d{2})-(\d{4})-/.exec(file)!;
  return { src: `/assets/images/gallery/${file}`, alt, date: `${y}-${m}-${d}`, width, height };
};

/**
 * Photos shown on /gallery, newest first. The page groups them by year and packs each year into
 * justified rows automatically, so just add new photos at the top.
 */
export const galleryPhotos: GalleryPhoto[] = [
  photo("13-11-2026-apresentacao-simposio-sbrafh.webp", 960, 1280, {
    pt: "Apresentação no Simpósio da SBRAFH por Douglas N. Matos",
    en: "Presentation at the SBRAFH Symposium by Douglas N. Matos",
  }),
  photo("10-11-2026-apresentacao-paper-medical-prescription-data-extraction.webp", 1156, 651, {
    pt: "Apresentação do paper “Medical Prescription Data Extraction Using OCR and LLM for Import into the Takere Platform” pelo aluno Cauã Thiago Duarte Miranda",
    en: "Presentation of the paper “Medical Prescription Data Extraction Using OCR and LLM for Import into the Takere Platform” by student Cauã Thiago Duarte Miranda",
  }),
  photo("10-11-2026-apresentacao-paper-using-llms-to-generate-mhealth-applications.webp", 651, 1156, {
    pt: "Apresentação do paper “Using LLMs to generate mHealth applications” por William Niemiec",
    en: "Presentation of the paper “Using LLMs to generate mHealth applications” by William Niemiec",
  }),
  photo("13-09-2026-apresentacao-paper-towards-component-based-framework-mhealth.webp", 1280, 698, {
    pt: "Apresentação do paper “Towards a component-based framework for mHealth apps: Bridging the gap between the nursing domain language and the computation domain” por William Niemiec",
    en: "Presentation of the paper “Towards a component-based framework for mHealth apps: Bridging the gap between the nursing domain language and the computation domain” by William Niemiec",
  }),
  photo("12-09-2026-encontro-presencial-novos-integrantes.webp", 1280, 960, {
    pt: "Encontro presencial dos novos integrantes de 2026",
    en: "In-person meeting of the 2026 new members",
  }),
  photo("12-09-2026-fundadores-takere.webp", 720, 1280, {
    pt: "Fundadores da Takere: William Niemiec, Douglas N. Matos e Érika Cota",
    en: "Takere founders: William Niemiec, Douglas N. Matos and Érika Cota",
  }),
  photo("12-04-2026-apresentacao-paper-methodology-generating-mobile-applications-llms.webp", 1600, 1200, {
    pt: "Apresentação do paper “A Methodology for Generating Mobile Applications Through Large Language Models” por William Niemiec",
    en: "Presentation of the paper “A Methodology for Generating Mobile Applications Through Large Language Models” by William Niemiec",
  }),
  photo("28-11-2025-ii-workshop-takere-cardio-tx.webp", 1280, 820, {
    pt: "II Workshop Takere-Cardio Tx",
    en: "2nd Takere-Cardio Tx Workshop",
  }),
  photo("22-10-2025-apresentacao-salao-ufrgs-maria-eduarda-vargas.webp", 900, 1600, {
    pt: "Apresentação no Salão UFRGS pela aluna Maria Eduarda Vargas",
    en: "Presentation at Salão UFRGS by student Maria Eduarda Vargas",
  }),
  photo("22-10-2025-apresentacao-salao-ufrgs-victoria-maffacioli.webp", 1600, 1021, {
    pt: "Apresentação no Salão UFRGS pela aluna Victória Maffacioli",
    en: "Presentation at Salão UFRGS by student Victória Maffacioli",
  }),
  photo("14-10-2025-i-workshop-takere-cardio-tx.webp", 1280, 960, {
    pt: "I Workshop Takere-Cardio Tx",
    en: "1st Takere-Cardio Tx Workshop",
  }),
  photo("12-09-2025-takere-congresso-conectacao.webp", 800, 1029, {
    pt: "Exposição do projeto Takere no congresso científico ConectAção, promovido pela Ação Magistral",
    en: "Takere project exhibited at the ConectAção scientific congress, hosted by Ação Magistral",
  }),
  photo("18-06-2025-apresentacao-paper-leveraging-nlp-mhealth-development.webp", 1195, 934, {
    pt: "Apresentação do paper “Leveraging Natural Language Processing for mHealth Development: A Component-Based Approach Using Nursing Taxonomies” por William Niemiec",
    en: "Presentation of the paper “Leveraging Natural Language Processing for mHealth Development: A Component-Based Approach Using Nursing Taxonomies” by William Niemiec",
  }),
  photo("11-06-2025-apresentacao-paper-avaliando-qualidade-aplicativos-de-saude-umars.webp", 1846, 852, {
    pt: "Apresentação do paper “Avaliando a qualidade de aplicativos de saúde através da metodologia uMARS e do uso de personas” pela aluna Maria Eduarda Vargas",
    en: "Presentation of the paper “Avaliando a qualidade de aplicativos de saúde através da metodologia uMARS e do uso de personas” (Assessing the quality of health apps using the uMARS methodology and personas) by student Maria Eduarda Vargas",
  }),
  photo("11-02-2023-workshop-takere-posto-de-saude-santa-marta.webp", 1600, 1200, {
    pt: "Workshop Takere no Posto de Saúde Santa Marta, RS",
    en: "Takere workshop at the Santa Marta Health Center, RS",
  }),
  photo("11-02-2023-workshop-takere-posto-de-saude-santa-marta-2.webp", 1600, 1200, {
    pt: "Workshop Takere no Posto de Saúde Santa Marta, RS",
    en: "Takere workshop at the Santa Marta Health Center, RS",
  }),
  photo("08-02-2023-apresentacao-takere-startuprs.webp", 867, 1156, {
    pt: "Apresentação da Takere no StartupRS por William Niemiec",
    en: "Takere presentation at StartupRS by William Niemiec",
  }),
  photo("11-10-2022-apresentacao-primeiro-prototipo-takere.webp", 521, 521, {
    pt: "Apresentação do primeiro protótipo da Takere no TCC do aluno William Niemiec",
    en: "Presentation of the first Takere prototype in student William Niemiec's undergraduate thesis",
  }),
];
