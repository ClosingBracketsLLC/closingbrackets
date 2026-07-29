import PageLayout from "../components/PageLayout";
import ContactForm from "../components/ContactForm";
import { breadcrumbLd, url } from "@/data/site";

const TITLE = "Contact";
const PATH = "/contact/";

export const metadata = {
  title: "Get a fixed-scope plan",
  description:
    "Describe your project to Closing Brackets. We read every enquiry ourselves, reply within one business day, and quote a fixed scope, timeline, and price.",
  alternates: { canonical: url(PATH) },
};

export default function Contact() {
  return (
    <PageLayout
      eyebrow={TITLE}
      title="Tell us what you want to build"
      intro="Describe your project in the form below. We read every enquiry ourselves and reply within one business day. What you get back is a fixed-scope plan: what we will build, a timeline with real dates, and one fixed price. No hourly billing."
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbLd(TITLE, PATH)),
        }}
      />
      <div className="mt-12">
        <ContactForm />
      </div>
    </PageLayout>
  );
}
