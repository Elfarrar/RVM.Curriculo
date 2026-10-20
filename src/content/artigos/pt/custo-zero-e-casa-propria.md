---
title: "Custo zero e casa própria"
description: "Sem cliente pagando, nenhuma peça nova pode cobrar. E o código de produção foi morar em casa"
date: 2026-11-12
series: "Construindo o ecossistema RVM — capítulo 8"
translationKey: "custo-zero-e-casa-propria"
---

A casa estava trancada e os alarmes, testados. Eu já confiava no que vigiava os meus
sistemas. Faltavam duas perguntas que eu vinha empurrando: **quanto isso me custa** e **de quem eu dependo** para que
continue existindo.

As duas têm a mesma origem. Eu não tenho cliente pagando. Os sistemas estão no ar, mas nenhum deles traz dinheiro
ainda. E, quando não entra nada, qualquer coisa que sai dói.

## A regra: nada que possa cobrar

A decisão veio numa conversa sobre ferramentas. Eu estava avaliando trocar uma peça da infraestrutura, um servidor de
pacotes que eu mesmo mantenho, por um serviço pronto do GitHub. Um serviço a menos para cuidar. Parecia óbvio.

Até eu ler as letras miúdas. O plano gratuito tem cota de armazenamento e de transferência para pacotes privados. Os
meus são privados. Hoje caberia. Amanhã, se o projeto crescer, a cota estoura, e cota estourada é cobrança.

Vetei. E dali saiu uma regra que vale para tudo: **enquanto não houver cliente, nenhuma peça nova pode gerar fatura.**

Na prática, ela separa qualquer ferramenta em três tipos:

| Tipo | Exemplo | Regra |
|---|---|---|
| **Grátis, na minha máquina** | software livre rodando num servidor que eu já pago | passa sem discussão |
| **Grátis com cota** | o plano gratuito "generoso" de um serviço | precisa do meu aval |
| **Pago** | qualquer coisa cobrada por uso ou por mês | precisa do meu aval |

O meio da tabela é o perigoso. "Free tier generoso" não é argumento: é um contrato que muda de natureza no dia em que
você cresce. É a amostra grátis do supermercado: ninguém cobra pelo primeiro pedaço de queijo, mas a ideia é que
você leve a peça inteira. E licença também conta. Uma ferramenta de infraestrutura que eu ia usar mudou de licença livre para uma
restritiva. Troquei pela versão comunitária, que continua livre.

Outra coisa que eu tive que aprender é **dizer o custo antes do benefício.** Quando o agente de IA me propõe uma
ferramenta, a primeira linha tem que ser quanto ela custa e em que tipo ela cai. O benefício vem depois.

## A IA que não vira fatura

A pergunta mais cara do ecossistema parecia ser a da própria IA. Eu uso agentes o dia inteiro. Num momento, cheguei a
comparar o preço por token de vários modelos para decidir se valia trazer outro para o time. Um era dezesseis vezes
mais barato que o que eu usava.

Aí eu mesmo vi o furo: **eu não pago por token.** Eu tinha passado uma tarde comparando o preço da gasolina de um
carro que eu não abasteço.

Todo o trabalho de IA do ecossistema roda pela linha de comando, com a **assinatura** que eu já pago todo mês. Uma
tarefa a mais não custa nada a mais. Pagar por uso só aconteceria se eu ligasse um sistema direto na API, com chave,
e cada chamada virasse conta. Hoje, isso acontece num ponto só: o WhatsApp do Safra em Dia, que entende a mensagem
do produtor a qualquer hora e, por isso, fala direto com a API. O resto, inclusive a fila de tarefas que os agentes
tocam sozinhos, fica na assinatura.

Ser dezesseis vezes mais barato não ajuda quando o outro já está pago. Tabela de preço só se compara com tabela de
preço.

Isso não quer dizer que é infinito. A assinatura tem limite de uso por janela de tempo. Se a fila automática gastar a
janela de madrugada, quem espera de manhã sou eu. Então o custo real da automação não é dinheiro, é **vazão**. E vazão
se resolve com agenda, não com cartão de crédito.

## Saindo do GitHub

A segunda pergunta era de quem eu dependo. E a resposta, para quase tudo, era o GitHub.

O curioso é que a decisão de sair **não foi por custo.** O GitHub me custava zero: repositórios privados ilimitados e
as máquinas que rodam os pipelines são minhas. Na primeira conversa sobre o assunto, a minha decisão foi "podemos
migrar depois". Sem data.

O que mudou foi o motivo. Eu percebi que queria separar **fisicamente** o que é produção do que é portfólio. O código
dos sistemas que estão no ar, com os segredos de produção que os pipelines usam, não precisava morar no mesmo lugar
que os meus projetos de vitrine. Produção ganhou uma forja própria, o Gitea, num servidor meu, sem nenhuma porta aberta
para a internet: só se chega lá por um túnel seguro.

Mas eu não troquei nada no escuro. Antes de migrar, montei um laboratório e escrevi as hipóteses que, se falhassem,
cancelavam a migração:

1. **O pipeline central roda lá?** Todos os meus projetos chamam uma mesma biblioteca de pipelines, que mora num
   repositório privado. Se a forja nova não conseguisse usá-la, a migração não acontecia. Rodou: o projeto real
   compilou e passou nos testes, com o mesmo arquivo de pipeline mudando só o dono. Mas só depois de descobrir uma
   permissão que precisa ser liberada à mão, repositório por repositório. Sem ela, o pipeline não falha: ele
   simplesmente não existe.
2. **Os pacotes privados funcionam?** Publiquei e consumi um pacote pela forja nova. Funcionou, com um ajuste por
   projeto.
3. **Dá para mandar só a produção para fora?** Eu queria que o GitHub recebesse uma cópia só da versão de produção,
   não do repositório inteiro. O espelhamento nativo levava tudo. A solução foi um passo simples no pipeline, que
   empurra só a branch de produção.

As três passaram no mesmo dia. Dez dias depois, a forja virou a origem.

![Diagrama: a forja como origem e o GitHub como arquivo](../img/custo-zero-e-casa-propria/diagrama.svg)

Hoje os repositórios de produção nascem e vivem na forja. É lá que o pipeline roda, é lá que o deploy é disparado. O
GitHub virou **arquivo**: a cada 15 minutos, recebe uma cópia da versão de produção, com os pipelines desligados. Se a
forja tiver um problema, o código de produção continua existindo do lado de fora. Se o GitHub sumir amanhã, nada para.

E a mudança veio com faxina. Na mesma época, arquivei **quarenta repositórios** antigos que estavam lá parados: testes
de curso, protótipos esquecidos, versões abandonadas. Todo dev tem esse porão digital; abrir o meu foi como achar a
pasta de fotos da adolescência. Arquivar, não apagar: é reversível, e apagar de vez é outra
decisão.

## O que eu levaria

1. **Não ter receita é um requisito de arquitetura.** Ele elimina na hora metade das ferramentas da moda. E está tudo
   bem.
2. **"Grátis com cota" não é grátis.** É grátis até o dia em que você dá certo.
3. **Pergunte onde a chamada acontece antes de comparar preço.** Assinatura já paga não entra em tabela de preço por
   uso.
4. **Migre com hipóteses escritas.** Antes de trocar uma peça central, escreva o que precisa ser verdade e o que
   cancela a mudança. Depois teste.
5. **Dependa de você para o essencial e use os outros como cópia.** A forja é minha; o GitHub guarda uma cópia.

Com a casa arrumada, trancada, vigiada e barata, sobrou um último gargalo. Os agentes trabalhavam bem, mas cada
sessão ainda começava com eu abrindo o terminal, escolhendo o projeto e dizendo quem fazia o quê. Eu continuava sendo
o maestro de cada conversa.

*Rafael Veneroso Morici · rvmtech.com.br*
