export interface BuildInfo {
  /** Human-readable build label, e.g. "DEV" or "42". */
  buildNumber: string;
  /** Release tag/date, when available (production only). */
  releaseTag: string | null;
  /** Whether this is a production release build (has a real build number). */
  isProduction: boolean;
}

/**
 * Build metadata is injected at build time via NEXT_PUBLIC_* env vars set by
 * .github/workflows/release.yml. Locally (no release pipeline), these are
 * unset, so we fall back to a visible "DEV" label instead of leaving the
 * footer blank.
 */
export function getBuildInfo(): BuildInfo {
  const rawBuildNumber = process.env.NEXT_PUBLIC_BUILD_NUMBER?.trim();
  const rawReleaseTag = process.env.NEXT_PUBLIC_RELEASE_TAG?.trim();

  if (!rawBuildNumber) {
    return {
      buildNumber: "DEV",
      releaseTag: rawReleaseTag && rawReleaseTag.length > 0 ? rawReleaseTag : null,
      isProduction: false,
    };
  }

  return {
    buildNumber: rawBuildNumber,
    releaseTag: rawReleaseTag && rawReleaseTag.length > 0 ? rawReleaseTag : null,
    isProduction: true,
  };
}

export const buildInfo = getBuildInfo();
