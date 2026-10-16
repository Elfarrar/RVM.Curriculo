---
title: "AI saved my career"
description: "From almost giving up on tech to two systems in production and a new job working with AI"
date: 2026-10-16
series: "Building the RVM ecosystem — part 0 (the origin)"
translationKey: ia-salvou
---

Yes, I thought about giving up on my career.

And I don't mean a Sunday-night crisis. I mean the day I caught myself filling out the sign-up form to become a
rideshare driver, thinking that maybe tech was over for me.

But to understand how I got there, I need to go back a little.

## A truckload of money

At the end of 2025, I got a very good offer: working on a system that regulates sports-betting rules across several
countries. High salary, big project, a nice name on the résumé.

But not everything is roses. What made me leave doesn't matter here, but I left. I walked away from a truckload of
money to keep my mental health. I would do it again.

And that is how, for the first time in many years, I found myself unemployed.

## The confession I will deny to my grave

If you ask me this in person, I will deny it to my grave. But here it is: we in tech think we are rock stars. There is
always an opening, always a recruiter in the inbox, always someone who needs a developer.

What we forget is that, to be in demand, you have to be at the cutting edge. And that was my mistake. I spent almost
seven years at the same job and thought my life was set. I learned new things when I needed something, not because I
needed to stay relevant. I let my mind settle.

When I went back to the market, the market had moved on without me.

## Twenty-five "no"s

Rejection after rejection. Sometimes not even a rejection: just silence, which is very common in our field, but it
hurts all the same.

Twenty days went by and the worry started to set in. After **twenty-five interviews**, I no longer believed in myself.
Every "unfortunately, we decided to move forward with another candidate" seemed to confirm what I was already
thinking: I had been left behind.

That is when I opened the rideshare sign-up form.

## Thirty days

Before finishing that form, I remembered a system I had been thinking about for a while: a tool for small farmers to
keep track of their crops, costs and sales, in a way they could actually use, on their phone.

And I set myself a goal: **finish it in one month.**

It was an absurd goal for one person. To hit it, I would have to move faster than I ever had. So I did something I
had always looked at with some suspicion: I brought artificial intelligence in to work with me.

I started in the simplest possible way, with ChatGPT in the browser. I asked for a file, it handed it over. I copied,
pasted, tested, came back with the error. Asked for the next one. It was manual labor, but it worked. And with every
file that worked, something fell back into place: **my confidence.**

With confidence came the urge to improve the process. Copy and paste was no longer enough. I moved to the command
line, and from there to **Claude Code**, an AI that didn't just suggest code but read the whole project, ran the
tests, found the bug and fixed it, while I decided what to build.

It was like trading a shovel for an excavator.

**Before the deadline, the system was done.** Today it is called [Safra em Dia](https://safraemdia.com.br/) and it is
far more robust than that first version: it traces coffee from the field to the sale, warns farmers before they sell
below cost and accepts entries by voice message on their phone.

## My father's spreadsheet

A few days later, my father complained about the lack of control at his work: job sites, machines coming and going,
crews moving between work fronts, all in a spreadsheet nobody could keep up to date.

I already knew the way. **In a few days, I had another system live**:
[Obra em Dia](https://appobraemdia.com.br/), which tracks machines and people on construction sites and blocks
assigning anyone with expired documents before the problem reaches the site.

Two systems in production, built by one person, in a time frame I would have called impossible a year earlier.

## The "yes"

Then, a few days later, came the "yes" I had been waiting for through twenty-five interviews.

I landed a new job. And not just any job: today I work **with AI**. The same tool I had reached for in a moment of
desperation became the center of my profession.

I don't think that was a coincidence. I didn't walk into that interview saying "I know how to use AI". I walked in
showing two systems in production and explaining how I had built each one. **AI didn't get me the job. It gave me
something to show.**

## What the new job taught me (and I took home)

The best part came afterwards. At work, I started spending my days with people who use AI every day, at scale, with
a process. And I learned a lot, fast. Much of it I brought straight into my own environment:

- **Everything on Linux, even on Windows.** I moved my entire environment to **WSL**, the Linux that runs inside
  Windows. AI agents work much better in a Linux terminal, and now my computer and my servers speak the same language:
  same scripts, same tools, same behavior. No more "works on my machine".
- **AI with a defined role, not a chat that does everything.** I split the work into roles: one agent plans, another
  codes, another reviews (ideally a different model, one that won't just confirm the author's logic), another tests in
  the browser. Each with its own permissions.
- **A single source of instructions.** Every project has one file telling the AIs how to work on it, and that file
  works for any tool, whether Claude, Codex or another.
- **The machine verifies, I decide.** Everything that can be checked automatically (tests, deploys, whether the system
  came up, the screenshot) runs without asking me. What is left for me is what only a person can judge. And
  production only gets changes with my sign-off.

What were two systems became an ecosystem: more than twenty repositories following the same standard, four servers
and a "team" of AI agents that I orchestrate myself. I'll explain how it all works in the next post.

## If you are where I was

If you are at interview number twenty-five, with the rideshare sign-up open in another tab, I want to tell you three
things:

1. **The market didn't forget you, it just moved on.** And you can catch up. Faster than it seems.
2. **Stop sending only résumés. Build something.** A system in production speaks louder than any list of
   technologies. Today, with AI, one person can build what used to take a team.
3. **Use AI as a lever, not a crutch.** It sped up my work in ways I never imagined, but deciding what to build, for
   whom and why was still on me. That is the part nobody automates.

I almost gave up. Good thing that, before finishing that sign-up form, I opened the terminal.

*Rafael Veneroso Morici · rvmtech.com.br*
