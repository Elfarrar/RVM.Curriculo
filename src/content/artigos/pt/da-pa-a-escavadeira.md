---
title: "Da pá à escavadeira"
description: "Os trinta dias em que eu aprendi a construir com IA, e o ERP genérico que virou o sistema do produtor de café"
date: 2026-10-22
series: "Construindo o ecossistema RVM — capítulo 2"
translationKey: "da-pa-a-escavadeira"
---

A Sarah era o laboratório. O projeto sério corria em paralelo: o sistema que eu tinha prometido a mim mesmo
terminar em trinta dias. Cumpri?

Mais ou menos, e aqui vai o porquê, e junto conto também as ferramentas que eu usei naqueles trinta dias e o que
cada uma mudou no meu jeito de trabalhar.

**Spoiler Alert:** a IA não é mágica.

## A primeira ideia estava errada

O sistema que eu tinha na cabeça não nasceu para o produtor rural. Nasceu como um ERP genérico: vendas, estoque,
financeiro, o pacote de que toda pequena empresa precisa.

E esse era exatamente o problema. Um ERP genérico disputa espaço com dezenas de produtos grandes e conhecidos. Eu,
sozinho, não tinha nenhum motivo para oferecer a alguém trocar o que já usa pelo meu.

A virada veio de dentro da família. Meu tio planta café e produz mel e azeite. Como a maioria dos pequenos
produtores, ele controlava tudo na planilha (quando controlava). Conversando com ele, ficou claro que o pequeno
produtor tem dores que um sistema genérico não resolve: o custo por talhão, o ciclo da safra, o lote que sai da
colheita e precisa ser rastreado até a venda, a obrigação fiscal do produtor rural que o contador cobra todo ano.

Então eu mudei o alvo. Saiu o ERP para todo mundo e entrou o sistema para o pequeno produtor.

E tomei uma decisão que me assustou na hora: em vez de remendar o sistema genérico, abri um repositório novo, do
zero, aproveitando só o que eu tinha aprendido de arquitetura. Código velho adaptado arrasta bagagem. Eu queria um
produto com cara de produto rural desde a primeira tela. Jogar fora código que funciona dói quase tanto quanto
pisar num Lego descalço, mas passa.

## A pá: copiar e colar

Comecei do jeito mais simples possível: o ChatGPT no navegador.

O ciclo era sempre o mesmo. Eu descrevia o que precisava e recebia um arquivo. Copiava, colava no projeto, compilava.
Dava erro. Copiava o erro, colava de volta na conversa, recebia a correção. Copiava de novo.

Funcionava. Mas repare em quem fazia o trabalho de verdade: eu. Eu era o mensageiro entre a IA e o projeto. Ela nunca
via o projeto inteiro, só o pedaço que eu lembrava de colar. Se um arquivo dependia de outro que ela não tinha visto,
ela imaginava como o outro deveria ser, e o erro só aparecia na hora de compilar.

Era uma pá. Uma pá boa, mas cada movimento dependia do meu braço. Se existisse campeonato de Ctrl+C e Ctrl+V, eu
teria subido no pódio naquele mês.

## O meio do caminho: dois agentes e um carteiro

O passo seguinte foi levar a IA para a linha de comando. E ali ela já era um agente de verdade: lia os arquivos do
projeto, rodava comandos, testava.

Por um tempo, trabalhei com dois deles, o Codex e o Gemini, cada um com uma função: um escrevia o código; o outro
testava no navegador e juntava as evidências. Cada um fazia o seu trabalho sozinho. O que nenhum dos dois fazia era
conversar com o outro.

Essa ponte era eu. Eu escrevia um arquivo de instruções para cada um e mantinha um quadro de tarefas em texto, com
regras para mover cada cartão. Quando o testador achava um erro, era eu quem levava o recado para quem programava. Era
quase uma equipe, mas o gerente, o carteiro e o fiscal eram a mesma pessoa. E essa pessoa, convenhamos, não
recebia hora extra.

Os agentes já cavavam sozinhos. O ciclo entre eles ainda passava pela minha mão.

## A escavadeira: um ciclo só

Aí resolvi testar o Claude Code na mesma linha de comando, nas mesmas tarefas. A diferença no resultado foi
exorbitante: o código saía mais certo de primeira, o agente entendia o projeto inteiro e errava muito menos. Troquei
de ferramenta ali mesmo.

Mas não virou escavadeira no primeiro dia. Comecei usando o Claude como mais uma ferramenta de terminal, do jeito que
eu já trabalhava. Fui pesquisando, testando formas diferentes de organizar o trabalho e acertando as pontas, uma de
cada vez. Até perceber que o ganho de verdade estava em **quem fecha o ciclo**.

Com o ciclo inteiro num lugar só, o agente lê o projeto, escreve o código, compila, roda os testes, abre o navegador
para conferir a tela, lê o próprio erro, corrige e roda de novo. Eu só entro quando há uma decisão a tomar ou um
resultado a conferir. (O Codex, aliás, não saiu da história: hoje ele é o revisor do meu código. Quem sabe eu não
conto isso numa próxima.)

![À esquerda, cada volta do ciclo passa pela minha mão; à direita, o agente fecha o ciclo sozinho e eu só decido e confiro](../img/da-pa-a-escavadeira/diagrama.svg)

Antes, cada volta passava pela minha mão. Agora o ciclo dá várias voltas sozinho e me entrega o resultado.
Não é que a escavadeira cava mais rápido
com o mesmo braço. É que ela não depende do braço.

## O que saiu daquele mês

O repositório novo nasceu num dia. Uma semana e 253 commits depois, a primeira versão estava em produção.

Ela cobria o essencial para o meu tio: cadastro da propriedade e dos talhões, colheita gerando lote, estoque por lote,
vendas, despesas já classificadas do jeito que o contador precisa, um painel pensado para o celular e a parte de que
eu mais me orgulhava: o lançamento por mensagem. O produtor escreve algo como "gastei 300 de adubo no talhão de cima"
e o sistema lança.

Hoje o nome é Safra em Dia, e ele foi muito além daquela versão. O café, em especial, ganhou um capítulo à parte: a
trilha de cada lote pelas etapas (terreiro, secador, descanso), a separação por densidade no fim do processamento, o
custo de cada lote rateado por saca.

## O que o usuário real ensinou

Um detalhe dessa história me marcou. Quando o sistema começou a ser usado para teste, apareceram defeitos que já
existiam no ERP genérico: chamadas para um endereço errado, sessão de login que se perdia, listas que não paginavam.
Ninguém tinha percebido porque ninguém usava aquele sistema de verdade.

**Software sem usuário não está pronto. Ele só ainda não quebrou na frente de ninguém.**

## Se você está começando agora

1. **Escolha um usuário de verdade antes de escolher a tecnologia.** O meu sistema só ficou bom quando deixou de ser
   "para todo mundo" e passou a ser para uma pessoa, com uma lavoura e uma planilha.
2. **Repare em quem está fechando o ciclo.** Se cada erro precisa passar pela sua mão para voltar à IA, o gargalo é
   você. A ferramenta que mais acelera é a que roda o teste sozinha.
3. **Não tenha medo de recomeçar com o que aprendeu.** Jogar o código fora saiu mais barato do que carregar a
   bagagem dele.

Com o sistema no ar, achei que ia descansar. Não deu tempo. Pouco depois, meu pai me mostrou uma planilha, mas essa fica
pra uma outra hora!

*Rafael Veneroso Morici · rvmtech.com.br*
