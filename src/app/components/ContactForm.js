"use client";

import { useState } from "react";

const ENDPOINT = "https://api.web3forms.com/submit";
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

/* Field and label styling live in globals.css as .cb-field / .cb-label. An
   input's border is a CONTROL boundary rather than decoration, so it answers
   to WCAG 1.4.11 instead of to the panel ink, and that rule belongs beside the
   rest of the system rather than in a hand-built utility string here. */
const label = "cb-label";

export default function ContactForm() {
  const [status, setStatus] = useState("idle"); // idle | sending | ok | error
  const [error, setError] = useState("");

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
        "The form isn't configured yet. Email admin@closingbrackets.com directly and we'll pick it up.",
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
          subject: `New project enquiry from ${data.name || "the website"}`,
          from_name: "closingbrackets.com",
          ...data,
        }),
      });
      const json = await res.json();

      if (res.ok && json.success) {
        setStatus("ok");
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
          We read every enquiry ourselves. You will hear back within one
          business day.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="cb-panel cb-tone cb-tone--br grid gap-5 p-6 sm:p-8 md:grid-cols-3 md:gap-x-6"
    >
      {/* The panel's caption box. Labels the form rather than repeating the
          page title, which is the job a caption does in a comic. */}
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
        <input id="name" name="name" required className="cb-field" />
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
          className="cb-field"
        />
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
        <input id="company" name="company" className="cb-field" />
      </div>

      <div className="grid gap-2 md:col-span-3">
        <label htmlFor="message" className={label}>
          Your project
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          className="cb-field"
          placeholder="What do you want built, roughly when you need it, and anything already in place."
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
