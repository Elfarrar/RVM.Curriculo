# RVM.Curriculo

## Visao Geral

Curriculo de Rafael Veneroso Morici: a **fonte** (Markdown -> DOCX/PDF) e o **site** que a publica
em `rvmtech.com.br`. Bilingue (PT-BR em `/`, EN em `/en/`). Astro 5 estatico em GitHub Pages.

Nasceu em 01/09/2026 (TASK-831). Antes disso o conteudo vivia num `.docx` solto e o dominio servia
o `RVM.Portfolio`.

## Stack

Astro 5 · Tailwind CSS 4 (CSS-first, OKLCH) · Motion · Lenis · Geist/Geist Mono · TypeScript strict
· Astro i18n nativo (`defaultLocale: 'pt'`, `prefixDefaultLocale: false`).
`python-docx` + Word (COM) para gerar DOCX/PDF.

## Duas fontes de conteudo, de proposito

| Onde | O que e | Tom |
|---|---|---|
| `cv/pt-br/curriculo.md` e `cv/en/resume.md` | o PDF/DOCX | enxuto, **1 pagina** (TASK-837), otimizado para ATS |
| `src/data/cv-raw.js` | o site | expandido: contexto de negocio, estudos de caso |

**Nao sao o mesmo texto** — o site e ~3x maior. Mas **todo fato** (data, cargo, empresa, numero)
tem que bater nos dois. Mudou um, muda o outro na mesma task.

## Convencoes

- **Bilingue:** todo componente que renderiza texto recebe `lang: 'pt' | 'en'`. Texto de interface
  vem de `tr(lang, 'chave')` (`src/data/i18n.ts`); conteudo de curriculo vem de `cv(lang)`
  (`src/data/cv.ts`).
- **Acentuacao correta no portugues.** O site herdado do RVM.Portfolio era todo sem acento; o
  conteudo daqui nao e. Nao "corrigir" removendo acento.
- **Tema claro** — roxo do Visual Studio `#68217A` como cor principal (botoes, links, chips, ponto
  da timeline) e azul do VS Code `#007ACC` como apoio (titulos em italico, linha da timeline).
  Escolha do Rafael em 01/09/2026. Cores **so** via tokens em `src/styles/global.css`; nao cravar
  `oklch()` em componente.
- **Branch:** `task-NNN` a partir de `master`. Sem `dev` (site estatico, baixo risco).
  Merge em `master` publica — exige sinal verde explicito do Rafael, como todo `master` do ecossistema.
- **PDFs sao versionados** em `public/cv/`. Regerar com `python cv/build.py` sempre que os `.md`
  mudarem; o script copia sozinho.

## Historico que evita retrabalho

- **O portfolio nao mora aqui.** Os 11 projetos e as paginas `/projects/[slug]` continuam no
  `RVM.Portfolio`, que perdeu o dominio `rvmtech.com.br` para este repo. Em 01/09/2026 o Rafael
  mandou **descomissionar o portfolio inteiro** (TASK-832) e refaze-lo do zero depois: containers,
  vhosts, DNS `*.lab` e Pages fora do ar; os 12 repos **arquivados**, nao apagados.

  > ⚠️ **Correcao de um erro meu:** durante a TASK-831 eu afirmei que os demos em
  > `*.lab.rvmtech.com.br` ja estavam fora do ar por causa do descomissionamento do Rivendell
  > (TASK-830). **Eram falsos** — os 11 estavam de pe respondendo 200, e o Rivendell tambem. Eu
  > deduzi da skill `padrao-rvm` sem testar. A decisao de tirar a vitrine da landing foi do Rafael
  > ("nao esta mais ativa"), tomada antes e independente dessa afirmacao errada.
- **Nao existe secao de projetos aqui** e as chaves `projects.*` / `detail.*` do i18n foram
  removidas de proposito.
- Experiencia anterior a 2017 existe mas nao esta listada (o Rafael estudou Mecatronica em 2013-14).
  O resumo diz "15+ anos" e o rodape da experiencia diz "anteriores a 2017 sob solicitacao" — os
  dois tem que continuar coerentes.

## Como rodar

```bash
npm install
npm run dev                # http://localhost:4321
npm run build && npm run preview
python cv/build.py         # regenera DOCX/PDF e publica em public/cv/
```

## Deploy

Push em `master` -> `.github/workflows/deploy.yml` -> build Astro -> `actions/deploy-pages@v4`.
DNS: `rvmtech.com.br` -> `elfarrar.github.io` (Hostinger). `CNAME` em `public/CNAME`.

**`workflow_dispatch` publica** (TASK-839): e o **RVM.Depoimentos** que dispara quando o Rafael aprova um
comentario. ⚠️ O job `deploy` precisa aceitar `workflow_dispatch` no `if` — antes so `push` publicava, e o
disparo construia o site sem publicar.

## Secao "Comentários" (TASK-839, decisao de 30/09/2026; implementada 02/10)

Depoimentos de ex-colegas (ex.: Bruno, da EMC), **no final da pagina**, titulo "Comentários".
Detalhe: `RVM.Brainstorming/ajustes/Curriculo-2026-09-30.md`. Backend: projeto **`RVM.Depoimentos`**
(`C:\IA\RVM.Depoimentos`).

- **O site continua estatico, sem backend e sem segredo.** No build, o Astro le
  `GET https://depoimentos.rvmit.com.br/api/sites/curriculo/depoimentos` (publico, so aprovados).
  API fora no build → o build **nao falha** e a secao e **omitida** (sem fallback commitado — decisao dele).
- Exibe: nome, cargo e empresa na epoca, relacao com o Rafael, LinkedIn e o texto **no idioma
  original**; se houver traducao, ela aparece **abaixo**, marcada como traducao. Mesma lista em `/` e `/en/`.
- Aprovou no Telegram (`@Rvm_Depoimentos_bot`) → a API dispara o `deploy.yml` → no ar em ~1–2 min.
  Ninguem republica a mao.
- ⛔ **O formulario NAO mora aqui** (o link do convite e `depoimentos.rvmit.com.br/c/{token}`).
  ⛔ **Nada de backend/infra no `rvmtech.com.br`** — dominio pessoal (decisao de 27/09).
- Codigo: `src/data/depoimentos.ts` (fetch no build, 10 s, falha = lista vazia) e
  `src/components/Comentarios.astro` (ultima secao, `/` e `/en/`).
- Testar contra outro ambiente: `DEPOIMENTOS_API_URL=https://depoimentos.dev.rvmit.pro npm run build`.
- Enquanto a prd do RVM.Depoimentos nao existe, o build de producao omite a secao (API fora = sem secao).
- PDF/DOCX nao mudam: comentario e so do site.

## Segredos

Nenhum. Site estatico, sem backend, sem `.env`. O deploy usa o token do proprio GitHub Actions.

O token que **dispara** o rebuild (fine-grained, so este repo, Actions read/write, criado 30/09)
mora no **RVM.Depoimentos**, nao aqui. Este repo continua sem segredo nenhum.
