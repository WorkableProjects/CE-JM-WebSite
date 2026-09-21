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
    whatWeDo:
      "We break down mole conversions, reaction dynamics, and thermodynamics into steps you can repeat on your own. We also review lab rubrics before you submit, so formatting doesn't cost you points you already earned.",
    howWeOperate: [
      {
        title: "Concept breakdown",
        description: "Step-by-step walkthroughs of whatever's confusing in your homework or lecture notes.",
      },
      {
        title: "Live practice",
        description: "Guided problem-solving using BHS-style practice questions, not generic textbook drills.",
      },
      {
        title: "Lab prep",
        description: "A structural review of your lab report against the rubric before it's due.",
      },
    ],
  },
  im3: {
    label: "IM3",
    code: "IM3",
    topics: ["Polynomials", "Trigonometry", "Rational functions", "Logarithms"],
    whatWeDo:
      "We work through algebraic transformations and identities until the pattern clicks, then drill the question types that actually show up on BHS tests — not just the textbook examples.",
    howWeOperate: [
      {
        title: "Diagnostic check",
        description: "We find the specific gap — a formula, a step, a rule — instead of re-teaching everything.",
      },
      {
        title: "Pattern recognition",
        description: "Group question types so you recognize the right method on sight during a test.",
      },
      {
        title: "Timed practice",
        description: "Drill under real exam pacing, in a low-pressure setting, before it counts.",
      },
    ],
  },
} as const;

export const credibilityLabels = ["CHEMISTRY", "IM3", "BHS-FOCUSED"] as const;

export const sessionFormats = [
  {
    label: "In-Person",
    where: "On the BHS campus",
    when: "During A-Lunch",
  },
  {
    label: "Online",
    where: "Remote, by video call",
    when: "Weekdays after 3:30 PM, and weekends",
  },
] as const;
