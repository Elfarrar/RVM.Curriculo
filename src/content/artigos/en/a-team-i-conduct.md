---
title: "A team I conduct myself"
description: "How I stopped being the conductor of every AI session and built a queue with roles, fixed models and a single place where things wait for me"
date: 2026-11-17
series: "Building the RVM ecosystem — chapter 9"
translationKey: "uma-equipe-que-eu-orquestro"
---

The house was in order: zero cost while there are no clients, code on my own forge, GitHub
turned into an archive. Everything in its place.

But there was one thing no tidying could fix: **I was still the conductor of every single session.**

I was the one opening the terminal in the right project, pasting the request, waiting, reading the result, opening
another terminal to review, remembering to run the screen test, going back to the first one to ask for the fix. The
machine already verified things on its own (chapter 6), but whoever led the orchestra, instrument by instrument, was
still me. And a conductor who also carries the sheet music and tunes the violins conducts nothing well.

## What the new job showed me

In chapter 0 I said the new job put me among people who use AI at scale, with process. Three things I saw there became
the foundation of what follows.

**First: everything on Linux.** I worked on Windows, and every script had two versions, every tool two behaviors. I
moved my whole environment to WSL, the Linux that runs inside Windows. Now my computer and my servers speak the same
language. The same command I test at home runs the same way on the server, no translation.

**Second: a single source of instructions.** Every AI tool wanted its own instructions file, and each aged at its own
pace. Today every repository has a single `AGENTS.md` that any tool reads. The Claude-specific file has one line:
"read AGENTS.md". The rule changed? It changes in one place.

**Third: AI with a role, not a chat that does everything.** This is the one that changed the game.

## Six roles, each with its own model

An agent that plans, codes, reviews and tests tends to do all four so-so, and to agree with itself at the end. So I
split the work into six roles, each with fixed instructions, permissions and **AI model**:

| Role | What it does | Model | What it can't do |
|---|---|---|---|
| **Architect** | Discusses specs and architecture with me | the strongest | Run commands or write code |
| **PMO** | Turns the request into a task with a plan and validation criteria | the lightest | Write code |
| **Developer** | Implements, writes the tests, opens the pull request | the middle one | Keep trying: two attempts without green CI, it stops and calls me |
| **Reviewer** | Reads the code looking for real bugs | **from another vendor** | Change the code it reviews |
| **QA** | Runs the browser tests and screenshots the screen | the middle one | Touch application code |
| **DevOps** | Reads the servers and diagnoses | the strongest | Change infrastructure without approval |

A fixed model per role isn't a whim. Turning a request into a task doesn't need the most expensive model; deciding
whether a server change is safe does. And since everything runs on a subscription (chapter 8), getting that choice
wrong doesn't show up on an invoice: it shows up in time. A script checks that each role has the agreed model, so
nobody swaps it without noticing.

The detail I'm proudest of is the **Reviewer from another vendor**. The code is written by Claude and reviewed by an
OpenAI model, through Codex. Whoever wrote the code tends to read it confirming their own logic. Another model, trained
differently, trips over different things. It works for people too: authors don't review their own work. It's like asking your father-in-law to judge the
barbecue you made: he'll find something wrong, and sometimes he's right.

And **permissions come from the profile**, not from the agent's goodwill. The Developer runs under a project profile
that simply has no server access: if it needs a production log, there's no way around it, it can only stop and ask.
It's the intern who doesn't get the production server password on day one. Or day two.
DevOps reads any server, but every write becomes an approval request with the exact command. No agent runs with
someone in the conversation to ask: when it needs me, it ends the session returning the question, with options, and the
answer comes back through the queue.

## The Maestro

Defined roles solve half of it. The other half is who calls each one, in the right order, and holds whatever depends on
me. That's the **Maestro**.

I had tried this once before, with a project called Cockpit: a dashboard to watch AI sessions. The spec grew, got
renegotiated, and in early October I realized I was designing the wrong thing. I didn't need a dashboard to watch the
sessions. I needed someone to **lead** them. Cockpit was replaced by the Maestro on October 4, and the next day the
repository was born.

A task flows like this today:

1. I send the request, from the terminal or the dashboard.
2. The Maestro figures out which project it belongs to and calls the **PMO**, which writes the task as an issue on the
   forge.
3. The **Developer** implements it and opens the pull request.
4. The **Reviewer** reads the diff. Found something serious? Back to the Developer.
5. Green CI, merge into `dev`, deploy, and **QA** opens the screen in the browser and takes the screenshot.
6. The task reaches me with the link, the status and the screenshot.

![The Maestro roles and the single queue: the request goes through PMO, Developer, Reviewer, CI and QA, and everything that depends on me lands in "Waiting for you"](../img/uma-equipe-que-eu-orquestro/diagrama-en.svg)

![The Maestro dashboard: Now, Board, Agents, Office, Metrics and Infra](../img/uma-equipe-que-eu-orquestro/maestro-painel.webp)

And everything that needs me lands in one place: a **single queue**, called "Waiting for you" on the dashboard. Scope
questions, infrastructure change approvals, promotions to production. When something new shows up, a Telegram message
arrives, with buttons to answer right there.

![Maestro approvals arriving on Telegram, with the answer buttons](../img/uma-equipe-que-eu-orquestro/maestro-telegram.webp)

Before, the AI's questions were scattered across six open terminals. It felt like a family group chat: everyone
talking at once and nobody answering what I asked. Now they sit in a queue, with context, waiting for
my turn, not the other way around.

## The Maestro builds itself (almost)

The part that still amuses me: **the Maestro is developed by the roles it orchestrates.** It's the
orchestra tuning its own conductor. So far, nobody has asked for a raise. As soon as the first version
stood up, the Maestro's own tasks became issues on the forge, implemented by the Developer, reviewed by the Reviewer,
tested by QA. I approve the screen.

The spec was closed between October 3 and 4. In a little over a week, seven of the eight stages of the roadmap were in
production: the central service, the dashboard, one executor on the server and another on my computer, the DevOps agent
with the infrastructure page, and a weekly audit of its own instructions.

And it isn't only the code that improves on its own. The instructions the agents follow, the **harness** (rules,
skills and memories), also get a weekly cleanup. On Sunday, an automatic run looks for what has gone stale: file paths
that no longer exist, already-merged branches still being mentioned, a rule repeated in two places, a skill nobody
uses, fixed instructions that grew past the agreed size. It also reads the memories each project has piled up: what an
agent learned in one project and is useful everywhere moves up to the global instructions, so the next agent starts
out already knowing it. The run changes nothing on its own. It opens a pull request, and I approve or reject it. It's
the retrospective nobody has to schedule, where nobody gets defensive.

## What isn't ready yet

It would be dishonest to stop here.

The eighth stage, **opening a whole new project through the Maestro**, from request to first deploy, is still being
built. Today a new project is still born in a conversation with me.

And the queue has its stumbles. This month, a lock that should have held the promotion to production was checking the
wrong slice of history: it looked at what went from `dev` to `stg`, not from `stg` to `prd`. Two changes reached
production before my "approved". They were changes I would have approved, and I did approve them afterwards, but the
lesson is the same as in chapter 7: **a brake you've never seen hold is not a brake.** The lock was fixed to check
exactly what is about to go up.

And the Telegram channel is already in real use: I approve tasks from my phone the same way I do on the web dashboard.

## What I'd take to any team

1. **Role before tool.** Define what each agent does and, above all, what it can't do. Permission has to live in the
   environment, not in the wording of the request.
2. **Pick the model by role.** Not every job needs the strongest model; judgment does.
3. **A reviewer from another family.** Author and reviewer from the same model agree too much.
4. **One queue for the human.** If the AI's questions arrive through six places, you become the bottleneck again, just
   with more tabs open.

Less than a year ago I was filling in a rideshare driver sign-up form. Today a team of agents works through the queue
while I write this. I think it's time to look back and see the whole road. That's what I do in the last chapter.

*Rafael Veneroso Morici · rvmtech.com.br*
