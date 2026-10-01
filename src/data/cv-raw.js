// ===== Curriculo — fonte unica bilingue (TASK-831) =====
// Espelha C:\IA\curriculo (pt-br/curriculo.md e en/resume.md).
// Mudou o CV? Muda aqui tambem — sao os dois lugares.

export const CV = {
  pt: {
    role: "Engenheiro de Software Sênior",
    tagline: ".NET · C# · Azure · IA Aplicada",

    summary: [
      "Desenvolvo software há mais de 15 anos, quase sempre em C# e .NET, e o fio condutor da carreira é o mesmo desde o começo: pegar um problema de negócio mal resolvido e entregar um sistema que a operação usa todo dia. Passei por ERP, banco, gestão de pessoas, cálculo de emissão de carbono e, hoje, saúde — um sistema para clínicas odontológicas.",
      "Trabalho de ponta a ponta — modelagem de domínio, arquitetura, implementação, banco, deploy e sustentação. Uso Vertical Slice Architecture e DDD conforme o problema pede, PostgreSQL e SQL Server, Docker, e esteiras de CI/CD em Azure e GCP.",
      "Sou referência técnica de time e já respondi pela liderança técnica de squad. A parte do trabalho que mais gosto não é escrever código: é entender o domínio a fundo o suficiente para que o código fique simples.",
      "Desde setembro de 2026 curso a pós-graduação em Engenharia de Software em IA Aplicada na UNIPDS: agentes, RAG, arquiteturas AI-first, fine-tuning e governança de IA. É o mesmo terreno que já uso todo dia com Claude Code — a pós vem para dar o nome e o rigor ao que a prática já tinha mostrado.",
    ],

    facts: [
      { l: "Localização", v: "Belo Horizonte, MG" },
      { l: "Disponibilidade", v: "Remoto" },
      { l: "Experiência", v: "15+ anos" },
      { l: "Cargo atual", v: "Sênior @ Marlabs" },
      { l: "Formação", v: "Pós em IA Aplicada (em curso) · SI (2009)" },
      { l: "Idiomas", v: "PT nativo · EN avançado" },
    ],

    metrics: [
      { v: "15+", l: "anos de carreira" },
      { v: "10k", l: "contas/dia no pico" },
      { v: "6", l: "devs sob referência técnica" },
      { v: "6", l: "domínios de negócio" },
    ],

    experiences: [
      {
        period: "set/2026 — atual",
        role: "Engenheiro de Software Sênior",
        company: "Marlabs",
        client: "alocado no cliente Practice Tek",
        location: "remoto",
        context:
          "A Practice Tek desenvolve software para a área da saúde. Atuo no sistema usado por clínicas odontológicas — num time em que o processo de desenvolvimento é todo automatizado por agentes de IA.",
        bullets: [
          "Desenvolvimento full stack do sistema para dentistas em C# e .NET no backend e TypeScript com Next.js no front-end.",
          "Banco de dados SQL Server e serviços na AWS (Amazon Web Services).",
          "Engenharia de harness para agentes de IA (Claude Code): o ambiente, as regras e as ferramentas com que os agentes conduzem o processo inteiro — do código ao CI —, com o engenheiro no julgamento e na revisão.",
          "Ambiente de desenvolvimento em WSL.",
        ],
        stack: [".NET", "C#", "TypeScript", "Next.js", "SQL Server", "AWS", "Claude Code", "Harness engineering", "WSL"],
      },
      {
        period: "jun/2026 — ago/2026",
        role: "Engenheiro de Software Sênior",
        company: "Marlabs",
        client: "alocado no cliente UL Solutions",
        location: "remoto",
        context:
          "A UL Solutions certifica produtos e segurança no mundo inteiro. O sistema em que atuei calcula a emissão de gases de efeito estufa dos clientes dela — e nasceu para substituir a plataforma legada que atende as maiores contas da empresa.",
        bullets: [
          "Desenvolvimento da nova plataforma de cálculo de pegada de carbono em C# e .NET, com APIs REST consumidas pelas aplicações do produto.",
          "Modelagem e evolução do banco relacional (SQL Server e PostgreSQL) do novo sistema.",
          "Serviços hospedados em Microsoft Azure.",
          "Automação do desenvolvimento com seis skills de IA (Claude Code): a partir da descrição do modelo, quatro delas geram as entidades, os repositórios, os controllers e os testes unitários.",
          "Uma quinta skill confere o modelo contra os scripts SQL de criação das tabelas e leva as inconsistências ao desenvolvedor junto com as opções de correção; a sexta apoia a resolução de conflitos de merge.",
          "As skills aprendem a cada execução e se aprimoram sozinhas, reduzindo o retrabalho nas rodadas seguintes.",
          "Time distribuído internacional — cerimônias, code review e documentação em inglês.",
        ],
        stack: [".NET", "C#", "REST API", "Azure", "SQL Server", "PostgreSQL", "Agentes de IA", "Claude Code", "Automação de desenvolvimento"],
      },
      {
        period: "fev/2026 — jun/2026",
        role: "Desenvolvedor de Software",
        company: "Projetos Independentes — Ecossistema RVM",
        client: "iniciativa própria",
        location: "Belo Horizonte, MG",
        context:
          "Período fora do mercado formal que virou o laboratório mais produtivo da minha carreira: um ecossistema de aplicações .NET desenhado do zero, com as decisões de arquitetura todas minhas — e todas cobradas por um deploy real em produção.",
        bullets: [
          "Concepção e implementação, do zero até produção, de um ecossistema em Vertical Slice Architecture (VSA), com .NET 10, Blazor Server, EF Core e PostgreSQL, publicado em VPS Linux com Docker, Nginx e SSL.",
          "ERPAgro: ERP vertical para o pequeno produtor rural, operado por WhatsApp em linguagem natural (camada MCP) e complementado por painel administrativo web; gera o LCDPR para a contabilidade do produtor.",
          "Serviço de pagamentos: Pix, boleto e cartão, com abstração sobre múltiplos provedores (Asaas e Inter), isolamento de dados por aplicação via API Key e webhooks assinados.",
          "Serviço de identidade centralizado, consumido por todas as aplicações do ecossistema.",
          "Esteira de CI/CD com GitHub Actions e ambientes segregados de desenvolvimento, homologação e produção.",
          "Agentes de IA como ferramenta de engenharia em todo o ciclo: especificação, implementação, code review e deploy.",
        ],
        stack: [".NET 10", "VSA", "Blazor Server", "EF Core", "PostgreSQL", "Docker", "Nginx", "GitHub Actions", "MCP", "Agentes de IA", "Claude Code", "LLM", "Vibe Coding"],
      },
      {
        period: "jun/2019 — jan/2026",
        role: "Programador Sênior",
        company: "Questrade",
        client: "corretora e banco digital canadense",
        location: "Belo Horizonte, MG · time no Canadá",
        context:
          "Seis anos e meio no setor financeiro regulado, mexendo nos sistemas web pelos quais o cliente final abre conta e pelos quais a rede de parceiros é remunerada. Foi onde deixei de ser só quem executa e passei a ser quem o time procura antes de decidir.",
        bullets: [
          "Desenvolvimento e sustentação dos sistemas web do banco em C# e .NET sobre o CMS Sitefinity, que sustentaram picos de mais de 10 mil aberturas de conta por dia durante a pandemia.",
          "Reconhecido como referência técnica do time de 6 desenvolvedores — vários com 10 anos de casa — após 1 ano na empresa: participação ativa nas decisões de arquitetura, apoio na resolução de problemas complexos e condução de code review.",
          "Responsável técnico pelos sistemas de afiliados e parceiros, com mais de 50 afiliados ativos, incluindo regras de comissionamento e integrações com sistemas internos.",
          "Construção de APIs REST e integrações entre as plataformas do banco.",
          "Ambiente regulado — segurança, rastreabilidade e auditoria —, com comunicação diária em inglês com o time e as áreas de negócio no Canadá.",
        ],
        stack: ["C#", ".NET", "Sitefinity", "REST API", "SQL Server", "Jenkins", "Docker", "Git"],
      },
      {
        period: "jul/2018 — jun/2019",
        role: "Programador Sênior / Líder Técnico de Time",
        company: "Mereo",
        client: "SaaS de gestão de RH",
        location: "Belo Horizonte, MG",
        context:
          "Primeira vez respondendo por um time. Cuidávamos do módulo de avaliação de desempenho — a parte da plataforma que os clientes usam para decidir promoção, sucessão e quem senta nas cadeiras que importam.",
        bullets: [
          "Liderança técnica de time de 3 desenvolvedores e 1 QA responsável pelo módulo de avaliação de desempenho.",
          "Desenvolvimento das funcionalidades de avaliação de colaboradores: matriz nine box e planos de sucessão para cargos-chave da organização.",
          "Plataforma em C# com ASP.NET e front-end em Angular 2, com APIs REST consumidas pela aplicação web.",
          "Modelagem e otimização de banco de dados SQL Server.",
        ],
        stack: ["C#", "ASP.NET", "Angular 2", "SQL Server", "REST API", "Scrum"],
      },
      {
        period: "jan/2017 — jul/2018",
        role: "Programador Pleno",
        company: "EMC",
        client: "locação de equipamentos de informática",
        location: "Belo Horizonte, MG",
        context:
          "A empresa tentou implantar dois ERPs de mercado, e nenhum dos dois pegou. A decisão foi construir o ERP em casa. Fui o responsável por desenhar os modelos do domínio — sendo pleno.",
        bullets: [
          "Construção, do zero, do ERP que passou a controlar a operação de uma empresa de mais de 100 funcionários, depois de tentativas frustradas de implantar ERPs de mercado.",
          "Responsável pela modelagem do domínio com Domain-Driven Design (DDD) e pelo desenho da arquitetura em camadas do sistema.",
          "Módulos de locação de equipamentos — atividade-fim da empresa —, ordens de serviço, contratos, financeiro e SAC.",
          "Interface desktop em WPF para os usuários internos e Web Forms + WCF para os clientes externos.",
        ],
        stack: ["C#", "WPF", "Web Forms", "WCF", "DDD", "SQL Server"],
      },
    ],

    priorNote:
      "Experiências anteriores a 2017 — início de carreira em ASP.NET Web Forms e MVC — disponíveis mediante solicitação.",

    caseStudies: [
      {
        tag: "EMC · 2017—2018",
        title: "O ERP que entrou onde os pacotes de mercado não entraram",
        lead:
          "Duas implantações de ERP de mercado fracassaram na mesma empresa. A terceira tentativa foi construir o sistema em casa — e coube a mim desenhar o domínio.",
        blocks: [
          {
            h: "O problema",
            p: "A empresa vive de alugar computadores. Isso parece simples até você olhar de perto: um mesmo equipamento entra em contrato, sai para manutenção, volta, é substituído por outro em regime de comodato, gera cobrança proporcional e ainda aparece num chamado de SAC. Nenhum ERP de prateleira modelava isso sem customização pesada, e foi aí que os pacotes de mercado travaram.",
          },
          {
            h: "O que eu fiz",
            p: "Modelei o domínio com DDD, tratando contrato, equipamento, ordem de serviço e cobrança como agregados com regras próprias em vez de tabelas soltas amarradas por tela. A arquitetura ficou em camadas, com o domínio isolado da infraestrutura — o que permitiu servir a mesma regra para dois front-ends muito diferentes: WPF para os mais de 100 funcionários internos e Web Forms + WCF para os clientes externos consultarem seus próprios contratos.",
          },
          {
            h: "O resultado",
            p: "O sistema passou a controlar a operação inteira: locação, ordens de serviço, contratos, financeiro e SAC. O que dois ERPs de mercado não conseguiram cobrir, um time pequeno cobriu — porque modelou o negócio real em vez de tentar encaixá-lo num modelo genérico.",
          },
        ],
      },
      {
        tag: "Questrade · 2019—2026",
        title: "10 mil contas por dia, e o time que passou a perguntar antes de decidir",
        lead:
          "A pandemia jogou uma onda de novos investidores em cima dos sistemas de abertura de conta. Ao mesmo tempo, eu era o mais novo de casa num time onde vários tinham 10 anos de empresa.",
        blocks: [
          {
            h: "A escala",
            p: "No pico, os sistemas web pelos quais eu respondia sustentaram mais de 10 mil aberturas de conta por dia. Em setor financeiro regulado, volume não é só performance: cada conta aberta carrega exigência de segurança, rastreabilidade e auditoria, e um erro silencioso não é um bug — é um problema de compliance.",
          },
          {
            h: "A rede de afiliados",
            p: "Fui o responsável técnico pelos sistemas de afiliados e parceiros, com mais de 50 afiliados ativos. É um domínio onde o software mexe direto no dinheiro de terceiros: regra de comissionamento errada vira pagamento errado, e pagamento errado vira disputa. A integração com os sistemas internos do banco tinha que fechar sempre.",
          },
          {
            h: "Virar referência",
            p: "Entrei em 2019 num time de 6 desenvolvedores, vários com uma década de empresa. Depois de um ano, passei a ser a pessoa que o time procurava antes de fechar uma decisão de arquitetura, destravar um problema difícil ou aprovar um code review. Isso não veio de cargo — veio de estar certo com frequência suficiente para valer a pergunta.",
          },
        ],
      },
      {
        tag: "Ecossistema RVM · 2026",
        title: "Cinco meses para construir a plataforma que eu queria ter encontrado pronta",
        lead:
          "Entre a saída da Questrade e a entrada na Marlabs, construí do zero um ecossistema de aplicações .NET em produção — arquitetura, código, infraestrutura e deploy, tudo meu.",
        blocks: [
          {
            h: "A arquitetura",
            p: "Adotei Vertical Slice Architecture: cada funcionalidade vive num arquivo, com endpoint, comando, validador e handler juntos, em vez de espalhados por camadas horizontais. Depois de anos construindo sistemas em camadas com DDD, VSA foi a escolha para reduzir o custo de mudar uma feature — e eu sei defender o trade-off nos dois sentidos, porque já paguei a conta dos dois modelos.",
          },
          {
            h: "Os produtos",
            p: "O ERPAgro é um ERP vertical para o pequeno produtor rural, com uma ideia central incomum: o produtor lança pelo WhatsApp, em linguagem natural, através de uma camada MCP — e o contador recebe o LCDPR pronto. Em volta dele, construí serviços de plataforma reutilizáveis: pagamentos (Pix, boleto e cartão, abstraindo Asaas e Inter, com isolamento por aplicação e webhooks assinados) e identidade centralizada.",
          },
          {
            h: "A operação",
            p: "Nada disso ficou em localhost. Tudo roda em VPS Linux com Docker e Nginx, com CI/CD em GitHub Actions e ambientes segregados de desenvolvimento, homologação e produção. Usei agentes de IA como ferramenta de engenharia em todo o ciclo — especificação, implementação, code review e deploy —, o que é hoje um diferencial concreto de produtividade, não uma curiosidade de currículo.",
          },
        ],
      },
    ],

    education: [
      {
        degree: "Pós-graduação em Engenharia de Software em IA Aplicada",
        school: "UNIPDS",
        place: "à distância",
        year: "set/2026 — previsão 2027",
        ongoing: true,
      },
      {
        degree: "Bacharelado em Sistemas de Informação",
        school: "Faculdade Infórium de Tecnologia",
        place: "Belo Horizonte, MG",
        year: "Conclusão em 2009",
      },
    ],

    courses: [
      { name: "PHP — curso de desenvolvimento web" },
    ],

    certifications: [
      { name: "Exam 480: Programming in HTML5 with JavaScript and CSS3", issuer: "Microsoft", status: "concluída" },
      { name: "AZ-900: Microsoft Azure Fundamentals", issuer: "Microsoft", status: "em preparação" },
    ],

    languages: [
      { name: "Português", level: "Nativo" },
      { name: "Inglês", level: "Avançado — reuniões, code review e documentação técnica" },
    ],

    skills: [
      {
        label: "linguagens & frameworks",
        items: ["C# / .NET 10", "ASP.NET Core", "Blazor Server", "Entity Framework Core", "WPF · WCF", "Python", "TypeScript", "Next.js", "Angular"],
      },
      {
        label: "arquitetura",
        items: ["Vertical Slice (VSA)", "Domain-Driven Design", "Arquitetura em camadas", "APIs REST", "Multi-tenant", "OAuth 2.0 / OIDC"],
      },
      {
        label: "dados",
        items: ["PostgreSQL", "SQL Server", "MySQL", "T-SQL", "Redis", "Modelagem relacional"],
      },
      {
        label: "cloud & devops",
        items: ["Microsoft Azure", "AWS", "Google Cloud", "Docker", "GitHub Actions", "Jenkins", "Nginx · Linux"],
      },
      {
        label: "ia & agentes",
        items: ["Agentes de IA", "Engenharia de harness", "LLMs", "RAG", "GitHub Copilot", "Claude Code", "MCP"],
      },
    ],
  },

  en: {
    role: "Senior Software Engineer",
    tagline: ".NET · C# · Azure · Applied AI",

    summary: [
      "I have been building software for over 15 years, almost always in C# and .NET, and the thread has been the same since day one: take a badly solved business problem and ship a system the operation actually uses every day. I have worked across ERP, banking, people management, carbon emission calculation and, today, healthcare — a system for dental clinics.",
      "I work end to end — domain modeling, architecture, implementation, database, deployment and support. I use Vertical Slice Architecture and DDD depending on what the problem asks for, PostgreSQL and SQL Server, Docker, and CI/CD pipelines on Azure and GCP.",
      "I am a technical reference within my team and have led a squad as team lead. The part of the job I enjoy most is not writing code: it is understanding the domain deeply enough that the code turns out simple.",
      "Since September 2026 I have been taking a postgraduate program in Software Engineering for Applied AI at UNIPDS: agents, RAG, AI-first architectures, fine-tuning and AI governance. It is the same ground I already cover daily with Claude Code — the program brings the name and the rigor to what practice had already shown me.",
    ],

    facts: [
      { l: "Location", v: "Belo Horizonte, Brazil" },
      { l: "Availability", v: "Remote" },
      { l: "Experience", v: "15+ years" },
      { l: "Current role", v: "Senior @ Marlabs" },
      { l: "Education", v: "Postgrad in Applied AI (ongoing) · IS (2009)" },
      { l: "Languages", v: "PT native · EN advanced" },
    ],

    metrics: [
      { v: "15+", l: "years of career" },
      { v: "10k", l: "accounts/day at peak" },
      { v: "6", l: "devs relying on me" },
      { v: "6", l: "business domains" },
    ],

    experiences: [
      {
        period: "Sep 2026 — Present",
        role: "Senior Software Engineer",
        company: "Marlabs",
        client: "assigned to client Practice Tek",
        location: "remote",
        context:
          "Practice Tek builds healthcare software. I work on the system used by dental clinics — on a team where the development process is fully automated by AI agents.",
        bullets: [
          "Full stack development of the dental practice system in C# and .NET on the back end and TypeScript with Next.js on the front end.",
          "SQL Server database and services on AWS (Amazon Web Services).",
          "Harness engineering for AI agents (Claude Code): the environment, rules and tools through which the agents drive the whole process — from code to CI —, with the engineer owning judgment and review.",
          "Development environment on WSL.",
        ],
        stack: [".NET", "C#", "TypeScript", "Next.js", "SQL Server", "AWS", "Claude Code", "Harness engineering", "WSL"],
      },
      {
        period: "Jun 2026 — Aug 2026",
        role: "Senior Software Engineer",
        company: "Marlabs",
        client: "assigned to client UL Solutions",
        location: "remote",
        context:
          "UL Solutions certifies product safety worldwide. The system I worked on calculates its clients' greenhouse gas emissions — and was born to replace the legacy platform serving the company's largest accounts.",
        bullets: [
          "Develop the new carbon footprint calculation platform in C# and .NET, with REST APIs consumed by the product applications.",
          "Model and evolve the new system's relational database (SQL Server and PostgreSQL).",
          "Services hosted on Microsoft Azure.",
          "Development automation through six AI skills (Claude Code): from the model description, four of them generate the entities, the repositories, the controllers and the unit tests.",
          "A fifth skill checks the model against the table creation SQL scripts and surfaces the inconsistencies to the developer along with the correction options; the sixth assists with merge conflict resolution.",
          "The skills learn from every run and improve themselves, cutting rework on the following rounds.",
          "Distributed international team — ceremonies, code review and documentation in English.",
        ],
        stack: [".NET", "C#", "REST API", "Azure", "SQL Server", "PostgreSQL", "AI Agents", "Claude Code", "Dev Automation"],
      },
      {
        period: "Feb 2026 — Jun 2026",
        role: "Software Engineer",
        company: "Independent Projects — RVM Ecosystem",
        client: "own initiative",
        location: "Belo Horizonte, Brazil",
        context:
          "A stretch outside the formal market that became the most productive lab of my career: an ecosystem of .NET applications designed from scratch, every architecture decision mine — and every one of them tested by a real production deployment.",
        bullets: [
          "Designed and built, from scratch to production, an ecosystem using Vertical Slice Architecture (VSA), on .NET 10, Blazor Server, EF Core and PostgreSQL, deployed to a Linux VPS with Docker, Nginx and SSL.",
          "ERPAgro: vertical ERP for small-scale farmers, operated through WhatsApp in natural language (MCP layer) and complemented by a web admin panel; generates the Brazilian LCDPR tax report for accountants.",
          "Payments service: Pix, bank slip and credit card, abstracting multiple providers (Asaas and Inter), with per-application data isolation via API Key and signed webhooks.",
          "Centralized identity service, consumed by every application in the ecosystem.",
          "CI/CD pipelines with GitHub Actions and segregated development, staging and production environments.",
          "AI agents as an engineering tool across the whole cycle: specification, implementation, code review and deployment.",
        ],
        stack: [".NET 10", "VSA", "Blazor Server", "EF Core", "PostgreSQL", "Docker", "Nginx", "GitHub Actions", "MCP", "AI Agents", "Claude Code", "LLM", "Vibe Coding"],
      },
      {
        period: "Jun 2019 — Jan 2026",
        role: "Senior Software Developer",
        company: "Questrade",
        client: "Canadian brokerage and digital bank",
        location: "Belo Horizonte, Brazil · team in Canada",
        context:
          "Six and a half years in regulated finance, working on the web systems where end clients open their accounts and where the partner network gets paid. This is where I stopped being just the person who executes and became the person the team asks before deciding.",
        bullets: [
          "Developed and maintained the bank's web systems in C# and .NET on top of the Sitefinity CMS, which sustained peaks of over 10,000 account openings per day during the pandemic.",
          "Recognized as the technical reference of a 6-developer team — several with 10 years at the company — within the first year: active in architecture decisions, complex problem solving and code review.",
          "Technical owner of the affiliate and partner systems, covering 50+ active affiliates, including commission rules and integrations with internal systems.",
          "Built REST APIs and integrations across the bank's platforms.",
          "Regulated environment — security, traceability and audit —, communicating daily in English with the team and business stakeholders in Canada.",
        ],
        stack: ["C#", ".NET", "Sitefinity", "REST API", "SQL Server", "Jenkins", "Docker", "Git"],
      },
      {
        period: "Jul 2018 — Jun 2019",
        role: "Senior Software Developer / Team Lead",
        company: "Mereo",
        client: "HR management SaaS",
        location: "Belo Horizonte, Brazil",
        context:
          "My first time answering for a team. We owned the performance review module — the part of the platform clients use to decide promotions, succession and who sits in the chairs that matter.",
        bullets: [
          "Led a team of 3 developers and 1 QA responsible for the performance review module.",
          "Built the employee assessment features: nine box matrix and succession planning for key positions.",
          "Platform in C# with ASP.NET and an Angular 2 front end, with REST APIs consumed by the web application.",
          "Modeled and optimized the SQL Server database.",
        ],
        stack: ["C#", "ASP.NET", "Angular 2", "SQL Server", "REST API", "Scrum"],
      },
      {
        period: "Jan 2017 — Jul 2018",
        role: "Mid-level Software Developer",
        company: "EMC",
        client: "IT equipment leasing",
        location: "Belo Horizonte, Brazil",
        context:
          "The company tried to roll out two off-the-shelf ERPs, and neither stuck. The decision was to build the ERP in house. I owned the domain modeling — as a mid-level developer.",
        bullets: [
          "Built from scratch the ERP that came to run the operation of a 100+ employee company, after failed attempts to roll out off-the-shelf ERPs.",
          "Owned the domain modeling with Domain-Driven Design (DDD) and the design of the system's layered architecture.",
          "Modules for equipment leasing — the company's core business —, service orders, contracts, finance and customer support.",
          "WPF desktop interface for internal users and Web Forms + WCF for external clients.",
        ],
        stack: ["C#", "WPF", "Web Forms", "WCF", "DDD", "SQL Server"],
      },
    ],

    priorNote:
      "Experience prior to 2017 — early career on ASP.NET Web Forms and MVC — available upon request.",

    caseStudies: [
      {
        tag: "EMC · 2017—2018",
        title: "The ERP that got in where the off-the-shelf packages could not",
        lead:
          "Two off-the-shelf ERP rollouts failed at the same company. The third attempt was to build it in house — and I owned the domain design.",
        blocks: [
          {
            h: "The problem",
            p: "The company makes its money renting out computers. That sounds simple until you look closely: the same machine enters a contract, leaves for maintenance, comes back, gets swapped for another one on loan, generates pro-rata billing and still shows up in a support ticket. No off-the-shelf ERP modeled that without heavy customization, and that is exactly where the off-the-shelf packages stalled.",
          },
          {
            h: "What I did",
            p: "I modeled the domain with DDD, treating contract, equipment, service order and billing as aggregates with their own rules instead of loose tables stitched together by screens. The architecture was layered, with the domain isolated from infrastructure — which let the same rules serve two very different front ends: WPF for the 100+ internal employees and Web Forms + WCF for external clients checking their own contracts.",
          },
          {
            h: "The outcome",
            p: "The system came to run the whole operation: leasing, service orders, contracts, finance and customer support. What two market ERPs could not cover, a small team did — because it modeled the real business instead of trying to force it into a generic model.",
          },
        ],
      },
      {
        tag: "Questrade · 2019—2026",
        title: "10,000 accounts a day, and the team that started asking first",
        lead:
          "The pandemic threw a wave of new investors at the account opening systems. At the same time, I was the newest person on a team where several had been there for a decade.",
        blocks: [
          {
            h: "The scale",
            p: "At peak, the web systems I was responsible for sustained more than 10,000 account openings per day. In regulated finance, volume is not only about performance: every account carries security, traceability and audit requirements, and a silent error is not a bug — it is a compliance problem.",
          },
          {
            h: "The affiliate network",
            p: "I was the technical owner of the affiliate and partner systems, covering 50+ active affiliates. It is a domain where software touches other people's money directly: a wrong commission rule becomes a wrong payment, and a wrong payment becomes a dispute. The integration with the bank's internal systems had to reconcile every time.",
          },
          {
            h: "Becoming the reference",
            p: "I joined in 2019 on a team of 6 developers, several with a decade at the company. After a year, I became the person the team came to before closing an architecture decision, unblocking a hard problem or signing off a code review. That did not come from a title — it came from being right often enough to be worth asking.",
          },
        ],
      },
      {
        tag: "RVM Ecosystem · 2026",
        title: "Five months to build the platform I wish I had found ready",
        lead:
          "Between leaving Questrade and joining Marlabs, I built an ecosystem of .NET applications in production from scratch — architecture, code, infrastructure and deployment, all mine.",
        blocks: [
          {
            h: "The architecture",
            p: "I adopted Vertical Slice Architecture: each feature lives in one file, with endpoint, command, validator and handler together, instead of scattered across horizontal layers. After years building layered systems with DDD, VSA was the choice to cut the cost of changing a feature — and I can argue the trade-off both ways, because I have paid the bill on both models.",
          },
          {
            h: "The products",
            p: "ERPAgro is a vertical ERP for small-scale farmers with an unusual core idea: the farmer records entries over WhatsApp, in natural language, through an MCP layer — and the accountant receives the LCDPR report ready. Around it I built reusable platform services: payments (Pix, bank slip and card, abstracting Asaas and Inter, with per-application isolation and signed webhooks) and centralized identity.",
          },
          {
            h: "The operation",
            p: "None of it stayed on localhost. Everything runs on a Linux VPS with Docker and Nginx, with CI/CD on GitHub Actions and segregated development, staging and production environments. I used AI agents as an engineering tool across the whole cycle — specification, implementation, code review and deployment — which today is a concrete productivity edge, not a resume curiosity.",
          },
        ],
      },
    ],

    education: [
      {
        degree: "Postgraduate Program in Software Engineering for Applied AI",
        school: "UNIPDS",
        place: "distance learning",
        year: "Sep 2026 — expected 2027",
        ongoing: true,
      },
      {
        degree: "Bachelor's Degree in Information Systems",
        school: "Faculdade Infórium de Tecnologia",
        place: "Belo Horizonte, Brazil",
        year: "Graduated in 2009",
      },
    ],

    courses: [
      { name: "PHP — web development course" },
    ],

    certifications: [
      { name: "Exam 480: Programming in HTML5 with JavaScript and CSS3", issuer: "Microsoft", status: "completed" },
      { name: "AZ-900: Microsoft Azure Fundamentals", issuer: "Microsoft", status: "in progress" },
    ],

    languages: [
      { name: "Portuguese", level: "Native" },
      { name: "English", level: "Advanced — meetings, code review and technical documentation" },
    ],

    skills: [
      {
        label: "languages & frameworks",
        items: ["C# / .NET 10", "ASP.NET Core", "Blazor Server", "Entity Framework Core", "WPF · WCF", "Python", "TypeScript", "Next.js", "Angular"],
      },
      {
        label: "architecture",
        items: ["Vertical Slice (VSA)", "Domain-Driven Design", "Layered architecture", "REST APIs", "Multi-tenant", "OAuth 2.0 / OIDC"],
      },
      {
        label: "data",
        items: ["PostgreSQL", "SQL Server", "MySQL", "T-SQL", "Redis", "Relational modeling"],
      },
      {
        label: "cloud & devops",
        items: ["Microsoft Azure", "AWS", "Google Cloud", "Docker", "GitHub Actions", "Jenkins", "Nginx · Linux"],
      },
      {
        label: "ai & agents",
        items: ["AI agents", "Harness engineering", "LLMs", "RAG", "GitHub Copilot", "Claude Code", "MCP"],
      },
    ],
  },
};
