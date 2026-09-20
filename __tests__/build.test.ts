import { afterEach, describe, expect, it, vi } from "vitest";

const ORIGINAL_ENV = { ...process.env };

afterEach(() => {
  process.env = { ...ORIGINAL_ENV };
  vi.resetModules();
});

describe("getBuildInfo", () => {
  it("falls back to a non-empty DEV label when no build number is set", async () => {
    delete process.env.NEXT_PUBLIC_BUILD_NUMBER;
    delete process.env.NEXT_PUBLIC_RELEASE_TAG;
    vi.resetModules();
    const { getBuildInfo } = await import("@/lib/build");
    const info = getBuildInfo();
    expect(info.buildNumber).toBe("DEV");
    expect(info.buildNumber.length).toBeGreaterThan(0);
    expect(info.isProduction).toBe(false);
  });

  it("reports the release build number and tag in production", async () => {
    process.env.NEXT_PUBLIC_BUILD_NUMBER = "42";
    process.env.NEXT_PUBLIC_RELEASE_TAG = "v1.2.0";
    vi.resetModules();
    const { getBuildInfo } = await import("@/lib/build");
    const info = getBuildInfo();
    expect(info.buildNumber).toBe("42");
    expect(info.buildNumber.length).toBeGreaterThan(0);
    expect(info.releaseTag).toBe("v1.2.0");
    expect(info.isProduction).toBe(true);
  });

  it("never exposes a blank build number string", async () => {
    process.env.NEXT_PUBLIC_BUILD_NUMBER = "   ";
    vi.resetModules();
    const { getBuildInfo } = await import("@/lib/build");
    const info = getBuildInfo();
    expect(info.buildNumber).toBe("DEV");
  });
});
