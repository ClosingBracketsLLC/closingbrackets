// Copy for the homepage section BELOW the scroll-world flight (HomeTail.js).
//
// The flight (data/world.js) is the cinematic précis; this is the structured
// half of the same page. Since 2026-09-10 that half is one section: the two
// tabbed drawing sets in data/process.js, under the heading here. The two
// doors and the three-step delegation strip they replaced are gone (the
// delegation wording survives as the Build-a-Bot sequence's job-letter beat);
// the three rules, the concept-build strip and the fit / not-a-fit pair were
// cut earlier (2026-09-08). `fit` stays exported because /about/ reads it.
// The limits (`notDelegate`) and the close (`startClose`) are shared with
// other pages and live with them.

/** Section heading and standfirst for the process tabs. */
export const headings = {
  process: {
    eyebrow: "The process",
    title: "How it gets built",
    body: "Two services, one way of working: scoped in writing, built in the open, handed over with the code. Pick the one you came for and walk the drawings.",
  },
};

/** Fit / not a fit — brief §6, verbatim. Read by /about/. */
export const fit = {
  yes: "A fit if you can name work you already wish someone would take — leads after hours, documents in a pile, patients who lapsed, reviews sitting unanswered.",
  no: "Not a fit if you want a widget on the homepage, a free strategy deck, or an agent that runs the company.",
};
