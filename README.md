# RVM.Curriculo

Currículo de Rafael Veneroso Morici — fonte versionada em PT-BR e EN, e o site que a publica
em [rvmtech.com.br](https://rvmtech.com.br).

## Estrutura

```
cv/                      # a fonte do currículo
├── pt-br/curriculo.md   # edite aqui (PT)
├── en/resume.md         # edite aqui (EN)
├── fonte/               # .docx original recebido, mantido como histórico
└── build.py             # gera .docx + .pdf e publica em public/cv/

src/                     # o site (Astro 5 + Tailwind 4)
├── data/cv-raw.js       # conteúdo do site, PT/EN — espelha os .md de cv/
├── components/          # Hero, About, Skills, Experience, CaseStudies, Credentials, Contact
└── pages/               # / (PT) e /en/ (EN)

public/cv/               # PDFs servidos para download (gerados, versionados)
```

## Fluxo de edição

1. Editar `cv/pt-br/curriculo.md` e `cv/en/resume.md`.
2. `python cv/build.py` — gera os `.docx` e `.pdf` e copia os PDFs para `public/cv/`.
3. Refletir a mudança em `src/data/cv-raw.js` (o site tem o texto expandido, não é o mesmo texto).
4. `npm run dev` para revisar, commit, push em `master` → publica sozinho.

> **Duas fontes por decisão:** o PDF é enxuto e otimizado para ATS; o site é a versão longa, com
> contexto de negócio e estudos de caso. Mudou um fato (data, cargo, número), muda nos dois.

## Regras de ATS respeitadas no PDF

- Sem tabelas, colunas, caixas de texto, cabeçalho/rodapé ou imagens
- Fonte padrão (Calibri), títulos de seção convencionais, datas em mês/ano
- Tecnologias por extenso e por sigla, para casar com qualquer busca
- Duas páginas em ambos os idiomas

## Requisitos

- Node 20+ para o site
- Python com `python-docx` para o `build.py`; o PDF usa o Word instalado

## Deploy

Push em `master` → GitHub Actions (`.github/workflows/deploy.yml`) → GitHub Pages →
`rvmtech.com.br`. O `CNAME` mora em `public/CNAME` para sair na raiz do `dist/`.

## Pendências

- [ ] Experiências anteriores a 2017 (início de carreira) — hoje só citadas como "sob solicitação"
- [ ] Métricas em UL Solutions e EMC (escala de dados, nº de usuários)
- [ ] AZ-900 — trocar "em preparação" por "concluída" quando fizer a prova
