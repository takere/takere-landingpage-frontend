export interface Partner {
  name: string;
  url: string;
  logo: string;
  width: number;
  height: number;
  /** Rendered max width in px. */
  maxWidth: number;
}

export const partners: Partner[] = [
  { name: "UFRGS", url: "https://www.ufrgs.br/", logo: "/assets/images/partners/ufrgs.webp", width: 138, height: 116, maxWidth: 100 },
  { name: "INF UFRGS", url: "https://www.inf.ufrgs.br/", logo: "/assets/images/partners/inf-ufrgs.webp", width: 138, height: 81, maxWidth: 100 },
  { name: "HCPA", url: "https://www.hcpa.edu.br/", logo: "/assets/images/partners/hcpa.webp", width: 228, height: 82, maxWidth: 160 },
  { name: "RNP", url: "https://www.rnp.br/", logo: "/assets/images/partners/rnp.webp", width: 127, height: 50, maxWidth: 90 },
];
