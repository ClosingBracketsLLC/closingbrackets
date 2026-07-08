import Link from "next/link";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import VisibilityGate from "./VisibilityGate";
import { Swarm3D } from "./three/Lazy3D";
import { BracketTick } from "./BracketMark";
import { agentRoles, agentPrinciples } from "@/data/agents";

/**
 * The agent-team story: every project is staffed by a coordinated swarm of
 * specialized AI agents, led by a senior human. Backdropped by the 3D swarm.
 * `withCta` links onward; the AI service page sets it false (its page CTA
 * already covers conversion).
 */
export default function AgentTeamSection({ withCta = true }) {
  return (
    <section className="relative overflow-hidden py-20 lg:py-28">
      <VisibilityGate
        minWidth={768}
        needsWebGL
        className="absolute inset-x-0 top-0 h-[520px] opacity-80"
      >
        <Swarm3D />
      </VisibilityGate>
      <div className="container relative z-10">
        <SectionHeading
          eyebrow="The agent swarm"
          title="An entire AI team on every project"
          lead="One senior engineer, an entire AI staff. Specialized agents research, design, build, test, and optimize in parallel — directed and reviewed by the human you actually talk to."
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {agentRoles.map((role, i) => (
            <Reveal key={role.name} delay={(i % 3) * 80} className="h-full">
              <div className="card h-full p-7 backdrop-blur-[2px]">
                <h3 className="font-display text-lg font-semibold text-ink-hi">
                  {role.name}
                </h3>
                <p className="mt-2.5 text-sm">{role.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <ul className="mx-auto mt-12 flex max-w-2xl flex-col gap-3">
          {agentPrinciples.map((p) => (
            <li key={p} className="flex items-start gap-3 text-sm md:text-base">
              <BracketTick className="mt-0.5" />
              {p}
            </li>
          ))}
        </ul>
        {withCta ? (
          <div className="mt-12 text-center">
            <p className="mx-auto mb-5 max-w-xl text-base text-ink-hi">
              Want this working for your business? We build agent teams for
              clients too — support, sales, ops, and content that run while you
              sleep.
            </p>
            <Link href="/services/ai-automation" className="btn-ghost">
              Explore AI agent teams →
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}
