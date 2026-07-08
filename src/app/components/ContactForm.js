"use client";

import { useState } from "react";
import { site } from "@/data/site";

const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

const SERVICES = [
  "Custom software / website",
  "Digital marketing & growth",
  "AI consulting & automation",
  "Not sure yet — let's talk",
];

const BUDGETS = [
  "Under $5k",
  "$5k – $15k",
  "$15k – $50k",
  "$50k+",
  "Ongoing retainer",
];

const inputClasses =
  "w-full min-h-[44px] rounded-lg border border-line bg-void-2 px-4 py-3 text-sm text-ink-hi placeholder:text-ink-low focus:border-violet";

/**
 * Lead form posting straight to Web3Forms from the static page — no server.
 * `variant="mini"` renders the 3-field version used in CTA bands;
 * the full variant (contact page) adds service + budget selects.
 * If the access key isn't configured, submission falls back to a prefilled
 * mailto: so no lead is ever lost.
 */
export default function ContactForm({ variant = "full", formName = "Contact page" }) {
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const mini = variant === "mini";

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    // Honeypot: bots fill the hidden field; drop silently.
    if (data.botcheck) {
      setStatus("success");
      return;
    }

    if (!ACCESS_KEY) {
      const body = encodeURIComponent(
        `Name: ${data.name}\nEmail: ${data.email}\n${
          data.service ? `Service: ${data.service}\n` : ""
        }${data.budget ? `Budget: ${data.budget}\n` : ""}\n${data.message}`
      );
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
        `Project inquiry — ${data.name}`
      )}&body=${body}`;
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: `New lead from closingbrackets.com — ${formName}`,
          from_name: formName,
          ...data,
        }),
      });
      const json = await res.json();
      setStatus(json.success ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="card p-8 text-center" role="status">
        <p className="font-display text-2xl font-semibold text-ink-hi">
          <span className="text-violet" aria-hidden>
            {"} "}
          </span>
          done.
        </p>
        <p className="mt-3 text-sm">
          Your message is in. We&apos;ll reply within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden
      />

      <div className={mini ? "flex flex-col gap-4 sm:flex-row" : "grid gap-4 sm:grid-cols-2"}>
        <div className="flex-1">
          <label htmlFor={`${variant}-name`} className="mb-1.5 block text-sm font-medium text-ink-hi">
            Name
          </label>
          <input
            id={`${variant}-name`}
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Your name"
            className={inputClasses}
          />
        </div>
        <div className="flex-1">
          <label htmlFor={`${variant}-email`} className="mb-1.5 block text-sm font-medium text-ink-hi">
            Email
          </label>
          <input
            id={`${variant}-email`}
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@company.com"
            className={inputClasses}
          />
        </div>
      </div>

      {!mini ? (
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="full-service" className="mb-1.5 block text-sm font-medium text-ink-hi">
              What do you need?
            </label>
            <select id="full-service" name="service" required className={inputClasses} defaultValue="">
              <option value="" disabled>
                Pick the closest fit
              </option>
              {SERVICES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="full-budget" className="mb-1.5 block text-sm font-medium text-ink-hi">
              Budget range <span className="font-normal text-ink-low">(optional)</span>
            </label>
            <select id="full-budget" name="budget" className={inputClasses} defaultValue="">
              <option value="">Prefer not to say</option>
              {BUDGETS.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>
        </div>
      ) : null}

      <div>
        <label htmlFor={`${variant}-message`} className="mb-1.5 block text-sm font-medium text-ink-hi">
          Your project
        </label>
        <textarea
          id={`${variant}-message`}
          name="message"
          required
          rows={mini ? 3 : 5}
          placeholder="A sentence or two is plenty — what are you trying to build or grow?"
          className={inputClasses}
        />
      </div>

      {status === "error" ? (
        <p className="text-sm text-signal" role="alert">
          Something went wrong sending that. Email us directly at{" "}
          <a href={`mailto:${site.email}`} className="underline underline-offset-4">
            {site.email}
          </a>{" "}
          or call{" "}
          <a href={`tel:${site.phone}`} className="underline underline-offset-4">
            {site.phoneDisplay}
          </a>{" "}
          — no lead left behind.
        </p>
      ) : null}

      <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button type="submit" disabled={status === "submitting"} className="btn-signal disabled:opacity-60">
          {status === "submitting" ? "Sending…" : "Send it"}
        </button>
        <p className="text-xs text-ink-low">
          Free strategy call · Reply within 1 business day · No spam, ever
        </p>
      </div>
    </form>
  );
}
