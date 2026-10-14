# RVM.Curriculo

Currículo de Rafael Veneroso Morici — fonte versionada em PT-BR e EN, e o site que a publica
em [rvmtech.com.br](https://rvmtech.com.br).

## Estrutura

```
cv/                      # a fonte do currículo
├── pt-br/curriculo.md   # edite aqui (PT)
├── pt-br/vagas/         # versões para vagas específicas (fora do build.py)
├── en/resume.md         # edite aqui (EN)
├── fonte/               # .docx original recebido, mantido como histórico
└── build.py             # gera .docx + .pdf e publica em public/cv/

src/                     # o site (Astro 5 + Tailwind 4)
├── data/cv-raw.js       # conteúdo do site, PT/EN — espelha os .md de cv/
├── data/depoimentos.ts  # busca os comentários aprovados no build
├── components/          # Hero, About, Skills, Experience, CaseStudies, Credentials, Contact, Comentarios, BinderPortfolio
└── pages/               # / (PT), /en/ (EN) e /portfolio/binder (PT e EN)

public/cv/               # PDFs servidos para download (gerados, versionados)
```

## Fluxo de edição

1. Editar `cv/pt-br/curriculo.md` e `cv/en/resume.md`.
2. `python cv/build.py` — gera os `.docx` e `.pdf` e copia os PDFs para `public/cv/`. No WSL, rode com o
   Python do Windows apontando para `\\wsl$\...` (o PDF sai pelo Word via COM).
3. Refletir a mudança em `src/data/cv-raw.js` (o site tem o texto expandido, não é o mesmo texto).
4. `npm run dev` para revisar, commit numa branch `task-NNN` e PR para `prd` na forja. O merge publica sozinho (pelo espelho) e
   exige o aprovado do Rafael.

> **Duas fontes por decisão:** o PDF é enxuto e otimizado para ATS; o site é a versão longa, com
> contexto de negócio e estudos de caso. Mudou um fato (data, cargo, número), muda nos dois.

## Regras de ATS respeitadas no PDF

- Sem tabelas, colunas, caixas de texto, cabeçalho/rodapé ou imagens
- Fonte padrão (Calibri), títulos de seção convencionais, datas em mês/ano
- Tecnologias por extenso e por sigla, para casar com qualquer busca
- Uma página em cada idioma

## Requisitos

- Node 20+ para o site (o CI usa o 20)
- Python com `python-docx` para o `build.py`; o PDF usa o Word instalado

## Deploy

Merge na `prd` da forja → espelho para o GitHub (até 15 min) → GitHub Actions (`.github/workflows/deploy.yml`) → GitHub Pages →
`rvmtech.com.br`. O `CNAME` mora em `public/CNAME` para sair na raiz do `dist/`.

O `workflow_dispatch` também publica: é o RVM.Depoimentos que dispara quando um comentário é aprovado.
No build, a seção "Comentários" lê a API pública do RVM.Depoimentos; se ela estiver fora, a seção é
omitida e o build não falha.

## Pendências

- [ ] Experiências anteriores a 2017 (início de carreira) — hoje só citadas como "sob solicitação"
- [ ] Métricas em UL Solutions e EMC (escala de dados, nº de usuários)
- [ ] AZ-900 — trocar "em preparação" por "concluída" quando fizer a prova
