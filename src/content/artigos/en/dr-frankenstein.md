---
title: "I was Dr. Frankenstein"
description: "The architecture that shut down the monster factory: vertical slices, a domain at the center and no middleman"
date: 2026-11-03
series: "Building the RVM ecosystem — chapter 5"
translationKey: "dr-frankenstein"
---

With the specification before the code, I thought I had solved the problem. Every new project was born with a map,
the AI knew what to build from start to finish, and rework had plummeted. Mission accomplished, right?

Wrong. Each project was well thought out, but thought out on its own. And each one was born its own way.

One deployed with a script. Another with a different script, similar but not the same. One kept the database
password in a file, another somewhere else. One used one architecture, the next used whatever looked better that
week. Each project also had its own particular way of breaking, and I only found out which one when it broke.

On the screens, same story: one system had a rounded blue button, another a square gray one, and the third
whatever the AI found pretty that day.

I didn't have an ecosystem. I had a handful of projects that happened to share an owner.

They worked. But up close, they were creatures stitched together from parts that didn't match. I was Dr.
Frankenstein, and every new project brought another monster to life.

My monster didn't escape through the window. It did something worse: it confused the AI. When the one writing code
is an AI, architecture stops being just a matter of technical taste. It decides whether the agent gets it right the
first time or invents a new way on every task, and an agent looking at three different monsters learns three
different ways to get it wrong.

What shut down the monster factory was a single mold for every project.

## Write the standard before asking for speed

So I stopped writing code for a while and started writing something else: **the standard.**

AI agents are great at repeating a pattern and terrible at guessing one. If there's no pattern, they invent a
different one for every task, and every one of them looks reasonable. That was exactly what was happening to me, only at ecosystem scale.

So I wrote down, in one place:

- **The stack for every project.** Same language, same database, same way of packaging and shipping. A new project
  doesn't choose technology; it inherits it.
- **A reference architecture.** One of the systems already in production became the mold, and the others started
  following the same way of organizing code.
- **One face.** I started my own visual component library, still under construction, so that every system has the
  same buttons, forms and screens. And I keep a public Design System as a showcase of the way I build components.
  No more buttons picked according to the mood of the day.
- **Explicit code rules.** There are seven today. What a machine can check goes into the pipeline; what takes
  judgment stays with the review. If a rule depends on someone remembering it, it isn't a rule.
- **One instructions file per repository.** How AI should work on that project, what it can do, what it can't, what
  has already been decided and why. A single file that works for any AI tool.
- **Decisions recorded before they're executed.** Every important choice gets a record with the reason and what it
  replaces. It looks like bureaucracy until the day an agent "fixes" back a decision that was made on purpose.

Of all these items, the one that changed the AI's life the most was the architecture.

## The plates and the cake

Picture a three-layer cake: sponge, filling, frosting. There are two ways to serve it.

In the first, you serve all the sponge first, then all the filling, then all the frosting. Each layer on a different
plate. To eat a real piece, you have to put three plates together.

In the second, you cut a **slice**. Each slice has a bit of every layer, and it is a complete piece you can eat on its
own.

Most systems I worked on in my career were organized the first way: one folder with all the screens, another with
all the rules, another with all the database access. To change one feature, you opened three, four, five folders, and
hoped you didn't forget any. (Spoiler: one always got left behind, and I only found out in production.)

The standard I adopted is the second: **Vertical Slice Architecture**. Each feature of the system ("register a field",
"assign a person to a site", "close the month") is a slice: **a single file** with everything it needs. The route that
receives the request, the shape of the input, the validation, the code that runs and the shape of the response.

Reading that file is understanding the whole feature.

## Why this matters for AI

A typical task in my workflow is "add such-and-such feature". With vertical slices, it becomes **creating a new file**
that follows the shape of its neighbors. For the agent, that means little context (it reads the slice next door and
the rule it will use), a pattern that's easy to copy (seen one slice, seen them all) and contained change (a new slice
doesn't touch the others, and the review is the size of one file).

## The trap of slices: forty copies of the same rule

But vertical slices have a trap, and I fell into it. If every slice is independent, where does a rule that applies to
several of them live? If each one writes its own version, you soon have three slightly different rules, and the
system starts giving different answers to the same question.

The answer is the second half of the standard: **a domain at the center**. Business rules live in one place. The
slice **orchestrates**: it receives the request, calls the rule, stores the result. The **domain decides**, and it
knows nothing about databases, screens or the internet. And so this doesn't depend on anyone remembering, an
architecture test fails if the domain starts depending on the database or the web framework.

## An example you already know

Remember my father's system, the one that blocks whoever can't go to the site? Inside, the slice that assigns a
person looks roughly like this:

```csharp
public sealed class CreateAllocation : IEndpoint
{
    public static void Map(IEndpointRouteBuilder app) =>
        app.MapPost("/api/allocations", async (Command cmd, Handler handler) =>
        {
            var result = await handler.ExecuteAsync(cmd);
            return result.Ok ? Results.Ok(result.Value) : Results.Conflict(result.Error);
        });

    public sealed record Command(Guid SiteId, Guid WorkerId, DateOnly Start);

    public sealed class Handler(IBlockingEngine engine, AppDbContext db)
    {
        public async Task<Result<Response>> ExecuteAsync(Command cmd)
        {
            var check = await engine.EvaluateAsync(cmd.WorkerId, cmd.SiteId, cmd.Start);
            if (!check.Allowed) return Result.Blocked(check.Reasons);   // the rule decides

            var allocation = Allocation.Create(cmd.SiteId, cmd.WorkerId, cmd.Start);
            db.Allocations.Add(allocation);
            await db.SaveChangesAsync();
            return Result.Success(new Response(allocation.Id));
        }
    }
}
```

Notice what is **not** here: no permission check, no filtering by the user's company, no transaction. That is applied
automatically to **every** route, in one place, on purpose. If it lived inside each slice, one day someone (human or
AI) would forget it in one of them.

![Vertical slices cutting across the layers, with the shared domain at the center](../img/dr-frankenstein/diagrama-en.svg)

## No middleman (no MediatR)

There is a very popular library in the .NET world that often comes with this style of architecture: a "middleman"
that takes the message from the route and hands it to the code that runs it. The route doesn't call the code
directly; it sends a note, and the middleman figures out who answers. It is the telephone game of programming.

The first system that became the template used this middleman. And I decided to take it out of every project, for
two practical reasons.

The first is readability. With the middleman, you click on the call to see what it does and land somewhere generic,
not in the code that runs. For a person, it's an annoyance. For an AI navigating the project looking for where to
make a change, it's a detour at every step. Without it, the route calls the code directly, and "go to definition"
takes you exactly where it should.

The second is cost: the library moved to a commercial license in its newer versions, and my rule is to add no piece
that can send a bill without warning (I tell that story in chapter 8).

Since September, no project uses the middleman. The ones that already had it are moving off it gradually, with
tests green before and after.

## The full stack

For those who want the technical summary: **.NET 10** on lean routes, **Blazor Server** for the screens, **Entity
Framework Core** with **PostgreSQL**, **Docker** to ship and each application with its own login. And two rules in
every database: **multi-company from day one** (a global filter keeps a query from returning another company's data,
even if the slice forgets to ask) and **nothing is really deleted** (deleting only marks it inactive). It is Ctrl+Z
for the database, and it has saved more of my afternoons than I would like to admit.

Leaving the stack requires a recorded decision, and so far it has happened only a few times: an editor that has to
run entirely in the browser and a data analysis lab that was born in Python.

## What isn't ready yet

Honesty matters here: not every system follows the standard yet. The first template is hybrid, with part of its
features still in the old shape, and it is being migrated slice by slice. Of the seven code rules, some are already
checked by automated tests; others still depend on the reviewer agent until the automated checks reach the pipeline.

And there is an open decision: I am weighing the benefits of moving the systems to a headless model, with the
frontend separate from the project and talking to the backend only through the API. That would isolate the domain and
the slices even further from the screen, but it is a big change, and it only happens if the numbers add up.

## What I'd take to any team

1. **Organize code by what it does, not by file type.** A feature in one place is easier to understand, to review and
   to hand over to someone, or to an AI, to change.
2. **Slices without a domain turn into copies.** Shared business rules live in one place, and the slice only
   orchestrates.
3. **What everyone will forget can't depend on memory.** Permission, company and transaction get applied
   automatically to every route.
4. **Every extra layer has to pay its own rent.** If all it adds is a detour between caller and callee, it gets in a
   person's way, and even more in an AI's.

With the map and the architecture in place, the AI started building the right way, in the right place, the first
time. And it still kept asking me "can I?" at every step.

*Rafael Veneroso Morici · rvmtech.com.br*
