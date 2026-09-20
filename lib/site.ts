export const site = {
  name: "CE/JM Tutoring",
  shortName: "CE/JM",
  school: "Beaumont High School",
  schoolAbbr: "BHS",
  tagline: "Master Chemistry & IM3 at Beaumont High.",
  description:
    "Direct peer-led instruction tailored to BHS class standards and exam formats. Led by Caden Erwin & Jayden McCarthy.",
  seoDescription:
    "Peer-led Chemistry and Integrated Math III (IM3) tutoring for Beaumont High School students, taught by BHS students Caden Erwin and Jayden McCarthy.",
  url: "https://cejmtutoring.example.com",
  emailDomain: "beaumontusd.k12.ca.us",
} as const;

export const nav = [
  { href: "/", label: "Home" },
  { href: "/staff", label: "Staff" },
  { href: "/contact", label: "Contact / Book" },
] as const;

export const subjects = {
  chemistry: {
    label: "Chemistry",
    code: "CHEM",
    topics: ["Stoichiometry", "Thermodynamics", "Lab reports", "Exam preparation"],
  },
  im3: {
    label: "IM3",
    code: "IM3",
    topics: ["Polynomials", "Trigonometry", "Rational functions", "Logarithms"],
  },
} as const;

export const credibilityLabels = ["CHEMISTRY", "IM3", "BHS-FOCUSED"] as const;
