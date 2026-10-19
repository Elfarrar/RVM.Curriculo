import type { Locale } from "./i18n";

// Projetos do portfólio. Para entrar um novo: adicionar um item aqui (a página /portfolio/ lê desta lista).
export interface ProjetoPortfolio {
  slug: string;
  nome: string;
  resumo: Record<Locale, string>;
  imagem: string;
  alt: Record<Locale, string>;
}

export const projetos: ProjetoPortfolio[] = [
  {
    slug: "binder",
    nome: "Binder",
    resumo: {
      pt: "Catálogo, coleção e valor de cartas de Pokémon, Magic e Yu-Gi-Oh. Gratuito, no ar, feito do zero.",
      en: "Catalog, collection and value for Pokémon, Magic and Yu-Gi-Oh cards. Free, live, built from scratch.",
    },
    imagem: "/portfolio/binder/inicio.jpg",
    alt: {
      pt: "Tela inicial do Binder com uma bricolagem de cartas dos três jogos",
      en: "Binder home screen with a collage of cards from the three games",
    },
  },
];

export const portfolioPath = (lang: Locale, slug?: string) =>
  `${lang === "en" ? "/en" : ""}/portfolio/${slug ? slug + "/" : ""}`;
