---
title: "Virei o gargalo"
description: "A IA não era o gargalo. Eu era. Como parei de carimbar cada passo e descobri qual decisão era realmente minha"
date: 2026-11-05
series: "Construindo o ecossistema RVM — capítulo 6"
translationKey: "virei-o-gargalo"
---

Eu tinha dado à IA um mapa: um padrão escrito, uma arquitetura para repetir, um lugar para pensar e outro para
construir. Ela seguia o mapa direitinho.

Era como ter um estagiário brilhante e incansável, que escrevia em minutos o que eu levaria uma tarde para escrever.
Só que ele parava a cada passo para perguntar.

"Posso criar a branch?" "Posso rodar os testes?" "Posso abrir o pull request?" "Posso fazer o deploy?"

E eu respondia. Sim, sim, pode, pode. Eu tinha virado um cartório de uma pessoa só, aberto 24 horas.

Ali eu entendi uma coisa desconfortável: **a IA não era o gargalo. Eu era.**

## Dezenas de "pode"

Fiz uma conta um dia. Numa tarefa média, do começo até o sistema rodando no ambiente de desenvolvimento, eu era
interrompido **dezenas de vezes**.

E olhando para as perguntas, quase nenhuma exigia uma decisão minha. "Os testes passaram, posso fazer o commit?" Os
testes passaram. Ela sabia disso antes de mim. "O deploy terminou, posso conferir se o sistema subiu?" Claro que pode.
Era para isso que eu existia? Eu tinha virado um carimbo com salário de dev.

O problema não era a IA ser insegura. Era o processo não dizer **o que ela podia decidir sozinha** e **o que só eu sei
julgar**. Enquanto essa fronteira não existia, tudo passava por mim, inclusive o que não precisava.

## Uma frase que mudou o processo

Em setembro, eu escrevi a regra que mudou tudo. Cabe numa frase:

**Tudo o que a máquina consegue verificar sozinha, ela faz sem me perguntar.**

E a máquina consegue verificar muita coisa:

- **Os testes passaram?** O código de saída diz. Zero é sim, qualquer outro número é não. Não precisa de opinião.
- **O sistema subiu?** Todo sistema tem um endereço de saúde. Ou ele responde que está bem, ou não responde.
- **A tela funciona?** Um navegador automatizado abre o sistema, clica, preenche, confere o resultado. É o teste de
  ponta a ponta.
- **Como a tela ficou?** O mesmo navegador tira uma foto da tela nova.

Então hoje, do registro da tarefa até o sistema no ar em desenvolvimento, o fluxo roda sozinho:

> branch → código → testes → teste de ponta a ponta → commit → pull request → pipeline verde → merge em
> desenvolvimento → deploy → checagem de saúde

Ninguém me pergunta nada no meio. E não é porque eu confio cegamente: é porque cada passo tem uma verificação que não
depende de mim.

## O que sobrou para mim

Quando tirei tudo o que a máquina sabe conferir, sobrou uma coisa só. A mais importante.

**Se a tela faz o que eu queria.**

Isso nenhum teste responde. O teste confere se o botão salva. Não confere se o botão deveria estar ali, se o texto
faz sentido para quem vai usar, se aquele fluxo é o que o produtor rural ou o encarregado da obra precisam de verdade.

Por isso a entrega chega sempre do mesmo jeito: o que foi feito, o link do pull request, o status do pipeline e **o
print da tela nova**. Eu olho e digo "aprovado" ou "reprovado".

Sem print de tela que mudou, a entrega não está completa. Teste verde e tela errada é a pior combinação: tudo parece
certo e nada está.

E a IA também tem um limite para insistir. Se o pipeline continuar vermelho depois de duas tentativas de correção, ela
para e me mostra o erro. Insistir sozinha numa falha que não entende é como cavar mais fundo um buraco. Eu sei bem, porque passei boa parte da carreira
fazendo exatamente isso.

## Três ambientes, uma porta de cada vez

Autonomia sem trilho é só velocidade. O trilho veio logo depois: **todo projeto passou a ter três ambientes**,
com o mesmo nome em todos.

- **dev**: desenvolvimento. Onde cada tarefa chega primeiro.
- **stg**: homologação. Roda o mesmo código que vai para produção, e é onde eu valido.
- **prd**: produção. A versão que fica no ar para quem acessa o sistema.

E a regra que deixa isso previsível: **cada ambiente aceita código de uma origem só.** Tarefa entra em `dev`. `dev`
sobe para `stg`. `stg` sobe para `prd`. Não existe atalho de uma tarefa direto para produção, nem de `dev` direto para
`prd`.

As duas primeiras promoções são automáticas. A última só acontece com o meu "aprovado".

![O fluxo: tudo automático até a homologação; a produção só com o meu aval](../img/virei-o-gargalo/diagrama.svg)

## Promoção em lote

No começo, eu aprovava tarefa por tarefa. Logo virou outra fila de interrupções, agora no fim do processo.
Eu só tinha mudado o engarrafamento de lugar.

Hoje a produção recebe mudanças **em lote**. Uma mensagem só, com tudo o que mudou desde a última promoção: as
tarefas, os pull requests, os prints. Eu leio, e um "aprovado" sobe o lote inteiro.

E se um item estiver errado? Ele não é revertido às pressas. Vira um **ajuste prioritário**, com a especificação nova
do que eu quero, e o lote espera. Nada sobe até o ajuste passar pela homologação e eu aprovar de novo.

Parece mais lento. Na prática, é mais rápido: eu paro uma vez por lote, e não uma vez por tarefa.

## A pergunta que ficou

Com tudo isso no ar, a máquina passou a trabalhar sozinha horas a fio. Eu chegava, olhava os prints, aprovava o lote.
Funcionava.

Até que uma pergunta começou a me incomodar.

Se o processo inteiro se apoia em verificações automáticas, o que acontece **quando a própria verificação mente**?
Quando o teste diz verde e não está? Quando o alarme diz "tudo certo" e não está?

Eu ia descobrir da pior maneira.

## Se você quer dar autonomia à IA

1. **Desenhe a fronteira entre o que a máquina verifica e o que só você julga.** O ganho não vem da IA escrever código
   mais rápido. Vem de parar de interromper gente com perguntas que uma checagem responde.
2. **Exija prova junto com a entrega.** Link, status do pipeline e print da tela. Se você precisa abrir cinco
   abas para aprovar, a entrega está incompleta.
3. **Uma origem por ambiente.** O caminho até a produção tem que ser um corredor, não um labirinto.

*Rafael Veneroso Morici · rvmtech.com.br*
