import Link from "next/link";
import { href } from "../config";
import type { Dictionary } from "./pt";

const en: Dictionary = {
  common: {
    nav: { home: "Home", research: "Research" },
    researchNav: {
      home: "Home",
      team: "Team",
      publications: "Publications",
      gallery: "Gallery",
      contact: "Contact",
    },
    partners: "In collaboration with",
    stats: { students: "Students", supervisions: "Supervisions", publications: "Publications" },
    footer: {
      contact: "Get in touch",
      email: "Our email",
      rights: "Takere © All rights reserved",
      policy: "Privacy Policy",
      logoAlt: "takere: individualized care for your patient",
    },
    skip: "Skip to main content",
    backToTop: "Back to top",
    openMenu: "Open navigation menu",
    closeMenu: "Close menu",
  },

  seo: {
    keywords: [
      "Takere",
      "mHealth",
      "digital health",
      "care plan",
      "treatment adherence",
      "remote patient monitoring",
      "research group",
      "UFRGS",
      "Institute of Informatics",
      "HCPA",
      "Hospital de Clínicas de Porto Alegre",
    ],
    ogAlt: "Takere: individualized care for your patient",
    organization:
      "Research group at the Institute of Informatics (UFRGS), in partnership with HCPA, developing an mHealth platform for personalizing care plans and keeping patients engaged in treatment.",
    pages: {
      home: {
        title: "Takere | Individualized Care for Your Patient",
        description:
          "UFRGS and HCPA research group building an mHealth platform to personalize care plans and keep patients engaged in their treatment.",
      },
      research: {
        title: "Digital Health & mHealth Research | Takere",
        description:
          "Takere Research Lab (UFRGS/HCPA): research in mHealth, AI, conversational interfaces, HL7 FHIR, data privacy and treatment adherence.",
      },
      team: {
        title: "Research Group Team | Takere",
        description:
          "Coordinators, members and former members of the Takere research group at the Institute of Informatics (UFRGS), in partnership with HCPA.",
      },
      publications: {
        title: "Digital Health Publications | Takere",
        description:
          "Papers, theses and other publications by the Takere research group on digital health and mHealth, organized by year.",
      },
      gallery: {
        title: "Photo Gallery | Takere",
        description: "Photos of the Takere research group: events, presentations and team meetings at UFRGS and HCPA.",
      },
      contact: {
        title: "Contact | Takere Research Lab",
        description:
          "Get in touch with the Takere research group: email and address at the Institute of Informatics, UFRGS, Porto Alegre, Brazil.",
      },
      policy: {
        title: "Privacy Policy | Takere",
        description:
          "Takere privacy policy: how we collect, use and protect personal data, in compliance with Brazil's LGPD.",
      },
    },
  },

  home: {
    heroTitle: (
      <>
        Make treatment easier for your patients with <strong>Takere</strong>
      </>
    ),
    heroText: (
      <>
        We are a research group focused on helping <b>healthcare teams</b> keep{" "}
        <b>patients engaged in their treatment</b> with a <b>simple platform for personalizing care plans.</b>
      </>
    ),
    cta: "Get in touch",
    mission: (
      <>
        Our goal is to ensure that patient treatment information reaches them and improves
        <br />
        your adherence to treatment
      </>
    ),
    offerTitle: "What do we offer?",
    offerImgAlt: "computer",
    howTitle: "How does it work?",
    steps: [
      <>
        Healthcare teams can <b>easily put together</b> a care plan.
      </>,
      <>
        The patient interacts <b>at home</b> with an app designed <b>exclusively</b> for their care plan.
      </>,
      <>
        Healthcare teams are able to remotely <b>monitor</b> and <b>intervene</b> in patient treatment.
      </>,
    ],
    screenAlts: [
      "takere treatment interface",
      "takere treatment interface in mobile application",
      "takere patient monitoring interface",
    ],
    researchTitle: "Research",
    researchText: (
      <>
        Our research group is based at the Institute of Informatics of the{" "}
        <a href="https://www.ufrgs.br" target="_blank" rel="noopener noreferrer">
          Federal University of Rio Grande do Sul
        </a>
        . In addition, we maintain an ongoing partnership with the{" "}
        <a href="https://www.hcpa.edu.br" target="_blank" rel="noopener noreferrer">
          Hospital de Clínicas de Porto Alegre
        </a>
        . Our research is interdisciplinary and involves students from computer science and health sciences, with the
        goal of studying techniques to improve healthcare.
      </>
    ),
    researchMore: (
      <>
        Be sure to <Link href={href("en", "/research")}>check out more details about our research</Link>. If you are a
        student or researcher and are interested in contributing to the improvement of healthcare,{" "}
        <Link href={href("en", "/contact")}>join our research team</Link>!
      </>
    ),
    teamTitle: "Team",
    teamText:
      "Our team emerged with the dream of building the easiest platform for building and managing custom mHealth applications. Our goal is to make patients feel supported during treatment and to provide healthcare teams with the tools to become more agile and flexible in remote care.",
  },

  research: {
    groupTitle: "Meet our group",
    groupText:
      "Our headquarters are located at the Institute of Informatics of the Federal University of Rio Grande do Sul. We maintain an ongoing partnership with the Hospital de Clínicas de Porto Alegre, and our research is interdisciplinary, involving students from computer science and health sciences, with the goal of studying techniques to improve healthcare.",
    groupTitleContext: " — Takere Research Lab, a digital health research group",
    groupCta: "Meet our team",
    groupAlt: "takere team at hcpa",
    linesTitle: "Research Areas",
    linesIntro:
      "Our focus is on finding solutions that improve patient adherence to and monitoring of treatment through technology.",
  },

  team: { title: "Takere Research Lab team", coordinators: "Coordinators", members: "Members", former: "Former members" },

  publications: {
    title: "Publications",
    count: { one: "publication", other: "publications" },
    kinds: { journal: "Journal article", conference: "Conference paper", thesis: "Undergraduate thesis" },
    links: { pdf: "PDF", supplementary: "Supplementary material" },
  },

  gallery: {
    title: "Gallery",
    intro:
      "Workshops, presentations and meetings of the Takere research group with students, healthcare professionals and patients at UFRGS and HCPA.",
    photo: "Photo",
    count: { one: "photo", other: "photos" },
    labels: { close: "Close", prev: "Previous", next: "Next", thumbnails: "Thumbnails" },
  },

  notFound: {
    title: "Page not found",
    text: "The page you are looking for does not exist or has been moved.",
    home: "Back to home",
  },

  contact: {
    title: "Contact",
    info: "More information",
    address: "Our address",
    general: "For general inquiries, partnerships, and questions:",
    map: "Map: Institute of Informatics, UFRGS",
  },

  policy: {
    title: "Privacy Policy",
    operated: "This product is maintained and operated by",
    intro:
      "We collect and use some personal data belonging to those who use our website, our nurse care platform (HCP), and our patient app. In doing so, we act as the data controller and are subject to the provisions of Federal Law No. 13.709/2018 (General Data Protection Law - LGPD).",
    care: "We care about protecting your personal data and, therefore, we provide this privacy policy, which contains important information about:",
    topics: [
      "Who should use our product?",
      "What data do we collect and what do we do with it?",
      "Your rights regarding your personal data; and",
      "How to contact us.",
    ],
    s1: "1. Who should use our product?",
    s1Text:
      "Our website should only be used by people over the age of eighteen. Therefore, children and teenagers should not use it.",
    s2: "2. Data we collect and reasons for collection",
    s2Text: "Our product collects and uses some personal data from our users, as set forth in this section.",
    s21: "2.1. Personal data expressly provided by the user",
    s21Text: "We collect the following personal data that our users expressly provide to us when using our product:",
    data: [
      "Full name;", "Cell phone", "Photo", "Name of the institution", "E-mail", "Date of birth", "CPF",
      "Education", "Religion", "Address", "Medical and medication history", "Allergies", "Weight", "Height",
      "Diet.",
    ],
    when: "This data is collected at the following times:",
    moments: [
      "When a user registers or is signed up on the platform;",
      "When the user makes contact through the website;",
      "When the user authenticates in the system.",
    ],
    why: "The data provided by our users is collected for the following purposes:",
    purposes: [
      "So that the user can authenticate themselves on the platform;",
      "Creating accurate care plans;",
      "To better understand our users' profiles in order to offer a better experience.",
    ],
    s23: "2.3. Sensitive data",
    s23Text:
      "We will not collect sensitive data from our users, as defined in articles 11 et seq. of the Personal Data Protection Law. Therefore, we will not collect data on racial or ethnic origin, religious beliefs, political opinions, membership in a trade union or religious, philosophical or political organization, data concerning health or sex life, genetic or biometric data when linked to a natural person.",
    s24: "2.4. Collection of data not expressly foreseen",
    s24Text: [
      "Eventually, other types of data not expressly provided for in this Privacy Policy may be collected, provided that they are provided with the user's consent, or that the collection is permitted based on another legal basis provided for by law.",
      "In any case, the data collection and resulting processing activities will be communicated to users.",
    ],
  },
};

export default en;
