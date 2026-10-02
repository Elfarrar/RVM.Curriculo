// Comentários de ex-colegas, aprovados no RVM.Depoimentos (TASK-839).
// Lidos UMA vez no build: o site continua estático, sem backend e sem segredo.
// API fora do ar no build → lista vazia e a seção some; o build NÃO falha (decisão do Rafael, 30/09).

export interface Depoimento {
  id: number;
  nome: string;
  cargo: string | null;
  empresa: string | null;
  relacao: string | null;
  linkedIn: string | null;
  texto: string | null;
  idioma: "pt" | "en";
  traducao: string | null;
  idiomaTraducao: "pt" | "en" | null;
}

// Para testar contra outro ambiente: DEPOIMENTOS_API_URL=https://depoimentos.dev.rvmit.pro npm run build
const API = (process.env.DEPOIMENTOS_API_URL ?? "https://depoimentos.rvmit.com.br").replace(/\/$/, "");

let carregados: Promise<Depoimento[]> | undefined;

/** Mesma lista em `/` e `/en/`: uma chamada por build. */
export function depoimentos(): Promise<Depoimento[]> {
  carregados ??= buscar();
  return carregados;
}

async function buscar(): Promise<Depoimento[]> {
  try {
    const resposta = await fetch(`${API}/api/sites/curriculo/depoimentos`, { signal: AbortSignal.timeout(10_000) });
    if (!resposta.ok) throw new Error(`HTTP ${resposta.status}`);
    const lista = (await resposta.json()) as Depoimento[];
    // Só entra o que tem texto: a API já filtra aprovados, isto protege contra item vazio.
    return lista.filter((d) => d.texto?.trim());
  } catch (erro) {
    console.warn(`[comentarios] API de depoimentos indisponível (${API}): seção omitida neste build.`, erro);
    return [];
  }
}
