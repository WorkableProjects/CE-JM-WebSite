export type Subject = "Chemistry" | "IM3";

export interface Tutor {
  id: string;
  name: string;
  firstName: string;
  title: string;
  subjects: Subject[];
  email: string;
  bio: string;
  portraitSrc: string;
  portraitAlt: string;
  initials: string;
}

export const tutors: Tutor[] = [
  {
    id: "caden-erwin",
    name: "Caden Erwin",
    firstName: "Caden",
    title: "Chemistry Tutor",
    subjects: ["Chemistry"],
    email: "cerwin42451@beaumontusd.k12.ca.us",
    bio: "Focuses on stoichiometry, thermodynamics, and lab report structure. Explains BHS Chemistry problem sets the way they actually appear on unit tests.",
    portraitSrc: "/portraits/caden.svg",
    portraitAlt: "Abstract geometric portrait mark for Caden Erwin",
    initials: "CE",
  },
  {
    id: "jayden-mccarthy",
    name: "Jayden McCarthy",
    firstName: "Jayden",
    title: "Chemistry & IM3 Tutor",
    subjects: ["Chemistry", "IM3"],
    email: "jmccarthy35750@beaumontusd.k12.ca.us",
    bio: "Covers Chemistry fundamentals alongside IM3 — polynomials, trigonometry, and logarithms — with an emphasis on exam-format practice.",
    portraitSrc: "/portraits/jayden.svg",
    portraitAlt: "Abstract geometric portrait mark for Jayden McCarthy",
    initials: "JM",
  },
];

export function getTutorById(id: string): Tutor | undefined {
  return tutors.find((t) => t.id === id);
}
