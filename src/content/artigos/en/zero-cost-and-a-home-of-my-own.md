---
title: "Zero cost and a home of my own"
description: "With no paying customer, no new piece is allowed to charge. And the production code moved home"
date: 2026-11-12
series: "Building the RVM ecosystem — chapter 8"
translationKey: "custo-zero-e-casa-propria"
---

The house was locked and the alarms tested. I already trusted what was watching my
systems. Two questions I had been putting off were left: **how much does this cost me** and **who do I depend on** for
it to keep existing.

Both have the same root. I have no paying customer. The systems are live, but none of them brings in money yet. And
when nothing comes in, anything that goes out hurts.

## The rule: nothing that can charge

The decision came up in a conversation about tools. I was considering replacing a piece of the infrastructure, a
package server I maintain myself, with a ready-made GitHub service. One less service to look after. It seemed obvious.

Until I read the fine print. The free plan has storage and transfer quotas for private packages. Mine are private.
Today it would fit. Tomorrow, if the project grows, the quota runs out, and a quota that runs out is a bill.

I vetoed it. And out of that came a rule that applies to everything: **as long as there is no customer, no new piece is
allowed to generate a bill.**

In practice, it sorts any tool into three kinds:

| Kind | Example | Rule |
|---|---|---|
| **Free, on my machine** | open-source software running on a server I already pay for | goes through without discussion |
| **Free with a quota** | a service's "generous" free tier | needs my sign-off |
| **Paid** | anything billed per use or per month | needs my sign-off |

The middle row is the dangerous one. "Generous free tier" is not an argument: it's a contract that changes its nature
the day you grow. It's the free sample at the supermarket: nobody charges you for the first piece of cheese, but the
idea is that you take the whole wheel home. And licenses count too. An infrastructure tool I was going to use switched from an open license to a
restrictive one. I swapped it for the community fork, which is still open.

Another thing I had to learn is to **state the cost before the benefit.** When the AI agent proposes a tool to me, the
first line has to be how much it costs and which kind it falls into. The benefit comes after.

## The AI that doesn't become a bill

The most expensive question in the ecosystem seemed to be AI itself. I use agents all day. At one point, I compared the
per-token price of several models to decide whether it was worth adding another one to the team. One was sixteen times
cheaper than the one I was using.

Then I saw the flaw myself: **I don't pay per token.** I had spent an afternoon comparing gas prices for a car I
don't fill up.

All the AI work in the ecosystem runs through the command line, on the **subscription** I already pay every month. One
more task costs nothing extra. Paying per use would only happen if I wired a system straight into the API, with a key,
and every call became a charge. Today that happens in exactly one place: the Safra em Dia WhatsApp, which understands
the farmer's message at any hour and so talks straight to the API. Everything else, including the task queue the
agents work through on their own, stays on the subscription.

Being sixteen times cheaper doesn't help when the other one is already paid for. Price lists only compare with price
lists.

That doesn't make it infinite. The subscription has a usage limit per time window. If the automated queue burns
through the window overnight, the one waiting in the morning is me. So the real cost of automation isn't money, it's
**throughput**. And throughput is solved with a schedule, not a credit card.

## Leaving GitHub

The second question was who I depend on. And the answer, for almost everything, was GitHub.

The funny thing is that the decision to leave **wasn't about cost.** GitHub cost me nothing: unlimited private
repositories, and the machines that run the pipelines are mine. In the first conversation about it, my decision was "we
can migrate later". No date.

What changed was the reason. I realized I wanted to **physically** separate what is production from what is
portfolio. The code of the systems that are live, with the production secrets the pipelines use, didn't need to live in
the same place as my showcase projects. Production got its own forge, Gitea, on a server of mine, with no port open to
the internet: the only way in is through a secure tunnel.

But I didn't switch anything in the dark. Before migrating, I set up a lab and wrote down the hypotheses that, if they
failed, would cancel the migration:

1. **Does the central pipeline run there?** All my projects call the same pipeline library, which lives in a private
   repository. If the new forge couldn't use it, the migration wouldn't happen. It ran: the real project built and
   passed its tests, with the same pipeline file changing only the owner. But only after I found a permission that has
   to be granted by hand, repository by repository. Without it, the pipeline doesn't fail: it simply doesn't exist.
2. **Do private packages work?** I published and consumed a package through the new forge. It worked, with one tweak
   per project.
3. **Can I send only production outside?** I wanted GitHub to receive a copy of the production version only, not the
   whole repository. The native mirroring took everything. The solution was a simple pipeline step that pushes only the
   production branch.

All three passed on the same day. Ten days later, the forge became the origin.

![Diagram: the forge as origin and GitHub as archive](../img/custo-zero-e-casa-propria/diagrama-en.svg)

Today the production repositories are born and live in the forge. That's where the pipeline runs, that's where deploys
are triggered. GitHub became an **archive**: every 15 minutes, it receives a copy of the production version, with the
pipelines turned off. If the forge has a problem, the production code still exists outside. If GitHub disappeared
tomorrow, nothing would stop.

And the move came with a cleanup. Around the same time, I archived **forty** old repositories that were just sitting
there: course exercises, forgotten prototypes, abandoned versions. Every dev has that digital basement; opening mine felt
like finding my teenage photo folder. Archived, not deleted: it's reversible, and deleting
for good is a separate decision.

## What I'd take with me

1. **Having no revenue is an architecture requirement.** It rules out half of the trendy tools right away. And that's
   fine.
2. **"Free with a quota" isn't free.** It's free until the day you succeed.
3. **Ask where the call happens before comparing prices.** A subscription you already pay for doesn't belong in a
   per-use price list.
4. **Migrate with written hypotheses.** Before replacing a central piece, write down what has to be true and what
   cancels the change. Then test.
5. **Depend on yourself for the essentials and use others as a copy.** The forge is mine; GitHub keeps a copy.

With the house tidy, locked, watched and cheap, one last bottleneck was left. The agents worked well, but every session
still started with me opening the terminal, picking the project and saying who did what. I was still the conductor of
every conversation.

*Rafael Veneroso Morici · rvmtech.com.br*
