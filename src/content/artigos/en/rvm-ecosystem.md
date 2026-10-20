---
title: "One person, twenty-something systems"
description: "The series finale: the road from a rideshare sign-up form to a team of AI agents, what exists today and what I'd take anywhere"
date: 2026-11-19
series: "Building the RVM ecosystem — chapter 10 (closing)"
translationKey: "ecossistema"
---

On the day I opened the sign-up form to become a rideshare driver, I had no system in production. I had an idea for
small farmers, twenty-five "no"s and a thirty-day deadline I had made up myself.

This is the last chapter of this season (yes, I talk like a streaming show now). I won't tell anything new about how the pieces work: that stayed in the earlier
chapters. I want to do what we rarely do in the middle of the work: stop, look back and see the whole road.

## The road, chapter by chapter

Rereading the series, I notice each chapter was born from the problem the previous one created.

- **Chapter 1:** Cigana Sarah, built for fun and for learning, was the first system to talk to real people. I
  learned that AI doesn't obey everything the prompt forbids: a rule that matters becomes code.
- **Chapter 2:** I swapped ChatGPT copy-and-paste for an agent that reads the whole project, and Safra em Dia was ready
  before the deadline. New problem: I had speed, but no method.
- **Chapter 3:** my father's spreadsheet became Obra em Dia in a few days. The lesson was that a system's best rule is
  the one that blocks the mistake before it happens. New problem: two systems, each built a different way.
- **Chapter 4:** the projects multiplied and the one on autopilot was me, accepting everything the AI suggested. The
  way out was preparation: the whole project's specification before the code, and the place to think separate from
  the place to build.
- **Chapter 5:** I thought it was solved, but every project was born with different parts, and I was Dr. Frankenstein.
  I standardized everything: the same stack, my own component library and a single architecture, with vertical slices
  and a domain at the center. That is what lets the AI repeat the pattern instead of inventing one.
- **Chapter 6:** I became the bottleneck, and got out of it with the line between what the machine verifies and what only I can judge. Everything up to the development
  environment runs on its own; production waits for my "approved".
- **Chapter 7:** the alarm that never went off and the backup that lied. I learned to distrust every "all good" that
  was never put to the test.
- **Chapter 8:** zero cost while there are no clients, and code on my own forge. The house got in order.
- **Chapter 9:** I stopped conducting every session. Six roles, each with its own model, and a single queue where
  things wait for me.

From a distance, it wasn't a plan. It was a sequence of bottlenecks, each solved the simplest way I could at the time,
and each solution revealing the next bottleneck. If anyone asks, I'll say it was all strategy. Between us: it
wasn't.

## What exists today

What were two systems became an ecosystem. Today's numbers:

- **twenty-something systems**, between products, support services and internal tools;
- **four servers**, split by function: production, development and staging, internal services and backup;
- **six AI roles** working through a queue, and one person approving what goes to production. If it were a company,
  the org chart would show six tireless interns and one boss who needs to sleep.

On the map, things fall into four layers:

**Products**, what someone from the outside uses. Safra em Dia, for small farmers. Obra em Dia, for heavy construction
companies. Binder, a free catalog of collectible cards. And, in development, Modelagem:
a garment pattern editor that runs in the browser, for people who draft clothing patterns.

**Support services**, which no user sees but every product uses: a payments service, my own visual component library,
a portal, still being planned, for future clients to follow their contract, tasks and sign-off, and the testimonials that show up on my résumé.

**Process**, what makes all of this move with a single person: the written standard, the reusable pipelines, the
three-environment rule, the memory handed from one session to the next, and the Maestro conducting the roles.

**Infrastructure**, holding up the rest: my own forge, the servers, the backup that pulls the copies, the alerts on my
phone.

![The RVM environment: code is born in the forge, ships itself to staging and only reaches production with my approval](../img/ecossistema/diagrama-en.svg)

## What I'd take anywhere

If I had to sum up the whole series in a few sentences, these would be them. Each one cost a chapter.

1. **Build something.** A system in production speaks louder than any list of technologies on a résumé (chapters 0
   and 1).
2. **Block the mistake before it happens.** It's cheaper than fixing it afterwards, in code and in people (chapter 3).
3. **Write the standard before asking for speed.** AI amplifies what exists: with a standard it replicates the
   standard; without one, it invents a different one for every task (chapter 4).
4. **Draw the line between what the machine verifies and what only a person judges.** The gain isn't AI writing
   faster, it's no longer interrupting people with questions a check can answer (chapter 6).
5. **Test your alarms and your brakes.** If you've never seen it fire, you don't know if it works (chapters 5 and 7).
6. **Know what it costs before you turn it on.** No new piece that can send an unannounced bill (chapter 8).
7. **Role before tool, and a reviewer who isn't the author.** It works for models and it works for people (chapter 9).

And one that runs through all of them: **record the decisions and the reason.** It's what stopped next week's session,
mine or an agent's, from "fixing" back a choice that had been made on purpose.

## What AI didn't do

It's worth repeating what I said at the start, because after ten chapters about agents it's easy to forget.

AI wrote most of the code in this ecosystem. But no agent decided that a farmer needed a warning when about to sell
below cost, or that assigning someone with an expired document had to be blocked, or that production only gets changes
with my "approved". **What to build, for whom and why is still people's work.** What changed is that today one person
can carry that judgment all the way through, without needing a whole team to execute it.

## What comes next

The ecosystem isn't finished. A few fronts are already on the table:

- the Maestro opening a whole new project on its own, from request to first deploy, with my approval at the points that
  matter;
- the first systems built under contract for clients, followed through the portal;
- and this series itself, which becomes an articles section on my site and keeps going after this
  chapter, with new stories.

## If you're where I was

In chapter 0, I ended by saying I almost gave up, and that I'm glad I opened the terminal before finishing that form.

Ten chapters later, I'd add one thing. Opening the terminal was the beginning. What made the difference was not
stopping at the first system that worked: looking at the next bottleneck, solving it the simplest way possible,
writing down what I learned, and repeating.

If you're at interview number twenty-five, you don't need twenty-something systems. You need the first one. The rest
comes one bottleneck at a time.

*Rafael Veneroso Morici · rvmtech.com.br*
