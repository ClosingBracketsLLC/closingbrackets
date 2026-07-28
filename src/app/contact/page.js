import Link from "next/link";
import ContactForm from "../components/ContactForm";

export const metadata = {
  title: "Get a fixed-scope plan",
  description:
    "Describe your project to Closing Brackets. We read every enquiry ourselves, reply within one business day, and quote a fixed scope, timeline, and price.",
  alternates: { canonical: "https://closingbrackets.com/contact/" },
};

export default function Contact() {
  return (
    <main className="mx-auto grid w-full max-w-2xl gap-10 px-6 py-20 sm:py-28">
      {/* Brand-token atmosphere (globals.css) so both pages read as one site. */}
      <div aria-hidden className="site-glow" />
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 text-sm text-slate transition hover:text-cyan focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
        >
          <img src="/logo-mark.svg" alt="" className="h-5 w-auto" />
          Closing Brackets
        </Link>
        <h1 className="mt-8 font-[family-name:var(--font-display)] text-4xl leading-tight tracking-tight text-balance text-bone sm:text-5xl">
          Tell us what you want to build
        </h1>
        <p className="mt-4 text-lg text-slate">
          Describe your project in the form below. We read every enquiry
          ourselves and reply within one business day. What you get back is a
          fixed-scope plan: what we will build, a timeline with real dates, and
          one fixed price. No hourly billing.
        </p>
      </div>

      <ContactForm />
    </main>
  );
}
