import { site } from "@/data/site";

const TermsOfService = () => {
  return (
    <section className="relative py-20 overflow-hidden lg:py-28">
      <div className="absolute inset-0 void-grid" aria-hidden />
      <div className="container relative z-10 px-5 mx-auto xl:px-0">
        <div className="mx-auto max-w-3xl">
          <p className="mb-10 text-sm text-ink-mid">Last updated: July 2026</p>

          <p className="text-base text-ink-mid">
            These Terms of Service (&quot;Terms&quot;) govern your use of the{" "}
            {site.name} website at{" "}
            <a
              href={site.url}
              className="underline underline-offset-4 hover:text-violet"
            >
              {site.url.replace("https://", "")}
            </a>{" "}
            (the &quot;Site&quot;). By using the Site, you agree to these Terms.
            If you do not agree, please do not use the Site.
          </p>

          <h2 className="mt-12 mb-4 text-2xl font-medium text-ink-hi font-display">
            Acceptance of terms
          </h2>
          <p className="text-base text-ink-mid">
            By accessing or browsing the Site, you confirm that you have read,
            understood, and agree to be bound by these Terms and our Privacy
            Policy. We may update these Terms from time to time; continued use
            of the Site after changes take effect means you accept the revised
            Terms.
          </p>

          <h2 className="mt-12 mb-4 text-2xl font-medium text-ink-hi font-display">
            Use of the site
          </h2>
          <p className="text-base text-ink-mid">
            The Site is provided for general information about {site.name} and
            our services. You agree to use it lawfully and not to misuse it —
            for example, by attempting to disrupt the Site, gain unauthorized
            access, scrape it at scale, or introduce malicious code. We may
            modify, suspend, or discontinue any part of the Site at any time.
          </p>

          <h2 className="mt-12 mb-4 text-2xl font-medium text-ink-hi font-display">
            Intellectual property
          </h2>
          <p className="text-base text-ink-mid">
            The content on this Site — including text, graphics, logos, and the{" "}
            {site.name} name and branding — is owned by {site.name} or its
            licensors and is protected by intellectual property laws. You may
            not copy, reproduce, or reuse it without our prior written
            permission. Work we create for clients under a project engagement is
            governed by that engagement&#39;s agreement, not by this Site notice.
          </p>

          <h2 className="mt-12 mb-4 text-2xl font-medium text-ink-hi font-display">
            Project engagements
          </h2>
          <p className="text-base text-ink-mid">
            Nothing on this Site is an offer or a binding proposal. Any work we
            perform for you — including scope, deliverables, pricing, timelines,
            ownership of deliverables, and confidentiality — is governed by a
            separate written agreement or statement of work between you and{" "}
            {site.name}. In the event of a conflict, that agreement controls
            over these Terms. For active engagements, invoice and payment
            questions go to{" "}
            <a
              href={`mailto:${site.emails.billing}`}
              className="underline underline-offset-4 hover:text-violet"
            >
              {site.emails.billing}
            </a>{" "}
            and service or support requests to{" "}
            <a
              href={`mailto:${site.emails.support}`}
              className="underline underline-offset-4 hover:text-violet"
            >
              {site.emails.support}
            </a>
            .
          </p>

          <h2 className="mt-12 mb-4 text-2xl font-medium text-ink-hi font-display">
            Disclaimers
          </h2>
          <p className="text-base text-ink-mid">
            The Site is provided on an &quot;as is&quot; and &quot;as
            available&quot; basis without warranties of any kind, whether
            express or implied. We do not warrant that the Site will be
            uninterrupted, error-free, or free of harmful components, or that
            the information on it is complete or current.
          </p>

          <h2 className="mt-12 mb-4 text-2xl font-medium text-ink-hi font-display">
            Limitation of liability
          </h2>
          <p className="text-base text-ink-mid">
            To the fullest extent permitted by law, {site.name} will not be
            liable for any indirect, incidental, special, consequential, or
            punitive damages, or any loss of profits or data, arising from your
            use of — or inability to use — the Site.
          </p>

          <h2 className="mt-12 mb-4 text-2xl font-medium text-ink-hi font-display">
            Governing law
          </h2>
          <p className="text-base text-ink-mid">
            These Terms are governed by the laws of the State of Washington,
            USA, without regard to its conflict-of-law principles. Any disputes
            relating to the Site will be subject to the exclusive jurisdiction
            of the state and federal courts located in Washington.
          </p>

          <h2 className="mt-12 mb-4 text-2xl font-medium text-ink-hi font-display">
            Changes to these terms
          </h2>
          <p className="text-base text-ink-mid">
            We may revise these Terms at any time by updating this page. The
            &quot;Last updated&quot; date above indicates when the latest
            changes took effect. Please review this page periodically.
          </p>

          <h2 className="mt-12 mb-4 text-2xl font-medium text-ink-hi font-display">
            Contact
          </h2>
          <p className="text-base text-ink-mid">
            Questions about these Terms? Email us at{" "}
            <a
              href={`mailto:${site.emails.admin}`}
              className="underline underline-offset-4 hover:text-violet"
            >
              {site.emails.admin}
            </a>{" "}
            or call{" "}
            <a
              href={`tel:${site.phone}`}
              className="underline underline-offset-4 hover:text-violet"
            >
              {site.phoneDisplay}
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
};

export default TermsOfService;
