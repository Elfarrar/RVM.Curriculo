---
title: "Eu era o Dr. Frankenstein"
description: "A arquitetura que parou a fábrica de monstros: fatias verticais, um domínio no centro e nenhum intermediário"
date: 2026-11-03
series: "Construindo o ecossistema RVM — capítulo 5"
translationKey: "dr-frankenstein"
---

Com a especificação antes do código, achei que tinha resolvido o problema. Cada projeto novo nascia com um mapa,
a IA sabia o que construir do começo ao fim, e o retrabalho tinha despencado. Missão cumprida, certo?

Errado. Cada projeto estava bem pensado, mas pensado sozinho. E cada um nascia do seu jeito.

Um fazia deploy por um script. Outro, por outro script, parecido mas não igual. Um guardava a senha do banco num
arquivo, outro em outro lugar. Um usava uma arquitetura, o seguinte usava a que pareceu melhor naquela semana. Cada
projeto tinha também o seu jeito particular de quebrar, e eu só descobria qual era quando quebrava.

Nas telas, a mesma coisa: um sistema tinha botão azul arredondado, o outro, botão cinza quadrado, e o terceiro,
o que a IA achou bonito naquele dia.

Eu não tinha um ecossistema. Tinha um punhado de projetos que, por acaso, eram do mesmo dono.

Funcionavam. Mas, olhando de perto, eram criaturas costuradas com partes que não combinavam. Eu era o Dr.
Frankenstein, e a cada projeto novo nascia mais um monstro.

O monstro, no meu caso, não fugia pela janela. Fazia pior: confundia a IA. Quando quem programa é uma IA, a
arquitetura deixa de ser só gosto técnico. Ela decide se o agente acerta de primeira ou inventa um jeito novo a cada
tarefa, e um agente olhando para três monstros diferentes aprende três jeitos diferentes de errar.

O que parou a fábrica de monstros foi um molde só, para todos os projetos.

## Escrever o padrão antes de pedir velocidade

Foi aí que eu parei de escrever código por um tempo e comecei a escrever outra coisa: **o padrão.**

Agentes de IA são ótimos em repetir um padrão e péssimos em adivinhar um. Se o padrão não existe, eles inventam um
diferente a cada tarefa, e todos parecem razoáveis. Era exatamente o que estava acontecendo comigo, só que em escala de ecossistema.

Então escrevi, em um lugar só:

- **A stack de todos os projetos.** A mesma linguagem, o mesmo banco, o mesmo jeito de empacotar e de publicar.
  Projeto novo não escolhe tecnologia; herda.
- **Uma arquitetura de referência.** Um dos sistemas que já estava em produção virou o molde, e os outros passaram a
  seguir a mesma forma de organizar o código.
- **Uma cara só.** Comecei uma biblioteca de componentes visuais própria, ainda em construção, para que todo
  sistema tenha os mesmos botões, formulários e telas. E mantenho um Design System público, como vitrine do jeito
  que eu construo componentes. Chega de botão escolhido conforme o humor do dia.
- **Regras de código explícitas.** Hoje são sete. O que dá para conferir por máquina vai para o pipeline; o que exige
  julgamento fica com a revisão. Se uma regra depende de alguém lembrar, ela não é regra.
- **Um arquivo de instruções por repositório.** Como a IA deve trabalhar naquele projeto, o que pode, o que não
  pode, o que já foi decidido e por quê. Um arquivo só, que vale para qualquer ferramenta de IA.
- **Decisão registrada antes de executada.** Cada escolha importante ganha um registro com o motivo e o que ela
  substitui. Parece burocracia até o dia em que um agente "conserta" de volta uma decisão que foi tomada de propósito.

De todos esses itens, o que mais mudou a vida da IA foi a arquitetura.

## A pilha de pratos e o bolo

Imagine um bolo de três andares: massa, recheio, cobertura. Existem dois jeitos de servir esse bolo.

No primeiro, você entrega primeiro toda a massa, depois todo o recheio, depois toda a cobertura. Cada andar num prato
diferente. Para comer um pedaço de verdade, a pessoa precisa juntar três pratos.

No segundo, você corta uma **fatia**. Cada fatia tem um pouco de cada andar, e é um pedaço completo, que se come
sozinho.

A maior parte dos sistemas que eu conheci na carreira era organizada do primeiro jeito: uma pasta com todas as telas,
outra com todas as regras, outra com todo o acesso a banco. Para mudar uma funcionalidade, você abria três, quatro,
cinco pastas, e torcia para não esquecer nenhuma. (Spoiler: sempre ficava uma para trás, e eu só descobria em
produção.)

O padrão que adotei é o segundo: **Vertical Slice Architecture**, arquitetura de fatias verticais. Cada
funcionalidade do sistema ("cadastrar talhão", "escalar uma pessoa na obra", "fechar o mês") é uma fatia: **um
arquivo só**, com tudo o que ela precisa. A rota que recebe o pedido, o formato dos dados de entrada, a validação, o
código que executa e o formato da resposta.

Ler aquele arquivo é entender a funcionalidade inteira.

## Por que isso importa para a IA

Uma tarefa típica no meu fluxo é "adicionar tal funcionalidade". Com fatias verticais, ela vira **criar um arquivo
novo** seguindo o formato dos vizinhos. Para o agente, isso significa pouco contexto (lê a fatia ao lado e a regra
que vai usar), um padrão fácil de copiar (viu uma fatia, viu todas) e mudança contida (uma fatia nova não mexe nas
outras, e a revisão fica do tamanho de um arquivo).

## O perigo das fatias: quarenta cópias da mesma regra

Só que fatia vertical tem uma armadilha, e eu caí nela. Se cada fatia é independente, onde fica a regra que vale
para várias? Se cada uma escrever a sua versão, em pouco tempo existem três regras ligeiramente diferentes, e o
sistema passa a dar respostas diferentes para a mesma pergunta.

A resposta é a segunda metade do padrão: **um domínio no centro**. As regras de negócio moram num lugar só. A fatia
**orquestra**: recebe o pedido, chama a regra, grava o resultado. Quem **decide** é o domínio, que não conhece banco
de dados, tela nem internet. E, para isso não depender de alguém lembrar, um teste de arquitetura falha se o domínio
passar a depender de banco ou de framework web.

## Um exemplo que você já conhece

Lembra do sistema do meu pai, que barra quem não pode ir para a obra? Por dentro, a fatia de escalar uma pessoa é mais ou menos isto:

```csharp
public sealed class CreateAllocation : IEndpoint
{
    public static void Map(IEndpointRouteBuilder app) =>
        app.MapPost("/api/allocations", async (Command cmd, Handler handler) =>
        {
            var result = await handler.ExecuteAsync(cmd);
            return result.Ok ? Results.Ok(result.Value) : Results.Conflict(result.Error);
        });

    public sealed record Command(Guid SiteId, Guid WorkerId, DateOnly Start);

    public sealed class Handler(IBlockingEngine engine, AppDbContext db)
    {
        public async Task<Result<Response>> ExecuteAsync(Command cmd)
        {
            var check = await engine.EvaluateAsync(cmd.WorkerId, cmd.SiteId, cmd.Start);
            if (!check.Allowed) return Result.Blocked(check.Reasons);   // a regra decide

            var allocation = Allocation.Create(cmd.SiteId, cmd.WorkerId, cmd.Start);
            db.Allocations.Add(allocation);
            await db.SaveChangesAsync();
            return Result.Success(new Response(allocation.Id));
        }
    }
}
```

Repare no que **não** está aqui: nada de conferir permissão, nada de filtrar pela empresa do usuário, nada de abrir
transação. Isso é aplicado automaticamente a **todas** as rotas, num lugar só, de propósito. Se estivesse dentro de
cada fatia, um dia alguém (humano ou IA) esqueceria em uma delas.

![Fatias verticais atravessando as camadas, com o domínio compartilhado no centro](../img/dr-frankenstein/diagrama.svg)

## Sem intermediário (sem MediatR)

Existe uma biblioteca muito popular no mundo .NET que costuma acompanhar esse estilo de arquitetura: um
"intermediário" que recebe a mensagem da rota e a entrega ao código que executa. A rota não chama o código
diretamente; ela manda um recado, e o intermediário descobre quem atende. É o telefone sem fio da programação.

O primeiro sistema que virou molde usava esse intermediário. E eu decidi tirá-lo de todos os projetos, por dois
motivos práticos.

O primeiro é de leitura. Com o intermediário, você clica na chamada para ver o que ela faz e cai num lugar genérico,
não no código que executa. Para uma pessoa, é um incômodo. Para uma IA que navega pelo projeto procurando onde mexer,
é um desvio a cada passo. Sem ele, a rota chama o código diretamente, e "ir para a definição" leva exatamente para
onde deveria.

O segundo é de custo: a biblioteca passou a ter licença comercial nas versões novas, e a minha regra é não colocar
peça que possa gerar fatura sem aviso (conto essa história no capítulo 8).

Desde setembro, nenhum projeto usa o intermediário. Os que já o tinham estão saindo dele aos poucos, com os testes
verdes antes e depois.

## A pilha completa

Para quem quer o resumo técnico: **.NET 10** com rotas enxutas, **Blazor Server** nas telas, **Entity Framework Core**
com **PostgreSQL**, **Docker** para publicar e login próprio em cada aplicação. E duas regras em todo banco de dados:
**multiempresa desde o primeiro dia** (um filtro global impede que uma consulta devolva dado de outra empresa, mesmo
que a fatia esqueça de pedir) e **nada é apagado de verdade** (excluir só marca como inativo). É o Ctrl+Z do banco de
dados, e ele já salvou mais tardes minhas do que eu gostaria de admitir.

Fugir da stack exige uma decisão registrada, e até hoje aconteceu poucas vezes: um editor que precisa rodar inteiro
no navegador e um laboratório de análise de dados que nasceu em Python.

## O que ainda não está pronto

Ser honesto aqui é importante: nem todo sistema já está no padrão. O primeiro molde é híbrido, com parte das
funcionalidades no formato antigo, e está sendo migrado fatia por fatia. Das sete regras de código, algumas já são
conferidas por teste automático; outras ainda dependem do agente revisor, enquanto as checagens automáticas não
chegam ao pipeline.

E tem uma decisão em aberto: estou calculando os benefícios de mudar os sistemas para o modelo headless, com o
frontend separado do projeto e conversando com o backend só pela API. Isso deixaria o domínio e as fatias ainda mais
isolados da tela, mas é uma mudança grande, e ela só entra se a conta fechar.

## O que eu levaria para qualquer equipe

1. **Organize o código pelo que ele faz, não pelo tipo de arquivo.** Uma funcionalidade num lugar só é mais fácil de
   entender, de revisar e de pedir para alguém, ou para uma IA, alterar.
2. **Fatia sem domínio vira cópia.** Regra de negócio compartilhada mora num lugar só, e a fatia só orquestra.
3. **O que todo mundo vai esquecer não pode depender de memória.** Permissão, empresa e transação entram
   automaticamente em todas as rotas.
4. **Cada camada a mais precisa pagar o próprio aluguel.** Se ela só adiciona um desvio entre quem chama e quem
   executa, ela atrapalha a pessoa e atrapalha ainda mais a IA.

Com o mapa e a arquitetura no lugar, a IA passou a construir do jeito certo, no lugar certo, de primeira. E continuava
me perguntando "pode?" a cada passo.

*Rafael Veneroso Morici · rvmtech.com.br*
