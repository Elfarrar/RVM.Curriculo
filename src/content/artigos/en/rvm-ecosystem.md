---
title: "One person, twenty-something systems and a team of AI agents"
description: "How I built the RVM ecosystem and what I learned letting the machine work on its own up to the production gate"
date: 2026-10-16
series: "Building the RVM ecosystem — part 1"
translationKey: ecossistema
draft: true
---

Not long ago, I had a handful of side projects scattered across folders, each with its own way of deploying, its own
way of storing passwords and its own way of breaking. Today there are more than twenty repositories following the
same standard, running on four servers, and largely developed, tested and shipped by AI agents. I still make the
decisions. Most of the time, I am not the one executing them.

This is the first post in a series about how that was put together. It is not a tutorial, and it is not a tool
advertisement: it is an account of a process, with the decisions, the costs and, above all, the mistakes that taught
me something.

## The problem: I was the bottleneck

When I started coding with AI, it felt like hiring a very fast intern. It wrote code in minutes, but stopped at
every step to ask: can I create the branch? Can I run the tests? Can I deploy? And I, with other things to do, became
the rubber stamp of the process. On an average task I was interrupted dozens of times.

The problem was not the AI being bad. It was that the process never stated **what the machine may decide on its own**
and **what only I can judge**. Until that boundary existed, everything went through me.

## The turning point: the machine verifies, I judge the screen

The rule that changed everything fits in one sentence: **whatever the machine can verify by itself, it does without
asking me.** Did the tests pass? The exit code says so. Is the system up? The health endpoint returns 200 or it
doesn't. Does the screen open? An automated browser takes the screenshot.

So today, from logging the task to the development environment being live, the flow runs on its own:

> branch → code → tests → end-to-end browser tests → commit → pull request → green CI →
> merge into `dev` → deploy → health check

What is left for me is exactly what the machine cannot judge: **whether the screen does what I wanted.** The delivery
arrives with the pull request link, the CI status and a screenshot of the new screen. I look, then approve or reject.

And production has an explicit human gate. Every project has three environments: `dev`, `stg` and `prd`. Each one
accepts code from a single source: tasks go into `dev`, `dev` is promoted to `stg`, `stg` to `prd`. The first two
promotions are automatic. The last one only happens with my "approved", and changes ship in batches: if one item is
rejected, it becomes a priority fix and the whole batch waits.

## The team: roles, not "a chatbot"

An agent that does everything ends up doing everything halfway. So the work was split into **roles**, each with its
own instructions, permissions and AI model:

| Role | What it does | What it may not do |
|---|---|---|
| **Architect** | Discusses specification and architecture with me | Write code or run commands |
| **PMO** | Turns a request into a task with a description, a plan and acceptance criteria | Code |
| **Developer** | Implements the task, writes tests, opens the pull request | Keep pushing: after two attempts without green CI, it stops and reports |
| **Reviewer** | Reads the code skeptically, looking for real bugs | Change the code it reviews |
| **QA** | Runs the browser tests and captures the screen | Touch application code |
| **DevOps** | Reads the servers and diagnoses | Change infrastructure without approval: every change becomes a request with the exact command |

One detail made a real difference: **the reviewer is, whenever possible, a different model from the one that wrote
the code.** The author tends to confirm its own logic. Another model, from another vendor, catches what the first one
misses.

The one orchestrating all of this is **Maestro**, a system I am building myself (it will get its own article). It
receives the request, figures out which project it belongs to, calls the right role and holds in a single queue
everything that depends on me: approvals, questions, promotions to production. Maestro itself is developed by the
roles it orchestrates.

## The foundation: standards before speed

AI agents are great at repeating a pattern and terrible at guessing one. So a large part of the work was not code, it
was **writing the standard down**:

- **A reference architecture** for every .NET project, with code rules enforced in CI. If a project drifts from the
  standard, the pipeline fails, and it doesn't depend on someone remembering.
- **One instruction file per repository** that works for any AI tool. I used to keep one file per tool, and they
  drifted out of sync with each other.
- **Reusable pipelines**: each project has CI files a few lines long that call a shared library. Fixing a deploy
  problem means fixing it in one place.
- **Decisions recorded before they are executed.** Every architecture or infrastructure choice becomes a record with
  the reason and what it replaces. This is not bureaucracy: it is what stops next week's agent from "fixing" back a
  decision that was made on purpose.
- **Memory and handoffs.** Every session ends with a summary of what was done and what is pending. The next one
  starts by reading it, not from scratch.

## The infrastructure: cheap, mine and verifiable

Everything runs on four virtual servers, named after places in Middle-earth and split by purpose: production,
development, internal services and backup. A few choices that paid off:

- **Zero cost while there are no customers.** No new component that could send an unexpected bill. AI runs on a
  subscription, through the command line, not on a pay-per-use API key. The cost of the autonomous task queue is
  time, not money.
- **Code at home.** Active repositories moved from GitHub to a self-hosted forge. GitHub became an archive: it only
  receives the production branch, mirrored every 15 minutes.
- **Backups that pull instead of push.** The backup server fetches copies from the others, outside the main
  provider. A compromised server cannot delete its own backup.
- **Alerts on my phone.** Every monitor reports through a Telegram bot.

## What went wrong (and taught more than what went right)

**The alarm that never fired.** I had a daily audit comparing what should be running with what was actually running.
On one server it answered "no differences", every single day. I found the problem when I planted a difference on
purpose to test the alarm, and it kept saying everything was fine. The audit user had no permission to list
containers: the permission error became "zero containers", and zero against zero meant "all good". **An alarm that
has never fired is not an alarm. It is an assumption.** Today every new alert is tested by causing the failure it is
supposed to catch.

**The backup that lied.** A file backup sent a "completed without failures" message every day. It had been failing
for weeks: the image it relied on had disappeared from the public registry, and the script treated the download error
as "nothing to copy". A similar lesson: **success has to be proven, not presumed.** A backup is only good once a
restore has been tested.

**Turning it off doesn't turn it off.** I took two systems down by stopping their containers. Days later, they were
back. What resurrected them was the declaration: the configuration file and the deploy pipeline still said they
should exist. Really turning something off means removing the declaration, not the process.

**Being fast without being careful is expensive.** In one of the first projects, I asked for a specification and the
agent, enthusiastic, also created the code, the repository, the CI and the tasks. All of it had to be undone. That is
where the separation was born between the place where a project is **thought through**, which only produces
documents, and the place where it is **built**.

## What it produced

In production or close to it, among others:

- **Safra em Dia**: farm management for rural producers, operated by phone messages, with coffee traceability from
  the field to the sale;
- **Obra em Dia**: equipment and workforce control for heavy-construction contractors, which blocks assigning anyone
  with expired documents before the problem reaches the job site;
- shared support services, such as payments and an in-house UI component library.

Each one has a free trial with sample data, created and maintained by the same process described here.

## What I would take to any team

1. **Draw the line between what the machine verifies and what only a person can judge.** The gain does not come from
   AI writing code faster. It comes from no longer interrupting people with questions a check can answer.
2. **Write the standard before asking for speed.** AI amplifies what exists: with a standard, it replicates the
   standard; without one, it invents a different one for every task.
3. **Separate roles and have a reviewer who is not the author.** That holds for people and for models.
4. **Record decisions and their reasons.** It is the only defense against someone (human or not) undoing them without
   knowing why.
5. **Test your alarms.** If you have never seen an alert fire, you don't know whether it works.

In the next posts I will open up each part: Maestro from the inside, leaving GitHub, the three-environment rule, and
the story of Safra em Dia, which started as a generic ERP and became a system for coffee growers.

*Rafael Veneroso Morici · rvmtech.com.br*
