"use client";

import { useState } from "react";
import Link from "next/link";
import BracketMark from "./BracketMark";
import { site } from "@/data/site";

const links = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/process", label: "Process" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
];

function Logo({ onClick }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className="logo-mark flex items-center gap-2.5"
      aria-label="Closing Brackets — home"
    >
      <span className="logo-brackets inline-flex">
        <BracketMark size={28} />
      </span>
      <span className="hidden font-display text-lg font-semibold tracking-display text-ink-hi min-[360px]:inline">
        Closing Brackets
      </span>
    </Link>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header
      id="nav-container"
      className="border-b border-line bg-void-0/80 backdrop-blur-lg"
    >
      <div className="container flex items-center justify-between py-3.5">
        <Logo />

        {/* Desktop nav */}
        <nav className="hidden md:block" aria-label="Main">
          <ul className="flex items-center gap-7">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-sm font-medium text-ink-mid transition-colors duration-200 hover:text-ink-hi"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={`tel:${site.phone}`}
            className="hidden text-sm font-medium text-ink-mid transition-colors hover:text-ink-hi lg:inline-block"
          >
            {site.phoneDisplay}
          </a>
          {/* Always visible so the primary CTA stays reachable at every
              fold; compact with a shorter label on very small screens. */}
          <Link
            href="/contact"
            className="btn-signal min-h-0 px-3 py-2 text-xs min-[418px]:px-4 sm:text-sm md:px-5 md:py-2.5"
          >
            <span className="min-[418px]:hidden">Book a call</span>
            <span className="hidden min-[418px]:inline">Book a free call</span>
          </Link>

          {/* Mobile menu toggle */}
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className="flex min-h-[44px] min-w-[44px] items-center justify-center text-ink-hi md:hidden"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
              {open ? (
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open ? (
        <nav
          className="border-t border-line bg-void-1 md:hidden"
          aria-label="Main mobile"
        >
          <ul className="container flex flex-col py-4">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={close}
                  className="block min-h-[44px] py-3 text-base font-medium text-ink-mid hover:text-ink-hi"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="mt-3 flex flex-col gap-3">
              <Link href="/contact" onClick={close} className="btn-signal w-full">
                Book a free call
              </Link>
              <a href={`tel:${site.phone}`} onClick={close} className="btn-ghost w-full">
                Call {site.phoneDisplay}
              </a>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
