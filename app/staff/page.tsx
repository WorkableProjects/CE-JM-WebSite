import type { Metadata } from "next";
import Reveal from "@/components/motion/Reveal";
import TutorCard from "@/components/staff/TutorCard";
import { tutors } from "@/lib/tutors";

export const metadata: Metadata = {
  title: "Staff",
  description:
    "Meet Caden Erwin and Jayden McCarthy, the Beaumont High School students behind CE/JM Tutoring's Chemistry and IM3 sessions.",
};

export default function StaffPage() {
  return (
    <div className="px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand">Staff</p>
          <h1 className="mt-4 font-display text-4xl font-semibold text-ink sm:text-5xl">
            The Tutors
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-ink/65 sm:text-lg">
            Beaumont High students equipped with proven mastery in STEM coursework.
          </p>
        </Reveal>

        <div className="mt-14 space-y-6">
          {tutors.map((tutor, i) => (
            <TutorCard key={tutor.id} tutor={tutor} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
