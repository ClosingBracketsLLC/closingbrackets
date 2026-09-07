"use client";

import { useEffect, useRef, useState } from "react";
import { track } from "./Analytics";
import { author, contact } from "@/data/site";
import { budgetBands } from "@/data/build-a-bot";

const ENDPOINT = "https://api.web3forms.com/submit";
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

/* Field and label styling live in globals.css as .cb-field / .cb-label. */
const label = "cb-label";

/**
 * The options for "what do you want". `intent` in the URL pre-selects one:
 * /start/?intent=bot is what every Build-a-Bot button links to. Read from
 * window.location in an effect rather than through useSearchParams — under
 * static export that hook forces the whole route to bail out to client
 * rendering, which would cost the page its crawlable HTML.
 */
const WANT = [
  { value: "Build-a-Bot", intent: "bot" },
  { value: "Site or app", intent: "site" },
  { value: "Both", intent: "both" },
  { value: "Not sure", intent: "unsure" },
];

export default function StartForm() {
  const [status, setStatus] = useState("idle"); // idle | sending | ok | error
  const [error, setError] = useState("");
  const wantRef = useRef(null);
  const started = useRef(false);

  // Uncontrolled on purpose: the pre-select writes to the DOM (an external
  // system), which is what an effect is for; a setState here would be a
  // cascading render on every page view for one attribute.
  useEffect(() => {
    const intent = new URLSearchParams(window.location.search).get("intent");
    const match = WANT.find((w) => w.intent === intent);
    if (match && wantRef.current) wantRef.current.value = match.value;
  }, []);

  // First interaction with any field — fired once per page view.
  function onFocus() {
    if (started.current) return;
    started.current = true;
    track("form_start");
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (status === "sending") return;

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    // Honeypot: real users never fill this, bots usually do.
    if (data.botcheck) return;

    if (!ACCESS_KEY) {
      setStatus("error");
      setError(
        `The form isn't configured yet. Email ${contact.email} directly and we'll pick it up.`,
      );
      return;
    }

    setStatus("sending");
    setError("");

    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: `${data.want || "Project"} enquiry from ${data.name || "the website"}`,
          from_name: "closingbrackets.com",
          ...data,
        }),
      });
      const json = await res.json();

      if (res.ok && json.success) {
        setStatus("ok");
        track("form_submit");
        form.reset();
      } else {
        setStatus("error");
        setError(json.message || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setError("Network error. Please check your connection and try again.");
    }
  }

  if (status === "ok") {
    return (
      <div
        role="status"
        className="cb-panel cb-tone cb-tone--tr p-8 text-center"
      >
        <p className="font-[family-name:var(--font-display)] text-2xl text-bone">
          Message received
        </p>
        <p className="mt-3 text-slate">
          {author.firstName} reads it himself and replies {contact.reply}.
          What comes back is a first answer, and it costs nothing.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      onFocusCapture={onFocus}
      className="cb-panel cb-tone cb-tone--br grid gap-5 p-6 sm:p-8 md:grid-cols-3 md:gap-x-6"
    >
      <p className="cb-eyebrow justify-self-start md:col-span-3">Project enquiry</p>

      {/* Honeypot — visually hidden, never announced, never tabbable. */}
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <div className="grid gap-2">
        <label htmlFor="name" className={label}>
          Name
        </label>
        <input id="name" name="name" required autoComplete="name" className="cb-field" />
      </div>

      <div className="grid gap-2">
        <label htmlFor="company" className={label}>
          Company{" "}
          {/* Full-strength slate: at 60% this hit 2.66:1 on 12px text (WCAG AA
              wants 4.5). It still reads as secondary via the case/tracking
              contrast with the label, not via a dimmer colour. */}
          <span className="font-normal normal-case tracking-normal text-slate">
            (optional)
          </span>
        </label>
        <input id="company" name="company" autoComplete="organization" className="cb-field" />
      </div>

      <div className="grid gap-2">
        <label htmlFor="email" className={label}>
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="cb-field"
        />
      </div>

      <div className="grid gap-2 md:col-span-2">
        <label htmlFor="want" className={label}>
          What do you want
        </label>
        <select
          id="want"
          name="want"
          required
          ref={wantRef}
          defaultValue=""
          className="cb-field"
        >
          <option value="" disabled>
            Choose one
          </option>
          {WANT.map((w) => (
            <option key={w.value} value={w.value}>
              {w.value}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-2">
        <label htmlFor="budget" className={label}>
          Budget band{" "}
          <span className="font-normal normal-case tracking-normal text-slate">
            (optional)
          </span>
        </label>
        <select id="budget" name="budget" defaultValue="" className="cb-field">
          <option value="">Prefer not to say</option>
          {budgetBands.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-2 md:col-span-3">
        <label htmlFor="message" className={label}>
          In your words
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          className="cb-field"
          placeholder="The tasks you want to delegate, or the property you want built. Roughly when you need it, and anything already in place."
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="cb-halftone cb-btn mt-2 w-full disabled:opacity-60 sm:w-auto sm:justify-self-start md:col-span-3"
      >
        {status === "sending" ? "Sending…" : "Send enquiry"}
      </button>

      <p aria-live="polite" className="min-h-6 text-sm text-coral md:col-span-3">
        {status === "error" ? error : ""}
      </p>
    </form>
  );
}
