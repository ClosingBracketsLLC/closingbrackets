import ScrollWorld from "./components/ScrollWorld";
import { sections } from "@/data/world";

export const metadata = {
  title: "Custom Software, Growth & AI | Closing Brackets",
  description:
    "Closing Brackets builds custom software, growth marketing, and AI automation for businesses that have outgrown off-the-shelf tools. Fixed scope, real dates, you own the code.",
  alternates: { canonical: "https://closingbrackets.com/" },
};

const [hero, ...rest] = sections;

export default function Home() {
  return (
    <>
      <div id="top" />
      <ScrollWorld>
        {/*
          The engine renders every visible word client-side, so without this block
          the page ships zero crawlable text. It mirrors the exact copy in
          src/data/world.js, gets hidden by the engine on mount, and is what
          crawlers, link previews, and no-JS visitors actually read.
        */}
        <section data-sw-seo>
          <h1>{hero.title}</h1>
          <p>{hero.body}</p>

          {rest.map((s) => (
            <div key={s.id}>
              <h2>
                {s.eyebrow} — {s.title}
              </h2>
              <p>{s.body}</p>
            </div>
          ))}

          <p>
            <a href="/contact/">Start a project</a>
          </p>
        </section>
      </ScrollWorld>
    </>
  );
}
