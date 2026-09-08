import LegalPage, { legalMetadata } from "../components/LegalPage";
import { routes } from "@/data/site";
import { terms } from "@/data/legal";

export const metadata = legalMetadata(terms, routes.terms);

export default function Terms() {
  return <LegalPage doc={terms} path={routes.terms} />;
}
