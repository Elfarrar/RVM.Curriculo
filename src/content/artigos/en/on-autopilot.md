---
title: "I was the one on autopilot, not the AI"
description: "When AI started building faster than I could think, the one who needed a method was me"
date: 2026-10-29
series: "Building the RVM ecosystem — chapter 4"
translationKey: "no-automatico"
---

Everyone is afraid of AI on autopilot. In my case, the one on autopilot was me.

Two systems in production and a new job. That should have been the happy ending.

It was the beginning of the mess.

## One idea a week

When you find out you can take a system off paper in days instead of months, something dangerous happens: every
idea starts to look doable.

A WhatsApp quoting tool for service providers. Invoice issuing. A payments service any project could use. A suite
for small business owners. Each idea became a new folder, and each folder became a half-finished system. My projects folder looked like that
drawer of cables every house has: everything useful, nothing matching.

And I built every one of them. Riding the excitement, one after another, without stopping to think about what each
one needed to be.

## The loose request

At that stage, I asked the way the idea came to me. One sentence in the terminal, sometimes in the middle of another
task: "build a quote system", "create the payments part". Without saying what already existed, what should stay out,
or where the job ended.

The AI did it. Fast, well written, and the way it thought was reasonable. The problem is that its idea of reasonable
changed with every request, because my request changed too. I wasn't driving; I was just flooring the gas pedal and
hoping the road would take the curve by itself.

And I accepted it. The AI suggested a structure, and I went: "sure". It suggested a library: "sure". One more
screen? "Sure, why not." The one on autopilot wasn't the AI. It was me, accepting everything without even looking
at the map.

And when the request is loose, the AI fills in the rest on its own. Sometimes it fills in a little too much.

## The agent that built too much

On one of those new projects, I asked for something simple: the specification. The document saying what the system
does, for whom, with which screens and which data.

When I came back, the agent had delivered the specification. And the code skeleton. And the repository. And the
continuous integration pipeline. And the task list, registered.

It was excited. I was worried. I had asked for the blueprint of the house and got the house already built,
furnished and painted a color I would never have picked.

None of it had been thought through. I hadn't even read the specification yet, and there was already code following
decisions I hadn't made. Undoing it all took more work than doing it right would have.

It wasn't the agent's fault. It did exactly what the environment allowed. **I had never told it where its job
ended.**

## Something was missing, but what?

I already had a tool that sped up development like nothing I had used before. Even so, something didn't add up. The
agent ran, and I ran after it, cleaning up whatever it had built too much of.

The answer came from where I least expected: a documentary about Ayrton Senna, [*O Direito de Vencer*](https://www.youtube.com/watch?v=MfzQ2B47xns) ("The
Right to Win"). What caught me wasn't Senna flooring it, it was what came before. Gerhard Berger describes the
qualifying-lap ritual: sitting in the garage, eyes on the monitor, talking to the engineer about the wind, the sun, the
track temperature. Only when the engineer said "go" did he flip the switch and enter another world. And Nuno Cobra,
his trainer, sums it up in one sentence: Senna was far better prepared than the others. On the track, speed was a
consequence. The real work had been done before.

That was the click: what was missing was **preparation**.

And it wasn't a new idea. Scrum, which many people know as "that pile of meetings", got its name from a 1986 article
that studied how Japanese companies developed products, and it drinks from the same well as Toyota's lean
manufacturing. There is a word for this there: **nemawashi**. Literally, it means preparing a tree's roots before
transplanting it. In practice, it means talking, aligning and deciding before touching anything. When the decision
finally comes, it's fast, because the ground is already ready.

I was doing the opposite. I handed the agent a tree with no roots and expected it to take. It planted it, with all
the speed in the world, in the wrong place.

From then on, the rule changed: before any line of code, the plan. What will be done, what stays out, and how I'll
know it worked.

## The specification before the code

In practice, preparation became a document: the specification of the whole project, written before the first line
of code. What the system does, for whom, with which screens and which data, what stays out, and in what order
things will be built.

With it in hand, the AI stopped guessing. It knew what to build from start to finish, and I knew how to check that
it had worked.
Inside each project, there was finally a map.

## Thinking is not building

The lesson of the agent that built too much became the most important rule of that period: **the place where you
think about a project is not the place where you build it.**

I created a workspace just for thinking. Specifications are born there, course corrections are discussed there,
adjustment documents live there. And only text comes out of it. No code, no repository, no deploy.

Building is done by another session, opened inside the project's own workspace, which reads the specification and
executes it.

And, so it wouldn't depend on memory (mine or the AI's), the path became three executable playbooks, the *skills*:

1. **New project:** structured questions by category (scope, users, features, integrations) and the full
   specification.
2. **Bootstrap:** from the specification to the first deploy. Repository, code skeleton, pipeline, environments,
   monitoring.
3. **Develop:** from there to the end of the roadmap, one task at a time.

Each step starts where the previous one ends, and none invades another. The specification doesn't create code. The
bootstrap doesn't invent features. Development does nothing beyond the plan without first going back to the
thinking table.

![Before and after: from loose folders to a three-step path](../img/no-automatico/diagrama-en.svg)

## What changed

With the specification before the code, rework dropped right away. The agent stopped delivering a furnished house
when I asked for the blueprint, because the blueprint now had a place, an owner and a time to be made. Every new
project left the drawing board knowing where it was going.

Problem solved. At least, part of it.

## If you're building with AI

1. **Prepare before you speed up.** Specify the whole project before asking for the first line of code. AI runs in
   the direction you point; if you don't point, it chooses.
2. **Be suspicious of your own "sure".** Accepting everything the AI suggests is being on autopilot, just on this
   side of the screen.
3. **Say where the job ends.** The agent that builds too much isn't disobedient; it just doesn't know where the
   boundary is. Thinking and building are different places.
4. **Turn the process into a playbook, not a memory.** Whatever depends on someone remembering, someone will
   eventually forget.

*Rafael Veneroso Morici · rvmtech.com.br*
