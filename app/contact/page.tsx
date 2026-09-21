import type { Metadata } from "next";
import { Mail, MapPin, Video } from "lucide-react";
import BookingLaunchButton from "@/components/booking/BookingLaunchButton";
import Reveal from "@/components/motion/Reveal";
import CopyEmailButton from "@/components/ui/CopyEmailButton";
import { sessionFormats } from "@/lib/site";
import { tutors } from "@/lib/tutors";

const formatIcons = { "In-Person": MapPin, Online: Video } as const;

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a Chemistry or IM3 tutoring session with Caden Erwin or Jayden McCarthy at Beaumont High School, or reach either tutor directly by email.",
};

export default function ContactPage() {
  return (
    <div>
      <section className="border-b border-rule px-4 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand">
              Contact
            </p>
            <h1 className="mt-4 font-display text-4xl font-semibold text-ink sm:text-5xl">
              Lock In Your Session
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-ink/65 sm:text-lg">
              Pick a time that works, choose your subject, and you&apos;re on the schedule.
            </p>
            <div className="mt-8">
              <BookingLaunchButton />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-12 grid gap-4 border-t border-rule pt-8 sm:grid-cols-2">
              {sessionFormats.map((format) => {
                const Icon = formatIcons[format.label];
                return (
                  <div key={format.label} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center border border-brand/30 bg-brand-tint text-brand">
                      <Icon size={16} aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-ink">{format.label}</p>
                      <p className="text-sm text-ink/60">{format.where}</p>
                      <p className="text-sm text-ink/60">{format.when}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
              Or reach a tutor directly
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink/60">
              Have a quick question before booking? Email Caden or Jayden directly.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {tutors.map((tutor, i) => (
              <Reveal key={tutor.id} delay={i * 0.08}>
                <div className="flex h-full flex-col justify-between border border-ink/10 p-6">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand">
                      {tutor.subjects.join(" · ")}
                    </p>
                    <h3 className="mt-3 font-display text-xl font-semibold text-ink">
                      {tutor.name}
                    </h3>
                    <p className="mt-1 text-sm text-ink/50">{tutor.title}</p>
                    <a
                      href={`mailto:${tutor.email}`}
                      className="mt-3 block break-all text-sm text-ink/70 underline decoration-ink/20 underline-offset-2 hover:text-brand"
                    >
                      {tutor.email}
                    </a>
                  </div>
                  <div className="mt-6 flex flex-wrap items-center gap-3">
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
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
