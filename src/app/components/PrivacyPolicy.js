import { site } from "@/data/site";

const PrivacyPolicy = () => {
  return (
    <section className="relative py-20 overflow-hidden lg:py-28">
      <div className="absolute inset-0 void-grid" aria-hidden />
      <div className="container relative z-10 px-5 mx-auto xl:px-0">
        <div className="mx-auto max-w-3xl">
          <p className="mb-10 text-sm text-ink-mid">Last updated: July 2026</p>

          <p className="text-base text-ink-mid">
            This Privacy Policy explains how {site.name} (&quot;we,&quot;
            &quot;us,&quot; or &quot;our&quot;) collects, uses, and protects
            information when you visit {site.url} or get in touch with us. We
            keep this simple on purpose: we are a small agency, we collect only
            what we need to respond to you and improve our site, and we do not
            sell your data.
          </p>

          <h2 className="mt-12 mb-4 text-2xl font-medium text-ink-hi font-display">
            Information we collect
          </h2>
          <p className="text-base text-ink-mid">
            We collect two kinds of information:
          </p>
          <ul className="flex flex-col gap-2 mt-4 text-base list-disc ms-5 text-ink-mid">
            <li>
              <span className="text-ink-hi">Information you give us.</span> When
              you use our contact form or email us, we collect your name, email
              address, and the contents of your message so we can respond.
            </li>
            <li>
              <span className="text-ink-hi">Information collected
              automatically.</span> Like most websites, we collect basic usage
              analytics such as pages viewed, approximate location, device and
              browser type, and how you navigate the site.
            </li>
          </ul>

          <h2 className="mt-12 mb-4 text-2xl font-medium text-ink-hi font-display">
            How we use your information
          </h2>
          <ul className="flex flex-col gap-2 mt-4 text-base list-disc ms-5 text-ink-mid">
            <li>To respond to your inquiries and provide the services you request.</li>
            <li>To understand how visitors use our site so we can improve it.</li>
            <li>To keep our site secure and functioning correctly.</li>
            <li>
              To comply with legal obligations when we are required to do so.
            </li>
          </ul>
          <p className="mt-4 text-base text-ink-mid">
            We do not sell or rent your personal information, and we do not use
            it for advertising to you.
          </p>

          <h2 className="mt-12 mb-4 text-2xl font-medium text-ink-hi font-display">
            Cookies and analytics
          </h2>
          <p className="text-base text-ink-mid">
            We use Microsoft Clarity to understand how our site is used through
            metrics, heatmaps, and session analytics. Clarity may set cookies
            and collect usage data on our behalf; it is governed by
            Microsoft&#39;s privacy practices. We use this data only in
            aggregate to improve the experience of our site. You can block or
            delete cookies through your browser settings, though some parts of
            the site may work less smoothly if you do.
          </p>

          <h2 className="mt-12 mb-4 text-2xl font-medium text-ink-hi font-display">
            Third parties
          </h2>
          <p className="text-base text-ink-mid">
            We share information only with the service providers that help us
            run our website and communicate with you — for example, our
            analytics and email or hosting providers. These providers process
            data on our behalf and are not permitted to use it for their own
            purposes. We may also disclose information if required by law or to
            protect our rights.
          </p>

          <h2 className="mt-12 mb-4 text-2xl font-medium text-ink-hi font-display">
            Data retention
          </h2>
          <p className="text-base text-ink-mid">
            We keep contact inquiries for as long as needed to respond and
            maintain a record of our correspondence, and analytics data for as
            long as it remains useful for improving the site. When information
            is no longer needed, we delete it or anonymize it.
          </p>

          <h2 className="mt-12 mb-4 text-2xl font-medium text-ink-hi font-display">
            Your rights
          </h2>
          <p className="text-base text-ink-mid">
            You can ask us to access, correct, or delete the personal
            information we hold about you, or to stop contacting you, at any
            time. Depending on where you live, you may have additional rights
            under laws such as the GDPR or CCPA. To exercise any of these
            rights, just email us and we&#39;ll take care of it.
          </p>

          <h2 className="mt-12 mb-4 text-2xl font-medium text-ink-hi font-display">
            Children&#39;s privacy
          </h2>
          <p className="text-base text-ink-mid">
            Our site is intended for businesses and adults. We do not knowingly
            collect personal information from children under 13.
          </p>

          <h2 className="mt-12 mb-4 text-2xl font-medium text-ink-hi font-display">
            Changes to this policy
          </h2>
          <p className="text-base text-ink-mid">
            We may update this policy from time to time. When we do, we&#39;ll
            revise the &quot;Last updated&quot; date above. Significant changes
            will be reflected on this page.
          </p>

          <h2 className="mt-12 mb-4 text-2xl font-medium text-ink-hi font-display">
            Contact us
          </h2>
          <p className="text-base text-ink-mid">
            Questions about this policy or your data? Email us at{" "}
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

export default PrivacyPolicy;
