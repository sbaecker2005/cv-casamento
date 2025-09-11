// Imagens servidas da pasta public. Se mover para src/assets/gallery, substitua por imports.
const img1 = "/images/gallery/img1.jpg";
const img2 = "/images/gallery/img2.jpg";
const img3 = "/images/gallery/img3.jpg";
const img4 = "/images/gallery/img4.jpg";

export type CoupleStoryItem = {
  src: string;
  title: string;
  blurb: string;
  alt: string;
};

export const COUPLE_STORY: CoupleStoryItem[] = [
  {
    src: img1,
    title: "Primeiro encontro",
    blurb:
      "Começou com um café simples e uma conversa que não terminou naquele dia. Ali já sabíamos que algo especial estava nascendo.",
    alt: "MonaLisa e João no primeiro encontro",
  },
  {
    src: img2,
    title: "Nossa viagem",
    blurb:
      "Entre estrada, risadas e fotos tortas, aprendemos a ser parceiros — e a colecionar memórias que viraram piada interna.",
    alt: "MonaLisa e João em viagem a dois",
  },
  {
    src: img3,
    title: "O pedido",
    blurb:
      "Coração acelerado, mãos trêmulas e um ‘sim’ que soou como música. Foi simples, verdadeiro e do nosso jeitinho.",
    alt: "Momento do pedido de casamento",
  },
  {
    src: img4,
    title: "O que vem agora",
    blurb:
      "Planejando o grande dia, celebrando as pequenas coisas e contando os minutos para comemorar com quem amamos.",
    alt: "Foto do casal celebrando",
  },
];
