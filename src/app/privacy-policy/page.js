import PageHero from "../components/PageHero";
import PrivacyPolicy from "../components/PrivacyPolicy";

export const metadata = {
  title: "Privacy Policy",
  description:
    "How Closing Brackets collects, uses, and protects the information you share through our website and contact form, including analytics and your rights.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="Privacy"
        title="Privacy Policy"
        subtitle="How we handle the information you share with Closing Brackets."
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Privacy Policy", path: "/privacy-policy" },
        ]}
      />
      <PrivacyPolicy />
    </>
  );
}
