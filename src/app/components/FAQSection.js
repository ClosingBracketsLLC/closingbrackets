"use client";

import { useState } from "react";
import { faqs as allFaqs } from "@/data/faqs";
import SectionHeading from "./SectionHeading";

/**
 * Accessible FAQ accordion. Pass `items` for a page-specific subset;
 * defaults to the full FAQ list.
 */
export default function FAQSection({ items, title = "Frequently asked questions" }) {
  const faqs = items || allFaqs;
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative overflow-hidden py-20 lg:py-28">
      <div className="void-grid absolute inset-0" aria-hidden />
      <div className="container relative z-10">
        <SectionHeading eyebrow="Answers" title={title} />
        <div className="mx-auto flex w-full max-w-[850px] flex-col gap-4">
          {faqs.map((faq, index) => {
            const open = activeIndex === index;
            return (
              <div key={faq.question} className="card">
                <h3>
                  <button
                    type="button"
                    aria-expanded={open}
                    onClick={() => setActiveIndex(open ? null : index)}
                    className="flex min-h-[44px] w-full items-start justify-between gap-4 p-6 text-left font-display text-lg font-medium text-ink-hi"
                  >
                    {faq.question}
                    <span
                      aria-hidden
                      className={`mt-1 shrink-0 text-violet transition-transform duration-200 ${
                        open ? "rotate-90" : ""
                      }`}
                    >
                      {"}"}
                    </span>
                  </button>
                </h3>
                {open ? (
                  <p className="px-6 pb-6 text-base">{faq.answer}</p>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
