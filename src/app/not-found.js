import Link from "next/link";

// App Router 404 convention — statically exported to out/404.html and served
// by Render for any unmatched path.
export const metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden">
      <div className="aurora" aria-hidden />
      <div className="void-grid absolute inset-0" aria-hidden />
      <div className="container relative z-10 text-center">
        <h1 className="font-display text-7xl font-semibold tracking-display text-ink-hi md:text-9xl">
          4<span className="text-violet">[</span>4
        </h1>
        <p className="mx-auto mb-8 mt-4 max-w-md text-base md:text-lg">
          This bracket never got closed. The page you&apos;re looking for moved
          or never existed — let&apos;s get you back on track.
        </p>
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/" className="btn-signal">
            Back home
          </Link>
          <Link href="/contact" className="btn-ghost">
            Contact us
          </Link>
        </div>
      </div>
    </section>
  );
}
