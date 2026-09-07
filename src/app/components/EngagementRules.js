import { NumberedStrip, SectionHeading } from "./primitives";
import { engagement, engagementHeading } from "@/data/services";

/**
 * The three rules — fixed scope, real dates, one price — as one section,
 * rendered identically on the homepage, /services/ and /about/. Copy comes
 * from data/services.js so the terms cannot drift between pages.
 */
export default function EngagementRules({ className = "mt-24" }) {
  return (
    <section className={className}>
      <SectionHeading eyebrow={engagementHeading.eyebrow} title={engagementHeading.title}>
        {engagementHeading.body}
      </SectionHeading>
      <NumberedStrip items={engagement} />
    </section>
  );
}
