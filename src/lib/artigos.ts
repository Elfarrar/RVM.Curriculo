import { getCollection, type CollectionEntry } from "astro:content";
import type { Locale } from "../data/i18n";

export type Artigo = CollectionEntry<"artigos">;

const SITE = "https://rvmtech.com.br";

export const listPath = (lang: Locale) => (lang === "en" ? "/en/articles/" : "/artigos/");

/** `pt/ia-salvou-meu-trabalho` -> `ia-salvou-meu-trabalho` */
export const slugOf = (a: Artigo) => a.id.split("/").pop()!;

export const pathOf = (lang: Locale, slug: string) => `${listPath(lang)}${slug}`;

/** Artigos publicados (sem draft e com a data ja chegada) do idioma, do mais novo para o mais antigo.
 * A data futura agenda: o rebuild diario do deploy publica o artigo no dia (`ARTIGOS_HOJE` simula outro dia). */
export async function publicados(lang: Locale): Promise<Artigo[]> {
  const hoje = new Date(process.env.ARTIGOS_HOJE ?? Date.now());
  const todos = await getCollection(
    "artigos",
    (a) => !a.data.draft && a.data.date <= hoje && a.id.startsWith(`${lang}/`),
  );
  return todos.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

/** URLs absolutas da lista PT e EN (usadas em canonical/hreflang). */
export const listAlternates = () => ({ pt: `${SITE}${listPath("pt")}`, en: `${SITE}${listPath("en")}` });

/** URLs absolutas do mesmo artigo nos dois idiomas, pelo translationKey. */
export async function alternatesOf(a: Artigo) {
  const url = async (l: Locale) => {
    const o = a.id.startsWith(`${l}/`)
      ? a
      : (await publicados(l)).find((x) => x.data.translationKey === a.data.translationKey);
    return o ? `${SITE}${pathOf(l, slugOf(o))}` : `${SITE}${listPath(l)}`;
  };
  return { pt: await url("pt"), en: await url("en") };
}

export const readingMinutes = (body = "") => Math.max(1, Math.round(body.split(/\s+/).filter(Boolean).length / 200));

export const formatDate = (d: Date, lang: Locale) =>
  d.toLocaleDateString(lang === "en" ? "en-US" : "pt-BR", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
