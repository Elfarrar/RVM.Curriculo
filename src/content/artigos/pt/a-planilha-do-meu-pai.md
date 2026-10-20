---
title: "A planilha do meu pai"
description: "O segundo sistema com IA me ensinou que ela faz exatamente o que você pede, e é aí que mora o perigo"
date: 2026-10-27
series: "Construindo o ecossistema RVM — capítulo 3"
translationKey: "a-planilha-do-meu-pai"
---

Meu pai é um cara avesso à tecnologia e trabalha em obras isoladas, abrindo estradas. Não é prédio na cidade, com o
pessoal voltando para casa no fim do dia. É obra longe, com máquina indo e voltando entre frentes de trabalho, gente
alojada perto do canteiro e uma quantidade de documentos que nem a pessoa mais organizada aguenta.

E lá na ponta, todo o controle era feito por planilha. E ela não tinha um dono só.
Várias pessoas abriam e mexiam no mesmo arquivo, sem histórico de quem mudou o quê. Quando um número aparecia
errado, não havia como saber de onde ele tinha vindo. Era o tipo de arquivo que, se tivesse nome honesto, se
chamaria "controle_FINAL_v3_agora_vai.xlsx".

O que ele precisava cabia numa frase: um sistema que não deixasse mandar para a obra a pessoa ou a máquina que não
estivesse em condições de ir. Que barrasse o erro na mesa do escritório, onde ele custa um clique, e não no canteiro,
onde ele custa caro. Assim nasceu o Obra em Dia.

## Desta vez, eu já sabia o caminho

Com o Safra em Dia, eu tinha levado trinta dias aprendendo a trabalhar com IA. Com o sistema do meu pai, esse
aprendizado já estava pago. Em poucos dias, a especificação estava escrita e o sistema estava no ar.

O que mudou não foi a IA ficar mais rápida. Fui eu que fiquei mais claro. Eu sabia descrever o que queria, em que
ordem pedir e quando a resposta estava errada. A ferramenta multiplica o que você leva para ela; dessa vez, eu levava
mais.

E foi justamente por estar confiante que eu caí na armadilha seguinte.

## A IA faz exatamente o que você pede

Esse é o lado bom e o lado perigoso ao mesmo tempo. Eu pedi um sistema que bloqueasse quem estivesse com documento
vencido. A IA entregou um sistema que bloqueava quem estivesse com documento vencido. Impecável. Testes passando,
telas bonitas, tudo verde.

Com o sistema funcionando, sentei com meu pai para revisá-lo de ponta a ponta. A maior parte estava certa, inclusive a
conta de quanto custa cada dia de alojamento, que ele descreveu de cabeça.

Mas a primeira versão tinha um furo, e era grave: **quem nunca tinha entregado o documento passava direto.** Não havia
nada vencido para conferir. O caso mais perigoso, o da pessoa que não entregou nada, era justamente o que escapava.

A IA não errou. Eu é que tinha pedido a coisa errada. E nenhum teste ia pegar isso, porque os testes conferiam
exatamente o que eu tinha especificado. Quem pegou foi um cara avesso à tecnologia, sentado do meu lado, olhando para
a tela com desconfiança. (Talvez tenha sido por isso que ele pegou.)

![O ciclo: eu especifico, a IA implementa exatamente o pedido, os testes conferem o pedido, e só o usuário real revela o caso que faltou, o que volta como uma especificação melhor](../img/a-planilha-do-meu-pai/diagrama.svg)

## Ouvir o usuário não é fazer tudo o que ele pede

Na mesma revisão vieram sugestões dele. Algumas entraram na hora. Outras eu recusei, explicando o porquê: a solução
que ele imaginava resolvia o problema dele criando outros três. O que ele precisava de verdade cabia num relatório,
não numa mudança na estrutura do sistema.

Ouvir o usuário não é fazer tudo o que ele pede. É entender o que ele precisa e entregar isso. Mesmo quando o
usuário é o seu pai. Principalmente quando é o seu pai.

E vale o cuidado contrário: sistema que bloqueia demais é contornado, e sistema contornado é pior do que planilha.

## O que eu levo disso

1. **A ferramenta multiplica o que você leva para ela.** Clareza no pedido vale mais do que velocidade na resposta.
2. **A IA implementa o que você especificou, não o que você quis dizer.** Se o pedido tem um furo, a entrega vai ter
   o mesmo furo, só que mais bem escrito.
3. **Revise com quem vai usar.** Teste verde prova que o sistema faz o que você pediu. Só o usuário prova que você
   pediu a coisa certa.
4. **Calibre.** Bloquear de menos deixa o erro passar; bloquear demais faz as pessoas darem um jeito de passar por
   cima.

## Dois sistemas, e mais vindo

Com dois sistemas no ar e o emprego novo, achei que tinha encontrado o meu ritmo. As ideias de projeto começaram a
chegar uma atrás da outra e eu fui dizendo sim para quase todas. Com uma escavadeira na mão, todo problema parece um
buraco para cavar.

Só que cada projeto nascia de um jeito: um deploy diferente, um jeito diferente de guardar senha, uma organização
diferente de código. O próprio Obra em Dia acabou reconstruído do zero poucas semanas depois, num padrão que eu ainda
não tinha quando o comecei.

Sem perceber, eu tinha entrado no automático.

*Rafael Veneroso Morici · rvmtech.com.br*
