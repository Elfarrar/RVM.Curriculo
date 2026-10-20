---
title: "My father's spreadsheet"
description: "My second system built with AI taught me that it does exactly what you ask, and that's where the danger lies"
date: 2026-10-27
series: "Building the RVM ecosystem — chapter 3"
translationKey: "a-planilha-do-meu-pai"
---

My father is a guy who keeps his distance from technology, and he works on remote sites, opening roads. Not a
building in the city, with the crew going home at the end of the day. Remote sites, machines moving back and forth
between work fronts, people lodged near the site, and more paperwork than even the most organized person can keep up
with.

And out there, at the far end, all the control was done in a spreadsheet. And it didn't have a single owner.
Several people opened and changed the same file, with no history of who changed what. When a number showed up wrong,
there was no way to know where it had come from. It was the kind of file that, if it had an honest name, would be
called "control_FINAL_v3_this_time_for_real.xlsx".

What he needed fit in one sentence: a system that wouldn't let anyone send a person or a machine to the site if they
weren't fit to go. One that would stop the mistake at the office desk, where it costs a click, and not on site, where
it costs a lot. That's how Obra em Dia was born.

## This time, I knew the way

With Safra em Dia, I had spent thirty days learning to work with AI. With my father's system, that learning was
already paid for. In a few days, the spec was written and the system was live.

What changed wasn't the AI getting faster. I was the one who got clearer. I knew how to describe what I wanted, in
which order to ask, and when the answer was wrong. The tool multiplies what you bring to it; this time, I was bringing
more.

And it was precisely because I felt confident that I fell into the next trap.

## AI does exactly what you ask

That's the good side and the dangerous side at the same time. I asked for a system that blocked anyone with an
expired document. The AI delivered a system that blocked anyone with an expired document. Flawless. Tests passing,
nice screens, all green.

With the system working, I sat down with my father to review it end to end. Most of it was right, including how much
each day of lodging costs, which he described off the top of his head.

But the first version had a hole, and a serious one: **anyone who had never handed in the document went straight
through.** There was nothing expired to check. The most dangerous case, the person who hadn't handed in anything, was
exactly the one slipping by.

The AI didn't make a mistake. I was the one who had asked for the wrong thing. And no test was going to catch it,
because the tests checked exactly what I had specified. The one who caught it was a guy who keeps his distance from
technology, sitting next to me, looking at the screen with suspicion. (Maybe that's why he caught it.)

![The loop: I write the spec, the AI implements exactly what was asked, the tests check what was asked, and only the real user reveals the missing case, which comes back as a better spec](../img/a-planilha-do-meu-pai/diagrama-en.svg)

## Listening to the user isn't doing everything they ask

The same review brought his suggestions. Some went in right away. Others I turned down, explaining why: the solution
he had in mind solved his problem by creating three others. What he really needed fit in a report, not in a change to
the system's structure.

Listening to the user isn't doing everything they ask. It's understanding what they need and delivering that. Even
when the user is your father. Especially when it's your father.

And the opposite care matters too: a system that blocks too much gets worked around, and a system that gets worked
around is worse than a spreadsheet.

## What I take from it

1. **The tool multiplies what you bring to it.** Clarity in the request is worth more than speed in the answer.
2. **AI implements what you specified, not what you meant.** If the request has a hole, the delivery will have the
   same hole, just better written.
3. **Review it with whoever will use it.** A green test proves the system does what you asked. Only the user proves
   you asked for the right thing.
4. **Calibrate.** Block too little and the mistake gets through; block too much and people find a way around it.

## Two systems, and more coming

With two systems live and the new job, I thought I had found my rhythm. Project ideas started arriving one after
another and I said yes to almost all of them. With an excavator in your hands, every problem looks like a hole to dig.

But every project was born its own way: a different deploy, a different way of storing passwords, a different code
organization. Obra em Dia itself ended up rebuilt from scratch a few weeks later, following a standard I didn't yet
have when I started it.

Without noticing, I had slipped into autopilot.

*Rafael Veneroso Morici · rvmtech.com.br*
