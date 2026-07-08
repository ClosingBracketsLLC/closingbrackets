import PageHero from "../components/PageHero";
import TermsOfService from "../components/TermsOfService";

export const metadata = {
  title: "Terms of Service",
  description:
    "The terms that govern your use of the Closing Brackets website, including intellectual property, project engagements, disclaimers, and governing law.",
  alternates: { canonical: "/terms-of-service" },
};

export default function TermsOfServicePage() {
  return (
    <>
      <PageHero
        eyebrow="Terms"
        title="Terms of Service"
        subtitle="The terms that govern your use of the Closing Brackets website."
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Terms of Service", path: "/terms-of-service" },
        ]}
      />
      <TermsOfService />
    </>
  );
}
