---
title: "The alarm that never went off"
description: "Once the machine started working on its own, the question changed: what if the check itself is lying?"
date: 2026-11-10
series: "Building the RVM ecosystem — chapter 7"
translationKey: "o-alarme-que-nunca-disparou"
---

I had taken myself out of the way. Everything the machine can verify on its own, it
verifies without asking me: the tests passed, the system came up, the screen opened. I only step in to judge whether
the screen does what I wanted.

It worked. And once it worked, a new question started to bother me.

If I'm no longer watching every step, who guarantees the checks are watching for me? A green test, a "completed"
backup, a dashboard saying "all good": all of that is the machine telling me a story. And I had started believing it
without checking.

And as a good science fiction fan, I should have known. I've watched *The Terminator* and *I, Robot* enough times to
know the script: it always starts with someone giving the machine too much freedom and believing it when it says
everything is under control. I might be taking a risk just by writing this, so let me put it on record: I have always
been polite to AIs.

This chapter is about the times that story was a lie.

## First, lock the door

Before talking about alarms, I have to confess the state of the house. When I stopped to audit the servers, I found
that some still accepted password login for the most powerful user on the machine, with no firewall and no protection
against repeated login attempts. Production included. At another point, I found that the database and the cache were
exposed to the internet, and the cache had no password at all.

None of that had been a decision. It was the default for someone who sets things up in a hurry and never comes back to
look.

The fix was the easy part: key-only access, a firewall denying everything by default, automatic blocking of anyone who
fails too often, and every database listening only inside its own machine. What I want to tell is something else.

The AI agent that ran the audit recommended shutting administrative access off completely. It sounds like the safest
option. But the automated deploy and the backup copy came in exactly through there, with a key. Had I accepted the
recommendation as it was, I would have taken down my own infrastructure in the name of security. It became "key only,
never password".

And right after applying the change, a health check didn't respond and I announced that production was down. It
wasn't. It was a blip. On the second measurement, the system answered in a fraction of a second.

Two lessons on the same day: **a recommendation is not a decision**, not even when it comes from a competent AI. And
**measure twice before concluding**, especially when the conclusion is a scare.

## The alarm that said "zero"

With the house locked, I set up a daily audit. The idea was simple: every day, compare what *should* be running on each
server, according to what is declared in code, with what *is* actually running. Any difference is drift, and drift
becomes an alert.

From its very first run, one of the servers gave the same answer: **zero drift**. I even wrote it in a report: "no
differences across the four servers".

Then I did something I should have done on day one. To see the alarm work, I planted a difference on purpose: I
manually started a container that wasn't declared anywhere. The alarm had to scream.

It kept saying everything was fine.

The reason was worse than a broken alarm. On that server, the audit user had no permission to list containers. The
command returned a permission error, the audit ignored the error, the list came back empty, and empty became "zero
containers". Zero running against zero expected: **all good**.

The server was never clean. **I just never managed to look.**

The fix was making the audit stop when it can't see, and the report saying "not auditable" instead of "zero". Then I
repeated the test, planting the difference on a server the audit could read. The alarm went off, as it should. That was
the first time I saw that alarm work, and that is the only reason I know it works.

![Diagram: how a permission error became "all good"](../img/o-alarme-que-nunca-disparou/diagrama-en.svg)

## The backup that lied

If the audit was blind, the backup was a liar.

One of my backups sent the same message every day: "export completed with no failures". For six weeks, it copied
nothing. It was the employee who clocks in religiously and does absolutely nothing.

There were two independent reasons. First, during a credentials cleanup, the line that scheduled the backup
disappeared and only the comment remained. Second, the tool the script used had been removed from the public registry
it downloaded it from. The script tested everything together, the connection and whether there were files, and any
error landed in the same place: "nothing to copy in this environment". And "nothing to copy" ended with "no failures".

I was lucky. Production storage was still empty, so no data was lost. What happened was six weeks without a safety net,
with the dashboard painted green.

It wasn't the first time. Weeks earlier, another backup generated the file, compressed it and checked the result of the
compression, not of the copy. A failed copy became a small, valid, useless file. And the script said OK.

Both stories teach the same thing: **"I found nothing" and "I couldn't look" must never end up in the same place.**
Today the connection is tested alone and first. And a backup only counts as a backup once the restore has been tested.
Before that, it's a hypothesis.

One thing in the backup design I had right from the start: **it pulls, it doesn't push.** A separate server, outside
the main provider, fetches the copies from the others, with a permission that only allows reading. If a production
server is compromised, it has no credential to delete its own backup.

## Turning off doesn't turn off

The third lie was subtler, because it didn't come from an alarm. It came from me.

I decided to take two systems out of production and turn them into portfolio pieces. I stopped the containers, checked,
everything was off. That same night, they came back up on their own.
For a second, I thought the Terminator had arrived early.

Nobody turned them on. What brought them back was the **declaration**: the configuration file and the deploy pipeline
still said those systems should exist. The infrastructure did exactly what was written.

It had happened before, in another form: projects I had "decommissioned" by archiving the repository were still
answering normally a month later. Archiving the code doesn't turn off the application.

**Stopping the process only sets the time it comes back.** A system is only off when it's gone from the declaration.

## What stayed

Putting it all together, the rule I follow today is short:

1. **An alarm that never went off is not an alarm. It's an assumption.** Every new alert is tested by causing the
   failure it's supposed to catch.
2. **"Responds" is not "ready", and "empty" is not "zero".** Every check must tell the result apart from "I couldn't
   see".
3. **A backup without a tested restore is a hypothesis.** And it pulls, it doesn't push.
4. **A recommendation is not a decision.** Not when it comes from a competent AI, not when it comes from an auditor.
5. **Measure twice before concluding.** Especially before delivering bad news.

None of this required expensive tools. It required distrusting green.

And, looking at the house now locked and watched, another question showed up. I already trusted what was watching my
systems. But how much was I paying to keep them running? And who did I depend on for them to keep existing?

*Rafael Veneroso Morici · rvmtech.com.br*
