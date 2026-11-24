import type { Lang, Localized } from "@/i18n/config";

export interface Coordinator {
  name: Localized;
  photo: string;
  degree: Localized;
  institution: string;
  linkedin: string;
  lattes: string;
  orcid: string;
  homepage?: string;
}

export const coordinators: Coordinator[] = [
  {
    name: { pt: "Érika F. Cota", en: "Erika F. Cota" },
    photo: "/assets/images/team/erika-cota.webp",
    degree: { pt: "Dra. em Computação", en: "PhD in Computer Science" },
    institution: "UFRGS",
    linkedin: "https://br.linkedin.com/in/erikacota",
    lattes: "http://lattes.cnpq.br/1476916621672594",
    orcid: "https://orcid.org/0000-0001-7431-7738",
    homepage: "https://www.inf.ufrgs.br/site/docente/erika-fernandes-cota",
  },
  {
    name: { pt: "William Niemiec", en: "William Niemiec" },
    photo: "/assets/images/team/william-niemiec.webp",
    degree: { pt: "Doutorando em Computação", en: "PhD student in Computer Science" },
    institution: "UFRGS",
    linkedin: "https://br.linkedin.com/in/williamniemiec",
    lattes: "http://lattes.cnpq.br/8694151845850127",
    orcid: "https://orcid.org/0000-0003-3290-4162",
    homepage: "https://williamniemiec.github.io",
  },
  {
    name: { pt: "Douglas N. Matos", en: "Douglas N. Matos" },
    photo: "/assets/images/team/douglas-matos.webp",
    degree: { pt: "Farmacêutico Clínico", en: "Clinical Pharmacist" },
    institution: "HCPA",
    linkedin: "https://www.linkedin.com/in/douglasnmatos",
    lattes: "http://lattes.cnpq.br/1716879139638672",
    orcid: "https://orcid.org/0000-0001-6941-6766",
  },
];

type Role = "undergrad" | "masters" | "phd" | "pm" | "dev";
type School = "inf" | "nursing" | "medicine";

const roles: Record<Role, Localized> = {
  undergrad: { pt: "Graduação", en: "Undergraduate student" },
  masters: { pt: "Mestrado", en: "Master's student" },
  phd: { pt: "Doutorado", en: "PhD student" },
  pm: { pt: "Gerente de Projeto", en: "Project Manager" },
  dev: { pt: "Desenvolvedor", en: "Developer" },
};

const schools: Record<School, Localized> = {
  inf: { pt: "Instituto de Informática", en: "Institute of Informatics" },
  nursing: { pt: "Escola de Enfermagem", en: "Nursing School" },
  medicine: { pt: "Medicina", en: "Medicine" },
};

interface MemberData {
  name: string;
  photo: string;
  role: Role;
  school?: School;
}

export interface Member {
  name: string;
  photo: string;
  lines: string[];
}

const current: MemberData[] = [
  { name: "Arthur A. Kobielski", photo: "arthur-kobielski.webp", role: "masters", school: "inf" },
  { name: "Cauã T. D. Miranda", photo: "caua-miranda.webp", role: "undergrad", school: "inf" },
  { name: "Felipe A. A. Plentz", photo: "felipe-plentz.webp", role: "undergrad", school: "inf" },
  { name: "Henrique Carniel", photo: "henrique-carniel.webp", role: "undergrad", school: "inf" },
  { name: "João Vitor de Souza", photo: "joao-vitor-souza.webp", role: "dev" },
  { name: "Júlia Cortes", photo: "julia-cortes.webp", role: "undergrad", school: "nursing" },
  { name: "Karina R. Martins", photo: "karina-martins.webp", role: "undergrad", school: "inf" },
  { name: "Keven M. S. Santos", photo: "keven-santos.webp", role: "pm" },
  { name: "Laura F. dos Santos", photo: "laura-santos.webp", role: "phd", school: "nursing" },
  { name: "Lauren Lazaro", photo: "lauren-lazaro.webp", role: "undergrad", school: "inf" },
  { name: "Lucas Nascimento", photo: "lucas-nascimento.webp", role: "undergrad", school: "inf" },
  { name: "Marcello S. Tomazi", photo: "marcello-tomazi.webp", role: "undergrad", school: "inf" },
  { name: "Matheus S. da Silveira", photo: "matheus-silveira.webp", role: "undergrad", school: "inf" },
  { name: "Nikolas L. Santos", photo: "nikolas-santos.webp", role: "masters", school: "inf" },
  { name: "Pedro Henrique", photo: "pedro-henrique.webp", role: "undergrad", school: "inf" },
  { name: "Rafael Machado", photo: "rafael-machado.webp", role: "masters", school: "inf" },
  { name: "Renan Kummer", photo: "renan-kummer.webp", role: "undergrad", school: "inf" },
  { name: "Thayssa Francisco", photo: "thayssa-francisco.webp", role: "undergrad", school: "inf" },
  { name: "Tomás Ueda", photo: "tomas-ueda.webp", role: "undergrad", school: "inf" },
  { name: "Victória Maffacioli", photo: "victoria-maffacioli.webp", role: "undergrad", school: "medicine" },
  { name: "Wagner G. Ferreira", photo: "wagner-ferreira.webp", role: "dev" },
];

const former: MemberData[] = [
  { name: "Caio Roberto", photo: "caio-roberto.webp", role: "undergrad", school: "inf" },
  { name: "João V. Gozzi", photo: "joao-gozzi.webp", role: "undergrad", school: "nursing" },
  { name: "Leonardo V. Feiteira", photo: "leonardo-feiteira.webp", role: "undergrad", school: "inf" },
  { name: "Lucca Kroeff", photo: "lucca-kroeff.webp", role: "undergrad", school: "inf" },
  { name: "Luis Felipe", photo: "luis-felipe.webp", role: "undergrad", school: "inf" },
  { name: "Maria E. Vargas", photo: "maria-vargas.webp", role: "undergrad", school: "nursing" },
  { name: "Marlize R. Batista", photo: "marlize-batista.webp", role: "undergrad", school: "inf" },
  { name: "Rafael B. Fernandes", photo: "rafael-fernandes.webp", role: "undergrad", school: "inf" },
  { name: "Renato A. Silveira", photo: "renato-silveira.webp", role: "undergrad", school: "inf" },
  { name: "Richard L. Ramos", photo: "richard-ramos.webp", role: "undergrad", school: "inf" },
  { name: "Sofia Braga", photo: "sofia-braga.webp", role: "undergrad", school: "inf" },
  { name: "Yasmin K. B. Zebrowski", photo: "yasmin-zebrowski.webp", role: "undergrad", school: "inf" },
];

function localize(list: MemberData[], lang: Lang): Member[] {
  return list.map((m) => ({
    name: m.name,
    photo: `/assets/images/team/${m.photo}`,
    lines: m.school ? [roles[m.role][lang], schools[m.school][lang], "UFRGS"] : [roles[m.role][lang]],
  }));
}

export const members = (lang: Lang) => localize(current, lang);
export const formerMembers = (lang: Lang) => localize(former, lang);

/** Active members (coordinators are listed separately and not included). */
export const activeMemberCount = current.length;
