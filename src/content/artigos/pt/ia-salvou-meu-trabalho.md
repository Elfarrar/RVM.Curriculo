---
title: "A IA salvou o meu trabalho"
description: "Da carreira quase abandonada a dois sistemas no ar e um emprego novo trabalhando com IA"
date: 2026-10-16
series: "Construindo o ecossistema RVM — parte 0 (a origem)"
translationKey: ia-salvou
---

Sim, eu cheguei a pensar em desistir da minha carreira.

E não estou falando de uma crise de domingo à noite. Estou falando do dia em que me peguei preenchendo o cadastro
para virar motorista de aplicativo, pensando que talvez a tecnologia tivesse acabado para mim.

Mas, para entender como eu cheguei ali, preciso voltar um pouco.

## O caminhão de dinheiro

No fim de 2025, recebi uma proposta muito boa: trabalhar num sistema que regula as regras de apostas esportivas em
vários países. Salário alto, projeto grande, nome bonito no currículo.

Só que nem tudo são flores. Não vem ao caso o que me motivou a sair, mas eu saí. Desisti de um caminhão de dinheiro
para ter saúde mental. Faria de novo.

E foi assim que, pela primeira vez em muitos anos, eu me vi desempregado.

## A confissão que eu nego até a morte

Se me perguntarem isso pessoalmente, eu nego até a morte. Mas aqui vai: nós, da área de tecnologia, nos achamos
rockstars. Sempre tem vaga, sempre tem recrutador mandando mensagem, sempre tem alguém precisando de dev.

O que a gente esquece é que, para ser disputado, é preciso estar na ponta. E esse foi o meu erro. Fiquei quase sete
anos no mesmo emprego e achei que a minha vida estava garantida. Eu me atualizava quando precisava de algo, não
porque precisava continuar relevante. Deixei a mente aquietar.

Quando voltei ao mercado, o mercado tinha andado sem mim.

## Vinte e cinco "nãos"

Foram negativas atrás de negativas. Às vezes nem a negativa vinha: só silêncio, o que é bem comum na área, mas dói
do mesmo jeito.

Vinte dias se passaram e a preocupação começou a bater. Depois de **vinte e cinco entrevistas**, eu já não acreditava
mais em mim. Cada "infelizmente seguimos com outro candidato" parecia confirmar o que eu já estava pensando: eu tinha
ficado para trás.

Foi aí que abri o cadastro de motorista de aplicativo.

## Trinta dias

Antes de terminar aquele cadastro, eu me lembrei de um sistema que já tinha pensado havia algum tempo: uma ferramenta
para o pequeno produtor rural controlar a lavoura, os custos e as vendas, de um jeito que ele conseguisse usar de
verdade, pelo celular.

E coloquei uma meta na cabeça: **concluir em um mês.**

Era uma meta absurda para uma pessoa só. Para cumprir, eu precisaria acelerar como nunca tinha acelerado. Então fiz o
que, até ali, eu olhava com certa desconfiança: chamei a inteligência artificial para trabalhar comigo.

Comecei do jeito mais simples possível, no ChatGPT pela web. Eu pedia um arquivo, ele me entregava. Eu copiava,
colava, testava, voltava com o erro. Pedia o próximo. Era braçal, mas funcionava. E, a cada arquivo que dava certo,
alguma coisa voltava para o lugar: **a confiança.**

Com a confiança veio a vontade de melhorar o processo. Copiar e colar já não bastava. Fui para a linha de comando, e
dali para o **Claude Code**, uma IA que não só sugeria o código, mas lia o projeto inteiro, rodava os testes,
encontrava o erro e corrigia, enquanto eu decidia o que construir.

Foi como trocar uma pá por uma escavadeira.

**Antes do prazo, o sistema estava pronto.** Hoje ele se chama [Safra em Dia](https://safraemdia.com.br/) e está
muito mais robusto do que aquela primeira versão: rastreia o café da lavoura até a venda, avisa quando o produtor vai
vender abaixo do custo e aceita lançamentos por mensagem de voz no celular.

## A planilha do meu pai

Uns dias depois, meu pai reclamou da falta de controle no trabalho dele: obras, máquinas indo e voltando, gente
trocando de frente, tudo numa planilha que ninguém conseguia manter em dia.

Eu já sabia o caminho. **Em poucos dias, tinha outro sistema no ar**: o
[Obra em Dia](https://appobraemdia.com.br/), que controla máquinas e pessoas da obra e bloqueia a escalação de quem
está com documento vencido antes que o problema chegue ao canteiro.

Dois sistemas no ar, feitos por uma pessoa só, num tempo que um ano antes eu teria considerado impossível.

## O "sim"

E aí, alguns dias depois, veio o "sim" que eu esperava havia vinte e cinco entrevistas.

Consegui um emprego novo. E não um emprego qualquer: hoje eu trabalho **com IA**. A mesma ferramenta que eu tinha
chamado num momento de desespero virou o centro da minha profissão.

Não acho que foi coincidência. Eu não cheguei naquela entrevista dizendo "eu sei usar IA". Cheguei mostrando dois
sistemas em produção e contando como tinha construído cada um. **A IA não me deu o emprego. Ela me deu o que mostrar.**

## O que o emprego novo me ensinou (e eu levei para casa)

A melhor parte veio depois. No trabalho, passei a conviver com gente que usa IA todos os dias, em escala, com processo.
E aprendi muito, rápido. Muita coisa eu trouxe direto para o meu próprio ambiente:

- **Tudo no Linux, mesmo no Windows.** Migrei o meu ambiente inteiro para o **WSL**, o Linux que roda dentro do
  Windows. Os agentes de IA funcionam muito melhor num terminal Linux, e agora o meu computador e os meus servidores
  falam a mesma língua: o mesmo script, as mesmas ferramentas, o mesmo comportamento. Acabou o "na minha máquina
  funciona".
- **IA com papel definido, não um chat que faz tudo.** Separei o trabalho em papéis: um agente planeja, outro
  programa, outro revisa (de preferência um modelo diferente, que não confirma a lógica de quem escreveu), outro
  testa no navegador. Cada um com permissões próprias.
- **Uma fonte única de instruções.** Cada projeto tem um único arquivo dizendo como as IAs devem trabalhar nele, e
  esse arquivo serve para qualquer ferramenta, seja Claude, Codex ou outra.
- **A máquina verifica, eu decido.** Tudo o que pode ser conferido automaticamente (testes, deploy, se o sistema
  subiu, o print da tela) roda sem me perguntar. O que sobra para mim é o que só uma pessoa sabe julgar. E a produção
  só recebe mudança com o meu aval.

O que eram dois sistemas virou um ecossistema: mais de vinte repositórios no mesmo padrão, quatro servidores e uma
"equipe" de agentes de IA que eu mesmo orquestro. Conto como isso funciona na próxima publicação.

## Se você está onde eu estava

Se você está na entrevista número vinte e cinco, com o cadastro de motorista aberto em outra aba, eu queria te dizer
três coisas:

1. **O mercado não te esqueceu, ele só andou.** E dá para alcançar. Mais rápido do que parece.
2. **Pare de mandar só currículo. Construa alguma coisa.** Um sistema no ar fala mais alto do que qualquer lista de
   tecnologias. Hoje, com IA, uma pessoa sozinha consegue construir o que antes exigia uma equipe.
3. **Use a IA como alavanca, não como muleta.** Ela acelerou o meu trabalho de um jeito que eu não imaginava, mas
   quem decidia o que construir, para quem e por quê continuava sendo eu. É essa parte que ninguém automatiza.

Eu quase desisti. Ainda bem que, antes de terminar aquele cadastro, eu abri o terminal.

*Rafael Veneroso Morici · rvmtech.com.br*
