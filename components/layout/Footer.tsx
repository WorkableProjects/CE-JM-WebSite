import Link from "next/link";
import { getBuildInfo } from "@/lib/build";
import { nav, site } from "@/lib/site";
import { tutors } from "@/lib/tutors";
import CopyEmailButton from "@/components/ui/CopyEmailButton";

export default function Footer() {
  const build = getBuildInfo();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-rule-inverse bg-obsidian text-chalk">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-12 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <p className="font-display text-2xl font-semibold">
              CE<span className="text-brand">/</span>JM Tutoring
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-chalk/60">
              Peer-led Chemistry and IM3 tutoring, built by and for {site.school} students.
            </p>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-chalk/40">
              Navigate
            </h2>
            <ul className="mt-4 space-y-2.5">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-chalk/75 hover:text-chalk">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-chalk/40">
              Tutors
            </h2>
            <ul className="mt-4 space-y-5">
              {tutors.map((tutor) => (
                <li key={tutor.id}>
                  <p className="text-sm font-medium text-chalk">{tutor.name}</p>
                  <p className="text-xs text-chalk/50">{tutor.title}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <a
                      href={`mailto:${tutor.email}`}
                      className="text-xs text-chalk/70 underline decoration-chalk/30 underline-offset-2 hover:text-chalk"
                    >
                      {tutor.email}
                    </a>
                  </div>
                  <div className="mt-2">
                    <CopyEmailButton
                      email={tutor.email}
                      label="Copy email"
                      className="border-chalk/25 text-chalk hover:border-chalk hover:bg-chalk/10"
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-rule-inverse pt-6 text-xs text-chalk/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} CE/JM Tutoring &middot; A {site.school} ({site.schoolAbbr}) peer-tutoring
            service.
          </p>
          <p
            className="font-mono tracking-wide"
            title={build.releaseTag ? `Release ${build.releaseTag}` : "Local development build"}
          >
            CE/JM WEB &middot; BUILD {build.buildNumber}
          </p>
        </div>
      </div>
    </footer>
  );
}
