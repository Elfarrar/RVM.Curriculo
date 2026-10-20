---
title: "I became the bottleneck"
description: "The AI wasn't the bottleneck. I was. How I stopped rubber-stamping every step and found out which decision was really mine"
date: 2026-11-05
series: "Building the RVM ecosystem — chapter 6"
translationKey: "virei-o-gargalo"
---

I had given the AI a map: a written standard, an architecture to repeat, a place to think and another place to
build. It followed the map perfectly.

It was like having a brilliant, tireless intern who wrote in minutes what would take me an afternoon. Except he
stopped at every step to ask.

"Can I create the branch?" "Can I run the tests?" "Can I open the pull request?" "Can I deploy?"

And I answered. Yes, yes, go ahead, go ahead. I had become a one-man notary office, open 24 hours.

That's when I understood something uncomfortable: **the AI wasn't the bottleneck. I was.**

## Dozens of "go ahead"s

One day I did the math. On an average task, from the start until the system was running in the development
environment, I was interrupted **dozens of times**.

And looking at the questions, almost none of them required a decision from me. "Tests passed, can I commit?" The
tests passed. It knew that before I did. "The deploy finished, can I check whether the system is up?" Of course it
can. Was that what I was there for? I had become a rubber stamp on a developer's salary.

The problem wasn't the AI being insecure. It was the process not saying **what it could decide on its own** and
**what only I can judge**. While that boundary didn't exist, everything went through me, including what didn't need
to.

## One sentence that changed the process

In September, I wrote the rule that changed everything. It fits in one sentence:

**Whatever the machine can check on its own, it does without asking me.**

And the machine can check a lot:

- **Did the tests pass?** The exit code says so. Zero is yes, any other number is no. No opinion needed.
- **Is the system up?** Every system has a health endpoint. Either it answers that it's fine, or it doesn't.
- **Does the screen work?** An automated browser opens the system, clicks, fills in, checks the result. That's the
  end-to-end test.
- **What does the screen look like?** The same browser takes a picture of the new screen.

So today, from registering the task to the system running in development, the flow runs on its own:

> branch → code → tests → end-to-end test → commit → pull request → green pipeline → merge into
> development → deploy → health check

Nobody asks me anything along the way. And not because I trust blindly: because every step has a check that doesn't
depend on me.

## What was left for me

When I took away everything the machine knows how to check, only one thing was left. The most important one.

**Whether the screen does what I wanted.**

No test answers that. The test checks that the button saves. It doesn't check whether the button should be there,
whether the text makes sense to whoever is going to use it, whether that flow is what the farmer or the site foreman
really need.

That's why the delivery always arrives the same way: what was done, the pull request link, the pipeline status and
**a screenshot of the new screen**. I look and say "approved" or "rejected".

Without a screenshot of the screen that changed, the delivery isn't complete. Green tests and the wrong screen is the
worst combination: everything looks right and nothing is.

And the AI also has a limit on insisting. If the pipeline is still red after two fix attempts, it stops and shows me
the error. Insisting alone on a failure you don't understand is just digging the hole deeper. I know this well, because I spent a good part of my
career doing exactly that.

## Three environments, one door at a time

Autonomy without rails is just speed. The rails came right after: **every project now has three environments**, with
the same names everywhere.

- **dev**: development. Where every task lands first.
- **stg**: staging. It runs the same code that goes to production, and it's where I validate.
- **prd**: production. The version that stays live for whoever opens the system.

And the rule that makes it predictable: **each environment accepts code from a single source.** Tasks go into `dev`.
`dev` moves up to `stg`. `stg` moves up to `prd`. There's no shortcut from a task straight to production, nor from
`dev` straight to `prd`.

The first two promotions are automatic. The last one only happens with my "approved".

![The flow: everything automatic up to staging; production only with my sign-off](../img/virei-o-gargalo/diagrama-en.svg)

## Batch promotion

At first, I approved task by task. It soon became another queue of interruptions, now at the end of the process.
I had just moved the traffic jam somewhere else.

Today production receives changes **in batches**. A single message with everything that changed since the last
promotion: the tasks, the pull requests, the screenshots. I read it, and one "approved" ships the whole batch.

And if an item is wrong? It isn't reverted in a hurry. It becomes a **priority fix**, with the new specification of
what I want, and the batch waits. Nothing ships until the fix passes staging and I approve again.

It looks slower. In practice, it's faster: I stop once per batch, not once per task.

## The question that remained

With all of this running, the machine started working alone for hours. I'd come in, look at the screenshots, approve
the batch. It worked.

Until a question started bothering me.

If the whole process rests on automatic checks, what happens **when the check itself lies**? When the test says green
and it isn't? When the alarm says "all good" and it isn't?

I was about to find out the hard way.

## If you want to give AI autonomy

1. **Draw the line between what the machine checks and what only you judge.** The gain doesn't come from AI writing
   code faster. It comes from no longer interrupting people with questions a check can answer.
2. **Require proof with the delivery.** Link, pipeline status and a screenshot. If you need to open five tabs to
   approve, the delivery is incomplete.
3. **One source per environment.** The road to production should be a corridor, not a maze.

*Rafael Veneroso Morici · rvmtech.com.br*
