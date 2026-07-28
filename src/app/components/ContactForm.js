"use client";

import { useState } from "react";

const ENDPOINT = "https://api.web3forms.com/submit";
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

const field =
  "w-full rounded-lg border border-rain bg-panel px-4 py-3 text-bone " +
  "placeholder:text-slate/70 outline-none transition " +
  "focus:border-cyan focus:ring-2 focus:ring-cyan/40";

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
        "The form isn't configured yet. Email us directly and we'll pick it up.",
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
        className="rounded-xl border border-cyan/40 bg-panel p-8 text-center"
      >
        <p className="font-[family-name:var(--font-display)] text-2xl text-bone">
          Got it.
        </p>
        <p className="mt-3 text-slate">
          We read every enquiry ourselves. You&apos;ll hear back within one
          business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5">
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
        <label htmlFor="name" className="text-sm text-slate">
          Name
        </label>
        <input id="name" name="name" required className={field} />
      </div>

      <div className="grid gap-2">
        <label htmlFor="email" className="text-sm text-slate">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className={field}
        />
      </div>

      <div className="grid gap-2">
        <label htmlFor="company" className="text-sm text-slate">
          Company <span className="text-slate/60">(optional)</span>
        </label>
        <input id="company" name="company" className={field} />
      </div>

      <div className="grid gap-2">
        <label htmlFor="message" className="text-sm text-slate">
          What are you building?
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          className={field}
          placeholder="A sentence or two is plenty. What it is, who it's for, and any deadline you're working against."
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-2 justify-self-start rounded-full bg-coral px-8 py-4 font-[family-name:var(--font-display)] font-medium text-ink transition hover:brightness-110 disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send it"}
      </button>

      <p aria-live="polite" className="min-h-6 text-sm text-coral">
        {status === "error" ? error : ""}
      </p>
    </form>
  );
}
