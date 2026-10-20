---
title: "From shovel to excavator"
description: "The thirty days in which I learned to build with AI, and the generic ERP that became a system for coffee growers"
date: 2026-10-22
series: "Building the RVM ecosystem — chapter 2"
translationKey: "da-pa-a-escavadeira"
---

Sarah was the lab. The serious project ran alongside her: the system I had promised myself to finish in thirty days.
Did I make it?

Sort of, and here's why, and along the way I'll also tell you about the tools I used during those thirty days and
what each one changed in the way I work.

**Spoiler Alert:** AI isn't magic.

## The first idea was wrong

The system I had in mind wasn't born for farmers. It was born as a generic ERP: sales, inventory, finance, the bundle
every small business needs.

And that was exactly the problem. A generic ERP competes with dozens of big, well-known products. Working alone, I had
no reason to offer anyone for switching from what they already used to mine.

The turning point came from inside the family. My uncle grows coffee and produces honey and olive oil. Like most
small farmers, he kept track of everything in a spreadsheet (when he kept track at all). Talking to him, it became
clear that small farmers have problems a generic system doesn't solve: cost per field plot, the crop cycle, the batch
that leaves the harvest and has to be traced all the way to the sale, the rural tax report the accountant asks for
every year.

So I changed the target. Out went the ERP for everyone; in came the system for the small farmer.

And I made a decision that scared me at the time: instead of patching the generic system, I opened a new repository
from scratch, reusing only what I had learned about architecture. Adapted old code drags baggage along. I wanted a
product that looked like a farm product from the very first screen. Throwing away code that works hurts almost as much as stepping on a
Lego barefoot, but you get over it.

## The shovel: copy and paste

I started in the simplest possible way: ChatGPT in the browser.

The loop was always the same. I described what I needed and got a file back. I copied it, pasted it into the project,
built it. Error. I copied the error, pasted it back into the chat, got the fix. Copied again.

It worked. But look at who was doing the real work: me. I was the messenger between the AI and the project. It never
saw the whole project, only the piece I remembered to paste. If a file depended on another one it hadn't seen, it
imagined what that other file should look like, and the mistake only showed up at build time.

It was a shovel. A good shovel, but every move depended on my arm. If there were a Ctrl+C / Ctrl+V championship, I
would have made the podium that month.

## Halfway there: two agents and a courier

The next step was taking the AI to the command line. And there it was already a real agent: it read the project's
files, ran commands, tested.

For a while, I worked with two of them, Codex and Gemini, each with its own job: one wrote the code; the other tested
it in the browser and collected the evidence. Each did its own job on its own. What neither did was talk to the other.

That bridge was me. I wrote an instructions file for each and kept a plain-text task board with rules for moving every
card. When the tester found a bug, I was the one carrying the message to the one writing code. It was almost a team,
but the manager, the courier and the inspector were the same person. And that person, let's be honest, wasn't
getting paid overtime.

The agents were already digging on their own. The loop between them still went through my hands.

## The excavator: a single loop

Then I decided to try Claude Code on the same command line, on the same tasks. The difference in the results was
huge: the code came out right far more often on the first try, the agent understood the whole project and made far
fewer mistakes. I switched tools right there.

But it didn't become an excavator on day one. I started using Claude as just another terminal tool, the way I already
worked. I kept researching, trying different ways of organizing the work and tightening the loose ends, one at a time.
Until I realized the real gain was in **who closes the loop**.

With the whole loop in one place, the agent reads the project, writes the code, builds, runs the tests, opens the
browser to check the screen, reads its own error, fixes it and runs again. I only step in when there is a decision to
make or a result to check. (Codex, by the way, didn't leave the story: today it reviews my code. Maybe I'll tell that story
in a future post.)

![On the left, every turn of the loop goes through my hands; on the right, the agent closes the loop by itself and I only decide and check](../img/da-pa-a-escavadeira/diagrama-en.svg)

Before, every turn went through my hands. Now the loop runs many turns on its own and hands me the result.
It's not that the excavator digs faster with
the same arm. It's that it doesn't depend on the arm.

## What came out of that month

The new repository was born in a single day. One week and 253 commits later, the first version was in production.

It covered what my uncle needed most: registering the farm and its plots, harvests generating batches, inventory by
batch, sales, expenses already classified the way the accountant needs them, a dashboard designed for the phone, and
the part I was proudest of: logging by message. The farmer writes something like "spent 300 on fertilizer in the upper
plot" and the system records it.

Today it's called Safra em Dia, and it has gone far beyond that version. Coffee, in particular, got a chapter of its
own: the trail of each batch through every stage (drying yard, dryer, resting), sorting by density at the end of
processing, the cost of each batch split per sack.

## What a real user taught me

One detail of this story stuck with me. When the system started being used for testing, bugs showed up that had already
been sitting in the generic ERP: calls to the wrong address, login sessions getting lost, lists that didn't paginate.
Nobody had noticed because nobody really used that system.

**Software without users isn't done. It just hasn't broken in front of anyone yet.**

## If you're just starting out

1. **Pick a real user before you pick the technology.** My system only got good when it stopped being "for everyone"
   and became a system for one person, with one farm and one spreadsheet.
2. **Notice who is closing the loop.** If every error has to go through your hands to get back to the AI, you are the
   bottleneck. The tool that speeds you up the most is the one that runs the tests by itself.
3. **Don't be afraid to start over with what you've learned.** Throwing the code away cost less than carrying its
   baggage.

With the system live, I thought I'd get some rest. There wasn't time. Soon after, my father showed me a spreadsheet,
but that one's for another time!

*Rafael Veneroso Morici · rvmtech.com.br*
