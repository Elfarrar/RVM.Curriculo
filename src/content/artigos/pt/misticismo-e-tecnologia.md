---
title: "Misticismo e tecnologia"
description: "A brincadeira que me ensinou a fazer uma IA conversar com gente de verdade pelo WhatsApp"
date: 2026-10-20
series: "Construindo o ecossistema RVM — capítulo 1"
translationKey: "misticismo-e-tecnologia"
---

Antes de o produtor rural ganhar um sistema, uma cigana ganhou um número de WhatsApp.

Ela se chamava Sarah, lia tarô, falava com calma e respondia de dia, de noite, de madrugada, a hora que você quisesse. Nunca pediu férias, nunca
reclamou do salário e nunca acertou quem ia pagar a consulta. Mas isso eu conto daqui a pouco.

E, antes que alguém pergunte: não, nada do que veio depois foi obra de forças ocultas. Foi estudo, erro e conserto. A
cigana só emprestou o baralho.

## Uma brincadeira com Pix

A Cigana Sarah nasceu junto com o ERP, quase na mesma semana, e por um motivo bem menos nobre do que o do produtor
rural: eu queria aprender.

O ERP era o projeto sério. A Sarah era a brincadeira. Eu queria entender, na prática, como se faz uma IA conversar com
gente de verdade pelo WhatsApp: receber a mensagem, entender o que a pessoa quer, manter o contexto da conversa,
responder com uma personalidade própria e não sair do papel. Tarô me pareceu o laboratório perfeito. É um assunto em
que a conversa importa mais do que o formulário, e em que ninguém espera que a resposta saia de uma tabela.

Ela começou com outro nome, Madame Estrela, que soava mais como atração de parque do que como cigana. Virou Sarah. Depois
do tarô vieram numerologia, mapa astral, sinastria e Desenho Humano. Ganhou também uma base própria com o significado das
cartas, para não depender só da memória do modelo.

E, como todo bom laboratório, tinha um detalhe completamente desnecessário: cobrança por Pix antes de cada leitura.
Brincadeira, sim. Mas brincadeira com integração de pagamento, porque eu queria aprender isso também.

## Meia hora de memória

Conversa de WhatsApp não tem começo e fim como uma tela de sistema. A pessoa manda uma mensagem, some para almoçar,
volta duas horas depois e continua de onde parou, como se nada tivesse acontecido.

A Sarah guardava o contexto da conversa por trinta minutos. Passou disso, esquecia tudo. Quem demorava a responder era
recebido de novo com o cumprimento completo, como aquela tia que te cumprimenta três vezes no mesmo almoço de domingo,
sempre como se fosse a primeira. Quanto tempo guardar, o que guardar e o que fazer quando a memória expira
foram decisões que eu nunca tinha precisado tomar num sistema de telas.

## A IA não lê o contrato

A primeira lição veio de uma regra que eu achava impossível de quebrar.

Para fazer um mapa astral, a Sarah precisava da data, da hora e da cidade de nascimento. Uma pessoa mandou só o nome da
cidade, sem o estado. No prompt estava escrito, com todas as letras: "não invente nem deduza o estado; se a pessoa não
informou, devolva só a cidade".

O modelo deduziu o estado na primeira tentativa.

Por sorte, acertou. Mas, se a pessoa fosse de outro estado, a coordenada estaria errada, o ascendente e as casas
estariam errados, e o mapa seria entregue errado **sem nenhum erro aparecer**. Não estoura exceção, não acende alerta.
Sai uma resposta bonita, plausível e errada.

Foi aí que eu entendi uma coisa que vale para tudo o que veio depois: **prompt é pedido, não é contrato.** Se uma regra
importa de verdade, ela não pode morar só no texto que a IA lê. Ela precisa estar no código. A correção foi simples:
o sistema compara o que a IA devolveu com o que a pessoa escreveu. Se a pessoa não disse o estado, qualquer estado na
resposta é invenção, e o código apaga.

![O prompt pede, o código garante: a mensagem passa pela IA com a persona, mas o que importa é conferido no código antes da resposta](../img/misticismo-e-tecnologia/diagrama.svg)

## "Alma querida", "minha flor"

A segunda lição foi mais engraçada, e um pouco constrangedora.

Para deixar a Sarah calorosa, o prompt pedia um tom acolhedor. Ela entendeu do jeito dela: passou a chamar todo mundo
de "alma querida", "minha flor", "meu bem", o que, dito a um marmanjo de barba (sim, meus amigos testaram e foi um sucesso entre os quarentões), soa no mínimo curioso. Ela via o futuro nas cartas,
mas não via a barba na foto do perfil. Sem nenhuma pista do gênero de quem estava do outro lado, ela chutava, e
errava com uma frequência impressionante.

Proibi os apelidos. A Sarah passou a chamar as pessoas só de "amigo" ou "amiga". E, de novo, a regra não ficou no
prompt: quem decide entre "amigo" e "amiga" é o código, a partir do nome. A IA nunca mais adivinhou gênero de ninguém.
Quando o nome é ambíguo, ela diz "amigo(a)" e segue a vida.

## O mapa do criador como gabarito

A terceira lição quase me fez estragar o que estava certo.

Validando o cálculo do ascendente, eu "deduzi" qual deveria ser o resultado para o meu próprio mapa e quase corrigi uma
fórmula que funcionava. Só não fiz besteira porque eu sei o meu ascendente: nasci naquele horário e sou Sagitário,
não Gêmeos.

Desde então, cálculo se valida contra dado real, nunca contra um valor que alguém imaginou. Usei o meu próprio mapa como
gabarito, e foi assim que apareceram os erros de verdade, aqueles que nenhum teste com valor inventado ia pegar. Posso
dizer, com alguma vaidade, que sou a pessoa mais bem testada daquele sistema.

## 59 pessoas, nenhum Pix

A Sarah entrou no ar em maio, com cobrança ativa. Ao longo dos meses, **59 pessoas conversaram com ela** e ela fez
**54 leituras**.

Pagamentos: um. O meu, de teste.

Uma cigana que lê o futuro e não previu que ninguém ia pagar. Se eu fosse ela, revisava o baralho.

Mas eu não fiquei frustrado, porque nunca foi esse o objetivo. A Sarah cumpriu exatamente o papel que eu dei a ela: foi
o primeiro sistema meu a conversar com gente de verdade, a errar na frente de gente de verdade e a me obrigar a
consertar. Em setembro, ela se aposentou e virou peça de portfólio. O site continua no ar, e ela continua sem cobrar
aposentadoria.

## O que a cigana me ensinou

1. **Prompt é pedido, não é contrato.** O que importa (dinheiro, cálculo, dado pessoal) é garantido no código.
2. **IA não estoura erro: ela inventa com confiança.** Compare a resposta com o que a pessoa realmente disse.
3. **Valide contra a realidade.** Um valor de referência inventado dá confiança falsa no código errado e desconfiança
   no código certo.
4. **Laboratório não precisa dar lucro.** Precisa ensinar. Se ensinar, já pagou.

Quando o Safra em Dia começou a conversar com o produtor pelo celular, quem já tinha errado primeiro, e aprendido, era a
Sarah. Foi para isso que ela serviu.
