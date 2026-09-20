import { describe, expect, it } from "vitest";
import { getTutorById, tutors } from "@/lib/tutors";

describe("tutors data", () => {
  it("includes both Caden Erwin and Jayden McCarthy with correct emails", () => {
    expect(tutors).toHaveLength(2);

    const caden = getTutorById("caden-erwin");
    expect(caden?.name).toBe("Caden Erwin");
    expect(caden?.email).toBe("cerwin42451@beaumontusd.k12.ca.us");
    expect(caden?.subjects).toContain("Chemistry");

    const jayden = getTutorById("jayden-mccarthy");
    expect(jayden?.name).toBe("Jayden McCarthy");
    expect(jayden?.email).toBe("jmccarthy35750@beaumontusd.k12.ca.us");
    expect(jayden?.subjects).toContain("Chemistry");
    expect(jayden?.subjects).toContain("IM3");
  });

  it("gives every tutor a non-empty bio and portrait", () => {
    for (const tutor of tutors) {
      expect(tutor.bio.length).toBeGreaterThan(10);
      expect(tutor.portraitSrc).toMatch(/^\/portraits\//);
    }
  });
});
