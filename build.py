"""Gera DOCX (ATS-friendly) e PDF a partir dos .md. Uso: python build.py"""
import re, shutil, subprocess, sys
from pathlib import Path
from docx import Document
from docx.shared import Pt, Cm, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH

RAIZ = Path(__file__).parent
ALVOS = [
    (RAIZ / "pt-br" / "curriculo.md", RAIZ / "pt-br" / "Rafael Veneroso Morici - Curriculo.docx"),
    (RAIZ / "en" / "resume.md", RAIZ / "en" / "Rafael Veneroso Morici - Resume.docx"),
]


def escreve_runs(par, texto):
    """Aplica **negrito** inline."""
    for pedaco in re.split(r"(\*\*.+?\*\*)", texto):
        if not pedaco:
            continue
        run = par.add_run(pedaco[2:-2] if pedaco.startswith("**") else pedaco)
        run.bold = pedaco.startswith("**")


def monta_docx(md: Path, saida: Path):
    doc = Document()

    # Fonte padrao e margens: Calibri 10.5, 1,8 cm - lido por qualquer ATS.
    normal = doc.styles["Normal"]
    normal.font.name = "Calibri"
    normal.font.size = Pt(10)
    normal.paragraph_format.space_after = Pt(3)
    normal.paragraph_format.space_before = Pt(0)
    for secao in doc.sections:
        secao.top_margin = secao.bottom_margin = Cm(1.3)
        secao.left_margin = secao.right_margin = Cm(1.8)

    for estilo, tam in (("Heading 1", 20), ("Heading 2", 12)):
        st = doc.styles[estilo]
        st.font.name = "Calibri"
        st.font.size = Pt(tam)
        st.font.bold = True
        st.font.color.rgb = RGBColor(0x1F, 0x1F, 0x1F)
        st.paragraph_format.space_before = Pt(0 if tam > 15 else 8)
        st.paragraph_format.space_after = Pt(2)

    for linha in md.read_text(encoding="utf-8").splitlines():
        linha = linha.rstrip()
        if not linha:
            continue
        if linha.startswith("# "):
            p = doc.add_paragraph(linha[2:], style="Heading 1")
            p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        elif linha.startswith("## "):
            doc.add_paragraph(linha[3:].upper(), style="Heading 2")
        elif linha.startswith("- "):
            escreve_runs(doc.add_paragraph(style="List Bullet"), linha[2:])
        else:
            escreve_runs(doc.add_paragraph(), linha)

    doc.save(saida)
    print(f"OK  {saida.name}")
    return saida


def para_pdf(docs):
    """Converte via Word (COM). Sem Word instalado, apenas avisa."""
    ps = ["$w = New-Object -ComObject Word.Application", "$w.Visible = $false"]
    for d in docs:
        ps.append(f"$doc = $w.Documents.Open('{d}'); "
                  f"$doc.SaveAs([ref]'{d.with_suffix('.pdf')}', [ref]17); $doc.Close()")
    ps.append("$w.Quit()")
    r = subprocess.run(["powershell", "-NoProfile", "-Command", "; ".join(ps)],
                       capture_output=True, text=True)
    if r.returncode:
        print("PDF nao gerado (Word indisponivel):", r.stderr.strip()[:200], file=sys.stderr)
    else:
        print("OK  PDFs gerados")


# Landing do CV (rvmtech.com.br) consome estes PDFs.
PORTFOLIO = Path("C:/IA/RVM.Portfolio/public/cv")
PUBLICA = {
    "Rafael Veneroso Morici - Curriculo.pdf": "Rafael-Veneroso-Morici-Curriculo.pdf",
    "Rafael Veneroso Morici - Resume.pdf": "Rafael-Veneroso-Morici-Resume.pdf",
}


def sincroniza_portfolio(docs):
    if not PORTFOLIO.is_dir():
        return
    for d in docs:
        alvo = PUBLICA.get(d.with_suffix(".pdf").name)
        if alvo and d.with_suffix(".pdf").exists():
            shutil.copyfile(d.with_suffix(".pdf"), PORTFOLIO / alvo)
            print(f"OK  publicado {alvo}")


if __name__ == "__main__":
    docs = [monta_docx(md, out) for md, out in ALVOS]
    para_pdf(docs)
    sincroniza_portfolio(docs)
