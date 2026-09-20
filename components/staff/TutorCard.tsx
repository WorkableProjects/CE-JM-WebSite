"use client";

import { Mail } from "lucide-react";
import { useState } from "react";
import DotMatrixPortrait from "@/components/effects/DotMatrixPortrait";
import Reveal from "@/components/motion/Reveal";
import CopyEmailButton from "@/components/ui/CopyEmailButton";
import type { Tutor } from "@/lib/tutors";

export default function TutorCard({ tutor, index = 0 }: { tutor: Tutor; index?: number }) {
  const [active, setActive] = useState(false);

  return (
    <Reveal delay={index * 0.08}>
      <article
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
        className="group grid grid-cols-1 border border-ink/10 bg-paper sm:grid-cols-[minmax(0,220px)_1fr]"
      >
        <div className="relative aspect-[4/5] w-full bg-obsidian sm:aspect-auto">
          <DotMatrixPortrait
            src={tutor.portraitSrc}
            alt={`Portrait mark for ${tutor.name}`}
            initials={tutor.initials}
            active={active}
          />
        </div>

        <div className="flex flex-col justify-between p-6 sm:p-8">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              {tutor.subjects.map((subject) => (
                <span
                  key={subject}
                  className="border border-brand/30 bg-brand-tint px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-brand"
                >
                  {subject}
                </span>
              ))}
            </div>
            <h3 className="mt-4 font-display text-2xl font-semibold text-ink">{tutor.name}</h3>
            <p className="mt-1 text-sm font-medium text-ink/50">{tutor.title}</p>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-ink/70">{tutor.bio}</p>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-ink/10 pt-5">
            <a
              href={`mailto:${tutor.email}`}
              className="inline-flex items-center gap-2 bg-ink px-4 py-2 text-xs font-medium text-paper transition-colors hover:bg-brand"
            >
              <Mail size={14} aria-hidden="true" />
              Email {tutor.firstName}
            </a>
            <CopyEmailButton email={tutor.email} />
          </div>
        </div>
      </article>
    </Reveal>
  );
}
