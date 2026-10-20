---
title: "Mysticism and technology"
description: "The side project that taught me how to make an AI talk to real people on WhatsApp"
date: 2026-10-20
series: "Building the RVM ecosystem — chapter 1"
translationKey: "misticismo-e-tecnologia"
---

Before small farmers got a system, a fortune teller got a WhatsApp number.

Her name was Sarah. She read tarot, spoke calmly and answered by day, by night, in the small hours, whenever you wanted. She never asked for vacation,
never complained about her pay and never once guessed who was going to pay for a reading. But I'll get to that.

And before anyone asks: no, nothing that came next was the work of hidden forces. It was study, mistakes and fixes.
The fortune teller just lent me her deck.

## A side project with Pix

Sarah the Gypsy was born alongside the ERP, almost in the same week, and for a far less noble reason than the farmers'
one: I wanted to learn.

The ERP was the serious project. Sarah was the playground. I wanted to understand, in practice, how you make an AI talk
to real people on WhatsApp: receive the message, understand what the person wants, keep the context of the
conversation, answer with a personality of its own and stay in character. Tarot looked like the perfect lab. It's a
subject where the conversation matters more than the form, and where nobody expects the answer to come out of a table.

She started under another name, Madame Estrela, which sounded more like a fairground attraction than a fortune teller.
She became Sarah. After tarot came numerology, birth charts, synastry and Human Design. She also got her own knowledge
base with the meaning of the cards, so she wouldn't depend only on the model's memory.

And, like every good lab, she had one completely unnecessary detail: payment by Pix, Brazil's instant payment system,
before every reading. A side project, yes. But a side project with a payment integration, because I wanted to learn
that too.

## Half an hour of memory

A WhatsApp conversation doesn't have a beginning and an end like a system screen. The person sends a message, disappears
for lunch, comes back two hours later and picks up where they left off, as if nothing had happened.

Sarah kept the context of the conversation for thirty minutes. After that, she forgot everything. Anyone who took too
long to reply got the full greeting all over again, like that aunt who greets you three times at the same Sunday lunch,
always as if it were the first. How long to remember, what to remember and what to do when the memory expires were
decisions I had never needed to make in a screen-based system.

## The AI doesn't read the contract

The first lesson came from a rule I thought was impossible to break.

To build a birth chart, Sarah needed the date, time and city of birth. One person sent only the name of the city,
without the state. The prompt said, in so many words: "don't invent or deduce the state; if the person didn't provide
it, return only the city".

The model deduced the state on the first try.

By luck, it got it right. But if the person had been from another state, the coordinates would have been wrong, the
ascendant and the houses would have been wrong, and the chart would have been delivered wrong **without any error
showing up**. No exception, no alert. Just a nice, plausible, wrong answer.

That's when I understood something that applies to everything that came after: **a prompt is a request, not a
contract.** If a rule really matters, it can't live only in the text the AI reads. It has to be in the code. The fix was
simple: the system compares what the AI returned with what the person wrote. If the person didn't mention the state,
any state in the answer is made up, and the code deletes it.

![The prompt asks, the code guarantees: the message goes through the AI with the persona, but what matters is checked in code before the answer goes out](../img/misticismo-e-tecnologia/diagrama-en.svg)

## "Dear soul", "my flower"

The second lesson was funnier, and a little embarrassing.

To make Sarah warm, the prompt asked for a welcoming tone. She understood it her own way: she started calling everyone
"dear soul", "my flower", "honey", which, said to a grown man with a beard (yes, my friends tested it, and it was a hit with the guys in their forties), sounds curious to say the least. She could see the future in the cards,
but not the beard in the profile picture. With no clue about the gender of the person on the other side, she guessed,
and got it wrong impressively often.

I banned the pet names. Sarah started calling people only "friend", in the masculine or feminine form Portuguese
requires. And, once again, the rule didn't stay in the prompt: the code decides which form to use, based on the name.
The AI never guessed anyone's gender again. When the name is ambiguous, she uses the neutral form and moves on.

## The creator's chart as the answer key

The third lesson almost made me break what was working.

While validating the ascendant calculation, I "deduced" what the result should be for my own chart and nearly "fixed" a
formula that was correct. I only avoided the mistake because I know my ascendant: I was born at that hour, and I'm a
Sagittarius rising, not a Gemini.

Since then, calculations get validated against real data, never against a value someone imagined. I used my own chart as
the answer key, and that's how the real bugs showed up, the ones no test with a made-up value would ever catch. I can
say, with some vanity, that I'm the most thoroughly tested person in that system.

## 59 people, zero Pix

Sarah went live in May, with payments switched on. Over the months, **59 people talked to her** and she gave **54
readings**.

Payments: one. Mine, as a test.

A fortune teller who reads the future and didn't see that nobody was going to pay. If I were her, I'd check the deck.

But I wasn't frustrated, because that was never the goal. Sarah did exactly the job I gave her: she was my first system
to talk to real people, to make mistakes in front of real people and to force me to fix them. In September, she retired
and became a portfolio piece. The site is still up, and she still doesn't collect a pension.

## What the fortune teller taught me

1. **A prompt is a request, not a contract.** Whatever matters (money, calculations, personal data) is guaranteed in
   code.
2. **AI doesn't throw errors: it makes things up with confidence.** Compare the answer with what the person actually
   said.
3. **Validate against reality.** A made-up reference value gives you false confidence in wrong code and false doubt in
   correct code.
4. **A lab doesn't need to turn a profit.** It needs to teach. If it teaches, it has paid for itself.

When Safra em Dia started talking to farmers on their phones, the one who had already made the mistakes first, and
learned from them, was Sarah. That's what she was for.
