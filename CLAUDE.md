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
| `cv/pt-br/curriculo.md` e `cv/en/resume.md` | o PDF/DOCX | enxuto, 2 paginas, otimizado para ATS |
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

## Segredos

Nenhum. Site estatico, sem backend, sem `.env`. O deploy usa o token do proprio GitHub Actions.
