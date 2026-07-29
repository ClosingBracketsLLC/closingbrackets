// Copy for /content/ and /content/[slug]/.
//
// Every entry is written by us and stands on its own. The one thing to keep
// honest is the media: the Evergreen Softwash film is a CONCEPT PIECE produced
// to show the format, and both the index card and the piece itself say so in
// visible text. See the same note in data/work.js.
//
// SHAPE:
//   slug, title, summary, date (YYYY-MM-DD), readingMinutes, kind, series,
//   accent, body: Block[]
//
// `pillar: true` marks the piece that a series should be read from first. The
// index sorts it to the front of its run and badges it, so arrival order does
// not depend on publication order — set it on exactly one post per series.
//
// A Block is { t, x } where `t` is one of:
//   p     — paragraph, x: string
//   h2    — section heading, x: string
//   ul/ol — list, x: string[]
//   quote — pull quote, x: string
//   code  — preformatted block, x: string
//
// Adding a post also means adding its URL to public/sitemap.xml.

export const posts = [
  {
    slug: "evergreen-softwash-launch-film",
    kind: "film",
    series: "Production",
    accent: "#2ef2dc",
    title: "Evergreen Softwash: the launch film",
    summary:
      "A five-second hero spot cut for a regional exterior-cleaning company. One shot, one idea, and the dirty half of the house still in frame.",
    date: "2026-07-24",
    readingMinutes: 4,
    // Media block for the article header. `concept: true` drives the visible
    // disclaimer — this was produced as a demonstration, not for a client.
    media: {
      concept: true,
      poster: "/assets/work/evergreen-poster.webp",
      posterMobile: "/assets/work/evergreen-poster-m.webp",
      clip: "/assets/vid/evergreen.mp4",
      clipMobile: "/assets/vid/evergreen-m.mp4",
      caption:
        "Evergreen Softwash — hero spot. Concept piece, produced to show the format.",
    },
    body: [
      {
        t: "p",
        x: "Most home-services advertising opens on a logo and closes on a phone number, and the ninety percent in between is a montage of a van. It performs badly for a reason nobody enjoys hearing: the viewer already knows what a clean house looks like. What they do not know is whether you will turn up, and whether the difference will be visible from the street.",
      },
      {
        t: "p",
        x: "So the spot has one job — make the difference legible in the first second — and one shot to do it in.",
      },
      { t: "h2", x: "The frame carries the argument" },
      {
        t: "p",
        x: "The house is half done. The left side is still dark with algae, the right side is clean, and the line between them runs straight down the siding. Nothing has to be explained, because the before and the after are in the same frame at the same time. There is no cut to a wipe transition, no split screen, no caption reading BEFORE in a condensed sans-serif.",
      },
      {
        t: "quote",
        x: "If the viewer has to remember the first shot to understand the second, you have spent your best second on setup.",
      },
      {
        t: "p",
        x: "Everything else in the frame is doing supporting work. The technician is mid-job rather than posed, so the arc of mist reads as something happening now. The driveway is wet, which puts a second light source under him and separates him from the house. It is dusk, which is the only time of day where a warm porch light and a cold sky can both be in shot. And the crew uniform is clean — for a service where a stranger stands next to your house for three hours, the uniform is the product.",
      },
      { t: "h2", x: "Five seconds, on purpose" },
      {
        t: "p",
        x: "A five-second cut is not a compromised thirty-second cut. It is the format that survives being placed in a feed: it can loop without a seam, it fits pre-roll where skipping opens at five, and it can be dropped straight onto a landing page as a silent background without anyone reaching for the mute button.",
      },
      {
        t: "ul",
        x: [
          "One shot, one idea. A second idea needs a second cut, and there is no room for one.",
          "No text burned in. The same master then works as a paid unit, an organic post, and a site header, and the copy changes per placement.",
          "No audio dependency. Assume it plays silent, because most of the time it will.",
          "A loop point that lands. The push-in ends close enough to the start that the repeat is not a jolt.",
        ],
      },
      { t: "h2", x: "Where the film sits in the funnel" },
      {
        t: "p",
        x: "On its own, a film is a cost. It earns out when it is one part of a system that catches the attention it generates. For the Evergreen concept build that meant the spot ran above a booking page that quotes instantly from an address and a roof area, and behind the booking page sat a qualifier agent that could hold a conversation at eleven at night and put the job on the crew calendar without waking anyone.",
      },
      {
        t: "p",
        x: "That is the part worth taking away, and it is not really about video. Attention is the easiest thing in the chain to buy, and the least valuable thing to hold. Everything after the click is what decides whether the spend was an investment or a donation.",
      },
    ],
  },
  {
    slug: "loop-engineering",
    kind: "essay",
    series: "Loop engineering",
    pillar: true,
    accent: "#ff4e64",
    title: "Loop engineering: the loop is the product",
    summary:
      "Everyone tunes the prompt. Almost nobody designs the loop around it — which is where agents actually succeed, stall, or quietly burn a thousand dollars overnight.",
    date: "2026-07-18",
    readingMinutes: 9,
    body: [
      {
        t: "p",
        x: "An agent is a model in a while loop. That is the entire architecture, and it is worth saying plainly because the industry has spent two years optimising the wrong term. Teams rewrite the system prompt for a fortnight and never write down what the loop does when a tool times out, how many times it may try again, what it carries forward between turns, or what condition ends it.",
      },
      {
        t: "p",
        x: "We call the discipline of specifying those things loop engineering, and in production it is where the wins are. The prompt determines how well one step goes. The loop determines whether a hundred steps compound into an answer or into a bill.",
      },
      { t: "h2", x: "Four things a loop must decide" },
      {
        t: "p",
        x: "Every agent loop, however it is dressed up, makes the same four decisions on every pass. Write them down before you write the prompt.",
      },
      {
        t: "ol",
        x: [
          "What goes in. Not the whole history — the specific slice of state this turn needs. This is a decision, and defaulting to append-everything is still a decision, just an expensive one.",
          "What may act. The tools available on this turn. Not the whole registry: the subset that makes sense given where the loop currently is.",
          "What comes back. How a tool result is validated and reduced before it re-enters context. Raw tool output is the single largest source of context rot.",
          "Whether to continue. The stopping condition, stated as something checkable rather than as a hope that the model will say DONE.",
        ],
      },
      { t: "h2", x: "Context is a budget, not a bucket" },
      {
        t: "p",
        x: "The default loop appends. Turn one is small, turn twenty is enormous, and somewhere around turn twelve quality falls off a cliff that nobody can point at in a trace, because nothing failed — the model simply had four thousand tokens of stale tool output between it and the thing that mattered.",
      },
      {
        t: "quote",
        x: "Treat every token in context as something you chose to put there. If you cannot name why a block is still present on turn nine, it should not be.",
      },
      {
        t: "p",
        x: "In practice that means three moves. Summarise completed sub-tasks down to their result and drop the transcript that produced it. Keep a small structured scratchpad the loop owns — goal, findings so far, open questions — and rewrite it rather than appending to it. And keep large artefacts out of context entirely: write them to a store, and pass a handle.",
      },
      {
        t: "code",
        x: `// The shape we reach for. Note what is explicit:
// budget, tool subset per phase, reduction on the way back in,
// and a stopping condition that is not "the model said so".

while (state.phase !== "done") {
  if (budget.spent > budget.cap) return bail(state, "budget");
  if (state.turn > MAX_TURNS)     return bail(state, "turns");

  const ctx   = compose(state);            // chosen, not accumulated
  const tools = toolsFor(state.phase);     // narrowed, not the full registry
  const step  = await model(ctx, tools);

  if (step.tool) {
    const raw = await invoke(step.tool);   // may throw, may time out
    state = reduce(state, validate(raw));  // shrink BEFORE it re-enters
  }

  state = advance(state, step);            // phase transition is code, not vibes
}`,
      },
      { t: "h2", x: "Retries are where the money goes" },
      {
        t: "p",
        x: "The failure we are called in to fix most often is not a wrong answer. It is a loop that retried a failing tool forty times at three in the morning, each attempt carrying the full accumulated context, and produced a five-hundred-dollar line item and no output.",
      },
      {
        t: "p",
        x: "Retries need three properties, and they are cheap to add on day one and painful to retrofit. Cap them per tool rather than globally, so a flaky search does not consume the whole budget. Back off exponentially with jitter, because synchronised retries turn one slow dependency into an outage. And make the retry visible to the model: a bare failure teaches it nothing, while \"this call failed twice with a timeout, you have one attempt left\" reliably produces a different strategy.",
      },
      { t: "h2", x: "Phases beat freedom" },
      {
        t: "p",
        x: "An agent with fifteen tools available on every turn will use the wrong one eventually, and the more capable the model the more creatively wrong the choice. Splitting the loop into phases — gather, then analyse, then act — and exposing only each phase's tools removes an entire category of failure without constraining anything the task actually needed.",
      },
      {
        t: "p",
        x: "It also makes the loop debuggable. When a run goes wrong you can ask which phase it went wrong in, and the answer is a fact rather than an interpretation of a transcript.",
      },
      { t: "h2", x: "What we check before anything ships" },
      {
        t: "ul",
        x: [
          "Every loop has a hard turn cap and a hard cost cap, both enforced in code rather than in the prompt.",
          "Every tool has its own retry budget, its own timeout, and a defined behaviour on exhaustion.",
          "Tool output is validated and reduced before it enters context — never appended raw.",
          "The stopping condition is checkable by the loop itself, and there is a defined bail state for every way it can fail to be met.",
          "Every run leaves a trace showing phase transitions, tool calls, retries, and tokens spent. If you cannot reconstruct a run afterwards, you are not operating it, you are hoping.",
        ],
      },
      {
        t: "p",
        x: "None of this is exotic. It is the same discipline any long-running background job has needed for thirty years, applied to a component that happens to be probabilistic. The novelty is entirely in the model. The engineering around it is old, and it is the part that decides whether the thing survives contact with a real business.",
      },
    ],
  },
  {
    slug: "stopping-conditions",
    kind: "essay",
    series: "Loop engineering",
    accent: "#ff4e64",
    title: "Loops that know when to stop",
    summary:
      "\"Keep going until the task is complete\" is not a stopping condition. It is a wish. What to write instead, and how to make a loop fail in a way you can act on.",
    date: "2026-07-08",
    readingMinutes: 7,
    body: [
      {
        t: "p",
        x: "The most common bug we find in a production agent is not that it does the wrong thing. It is that it does not know it has finished. It circles — re-reading the same file, re-running the same query, restating its conclusion in slightly different words — until a turn cap it did not know about cuts it off mid-sentence, and the user gets a truncated answer with no indication that anything went wrong.",
      },
      {
        t: "p",
        x: "The cause is nearly always the same. The stopping condition was written as an instruction to the model instead of as a check the loop can run.",
      },
      { t: "h2", x: "Three kinds of stop, and only one is optional" },
      {
        t: "p",
        x: "A loop needs a success stop, a failure stop, and a limit stop. Most implementations have the third by accident and neither of the first two on purpose.",
      },
      {
        t: "ul",
        x: [
          "Success. A predicate over state, evaluated by code. \"The output validates against this schema and every required field is populated\" is a success stop. \"The task is complete\" is not.",
          "Failure. The conditions under which continuing is pointless: a dependency is down, the input was malformed, the model has produced the same tool call three times running. Detecting a stuck loop is a stopping condition, not an error handler.",
          "Limit. Turns, wall-clock time, and cost. These exist to catch the cases the other two missed, which means every limit stop that fires is a bug report about your other two conditions.",
        ],
      },
      {
        t: "quote",
        x: "If your limit stop is the one doing the stopping, you do not have a stopping condition. You have a timeout.",
      },
      { t: "h2", x: "Make the exit checkable" },
      {
        t: "p",
        x: "The reliable move is to give the loop a shape whose completion is mechanical. Instead of asking a model to research a company and stop when it knows enough, give it a form to fill in: eight named fields, each with a type and a source requirement. The loop stops when the form validates. Under-specified fields are visible rather than assumed, and \"enough\" stops being a judgement call the model makes about its own work.",
      },
      {
        t: "p",
        x: "This is not a constraint on the model's reasoning — it can approach those eight fields however it likes. It is a constraint on what counts as done, which is the one judgement you should never delegate.",
      },
      { t: "h2", x: "Detecting the circle" },
      {
        t: "p",
        x: "A loop that repeats itself is the clearest signal available that the current strategy is exhausted, and it is trivially detectable. Hash each tool call with its arguments. If the same hash appears three times in a run, the loop is not making progress and no number of further turns will change that.",
      },
      {
        t: "p",
        x: "What to do about it is a design choice worth making explicitly. The weakest response is to stop. Better is to tell the model what it is doing — \"you have now called search with these arguments three times; it will not return anything different\" — and let it change approach. Best, when the task supports it, is to escalate: hand the state to a fresh loop with a different tool set, or to a person, with the trace attached.",
      },
      { t: "h2", x: "Failing usefully" },
      {
        t: "p",
        x: "When a loop does stop short, what it returns matters more than most teams treat it as. A bare error tells the caller nothing about whether to retry, escalate, or accept partial work. A useful bail carries four things: which stop fired, what the loop had established before it fired, what it was attempting when it stopped, and whether the state is resumable.",
      },
      {
        t: "code",
        x: `return {
  stopped: "budget",        // which condition fired
  partial: state.findings,  // what survived — often most of the value
  attempting: state.pending,// what it was mid-way through
  resumable: true,          // can a later run pick this up?
  trace: state.traceId,
};`,
      },
      {
        t: "p",
        x: "That structure is what lets the layer above make a decision. Partial findings with a resumable flag can be queued for a retry with a larger budget. Partial findings without one can still be shown to a person, who is usually perfectly happy with eighty percent of an answer as long as nobody pretends it is a hundred.",
      },
      {
        t: "p",
        x: "The underlying principle is dull and worth repeating: a loop should never be surprised by its own ending. Every way a run can terminate should be a state you named in advance, and every one of them should produce something the caller can act on.",
      },
    ],
  },
  {
    slug: "graph-engineering",
    kind: "essay",
    series: "Graph engineering",
    pillar: true,
    accent: "#2ef2dc",
    title: "Graph engineering: model the edges first",
    summary:
      "Most business questions that seem hard are relationship questions being asked of a schema that only stores things. Modelling the connections first is what makes them ordinary.",
    date: "2026-06-27",
    readingMinutes: 8,
    body: [
      {
        t: "p",
        x: "A company asks why customers churn. The data exists — support tickets, usage events, invoices, the CRM — and every one of those lives in a table that knows what it is and nothing about what it is connected to. Answering the question means a join written by hand, then another, then a query nobody can maintain, and at the end a number whose provenance one person understands.",
      },
      {
        t: "p",
        x: "The question was never hard. The model was wrong. Churn is not a property of a customer; it is a pattern across the relationships a customer is part of — who they talk to, what they stopped using, which invoice they disputed, which champion left. If the relationships are not first-class in the model, every question about them is an archaeology project.",
      },
      { t: "h2", x: "What first-class edges buy you" },
      {
        t: "p",
        x: "The shift is small to describe and large in effect. Instead of storing entities and inferring connections at query time, you store the connections as things in their own right, with their own attributes: when they formed, how strong they are, what evidence supports them, when they were last confirmed.",
      },
      {
        t: "ul",
        x: [
          "Questions become traversals. \"Which accounts have a support burden concentrated in one seat that has gone quiet?\" is a walk, not a nine-table join.",
          "Depth stops being expensive to write. Two hops and five hops are the same shape of query, which is what makes second-order questions worth asking at all.",
          "Evidence travels with the claim. An edge that carries its source makes every downstream answer auditable, which is the difference between a dashboard people trust and one they check.",
          "New data sources connect instead of restructuring. Adding a channel means adding edges, not renegotiating a schema everything else depends on.",
        ],
      },
      {
        t: "quote",
        x: "The tables tell you what exists. The edges tell you what is happening.",
      },
      { t: "h2", x: "You probably do not need a graph database" },
      {
        t: "p",
        x: "Graph engineering is a modelling discipline, not a product category, and for most businesses Postgres is a perfectly good graph store. An edge table with source, target, type, weight, evidence and timestamps, a couple of well-chosen indexes, and recursive CTEs for traversal will carry you a very long way — and it keeps the graph next to the transactional data instead of in a second system that has to be kept in sync.",
      },
      {
        t: "p",
        x: "Reach for a dedicated graph engine when traversals are deep and unbounded, when the shape of the query is genuinely unknown ahead of time, or when the graph is the primary workload rather than a lens over it. Those are real cases. They are just rarer than the vendor material suggests, and adopting one early costs you every tool your team already knows.",
      },
      { t: "h2", x: "Where this meets AI" },
      {
        t: "p",
        x: "The current default for grounding a model in company data is to embed documents and retrieve by similarity. It works well for \"what does our policy say about X\" and poorly for anything requiring more than one hop, because similarity has no notion of connection. Ask a vector store which customers resemble the three that churned last quarter and you get documents that use similar words.",
      },
      {
        t: "p",
        x: "A graph gives an agent something better than passages: it gives it a structure to walk, with the relationships already named. In practice the two compose — retrieval to find the entry point, traversal to gather the neighbourhood that actually answers the question. That combination is the single largest quality improvement we have made to grounded agents, and it is a data modelling change rather than a model change.",
      },
      { t: "h2", x: "Starting without a rewrite" },
      {
        t: "p",
        x: "Nobody should stop what they are doing to build a graph. The approach that works is to start from one question the business already cares about and cannot currently answer, and model only the edges that question needs.",
      },
      {
        t: "ol",
        x: [
          "Write the question down in the words the business uses. Not the query — the question.",
          "Name the entities in it, and then name the relationships. The relationships are the part usually missing from your schema; that absence is the finding.",
          "Build only those edges, from the sources you already have, as a view or a materialised table beside your existing data.",
          "Answer the question. Then ask what the next one is — it will nearly always reuse most of the edges you just built.",
        ],
      },
      {
        t: "p",
        x: "Three or four iterations of that and there is a graph in the middle of the business, built entirely out of questions somebody wanted answered. That is a different artefact from a graph built to be complete, and it is the only kind we have seen get used.",
      },
    ],
  },
  {
    slug: "traversal-over-retrieval",
    kind: "essay",
    series: "Graph engineering",
    accent: "#2ef2dc",
    title: "Traversal beats retrieval when the answer is two hops away",
    summary:
      "Vector search finds passages that sound like the question. Plenty of real questions are not answered by any single passage — and no amount of better embeddings fixes that.",
    date: "2026-06-16",
    readingMinutes: 6,
    body: [
      {
        t: "p",
        x: "A support agent grounded in a company's documentation answers policy questions well and account questions badly, and the team's instinct is to blame the embeddings. They try a larger model, a smaller chunk size, a reranker. The numbers move a little. The failure mode does not change, because it was never a retrieval quality problem.",
      },
      {
        t: "p",
        x: "\"Is this customer affected by the outage?\" is not answered by any document. It is answered by walking from the customer to their subscribed services, from those services to the incident, and checking whether the intersection is non-empty. No passage in the corpus contains that sentence, so no similarity search can return it.",
      },
      { t: "h2", x: "The one-hop test" },
      {
        t: "p",
        x: "Before building any grounded system, it is worth sorting the real questions into two piles. The test is simple: could a single well-written document answer this?",
      },
      {
        t: "ul",
        x: [
          "One hop — \"what is our refund window\", \"how do I rotate an API key\", \"what does error 4021 mean\". Vector search is excellent at these and you should use it.",
          "Two or more — \"which of my accounts are at risk\", \"who else reported this before it was escalated\", \"what changed between the last two invoices for this customer\". These need a structure, and retrieval will confidently return something plausible and wrong.",
        ],
      },
      {
        t: "quote",
        x: "The dangerous case is not the question retrieval cannot answer. It is the one it answers plausibly.",
      },
      { t: "h2", x: "Composing the two" },
      {
        t: "p",
        x: "The pattern that works is not choosing between them. Retrieval is very good at one thing traversal is bad at — turning an ambiguous natural-language question into a specific entity to start from. Traversal is very good at the thing retrieval cannot do at all. So: retrieve to locate, traverse to gather, then generate over the gathered neighbourhood.",
      },
      {
        t: "code",
        x: `const seeds  = await vectorSearch(question, { k: 5 });
const anchor = await resolveEntity(seeds);       // passages → a node

const hood = await graph.traverse(anchor, {
  edges: ["subscribes_to", "reported", "billed_for"],
  depth: 2,
  since: "90 days",
});

return generate(question, hood);   // grounded in structure, not similarity`,
      },
      {
        t: "p",
        x: "The context handed to the model is now a small, connected, explicable subgraph rather than five passages that scored well. It is also dramatically smaller, which matters more than it sounds — a tight, relevant context is worth more than a large one, and it costs less.",
      },
      { t: "h2", x: "Two failure modes to plan for" },
      {
        t: "p",
        x: "The first is anchor resolution. If the retrieval step lands on the wrong entity, everything after it is confidently wrong about a different customer. Anchors need a confidence threshold and a defined behaviour below it — asking which of two accounts was meant is a far better outcome than guessing.",
      },
      {
        t: "p",
        x: "The second is neighbourhood explosion. In any real graph some nodes are enormous — a shared service, a popular product, a support macro. A depth-two traversal through one of those returns half the database. Cap the fan-out per hop, order neighbours by edge weight or recency, and treat hub nodes as terminal rather than as things to expand.",
      },
      {
        t: "p",
        x: "Both are ordinary engineering problems with ordinary engineering answers, which is rather the point. Once the relationships are modelled, the hard part of grounding a system in your business stops being a research question and becomes a query you can read.",
      },
    ],
  },
];

/** What we write about when we write. */
export const topics = [
  {
    title: "Loop engineering",
    body: "The while-loop around the model: context budgets, retry discipline, phase design, and stopping conditions that actually stop. The part that decides whether an agent survives production.",
  },
  {
    title: "Graph engineering",
    body: "Modelling the relationships in a business as first-class data, and what becomes answerable once you do — including the grounding problems retrieval alone cannot touch.",
  },
  {
    title: "Shipping custom software",
    body: "How fixed scope is written so it holds, what a milestone should look like, and why you should be able to use the thing before it is finished.",
  },
];
