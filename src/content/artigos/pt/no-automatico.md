---
title: "Eu estava no automático, e não a IA"
description: "Quando a IA passou a construir mais rápido do que eu conseguia pensar, quem precisava de método era eu"
date: 2026-10-29
series: "Construindo o ecossistema RVM — capítulo 4"
translationKey: "no-automatico"
---

Todo mundo tem medo da IA no piloto automático. No meu caso, quem estava no automático era eu.

Dois sistemas no ar e um emprego novo. Era para ser o fim feliz da história.

Foi o começo da bagunça.

## Uma ideia por semana

Quando você descobre que consegue tirar um sistema do papel em dias, e não em meses, acontece uma coisa perigosa:
toda ideia parece viável.

Um orçamento por WhatsApp para prestador de serviço. Uma emissão de nota fiscal. Um serviço de pagamentos que
qualquer projeto pudesse usar. Uma suíte para o pequeno empresário. Cada ideia virava uma pasta nova, e cada pasta
virava um sistema meio pronto. Minha pasta de projetos parecia aquela gaveta de cabos que toda casa tem: tudo
útil, nada combinando.

E eu construía todas. Na empolgação, uma atrás da outra, sem parar para pensar no que cada uma precisava ser.

## O pedido solto

Nessa fase, eu pedia do jeito que a ideia vinha. Uma frase no terminal, às vezes no meio de outra tarefa: "faz um
sistema de orçamento", "cria a parte de pagamentos". Sem dizer o que já existia, o que era para ficar de fora, nem
onde o trabalho parava.

A IA fazia. Rápido, bem escrito e do jeito que ela achava razoável. O problema é que o razoável dela mudava a cada
pedido, porque o meu pedido também mudava. Eu não estava dirigindo; estava só pisando no acelerador e torcendo para a
estrada fazer a curva sozinha.

E eu aceitava. A IA sugeria uma estrutura, e eu: "beleza". Sugeria uma biblioteca: "beleza". Mais uma tela?
"Beleza também." Quem estava no piloto automático não era ela. Era eu, aceitando tudo sem nem olhar o mapa.

E, quando o pedido é solto, a IA preenche o resto por conta própria. Às vezes, preenche até demais.

## O agente que construiu demais

Num desses projetos novos, eu pedi uma coisa simples: a especificação. O documento dizendo o que o sistema faz, para
quem, com quais telas e quais dados.

Quando voltei, o agente tinha entregado a especificação. E também a estrutura do código. E o repositório criado. E o
pipeline de integração contínua. E a lista de tarefas registrada.

Ele estava empolgado. Eu fiquei preocupado. Eu tinha pedido a planta da casa e recebi a casa construída, mobiliada
e pintada numa cor que eu nunca teria escolhido.

Nada daquilo tinha sido pensado. A especificação ainda nem tinha sido lida por mim, e já existia código seguindo
decisões que eu não tinha tomado. Desfazer tudo deu mais trabalho do que teria dado fazer do jeito certo.

A culpa não era do agente. Ele fez exatamente o que o ambiente permitia. **Eu nunca tinha dito onde o trabalho dele
terminava.**

## Faltava alguma coisa, mas o quê?

Eu já tinha uma ferramenta que acelerava o desenvolvimento como nada que eu tinha usado antes. Mesmo assim, alguma
coisa não fechava. O agente corria, e eu corria atrás dele arrumando o que ele tinha construído a mais.

A resposta veio de onde eu menos esperava: de um documentário sobre o Ayrton Senna, [*O Direito de Vencer*](https://www.youtube.com/watch?v=MfzQ2B47xns).
O que me pegou não foi o Senna acelerando, foi o que vinha antes. O Gerhard Berger conta o ritual da volta de
classificação: sentado no box, olho no monitor, conversando com o engenheiro sobre o vento, o sol, a temperatura do
asfalto. Só quando o engenheiro dizia "vai" é que ele virava a chave e entrava em outro mundo. E o Nuno Cobra,
preparador dele, resume numa frase: o Senna estava muito mais preparado que os outros. Na pista, a velocidade era
consequência. O trabalho de verdade tinha sido feito antes.

Foi nesse estalo que eu entendi o que faltava: **preparação**.

E não era uma ideia nova. O Scrum, que muita gente conhece como "aquele monte de reunião", ganhou o nome num artigo de
1986 que estudava como empresas japonesas desenvolviam produtos, e bebe da mesma fonte da manufatura enxuta da
Toyota. Lá existe uma palavra para isso: **nemawashi**. Ao pé da letra, é preparar as raízes de uma árvore antes de
transplantá-la. Na prática, é conversar, alinhar e decidir antes de mexer em qualquer coisa. Quando a decisão
finalmente acontece, ela é rápida, porque o terreno já está pronto.

Eu estava fazendo o contrário. Entregava ao agente uma árvore sem raiz e esperava que ela pegasse. Ele plantava, com
toda a velocidade do mundo, no lugar errado.

A partir dali, a regra mudou: antes de qualquer linha de código, o plano. O que vai ser feito, o que fica de fora e
como eu vou saber que deu certo.

## A especificação antes do código

Na prática, preparação virou um documento: a especificação do projeto inteiro, escrita antes da primeira linha
de código. O que o sistema faz, para quem, com quais telas, quais dados, o que fica de fora e em que ordem as
coisas vão ser construídas.

Com ela na mão, a IA deixou de adivinhar. Sabia o que construir do começo ao fim, e eu sabia como conferir se
tinha dado certo.
Dentro de cada projeto, finalmente havia um mapa.

## Pensar não é construir

A lição do agente que construiu demais virou a regra mais importante desse período: **o lugar onde se pensa um
projeto não é o lugar onde ele é construído.**

Criei um workspace só para pensar. Lá nasce a especificação, lá eu discuto mudanças de rumo, lá ficam os documentos de
ajuste. E de lá só sai texto. Nenhum código, nenhum repositório, nenhum deploy.

Quem constrói é outra sessão, aberta dentro do workspace do próprio projeto, que lê a especificação e executa.

E, para não depender de memória (nem da minha, nem da IA), o caminho virou três roteiros executáveis, as *skills*:

1. **Novo projeto:** perguntas estruturadas por categoria (escopo, usuários, funcionalidades, integrações) e a
   especificação completa.
2. **Bootstrap:** da especificação até o primeiro deploy. Repositório, esqueleto do código, pipeline, ambientes,
   monitoramento.
3. **Desenvolver:** daí até o fim do roadmap, uma tarefa de cada vez.

Cada passo começa onde o anterior termina, e nenhum invade o outro. A especificação não cria código. O bootstrap não
inventa funcionalidade. O desenvolvimento não faz nada além do planejado sem antes passar pela mesa de pensar.

![Antes e depois: de pastas soltas a um caminho em três passos](../img/no-automatico/diagrama.svg)

## O que mudou

Com a especificação antes do código, o retrabalho caiu na hora. O agente parou de entregar a casa mobiliada quando
eu pedia a planta, porque a planta agora tinha lugar, dono e hora para ser feita. Cada projeto novo saía do papel
sabendo para onde ia.

Problema resolvido. Pelo menos, parte dele.

## Se você está construindo com IA

1. **Prepare antes de acelerar.** Especifique o projeto inteiro antes de pedir a primeira linha de código. A IA
   corre na direção que você aponta; se você não aponta, ela escolhe.
2. **Desconfie do seu próprio "beleza".** Aceitar tudo o que a IA sugere é estar no piloto automático, só que do
   lado de cá.
3. **Diga onde o trabalho termina.** O agente que constrói demais não é desobediente; ele só não sabe onde é a
   fronteira. Pensar e construir são lugares diferentes.
4. **Transforme o processo em roteiro, não em lembrança.** O que depende de alguém lembrar, uma hora alguém esquece.

*Rafael Veneroso Morici · rvmtech.com.br*
