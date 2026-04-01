export interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  // Optional Indian fields
  dob?: string;
  gender?: string;
  languages?: string[];
  maritalStatus?: string;
}

export interface Education {
  id: string;
  level: string; // "10th" | "12th" | "Diploma" | "Undergraduate" | "Postgraduate"
  institution: string;
  board: string;
  degree: string; // Only used for Undergraduate / Postgraduate
  marksType: "CGPA" | "Percentage";
  marks: string;
  year: string;
  description: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  link: string;
}

export interface Declaration {
  enabled: boolean;
  place: string;
  date: string;
}

export interface ResumeData {
  personal: PersonalInfo;
  careerObjective: string;
  education: Education[];
  experience: Experience[];
  projects: Project[];
  skills: string[];
  declaration: Declaration;
  sectionOrder: string[];
}

export const DEFAULT_SECTION_ORDER = [
  "personal",
  "careerObjective",
  "education",
  "skills",
  "projects",
  "experience",
  "declaration",
];

export const initialResumeData: ResumeData = {
  personal: {
    name: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    github: "",
  },
  careerObjective: "",
  education: [],
  experience: [],
  projects: [],
  skills: [],
  declaration: {
    enabled: false,
    place: "",
    date: new Date().toISOString().split("T")[0],
  },
  sectionOrder: [...DEFAULT_SECTION_ORDER],
};

export const EDUCATION_LEVELS = [
  { value: "10th", label: "10th / SSLC" },
  { value: "12th", label: "12th / PUC / HSC" },
  { value: "Diploma", label: "Diploma" },
  { value: "Undergraduate", label: "Undergraduate" },
  { value: "Postgraduate", label: "Postgraduate" },
];

export const DEGREE_VISIBLE_LEVELS = ["Undergraduate", "Postgraduate"];

export function validateMarks(value: string, type: "CGPA" | "Percentage"): { valid: boolean; error: string } {
  if (!value.trim()) return { valid: true, error: "" };
  const num = parseFloat(value);
  if (isNaN(num) || num < 0) return { valid: false, error: "Enter a valid number" };
  if (type === "CGPA" && num > 10) return { valid: false, error: "CGPA cannot exceed 10" };
  if (type === "Percentage" && num > 100) return { valid: false, error: "Percentage cannot exceed 100" };
  return { valid: true, error: "" };
}
