---
title: "O alarme que nunca disparou"
description: "Quando a máquina passou a trabalhar sozinha, a pergunta mudou: e se a própria verificação estiver mentindo?"
date: 2026-11-10
series: "Construindo o ecossistema RVM — capítulo 7"
translationKey: "o-alarme-que-nunca-disparou"
---

Eu tinha tirado a mim mesmo do caminho. Tudo o que a máquina consegue verificar sozinha
ela verifica sem me perguntar: o teste passou, o sistema subiu, a tela abriu. Eu só entro para julgar se a tela faz o
que eu queria.

Funcionou. E, quando funcionou, uma pergunta nova começou a me incomodar.

Se eu não estou mais olhando cada passo, quem garante que a verificação está olhando por mim? Um teste verde, um
backup "concluído", um painel dizendo "tudo em ordem": tudo isso é a máquina me contando uma história. E eu tinha
passado a acreditar nela sem conferir.

E, como bom fã de ficção científica, eu já devia saber. Assisti a *O Exterminador do Futuro* e a *Eu, Robô* vezes
suficientes para conhecer o roteiro: tudo começa com alguém dando liberdade demais para a máquina e acreditando quando
ela diz que está tudo sob controle. Posso estar correndo risco só de escrever isso, então já deixo registrado: sempre
fui educado com as IAs.

Este capítulo é sobre as vezes em que essa história era mentira.

## Primeiro, trancar a porta

Antes de falar de alarme, preciso confessar o estado da casa. Quando parei para auditar os servidores, descobri que
alguns ainda aceitavam login com senha no usuário mais poderoso da máquina, sem firewall e sem nenhuma proteção
contra tentativa repetida de acesso. Produção inclusive. Num outro momento, descobri que o banco de dados e o cache
estavam publicados para a internet, e o cache sem senha nenhuma.

Nada disso tinha sido decisão. Era o padrão de quem sobe as coisas com pressa e nunca volta para olhar.

A correção foi a parte fácil: acesso só por chave, firewall negando tudo por padrão, bloqueio automático de quem erra
demais, e todo banco escutando só dentro da própria máquina. O que eu quero contar é outra coisa.

O agente de IA que fez a auditoria recomendou fechar completamente o acesso administrativo. Parece o mais seguro. Só
que o deploy automático e a cópia de backup entravam justamente por ali, com chave. Se eu aceitasse a recomendação
como veio, teria derrubado a minha própria infraestrutura em nome da segurança. Ficou "só por chave, nunca por
senha".

E, logo depois de aplicar a mudança, uma checagem não respondeu e eu anunciei que a produção tinha caído. Não tinha.
Era uma oscilação. Na segunda medição, o sistema respondeu em décimos de segundo.

Duas lições no mesmo dia: **recomendação não é decisão**, nem quando vem de uma IA competente. E **medir duas vezes
antes de concluir**, principalmente quando a conclusão é um susto.

## O alarme que dizia "zero"

Com a casa trancada, montei uma auditoria diária. A ideia era simples: todo dia, comparar o que *deveria* estar
rodando em cada servidor, segundo o que está declarado no código, com o que *está* rodando de fato. Qualquer
diferença é deriva, e deriva vira alerta.

Desde a primeira execução, um dos servidores respondeu a mesma coisa: **deriva zero**. Eu cheguei a escrever isso em
relatório: "nenhuma diferença nos quatro servidores".

Aí eu fiz uma coisa que deveria ter feito no primeiro dia. Para ver o alarme funcionando, plantei uma diferença de
propósito: subi à mão um container que não estava declarado em lugar nenhum. O alarme tinha que gritar.

Ele continuou dizendo que estava tudo certo.

O motivo era pior do que o alarme quebrado. Naquele servidor, o usuário da auditoria não tinha permissão para listar
os containers. O comando devolvia um erro de permissão, a auditoria ignorava o erro, a lista vinha vazia, e vazio
virava "zero containers". Zero rodando contra zero esperado: **tudo em ordem**.

O servidor nunca esteve limpo. **Eu é que nunca consegui olhar.**

A correção foi fazer a auditoria parar quando não consegue enxergar, e o relatório passar a dizer "não auditável" em
vez de "zero". Depois repeti o teste plantando a diferença num servidor que a auditoria conseguia ler. O alarme
disparou, como deveria. Foi a primeira vez que eu vi aquele alarme funcionar, e só por isso eu sei que ele funciona.

![Diagrama: como um erro de permissão virou "tudo em ordem"](../img/o-alarme-que-nunca-disparou/diagrama.svg)

## O backup que mentia

Se a auditoria era cega, o backup era mentiroso.

Um dos meus backups mandava, todo dia, a mesma mensagem: "exportação concluída sem falhas". Durante seis semanas,
ele não copiou nada. Era o funcionário que bate ponto religiosamente e não faz absolutamente nada.

Foram dois motivos independentes. Primeiro, numa limpeza de credenciais, a linha que agendava o backup sumiu e só o
comentário ficou. Segundo, a ferramenta que o script usava tinha saído do repositório público de onde ele a baixava.
O script testava tudo junto, a conexão e a existência dos arquivos, e qualquer erro caía no mesmo lugar: "nada para
copiar neste ambiente". E "nada para copiar" terminava com "sem falhas".

Tive sorte. O armazenamento de produção ainda estava vazio, então nenhum dado se perdeu. O que houve foram seis
semanas sem rede de proteção, com o painel pintado de verde.

Não foi a primeira vez. Semanas antes, outro backup gerava o arquivo, comprimia e conferia o resultado da compressão,
não o da cópia. Cópia falhada virava um arquivo pequeno, válido e inútil. E o script dizia OK.

A lição das duas histórias é a mesma: **"não encontrei nada" e "não consegui procurar" nunca podem terminar no mesmo
lugar.** Hoje a conexão é testada sozinha e primeiro. E backup só conta como backup depois que a restauração foi
testada. Antes disso, é hipótese.

Uma coisa no desenho de backup eu tinha acertado desde o começo: **ele puxa, não empurra.** Um servidor separado, fora
do provedor principal, busca as cópias dos outros, com uma permissão que só deixa ler. Se um servidor de produção for
comprometido, ele não tem credencial para apagar o próprio backup.

## Desligar não desliga

A terceira mentira era mais sutil, porque não vinha de um alarme. Vinha de mim.

Decidi tirar dois sistemas de produção e transformá-los em portfólio. Parei os containers, conferi, estava tudo
desligado. Na mesma madrugada, eles voltaram ao ar sozinhos.
Por um segundo, achei que o Exterminador tinha chegado mais cedo.

Ninguém religou. O que os trouxe de volta foi a **declaração**: o arquivo de configuração e o pipeline de deploy
continuavam dizendo que aqueles sistemas deveriam existir. A infraestrutura fez exatamente o que estava escrito.

Já tinha acontecido antes, de outro jeito: projetos que eu tinha "descomissionado" arquivando o repositório
continuavam respondendo normalmente um mês depois. Arquivar o código não desliga a aplicação.

**Parar o processo só marca a hora da volta.** Um sistema só está desligado quando sumiu da declaração.

## O que ficou

Juntando tudo, a regra que eu sigo hoje é curta:

1. **Alarme que nunca disparou não é alarme. É uma suposição.** Todo alerta novo é testado provocando a falha que ele
   deveria pegar.
2. **"Responde" não é "está pronto", e "vazio" não é "zero".** Toda verificação precisa distinguir o resultado do
   "não consegui ver".
3. **Backup sem restauração testada é hipótese.** E ele puxa, não empurra.
4. **Recomendação não é decisão.** Nem quando vem de uma IA competente, nem quando vem de um auditor.
5. **Medir duas vezes antes de concluir.** Principalmente antes de dar a notícia ruim.

Nada disso exigiu ferramenta cara. Exigiu desconfiar do verde.

E, olhando para a casa trancada e vigiada, outra pergunta apareceu. Eu já confiava no que vigiava os meus sistemas.
Mas quanto eu pagava para mantê-los de pé? E de quem eu dependia para que eles continuassem existindo?

*Rafael Veneroso Morici · rvmtech.com.br*
