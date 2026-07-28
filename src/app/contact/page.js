import Link from "next/link";
import ContactForm from "../components/ContactForm";

export const metadata = {
  title: "Start a project",
  description:
    "Tell us what you're building. You'll get a fixed-scope plan back — scope, timeline, and price — not an hourly meter.",
  alternates: { canonical: "https://closingbrackets.com/contact/" },
};

export default function Contact() {
  return (
    <main className="mx-auto grid w-full max-w-2xl gap-10 px-6 py-20 sm:py-28">
      <div>
        <Link
          href="/"
          className="text-sm text-slate transition hover:text-cyan"
        >
          ← Closing Brackets
        </Link>
        <h1 className="mt-8 font-[family-name:var(--font-display)] text-4xl leading-tight tracking-tight text-bone sm:text-5xl">
          Tell us what you&apos;re building.
        </h1>
        <p className="mt-4 text-lg text-slate">
          You&apos;ll get a fixed-scope plan back — scope, timeline, and price —
          not an hourly meter. We read every enquiry ourselves.
        </p>
      </div>

      <ContactForm />
    </main>
  );
}
