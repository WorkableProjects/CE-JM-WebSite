import { ArrowRight, FlaskConical, Sigma } from "lucide-react";
import type { ReactNode } from "react";
import ReactiveGrid from "@/components/effects/ReactiveGrid";
import MagneticButton from "@/components/motion/MagneticButton";
import Reveal from "@/components/motion/Reveal";
import { credibilityLabels, subjects } from "@/lib/site";

export default function Home() {
  return (
    <div>
      <section className="relative overflow-hidden border-b border-rule px-4 pb-24 pt-24 sm:px-6 sm:pb-32 sm:pt-32">
        <ReactiveGrid />
        <div className="relative mx-auto max-w-4xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand">
              Beaumont High School Peer Tutoring
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-5 max-w-3xl font-display text-4xl font-semibold leading-[1.08] text-ink sm:text-6xl">
              Master Chemistry &amp; IM3 at Beaumont High.
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-ink/65 sm:text-lg">
              Direct peer-led instruction tailored to BHS class standards and exam formats.
              Led by Caden Erwin &amp; Jayden McCarthy.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <MagneticButton href="/contact" variant="primary">
                Book a Session
                <ArrowRight size={16} aria-hidden="true" />
              </MagneticButton>
              <MagneticButton href="/staff" variant="secondary">
                Meet the Tutors
              </MagneticButton>
            </div>
          </Reveal>
          <Reveal delay={0.32}>
            <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-rule pt-6">
              {credibilityLabels.map((label) => (
                <span
                  key={label}
                  className="font-mono text-xs font-medium tracking-[0.2em] text-ink/45"
                >
                  {label}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-4 py-24 sm:px-6 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand">
              Subject Focus
            </p>
            <h2 className="mt-4 max-w-xl font-display text-3xl font-semibold text-ink sm:text-4xl">
              Two subjects. No wasted time.
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-5 lg:grid-cols-[1.3fr_1fr]">
            <Reveal delay={0.05} className="h-full">
              <SubjectCard
                icon={<FlaskConical size={22} aria-hidden="true" />}
                title="Chemistry"
                code={subjects.chemistry.code}
                topics={[...subjects.chemistry.topics]}
                pattern="molecular"
                size="lg"
              />
            </Reveal>
            <Reveal delay={0.12} className="h-full">
              <SubjectCard
                icon={<Sigma size={22} aria-hidden="true" />}
                title="IM3"
                code={subjects.im3.code}
                topics={[...subjects.im3.topics]}
                pattern="grid"
                size="md"
              />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-t border-rule bg-obsidian px-4 py-24 text-chalk sm:px-6 sm:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <h2 className="font-display text-3xl font-semibold sm:text-4xl">
              Ready for your next session?
            </h2>
            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-chalk/60 sm:text-base">
              Tell us your course and preferred tutor. We&apos;ll confirm a time within one
              school day.
            </p>
            <div className="mt-8 flex justify-center">
              <MagneticButton href="/contact" variant="primary">
                Request a Session
                <ArrowRight size={16} aria-hidden="true" />
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

function SubjectCard({
  icon,
  title,
  code,
  topics,
  pattern,
  size,
}: {
  icon: ReactNode;
  title: string;
  code: string;
  topics: string[];
  pattern: "molecular" | "grid";
  size: "lg" | "md";
}) {
  return (
    <div
      className={`group relative overflow-hidden border border-ink/10 bg-paper p-8 focus-within:border-brand sm:p-10 ${
        size === "lg" ? "min-h-[340px]" : "min-h-[280px]"
      }`}
      tabIndex={0}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06] transition-opacity duration-500 group-hover:opacity-[0.14] group-focus-visible:opacity-[0.14]"
      >
        {pattern === "molecular" ? <MolecularPattern /> : <CoordinateGridPattern />}
      </div>

      <div className="relative flex items-center gap-3 text-brand">
        {icon}
        <span className="font-mono text-xs font-semibold tracking-[0.2em]">{code}</span>
      </div>
      <h3 className="relative mt-5 font-display text-2xl font-semibold text-ink sm:text-3xl">
        {title}
      </h3>
      <ul className="relative mt-6 grid grid-cols-2 gap-x-4 gap-y-2.5">
        {topics.map((topic) => (
          <li key={topic} className="text-sm text-ink/70">
            <span className="mr-1.5 text-brand">&middot;</span>
            {topic}
          </li>
        ))}
      </ul>
    </div>
  );
}

function MolecularPattern() {
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <g stroke="#241b79" strokeWidth="1.5" fill="none">
        <line x1="60" y1="80" x2="140" y2="60" />
        <line x1="140" y1="60" x2="200" y2="120" />
        <line x1="200" y1="120" x2="290" y2="100" />
        <line x1="200" y1="120" x2="180" y2="210" />
        <line x1="180" y1="210" x2="260" y2="250" />
        <line x1="290" y1="100" x2="350" y2="160" />
      </g>
      <g fill="#241b79">
        <circle cx="60" cy="80" r="7" />
        <circle cx="140" cy="60" r="10" />
        <circle cx="200" cy="120" r="12" />
        <circle cx="290" cy="100" r="8" />
        <circle cx="180" cy="210" r="9" />
        <circle cx="260" cy="250" r="7" />
        <circle cx="350" cy="160" r="6" />
      </g>
    </svg>
  );
}

function CoordinateGridPattern() {
  const lines = Array.from({ length: 8 });
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <g stroke="#241b79" strokeWidth="1">
        {lines.map((_, i) => (
          <line key={`v-${i}`} x1={(i + 1) * 44} y1="0" x2={(i + 1) * 44} y2="300" />
        ))}
        {lines.map((_, i) => (
          <line key={`h-${i}`} x1="0" y1={(i + 1) * 34} x2="400" y2={(i + 1) * 34} />
        ))}
      </g>
      <path
        d="M 20 260 C 100 40, 180 320, 260 80 S 380 140, 400 60"
        stroke="#241b79"
        strokeWidth="2.5"
        fill="none"
      />
    </svg>
  );
}
