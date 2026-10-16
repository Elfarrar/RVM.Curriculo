---
title: "Uma pessoa, vinte e poucos sistemas e uma equipe de agentes de IA"
description: "Como montei o ecossistema RVM e o que aprendi deixando a máquina trabalhar sozinha até a porta da produção"
date: 2026-10-16
series: "Construindo o ecossistema RVM — parte 1"
translationKey: ecossistema
draft: true
---

Não faz muito tempo, eu tinha um punhado de projetos pessoais espalhados em pastas, cada um com seu jeito de
fazer deploy, seu jeito de guardar senha e seu jeito de quebrar. Hoje são mais de vinte repositórios que seguem o
mesmo padrão, rodam em quatro servidores e são desenvolvidos, testados e publicados em boa parte por agentes de
inteligência artificial. Quem decide continua sendo eu. Quem executa, na maior parte do tempo, não.

Este é o primeiro texto de uma série sobre como isso foi montado. Não é um tutorial, e também não é propaganda de
ferramenta: é o relato de um processo, com as decisões, os custos e principalmente os erros que ensinaram alguma coisa.

## O problema: o gargalo era eu

Quando comecei a usar IA para programar, a sensação era de ter ganhado um estagiário muito rápido. Ele escrevia
código em minutos, mas parava a cada passo para perguntar: posso criar a branch? Posso rodar os testes? Posso fazer o
deploy? E eu, que tinha outras coisas para fazer, virei o carimbo do processo. Numa task média eu era interrompido
dezenas de vezes.

O problema não era a IA ser ruim. Era o processo não dizer **o que a máquina pode decidir sozinha** e **o que só eu
sei julgar**. Enquanto essa fronteira não existia, tudo passava por mim.

## A virada: a máquina verifica, eu julgo a tela

A regra que mudou tudo cabe numa frase: **tudo o que a máquina consegue verificar sozinha, ela faz sem me
perguntar.** Testes passaram? O código de saída diz. O sistema subiu? O endereço de saúde responde 200 ou não. A tela
abre? Um navegador automatizado tira o print.

Então hoje, do registro da tarefa até o ambiente de desenvolvimento no ar, o fluxo roda sozinho:

> branch → código → testes → teste de ponta a ponta no navegador → commit → pull request → CI verde →
> merge em `dev` → deploy → checagem de saúde

O que sobrou para mim é exatamente o que a máquina não sabe julgar: **se a tela faz o que eu queria.** A entrega
chega com o link do pull request, o status do CI e o screenshot da tela nova. Eu olho, aprovo ou reprovo.

E a produção tem uma trava humana explícita. Todo projeto segue três ambientes: `dev`, `stg` e `prd`. Cada um aceita
código de uma origem só: tarefas entram em `dev`, `dev` sobe para `stg`, `stg` sobe para `prd`. As duas primeiras
promoções são automáticas. A última só acontece com o meu "aprovado", e as mudanças sobem em lote: se um item for
reprovado, ele vira um ajuste prioritário e o lote inteiro espera.

## A equipe: papéis, não "um chatbot"

Um agente que faz tudo acaba fazendo tudo mais ou menos. Por isso o trabalho foi dividido em **papéis**, cada um com
instruções, permissões e modelo de IA próprios:

| Papel | O que faz | O que não pode |
|---|---|---|
| **Arquiteto** | Conversa comigo sobre especificação e arquitetura | Escrever código ou rodar comandos |
| **PMO** | Transforma um pedido numa tarefa com descrição, plano e critério de validação | Programar |
| **Desenvolvedor** | Implementa a tarefa, escreve os testes, abre o pull request | Insistir: depois de duas tentativas sem CI verde, para e reporta |
| **Revisor** | Lê o código com olhar cético, procurando bug real | Alterar o código que revisa |
| **QA** | Roda os testes no navegador e captura a tela | Mexer no código da aplicação |
| **DevOps** | Lê os servidores e diagnostica | Mudar infraestrutura sem aprovação: toda mudança vira um pedido com o comando exato |

Um detalhe que fez diferença: **o revisor é, de preferência, um modelo diferente do que escreveu o código.** Quem
escreveu tende a confirmar a própria lógica. Outro modelo, de outro fornecedor, pega coisas que o primeiro não vê.

Quem orquestra tudo isso é o **Maestro**, um sistema que eu mesmo estou construindo (e que será tema de um artigo
próprio). Ele recebe o pedido, descobre a qual projeto ele pertence, chama o papel certo e segura numa fila única
tudo o que depende de mim: aprovações, dúvidas, promoções para produção. O próprio Maestro é desenvolvido pelos papéis
que ele orquestra.

## A base: padrão antes de velocidade

Agentes de IA são ótimos em repetir um padrão e péssimos em adivinhar um. Então boa parte do trabalho não foi
código, foi **escrever o padrão**:

- **Uma arquitetura de referência** para todos os projetos .NET, com regras de código conferidas no CI. Se um
  projeto foge do padrão, o pipeline reprova, e não depende de alguém lembrar.
- **Um arquivo de instruções por repositório**, que vale para qualquer ferramenta de IA. Antes eu tinha um arquivo
  para cada ferramenta, e eles ficavam desatualizados um em relação ao outro.
- **Pipelines reaproveitáveis**: cada projeto tem arquivos de CI de poucas linhas que chamam uma biblioteca comum. Corrigir um
  problema de deploy é corrigir num lugar só.
- **Decisões registradas antes de executadas.** Cada escolha de arquitetura ou infraestrutura vira um registro com
  o motivo e o que ela substitui. Isso não é burocracia: é o que impede o agente da semana que vem de "consertar"
  de volta uma decisão que foi tomada de propósito.
- **Memória e passagem de turno.** Cada sessão termina com um resumo do que foi feito e do que ficou pendente. A
  próxima começa lendo esse resumo, e não do zero.

## A infraestrutura: barato, meu e verificável

Tudo roda em quatro servidores virtuais, batizados com nomes da Terra-média, separados por função: produção,
desenvolvimento, serviços internos e backup. Algumas escolhas que valeram a pena:

- **Custo zero enquanto não há clientes.** Nenhuma peça nova que possa gerar fatura sem aviso. A IA roda por
  assinatura, pela linha de comando, e não por chave de API cobrada por uso. O custo da fila de tarefas autônoma é
  tempo, não dinheiro.
- **Código em casa.** Os repositórios ativos saíram do GitHub para uma forja própria. O GitHub virou arquivo:
  recebe só a versão de produção, por espelho, a cada 15 minutos.
- **Backup que puxa, e não que empurra.** O servidor de backup busca as cópias dos outros, fora do provedor
  principal. Um servidor comprometido não consegue apagar o próprio backup.
- **Alertas que chegam no celular.** Todo monitor avisa por um bot no Telegram.

## O que deu errado (e ensinou mais do que o que deu certo)

**O alarme que nunca disparou.** Eu tinha uma auditoria diária que comparava o que deveria estar rodando com o
que estava rodando de fato. Em um dos servidores, ela respondia "nenhuma diferença", todo dia. Descobri o problema
quando plantei uma diferença de propósito, para testar o alarme, e ele continuou dizendo que estava tudo certo. O
usuário da auditoria não tinha permissão para listar os containers: o erro de permissão virava "zero containers",
e zero contra zero dava "tudo em ordem". **Alarme que nunca disparou não é alarme. É uma suposição.** Hoje todo alerta
novo é testado provocando a falha que ele deveria pegar.

**O backup que mentia.** Um backup de arquivos mandava todo dia a mensagem "sem falhas". Estava falhando havia
semanas: a imagem que ele usava tinha saído do repositório público, e o script tratava a falha de download como
"nada para copiar". Lição parecida: **sucesso tem que ser provado, não presumido.** O backup só está bom quando a
restauração foi testada.

**Desligar não desliga.** Tirei dois sistemas do ar parando os containers. Dias depois, eles estavam de volta. O que
os ressuscitava era a declaração: o arquivo de configuração e o pipeline de deploy continuavam dizendo que eles
deveriam existir. Desligar de verdade é remover a declaração, não o processo.

**Ser rápido sem ser cuidadoso custa caro.** Num dos primeiros projetos, pedi a especificação e o agente,
empolgado, criou também o código, o repositório, o CI e as tarefas. Tudo isso teve que ser desfeito. Foi aí que
nasceu a separação entre o lugar onde se **pensa** o projeto, que só produz documentos, e o lugar onde ele é
**construído**.

## O que isso produziu

Em produção ou perto dela estão, entre outros:

- **Safra em Dia**: gestão para o produtor rural, operada por mensagem no celular, com rastreabilidade do café da
  lavoura até a venda;
- **Obra em Dia**: controle de máquinas e pessoas para construtoras de obra pesada, que bloqueia a escalação de quem
  está com documento vencido antes que o problema chegue à obra;
- serviços de apoio compartilhados, como pagamentos e uma biblioteca de componentes visuais própria.

Cada um tem um teste grátis com dados de exemplo, criado e mantido pelo mesmo processo descrito aqui.

## O que eu levaria para qualquer equipe

1. **Desenhe a fronteira entre o que a máquina verifica e o que só uma pessoa julga.** O ganho não vem da IA
   escrever código mais rápido. Vem de parar de interromper gente com perguntas que uma checagem responde.
2. **Escreva o padrão antes de pedir velocidade.** IA amplifica o que existe: com padrão, ela replica o padrão; sem
   padrão, ela inventa um diferente a cada tarefa.
3. **Separe papéis e coloque um revisor que não é o autor.** Vale para pessoas e vale para modelos.
4. **Registre as decisões e o motivo.** É a única defesa contra alguém (humano ou não) desfazer sem saber o porquê.
5. **Teste os alarmes.** Se você nunca viu o alerta disparar, você não sabe se ele funciona.

Nos próximos artigos vou abrir cada parte: o Maestro por dentro, a saída do GitHub, a regra dos três ambientes, e a
história do Safra em Dia, que começou como um ERP genérico e virou um sistema para o produtor de café.

*Rafael Veneroso Morici · rvmtech.com.br*
