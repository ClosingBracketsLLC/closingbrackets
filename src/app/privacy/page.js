import LegalPage, { legalMetadata } from "../components/LegalPage";
import { routes } from "@/data/site";
import { privacy } from "@/data/legal";

export const metadata = legalMetadata(privacy, routes.privacy);

export default function Privacy() {
  return <LegalPage doc={privacy} path={routes.privacy} />;
}
