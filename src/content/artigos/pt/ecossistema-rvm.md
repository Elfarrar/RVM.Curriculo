---
title: "Uma pessoa, vinte e poucos sistemas"
description: "O fechamento da série: o caminho do cadastro de motorista até uma equipe de agentes de IA, o que existe hoje e o que eu levaria para qualquer lugar"
date: 2026-11-19
series: "Construindo o ecossistema RVM — capítulo 10 (fechamento)"
translationKey: "ecossistema"
---

No dia em que abri o cadastro para virar motorista de aplicativo, eu não tinha nenhum sistema no ar. Tinha uma ideia
para o produtor rural, vinte e cinco "nãos" e um prazo de trinta dias que eu mesmo inventei.

Este é o último capítulo desta temporada (sim, agora eu falo como série de streaming). Não vou contar nada novo sobre como as peças funcionam: isso ficou nos capítulos
anteriores. Quero fazer o que raramente a gente faz quando está no meio do trabalho: parar, olhar para trás e ver o
caminho inteiro.

## O caminho, capítulo por capítulo

Relendo a série, percebo que cada capítulo nasceu do problema que o anterior criou.

- **Capítulo 1:** a Cigana Sarah, feita por brincadeira e aprendizado, foi o primeiro sistema a conversar com gente
  de verdade. Aprendi que a IA não obedece tudo o que o prompt proíbe: regra que importa vira código.
- **Capítulo 2:** troquei o copiar e colar do ChatGPT por um agente que lê o projeto inteiro, e o Safra em Dia ficou
  pronto antes do prazo. Problema novo: eu tinha velocidade, mas não tinha método.
- **Capítulo 3:** a planilha do meu pai virou o Obra em Dia em poucos dias. A lição foi que a melhor regra de um sistema
  é a que bloqueia o erro antes de ele acontecer. Problema novo: dois sistemas, cada um de um jeito.
- **Capítulo 4:** os projetos se multiplicaram e quem estava no automático era eu, aceitando tudo o que a IA sugeria.
  A saída foi preparação: a especificação do projeto inteiro antes do código, e o lugar de pensar separado do de construir.
- **Capítulo 5:** achei que estava resolvido, mas cada projeto nascia com partes diferentes, e eu era o Dr. Frankenstein.
  Padronizei tudo: a mesma stack, uma biblioteca de componentes própria e uma arquitetura só, com fatias verticais e um domínio no centro. É o que deixa a IA repetir o padrão em vez de inventar um.
- **Capítulo 6:** virei o gargalo, e saí dele com a fronteira entre o que a máquina verifica e o que só eu sei julgar. Tudo até o ambiente de
  desenvolvimento roda sozinho; produção espera o meu "aprovado".
- **Capítulo 7:** o alarme que nunca disparou e o backup que mentia. Aprendi a desconfiar de todo "está tudo certo"
  que nunca foi posto à prova.
- **Capítulo 8:** custo zero enquanto não há cliente e código numa forja própria. A casa ficou arrumada.
- **Capítulo 9:** parei de reger cada sessão. Seis papéis, cada um com seu modelo, e uma fila única onde as coisas
  esperam por mim.

Visto de longe, não foi um plano. Foi uma sequência de gargalos, cada um resolvido do jeito mais simples que eu
conseguia na época, e cada solução revelando o gargalo seguinte. Se alguém perguntar, vou dizer que era tudo estratégia. Aqui, entre nós:
não era.

## O que existe hoje

O que eram dois sistemas virou um ecossistema. Os números de hoje:

- **vinte e poucos sistemas**, entre produtos, serviços de apoio e ferramentas internas;
- **quatro servidores**, separados por função: produção, desenvolvimento e homologação, serviços internos e backup;
- **seis papéis de IA** trabalhando numa fila, e uma pessoa aprovando o que vai para produção. Se fosse uma empresa, o
  organograma teria seis estagiários incansáveis e um chefe que precisa dormir.

No mapa, as coisas se organizam em quatro camadas:

**Produtos**, que é o que alguém de fora usa. O Safra em Dia, para o produtor rural. O Obra em Dia, para quem toca obra
pesada. O Binder, um catálogo gratuito de cartas colecionáveis. E, em desenvolvimento, o Modelagem:
um editor de moldes de roupa que roda no navegador, para quem faz modelagem do vestuário.

**Serviços de apoio**, que nenhum usuário vê, mas que todo produto usa: um serviço de pagamentos, uma biblioteca
própria de componentes visuais, um portal, ainda em planejamento, para os futuros clientes acompanharem contrato, tarefas e
aceite, e os depoimentos que
aparecem no meu currículo.

**Processo**, que é o que faz tudo isso andar com uma pessoa só: o padrão escrito, os pipelines reaproveitáveis, a
regra dos três ambientes, a memória que passa de uma sessão para a outra e o Maestro conduzindo os papéis.

**Infraestrutura**, que sustenta o resto: a forja própria, os servidores, o backup que puxa as cópias, os alertas no
celular.

![O ambiente RVM: o código nasce na forja, sobe sozinho para homologação e só chega à produção com o meu aprovado](../img/ecossistema/diagrama.svg)

## O que eu levaria para qualquer lugar

Se eu tivesse que resumir a série inteira em poucas frases, seriam estas. Cada uma custou um capítulo.

1. **Construa alguma coisa.** Um sistema no ar fala mais alto que qualquer lista de tecnologias no currículo
   (capítulos 0 e 1).
2. **Bloqueie o erro antes que ele aconteça.** É mais barato que corrigir depois, em código e em gente (capítulo 3).
3. **Escreva o padrão antes de pedir velocidade.** IA amplifica o que existe: com padrão ela replica o padrão; sem
   padrão, inventa um diferente a cada tarefa (capítulo 4).
4. **Desenhe a fronteira entre o que a máquina verifica e o que só uma pessoa julga.** O ganho não está na IA escrever
   mais rápido, está em parar de interromper gente com perguntas que uma checagem responde (capítulo 6).
5. **Teste os alarmes e os freios.** Se você nunca viu disparar, você não sabe se funciona (capítulos 5 e 7).
6. **Saiba quanto custa antes de ligar.** Nenhuma peça nova que possa gerar fatura sem aviso (capítulo 8).
7. **Papel antes de ferramenta, e revisor que não é o autor.** Vale para modelos e vale para pessoas (capítulo 9).

E uma que atravessa todos: **registre as decisões e o motivo.** Foi o que impediu a sessão da semana seguinte, minha ou
de um agente, de "consertar" de volta uma escolha que tinha sido feita de propósito.

## O que a IA não fez

Vale repetir o que eu disse no começo, porque depois de dez capítulos sobre agentes fica fácil esquecer.

A IA escreveu a maior parte do código deste ecossistema. Mas nenhum agente decidiu que o produtor rural precisava
de um aviso quando fosse vender abaixo do custo, nem que a escalação de alguém com documento vencido tinha que ser
barrada, nem que produção só recebe mudança com o meu "aprovado". **O que construir, para quem e por quê continua
sendo trabalho de gente.** O que mudou é que, hoje, uma pessoa consegue levar esse julgamento até o fim, sem precisar
de uma equipe inteira para executá-lo.

## O que vem depois

O ecossistema não terminou. Algumas frentes já estão na mesa:

- o Maestro abrindo um projeto novo inteiro sozinho, do pedido até o primeiro deploy, com a minha aprovação nos pontos
  que importam;
- os primeiros sistemas feitos sob contrato para clientes, acompanhados pelo portal;
- e esta própria série, que vira uma seção de artigos no meu site e continua depois deste
  capítulo, com novas histórias.

## Se você está onde eu estava

No capítulo 0, eu terminei dizendo que quase desisti, e que ainda bem que abri o terminal antes de terminar aquele
cadastro.

Dez capítulos depois, eu acrescentaria uma coisa. Abrir o terminal foi o começo. O que fez diferença foi não parar no
primeiro sistema que funcionou: olhar para o gargalo seguinte, resolver do jeito mais simples possível, escrever o que
aprendi, e repetir.

Se você está na entrevista número vinte e cinco, não precisa de vinte e poucos sistemas. Precisa do primeiro. O resto
vem um gargalo de cada vez.

*Rafael Veneroso Morici · rvmtech.com.br*
