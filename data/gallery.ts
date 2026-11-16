import type { Localized } from "@/i18n/config";

export interface GalleryPhoto {
  src: string;
  alt: Localized;
  width: number;
  height: number;
}

const photo = (file: string, width: number, height: number, alt: Localized): GalleryPhoto => ({
  src: `/img/gallery/${file}`,
  alt,
  width,
  height,
});

/** Photos shown on /gallery, newest first, two or three per row (each row is laid out as a justified strip). */
export const galleryRows: GalleryPhoto[][] = [
  [
    photo("09.jpeg", 960, 1280, {
      pt: "Apresentação no Simpósio da SBRAFH2",
      en: "Presentation at the SBRAFH2 Symposium",
    }),
    photo("01.jpeg", 1280, 960, { pt: "Equipe do grupo de pesquisa Takere", en: "Takere research group team" }),
    photo("02.jpeg", 720, 1280, { pt: "Membros do grupo de pesquisa Takere", en: "Takere research group members" }),
  ],
  [
    photo("03.jpeg", 1280, 820, { pt: "II Workshop Takere-Cardio Tx", en: "2nd Takere-Cardio Tx Workshop" }),
    photo("04.jpeg", 800, 1029, { pt: "ConnectAção", en: "ConnectAção" }),
  ],
  [
    photo("05.jpeg", 1280, 960, { pt: "I Workshop Takere-Cardio Tx", en: "1st Takere-Cardio Tx Workshop" }),
    photo("06.jpeg", 867, 1156, { pt: "Apresentação da Takere no StartupRS", en: "Takere presentation at StartupRS" }),
  ],
  [
    photo("07.jpeg", 1600, 1200, {
      pt: "Workshop Takere-Posto de Saúde Santa Marta RS",
      en: "Takere workshop at Santa Marta Health Center, RS",
    }),
    photo("08.jpeg", 1600, 1200, {
      pt: "Workshop Takere-Posto de Saúde Santa Marta RS",
      en: "Takere workshop at Santa Marta Health Center, RS",
    }),
  ],
];
