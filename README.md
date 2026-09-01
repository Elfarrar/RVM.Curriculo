# Currículo — Rafael Veneroso Morici

Fonte versionada do currículo em PT-BR e EN, otimizada para ATS (Applicant Tracking System).

## Estrutura

- `pt-br/curriculo.md` — fonte em português (edite aqui)
- `en/resume.md` — fonte em inglês (edite aqui)
- `fonte/` — arquivo original recebido, mantido para histórico
- `build.py` — gera os `.docx` e `.pdf` a partir dos `.md`

## Como gerar os arquivos

```
python build.py
```

Gera, em cada pasta de idioma, o `.docx` (formato preferido pelo ATS) e o `.pdf`
(para envio direto a pessoas). Requer `python-docx`; o PDF usa o Word instalado.

## Regras de ATS respeitadas

- Sem tabelas, colunas, caixas de texto, cabeçalho/rodapé ou imagens
- Fonte padrão (Calibri), títulos de seção convencionais
- Datas no formato mês/ano
- Tecnologias escritas por extenso e por sigla, para casar com qualquer busca
- Duas páginas

## Pendências

- [x] Preencher formação acadêmica
- [x] URL curta do LinkedIn
- [ ] Adicionar métricas às experiências (volume, tempo, % de ganho)
